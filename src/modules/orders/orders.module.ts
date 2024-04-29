import { Module } from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controller/orders.controller';
import { OrdersRepository } from './repositories/order.repository';
import { OrderItemsService } from '../order-items/services/order-items.service';
import { OrderItemsRepository } from '../order-items/repositories/order-items.repository';
import { ProductsRepository } from '../products/repositories/products.repository';
import { ProductsService } from '../products/services/products.service';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrdersRepository,
    OrderItemsService,
    OrderItemsRepository,
    ProductsService,
    ProductsRepository,
  ],
})
export class OrdersModule {}
