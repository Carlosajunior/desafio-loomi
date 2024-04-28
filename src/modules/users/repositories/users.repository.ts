import { FindUserByEmailDTO } from '../dtos/findUserByEmailAndPassword.dto';
import { PrismaClient, User } from '@prisma/client';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { DeleteUserDTO } from '../dtos/delete-user.dto';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { hashPassword } from 'src/utils/bcrypt.utils';
import { ConfirmSingUpDTO } from '../dtos/confirm-sign-up.dto';
@Injectable()
export class UserRepository {
  prisma = new PrismaClient();

  async createUser(data: CreateUserDTO) {
    try {
      data.password = hashPassword(data.password);
      const user = await this.prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
          type: data.type,
        },
      });
      delete user['password'];
      return user;
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async findUserByEmail(data: FindUserByEmailDTO) {
    return await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
  }

  async listUsers(usersSQLQuery: string) {
    try {
      const users = await this.prisma.$queryRawUnsafe<User[]>(usersSQLQuery);
      users.forEach((user) => {
        delete user.password;
      });
      return { users };
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async updateUserById(data: UpdateUserDTO) {
    try {
      const user = await this.prisma.user.update({
        where: {
          id: data.id,
        },
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
        },
      });
      delete user['password'];
      return user;
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async deleteUserById(data: DeleteUserDTO) {
    return await this.prisma.user.delete({
      where: {
        id: data.id,
      },
    });
  }

  async confirmSignUp(data: ConfirmSingUpDTO) {
    try {
      const user = await this.prisma.user.update({
        where: { id: data.id },
        data: {
          status: true,
        },
      });
      delete user['password'];
      return user;
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }
}
