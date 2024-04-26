import { FindUserByEmailDTO } from '../dtos/findUserByEmailAndPassword.dto';
import { PrismaClient } from '@prisma/client';
import { UpdateUserDTO } from '../dtos/update-ser.dto';
import { DeleteUserDTO } from '../dtos/delete-user.dto';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { Injectable, NotAcceptableException } from '@nestjs/common';

@Injectable()
export class UserRepository {
  prisma = new PrismaClient();

  async createUser(data: CreateUserDTO) {
    try {
      return await this.prisma.user.create({ data: { ...data } });
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

  async updateUserById(data: UpdateUserDTO) {
    try {
      return await this.prisma.user.update({
        where: {
          id: data.id,
        },
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
        },
      });
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
}
