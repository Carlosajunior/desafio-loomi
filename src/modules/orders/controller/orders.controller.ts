import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  ValidationPipe,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { CreateOrderDTO } from '../dtos/create-order.dto';
import { SearchOrderDTO } from '../dtos/search-order.dto';
import { UpdateOrderDTO } from '../dtos/update-order.dto';
import { DeleteOrderDTO } from '../dtos/delete-order.dto';
import { GetOrderDTO } from '../dtos/get-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() data: CreateOrderDTO) {
    try {
      return await this.ordersService.createOrder(data);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @Get('search')
  async searchOrders(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query: SearchOrderDTO,
  ) {
    try {
      return await this.ordersService.searchOrder(query);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @Get()
  async detailOrder(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query: GetOrderDTO,
  ) {
    try {
      return await this.ordersService.detailOrder(query);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @Patch()
  async updateOrder(@Body() data: UpdateOrderDTO) {
    try {
      return await this.ordersService.updateOrder(data);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @Delete()
  async deleteOrder(@Body() data: DeleteOrderDTO) {
    try {
      return await this.ordersService.deleteOrder(data);
    } catch (error) {
      return new BadRequestException(error);
    }
  }
}
