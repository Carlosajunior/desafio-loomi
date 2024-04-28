import { NotAcceptableException } from '@nestjs/common';
import { Order, PrismaClient } from '@prisma/client';
import { CreateOrderDTO } from '../dtos/create-order.dto';
import { DeleteOrderDTO } from '../dtos/delete-order.dto';
import { UpdateOrderDTO } from '../dtos/update-order.dto';
import { GetOrderDTO } from '../dtos/get-order.dto';

export class OrdersRepository {
  prisma = new PrismaClient();

  async createOrder(data: CreateOrderDTO) {
    try {
      return await this.prisma.order.create({
        data: {
          client: {
            connect: {
              id: data.clientId,
            },
          },
          total: 0,
        },
      });
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async listorders(ordersSQLQuery: string) {
    try {
      const orders = await this.prisma.$queryRawUnsafe<Order[]>(ordersSQLQuery);
      return { orders };
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async detailOrder(data: GetOrderDTO) {
    try {
      return await this.prisma.order.findUnique({ where: { id: data.id } });
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async updateOrder(data: UpdateOrderDTO) {
    try {
      const { id, ...parameters } = data;
      return await this.prisma.order.update({
        where: {
          id: id,
        },
        data: { ...parameters },
      });
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async deleteOrder(data: DeleteOrderDTO) {
    try {
      return await this.prisma.order.delete({ where: { id: data.id } });
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }
}
