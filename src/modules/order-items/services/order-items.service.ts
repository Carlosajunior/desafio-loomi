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
      const unitPrice = (await this.calculateSubtotal(
        data.productId,
      )) as unknown as number;
      const subtotal = data.quantity * unitPrice;
      const orderItem = (await this.orderItemsRepository.createOrderItem(
        data,
        unitPrice,
        subtotal,
      )) as unknown as OrderItem;
      await this.updateOrderTotal({
        productId: orderItem.productId,
        quantity: orderItem.quantity,
        orderId: orderItem.orderId,
      });
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
      let orderItemSQLQuery = `SELECT * FROM "orderItem"`;
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
      if (data.quantity) {
        this.updateOrderTotal(data);
      }

      if (data.quantity == 0) this.deleteOrderItem({ id: data.id });

      return await this.orderItemsRepository.updateOrderItem(data);
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async deleteOrderItem(data: DeleteOrderItemDTO) {
    try {
      const orderId = (
        (await this.orderItemsRepository.detailOrderItem({
          id: data.id,
        })) as unknown as OrderItem
      ).orderId;

      const result = await this.orderItemsRepository.deleteOrderItem(data);

      const orderItemsNumber = (
        (await this.searchOrderItem({
          orderId: orderId,
        })) as unknown as OrderItem[]
      ).length;

      if (orderItemsNumber == 0)
        await this.orderRepository.deleteOrder({ id: orderId });
      else {
        const orderItem = (await this.detailOrderItem({
          id: data.id,
        })) as unknown as OrderItem;

        await this.updateOrderTotal({
          productId: orderItem.productId,
          quantity: orderItem.quantity,
          orderId: orderItem.orderId,
        });
      }
      return result;
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  private async calculateSubtotal(productId: string) {
    try {
      const unitPrice = parseFloat(
        (
          (await this.productsRepository.detailProduct({
            id: productId,
          })) as unknown as Product
        ).price.toString(),
      );
      return unitPrice;
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  private async updateOrderTotal(data: {
    id?: string;
    productId?: string;
    quantity?: number;
    orderId?: string;
  }) {
    try {
      let productId;

      if (!data.productId) {
        productId = (
          (await this.detailOrderItem({
            id: data.id,
          })) as unknown as OrderItem
        ).productId;
      } else {
        productId = data.productId;
      }

      const unitPrice = (await this.calculateSubtotal(
        productId,
      )) as unknown as number;

      const subtotal = data.quantity * unitPrice;

      let orderId: string;
      let quantity: number;

      if (!data.orderId) {
        const orderItem = (await this.orderItemsRepository.detailOrderItem({
          id: data.id,
        })) as unknown as OrderItem;
        orderId = orderItem.orderId;
        quantity = orderItem.quantity;
      } else {
        orderId = data.orderId;
      }

      let total = parseFloat(
        (
          (await this.orderRepository.detailOrder({
            id: orderId,
          })) as unknown as Order
        ).total.toString(),
      );

      data.quantity > quantity
        ? (total = total + subtotal)
        : (total = total - subtotal);

      await this.orderRepository.updateOrder({
        id: orderId,
        total: total,
      });
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }
}
