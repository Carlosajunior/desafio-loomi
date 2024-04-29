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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('order-items')
@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @ApiOperation({
    summary: `Endpoint to create a new order item, returning it's data.`,
  })
  @Post()
  async createOrderItem(@Body() data: CreateOrderItemDTO) {
    try {
      return await this.orderItemsService.createOrderItem(data);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @ApiOperation({
    summary: `Endpoint accesible to administrators only, to make a search for order items, that's paginated and can receive some of his properties to be used as filters on that search.`,
  })
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

  @ApiOperation({
    summary: `Endpoint accesible to administrators only, retrive a order item's data given it's Id.`,
  })
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

  @ApiOperation({
    summary: `Endpoint accesible to administrators only, to update one or more order item's properties given the new value of the property to be updated, returning the order item's data updated.`,
  })
  @Patch()
  async updateOrderItem(@Body() data: UpdateOrderItemDTO) {
    try {
      return await this.orderItemsService.updateOrderItem(data);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @ApiOperation({
    summary: `Endpoint accesible to administrators only, to remove a order item's data from the database.`,
  })
  @Delete()
  async deleteOrderItem(@Body() data: DeleteOrderItemDTO) {
    try {
      return await this.orderItemsService.deleteOrderItem(data);
    } catch (error) {
      return new BadRequestException(error);
    }
  }
}
