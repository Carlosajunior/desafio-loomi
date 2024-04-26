import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserRepository } from '../repositories/users.repository';
import { UpdateUserDTO } from '../dtos/update-ser.dto';
import { DeleteUserDTO } from '../dtos/delete-user.dto';
import { CreateUserDTO } from '../dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDTO: CreateUserDTO) {
    try {
      const user = await this.userRepository.findUserByEmail({
        email: createUserDTO.email,
      });
      if (user)
        return new NotAcceptableException(
          'Já há um usuário cadastrado com esse e-mail.',
        );
      return await this.userRepository.createUser(createUserDTO);
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async updateUser(updateUserDTO: UpdateUserDTO) {
    try {
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
}
