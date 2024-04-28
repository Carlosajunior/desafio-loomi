import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderItemDTO } from '../dtos/create-order-item.dto';
import { OrderItemsRepository } from '../repositories/order-items.repository';
import { GetOrderItemDTO } from '../dtos/get-order-item.dto';
import { SearchOrderItemDTO } from '../dtos/search-order-item.dto';
import { UpdateOrderItemDTO } from '../dtos/update-order-item.dto';
import { DeleteOrderItemDTO } from '../dtos/delete-order-item.dto';
import { Order, OrderItem, Product } from '@prisma/client';
import { OrdersRepository } from 'src/modules/orders/repositories/order.repository';
import { ProductsRepository } from 'src/modules/products/repositories/products.repository';

@Injectable()
export class OrderItemsService {
  constructor(
    private readonly orderItemsRepository: OrderItemsRepository,
    private readonly productsRepository: ProductsRepository,
    private readonly orderRepository: OrdersRepository,
  ) {}

  async createOrderItem(data: CreateOrderItemDTO) {
    try {
      const unitPrice: number = (await this.getUnitPrice(
        data.productId,
      )) as unknown as number;

      const subtotal: number = unitPrice * data.quantity;

      const orderItem: OrderItem =
        (await this.orderItemsRepository.createOrderItem(
          data,
          unitPrice,
          subtotal,
        )) as unknown as OrderItem;

      await this.updateOrderTotal({
        subtotal: subtotal,
        orderId: data.orderId,
        increase: true,
      });

      return orderItem;
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async detailOrderItem(data: GetOrderItemDTO) {
    try {
      return await this.orderItemsRepository.detailOrderItem(data);
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async searchOrderItem(data: SearchOrderItemDTO) {
    try {
      let orderItemSQLQuery: string = `SELECT * FROM "OrderItem"`;
      const conditions: string[] = [];

      if (data.orderId) conditions.push(`"orderId" = '${data.orderId}'`);
      if (data.productId) conditions.push(`"productId" = '${data.productId}'`);
      if (data.quantity) conditions.push(`"quantity" = ${data.quantity}`);
      if (data.date_start && data.date_end)
        conditions.push(
          `"created_at" BETWEEN '${data.date_start}' AND '${data.date_end}'`,
        );
      if (conditions.length > 0) {
        orderItemSQLQuery += ' WHERE ' + conditions.join(' AND ');
      }

      orderItemSQLQuery =
        orderItemSQLQuery +
        ` LIMIT ${data.records_per_page} OFFSET ${(data.page - 1) * data.records_per_page}`;
      return await this.orderItemsRepository.listOrderItems(orderItemSQLQuery);
    } catch (error) {
      return new NotFoundException(error);
    }
  }

  async updateOrderItem(data: UpdateOrderItemDTO) {
    try {
      const currentOrderItem: OrderItem =
        (await this.orderItemsRepository.detailOrderItem({
          id: data.id,
        })) as unknown as OrderItem;

      if (data.quantity == currentOrderItem.quantity)
        return new NotAcceptableException('Não há alteração nos dados.');

      const unitPrice: number = (await this.getUnitPrice(
        currentOrderItem.productId,
      )) as unknown as number;

      let subtotal: number;
      let increase: boolean;
      let amount: number;

      if (data.quantity < currentOrderItem.quantity) {
        amount = (currentOrderItem.quantity - data.quantity) * unitPrice;
        subtotal = parseFloat(currentOrderItem.subtotal.toString()) - amount;
        increase = false;
      } else if (data.quantity > currentOrderItem.quantity) {
        amount = (data.quantity - currentOrderItem.quantity) * unitPrice;
        subtotal = parseFloat(currentOrderItem.subtotal.toString()) + amount;
        increase = true;
      }

      const orderItem: OrderItem =
        (await this.orderItemsRepository.updateOrderItem(
          data,
          subtotal,
        )) as unknown as OrderItem;

      if (data.quantity == 0) await this.deleteOrderItem({ id: data.id });

      await this.updateOrderTotal({
        orderId: orderItem.orderId,
        increase: increase,
        amount: amount,
      });
      return orderItem;
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async deleteOrderItem(data: DeleteOrderItemDTO) {
    try {
      const orderItem: OrderItem =
        (await this.orderItemsRepository.detailOrderItem({
          id: data.id,
        })) as unknown as OrderItem;

      const result = await this.orderItemsRepository.deleteOrderItem(data);

      const numberOfOrderItemsLeft: number = (
        (await this.searchOrderItem({
          orderId: orderItem.orderId,
          page: 1,
          records_per_page: 10,
        })) as unknown as { OrderItems: Array<OrderItem> }
      ).OrderItems.length;

      if (numberOfOrderItemsLeft == 0)
        await this.orderRepository.deleteOrder({ id: orderItem.orderId });
      else {
        await this.updateOrderTotal({
          subtotal: parseFloat(orderItem.subtotal.toString()),
          orderId: orderItem.orderId,
          increase: false,
        });
      }
      return result;
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  private async getUnitPrice(productId: string) {
    try {
      return parseFloat(
        (
          (await this.productsRepository.detailProduct({
            id: productId,
          })) as unknown as Product
        ).price.toString(),
      );
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  private async updateOrderTotal(data: {
    amount?: number;
    orderId: string;
    subtotal?: number;
    increase: boolean;
  }) {
    try {
      let total: number = parseFloat(
        (
          (await this.orderRepository.detailOrder({
            id: data.orderId,
          })) as unknown as Order
        ).total.toString(),
      );
      if (!data.amount)
        total = data.increase ? total + data.subtotal : total - data.subtotal;
      else total = data.increase ? total + data.amount : total - data.amount;
      return await this.orderRepository.updateOrder({
        id: data.orderId,
        total: total,
      });
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }
}
