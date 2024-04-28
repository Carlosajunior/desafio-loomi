import { Module } from '@nestjs/common';
import { OrderItemsService } from './services/order-items.service';
import { OrderItemsController } from './controllers/order-items.controller';
import { OrderItemsRepository } from './repositories/order-items.repository';
import { ProductsRepository } from '../products/repositories/products.repository';
import { OrdersRepository } from '../orders/repositories/order.repository';

@Module({
  controllers: [OrderItemsController],
  providers: [
    OrderItemsService,
    OrderItemsRepository,
    ProductsRepository,
    OrdersRepository,
  ],
})
export class OrderItemsModule {}
