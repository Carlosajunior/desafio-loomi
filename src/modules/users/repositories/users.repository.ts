import { FindUserByEmailDTO } from '../dtos/findUserByEmailAndPassword.dto';
import { PrismaClient } from '@prisma/client';

export class UserRepository {
  prisma = new PrismaClient();

  async findUserByEmail(data: FindUserByEmailDTO) {
    return await this.prisma.user.findUniqueOrThrow({
      where: {
        email: data.email,
      },
    });
  }
}
