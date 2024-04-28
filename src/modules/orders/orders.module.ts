import { Module } from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controller/orders.controller';
import { JwtService } from '@nestjs/jwt';
import { OrdersRepository } from './repositories/order.repository';
import { OrderItemsService } from '../order-items/services/order-items.service';
import { OrderItemsRepository } from '../order-items/repositories/order-items.repository';
import { ProductsRepository } from '../products/repositories/products.repository';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    JwtService,
    OrdersRepository,
    OrderItemsService,
    OrderItemsRepository,
    ProductsRepository,
  ],
})
export class OrdersModule {}
