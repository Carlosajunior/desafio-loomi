import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../repositories/users.repository';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { DeleteUserDTO } from '../dtos/delete-user.dto';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { ConfirmSingUpDTO } from '../dtos/confirm-sign-up.dto';
import { MailService } from 'src/modules/email-service/email-service';
import { SearchUserDTO } from '../dtos/search-user.dto';
import { FindUserByEmailDTO } from '../dtos/findUserByEmailAndPassword.dto';
import { User } from '@prisma/client';
@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly mailService: MailService,
  ) {}

  async confirmSignUp(data: ConfirmSingUpDTO) {
    try {
      return await this.userRepository.confirmSignUp(data);
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async createUser(createUserDTO: CreateUserDTO) {
    try {
      const user = await this.userRepository.findUserByEmail({
        email: createUserDTO.email,
      });
      if (user)
        return new NotAcceptableException(
          'Já há um usuário cadastrado com esse e-mail.',
        );
      const createdUser = await this.userRepository.createUser(createUserDTO);
      await this.sendConfirmationEmail(
        createUserDTO.email,
        (createdUser as unknown as User).id,
      );
      return 'Confirme o cadastro acessando o link que foi enviado para o e-mail informado.';
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async searchUserByEmail(data: FindUserByEmailDTO) {
    try {
      const user = await this.userRepository.findUserByEmail(data);
      delete user['password'];
      return user;
    } catch (error) {
      return new NotFoundException(error);
    }
  }

  async searchUsers(data: SearchUserDTO) {
    try {
      let usersSQLQuery: string = `SELECT * FROM "User"`;
      const conditions: string[] = [];

      if (data.email) conditions.push(`"email" = '${data.email}'`);
      if (data.name) {
        conditions.push(`LOWER("name") LIKE LOWER('${data.name}%')`);
      }
      if (data.type) conditions.push(`"type" = '${data.type}'`);
      if (data.date_start && data.date_end)
        conditions.push(
          `"created_at" BETWEEN '${data.date_start}' AND '${data.date_end}'`,
        );

      conditions.push(`"status" = ${data.status}`);

      if (conditions.length > 0)
        usersSQLQuery += ' WHERE ' + conditions.join(' AND ');

      usersSQLQuery =
        usersSQLQuery +
        ` LIMIT ${data.records_per_page} OFFSET ${(data.page - 1) * data.records_per_page}`;

      return await this.userRepository.listUsers(usersSQLQuery);
    } catch (error) {
      return new NotFoundException(error);
    }
  }

  async updateUser(updateUserDTO: UpdateUserDTO) {
    try {
      if (updateUserDTO.email) {
        const user = await this.userRepository.findUserByEmail({
          email: updateUserDTO.email,
        });
        if (user)
          return new NotAcceptableException(
            'Já há um usuário cadastrado com esse e-mail.',
          );
      }
      return await this.userRepository.updateUserById(updateUserDTO);
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async deleteUser(deleteUserDTO: DeleteUserDTO) {
    try {
      return await this.userRepository.deleteUserById(deleteUserDTO);
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  private async sendConfirmationEmail(email: string, id: string) {
    const message = process.env.EMAIL_CONFIRMATION_ENDPOINT + id;
    await this.mailService.enviarEmail(email, message, 'Confirmar cadastro');
  }
}
