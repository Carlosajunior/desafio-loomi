import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserRepository } from '../repositories/users.repository';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { DeleteUserDTO } from '../dtos/delete-user.dto';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { ConfirmSingUpDTO } from '../dtos/confirm-singn-up.dto';
import { MailService } from 'src/modules/email-service/email-service';
import { UserModel } from '../models/user.model';
@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly mailService: MailService,
  ) {}

  async confirmSignUp(data: ConfirmSingUpDTO) {
    try {
      return await this.userRepository.confirmSingUp(data);
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
        (createdUser as unknown as UserModel).id,
      );
      return 'Confirme o cadastro acessando o link que foi enviado para o e-mail informado.';
    } catch (error) {
      return new NotAcceptableException(error);
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
