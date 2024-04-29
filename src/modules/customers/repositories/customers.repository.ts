import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { Customer, PrismaClient } from '@prisma/client';
import { CreateCustomerDTO } from '../dtos/create-customer.dto';
import { UpdateCustomerDTO } from '../dtos/update-customer-client.dto';
import { DeleteCustomerDTO } from '../dtos/delete-customer.dto';
import { UpdateCustomerAsAdminDTO } from '../dtos/update-customer-as-admin.dto';
import { GetCustomerDTO } from '../dtos/get-customer.dto';

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

  async detailCustomer(data: GetCustomerDTO) {
    try {
      return await this.prisma.customer.findUnique({
        where: { id: data.id },
      });
    } catch (error) {
      return new NotFoundException(error);
    }
  }

  async findCustomerByUserId(data: DeleteCustomerDTO) {
    try {
      return await this.prisma.customer.findUnique({
        where: {
          userId: data.userId,
        },
      });
    } catch (error) {
      return new NotFoundException(error);
    }
  }

  async listCustomers(customersSQLQuery: string) {
    try {
      const customers =
        await this.prisma.$queryRawUnsafe<Customer[]>(customersSQLQuery);
      return { customers };
    } catch (error) {
      return new NotAcceptableException(error);
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

  async deleteCustomer(data: { id: string }) {
    try {
      return await this.prisma.customer.delete({ where: { id: data.id } });
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }
}
