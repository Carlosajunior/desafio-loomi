import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { OrderItemsService } from '../services/order-items.service';
import { CreateOrderItemDTO } from '../dtos/create-order-item.dto';
import { SearchOrderItemDTO } from '../dtos/search-order-item.dto';
import { GetOrderItemDTO } from '../dtos/get-order-item.dto';
import { UpdateOrderItemDTO } from '../dtos/update-order-item.dto';
import { DeleteOrderItemDTO } from '../dtos/delete-order-item.dto';

@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Post()
  async createOrderItem(@Body() data: CreateOrderItemDTO) {
    try {
      return await this.orderItemsService.createOrderItem(data);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @Get('search')
  async searchOrderItems(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query: SearchOrderItemDTO,
  ) {
    try {
      return await this.orderItemsService.searchOrderItem(query);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @Get()
  async detailOrderItem(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query: GetOrderItemDTO,
  ) {
    try {
      return await this.orderItemsService.detailOrderItem(query);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @Patch()
  async updateOrderItem(@Body() data: UpdateOrderItemDTO) {
    try {
      return await this.orderItemsService.updateOrderItem(data);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @Delete()
  async deleteOrderItem(@Body() data: DeleteOrderItemDTO) {
    try {
      return await this.orderItemsService.deleteOrderItem(data);
    } catch (error) {
      return new BadRequestException(error);
    }
  }
}
