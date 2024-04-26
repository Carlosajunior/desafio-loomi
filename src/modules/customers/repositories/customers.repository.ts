import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateCustomerDTO } from '../dtos/create-customer.dto';
import { SearchCustomerByNameDTO } from '../dtos/search-customer-by-name.dto';
import { UpdateCustomerDTO } from '../dtos/update-customer-client.dto';
import { DeleteCustomerDTO } from '../dtos/delete-customer.dto';
import { UpdateCustomerAsAdminDTO } from '../dtos/update-customer-as-admin.dto';

@Injectable()
export class CustomersRepository {
  prisma = new PrismaClient();

  async createCustomer(data: CreateCustomerDTO, user_id: string) {
    try {
      return await this.prisma.customer.create({
        data: {
          address: data.address,
          contact: data.contact,
          fullName: data.fullName,
          user: {
            connect: {
              id: user_id,
            },
          },
        },
      });
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async searchCustomerByName(data: SearchCustomerByNameDTO) {
    try {
      return await this.prisma.customer.findMany({
        where: { fullName: { startsWith: data.fullName, mode: 'insensitive' } },
      });
    } catch (error) {
      return new NotFoundException(error);
    }
  }

  async updateCustomerAsAdmin(data: UpdateCustomerAsAdminDTO) {
    try {
      const { id, ...parameters } = data;
      return await this.prisma.customer.update({
        where: {
          id: id,
        },
        data: {
          ...parameters,
        },
      });
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async updateCustomer(data: UpdateCustomerDTO, user_id: string) {
    try {
      return await this.prisma.customer.update({
        where: {
          userId: user_id,
        },
        data: data,
      });
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async deleteCustomer(data: DeleteCustomerDTO) {
    try {
      return await this.prisma.customer.delete({ where: { id: data.id } });
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }
}
