import { NotAcceptableException } from '@nestjs/common';
import { GetOrderItemDTO } from '../dtos/get-order-item.dto';
import { OrderItem, PrismaClient } from '@prisma/client';
import { CreateOrderItemDTO } from '../dtos/create-order-item.dto';
import { DeleteOrderItemDTO } from '../dtos/delete-order-item.dto';
import { UpdateOrderItemDTO } from '../dtos/update-order-item.dto';

export class OrderItemsRepository {
  prisma = new PrismaClient();

  async createOrderItem(
    data: CreateOrderItemDTO,
    unitPrice: number,
    subtotal: number,
  ) {
    try {
      return await this.prisma.orderItem.create({
        data: {
          order: {
            connect: {
              id: data.orderId,
            },
          },
          product: {
            connect: {
              id: data.productId,
            },
          },
          quantity: data.quantity,
          unitPrice: unitPrice,
          subtotal: subtotal,
        },
      });
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async listOrderItems(OrderItemsSQLQuery: string) {
    try {
      const OrderItems =
        await this.prisma.$queryRawUnsafe<OrderItem[]>(OrderItemsSQLQuery);
      return { OrderItems };
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async detailOrderItem(data: GetOrderItemDTO) {
    try {
      return await this.prisma.orderItem.findUnique({ where: { id: data.id } });
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async updateOrderItem(data: UpdateOrderItemDTO) {
    try {
      const { id, ...parameters } = data;
      return await this.prisma.orderItem.update({
        where: {
          id: id,
        },
        data: { ...parameters },
      });
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async deleteOrderItem(data: DeleteOrderItemDTO) {
    try {
      return await this.prisma.orderItem.delete({ where: { id: data.id } });
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }
}
