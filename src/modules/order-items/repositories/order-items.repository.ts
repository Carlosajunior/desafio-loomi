import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { GetOrderItemDTO } from '../dtos/get-order-item.dto';
import { OrderItem, PrismaClient } from '@prisma/client';
import { CreateOrderItemDTO } from '../dtos/create-order-item.dto';
import { DeleteOrderItemDTO } from '../dtos/delete-order-item.dto';
import { UpdateOrderItemDTO } from '../dtos/update-order-item.dto';
import { ListOrderItemsByOrderId } from '../dtos/list-order-items-by-order-id.dto';

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

  async listOrderItemsByOrderId(data: ListOrderItemsByOrderId) {
    try {
      return await this.prisma.orderItem.findMany({
        where: {
          orderId: data.orderId,
        },
      });
    } catch (error) {
      return new NotFoundException(error);
    }
  }

  async detailOrderItem(data: GetOrderItemDTO) {
    try {
      return await this.prisma.orderItem.findUnique({ where: { id: data.id } });
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async updateOrderItem(data: UpdateOrderItemDTO, subtotal: number) {
    try {
      return await this.prisma.orderItem.update({
        where: {
          id: data.id,
        },
        data: { quantity: data.quantity, subtotal: subtotal },
      });
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async updateOrderItemSubtotal(id: string, subtotal: number) {
    try {
      return await this.prisma.orderItem.update({
        where: {
          id: id,
        },
        data: { subtotal: subtotal },
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
