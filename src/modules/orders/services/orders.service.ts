import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { OrdersRepository } from '../repositories/order.repository';
import { CreateOrderDTO } from 'src/modules/Orders/dtos/create-Order.dto';
import { GetOrderDTO } from '../dtos/get-order.dto';
import { UpdateOrderDTO } from '../dtos/update-order.dto';
import { DeleteOrderDTO } from '../dtos/delete-order.dto';
import { SearchOrderDTO } from '../dtos/search-order.dto';
import { OrderItemsService } from 'src/modules/order-items/services/order-items.service';
import { Order } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly orderItemsService: OrderItemsService,
  ) {}

  async createOrder(data: CreateOrderDTO) {
    try {
      const order = await this.ordersRepository.createOrder(data);
      await this.orderItemsService.createOrderItem({
        orderId: (order as unknown as Order).id,
        productId: data.productId,
        quantity: data.quantity,
      });
      return order;
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async detailOrder(data: GetOrderDTO) {
    try {
      return await this.ordersRepository.detailOrder(data);
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async searchOrder(data: SearchOrderDTO) {
    try {
      let OrderSQLQuery: string = `SELECT * FROM "Order"`;
      const conditions: string[] = [];

      if (data.clientId) conditions.push(`"clientId" = '${data.clientId}'`);
      if (data.total) conditions.push(`"total" = '${data.total}'`);
      if (data.orderStatus)
        conditions.push(`"orderStatus" = '${data.orderStatus}'`);
      if (data.date_start && data.date_end)
        conditions.push(
          `"created_at" BETWEEN '${data.date_start}' AND '${data.date_end}'`,
        );
      if (conditions.length > 0) {
        OrderSQLQuery += ' WHERE ' + conditions.join(' AND ');
      }

      OrderSQLQuery =
        OrderSQLQuery +
        ` LIMIT ${data.records_per_page} OFFSET ${(data.page - 1) * data.records_per_page}`;
      return await this.ordersRepository.listorders(OrderSQLQuery);
    } catch (error) {
      return new NotFoundException(error);
    }
  }

  async updateOrder(data: UpdateOrderDTO) {
    try {
      return await this.ordersRepository.updateOrder(data);
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async deleteOrder(data: DeleteOrderDTO) {
    try {
      return await this.ordersRepository.deleteOrder(data);
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }
}
