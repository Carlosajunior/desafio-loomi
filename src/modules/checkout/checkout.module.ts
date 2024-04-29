import { Module } from '@nestjs/common';
import { CheckoutService } from './services/checkout.service';
import { CheckoutController } from './controllers/checkout.controller';
import { HttpModule } from '@nestjs/axios';
import { OrdersService } from '../orders/services/orders.service';
import { OrderItemsService } from '../order-items/services/order-items.service';
import { ProductsService } from '../products/services/products.service';
import { OrdersRepository } from '../orders/repositories/order.repository';
import { OrderItemsRepository } from '../order-items/repositories/order-items.repository';
import { ProductsRepository } from '../products/repositories/products.repository';

@Module({
  imports: [HttpModule],
  controllers: [CheckoutController],
  providers: [
    CheckoutService,
    OrdersService,
    OrderItemsService,
    ProductsService,
    OrdersRepository,
    OrderItemsRepository,
    ProductsRepository,
  ],
})
export class CheckoutModule {}
