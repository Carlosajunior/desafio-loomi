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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({
    summary: `Endpoint to create a new order, returning it's data, also creates a new order item for this order.`,
  })
  @Post()
  async createOrder(@Body() data: CreateOrderDTO) {
    try {
      return await this.ordersService.createOrder(data);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @ApiOperation({
    summary: `Endpoint accesible to administrators only, to make a search for orders, that's paginated and can receive some of his properties to be used as filters on that search.`,
  })
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

  @ApiOperation({
    summary: `Endpoint accesible to administrators only, retrive a order's data given it's Id.`,
  })
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

  @ApiOperation({
    summary: `Endpoint accesible to administrators only, to update one or more order's properties given the new value of the property to be updated, returning the order's data updated.`,
  })
  @Patch()
  async updateOrder(@Body() data: UpdateOrderDTO) {
    try {
      return await this.ordersService.updateOrder(data);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @ApiOperation({
    summary: `Endpoint accesible to administrators only, to remove a order's data from the database, also deletes any order item of this order.`,
  })
  @Delete()
  async deleteOrder(@Body() data: DeleteOrderDTO) {
    try {
      return await this.ordersService.deleteOrder(data);
    } catch (error) {
      return new BadRequestException(error);
    }
  }
}
