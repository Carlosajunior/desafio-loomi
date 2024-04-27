import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { CustomersService } from '../services/customers.service';
import { CreateCustomerDTO } from '../dtos/create-customer.dto';
import { SearchCustomerDTO } from '../dtos/search-customer.dto';
import { UpdateCustomerDTO } from '../dtos/update-customer-client.dto';
import { DeleteCustomerDTO } from '../dtos/delete-customer.dto';
import { AuthGuard } from 'src/modules/authentication/guards/authentication.guard';
import { UpdateCustomerAsAdminDTO } from '../dtos/update-customer-as-admin.dto';
import { GetCustomerDTO } from '../dtos/get-customer.dto';

@Controller('customers')
@UseGuards(AuthGuard)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  async createCustomer(@Body() data: CreateCustomerDTO, @Request() req) {
    try {
      return await this.customersService.createCustomer(data, req.user.id);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @Get()
  async getCustomer(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query: GetCustomerDTO,
  ) {
    try {
      return await this.customersService.detailCustomer(query);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @Get('search')
  async searchCustomer(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query: SearchCustomerDTO,
  ) {
    try {
      return await this.customersService.searchCustomers(query);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @Patch()
  async updateCustomer(@Body() data: UpdateCustomerDTO, @Request() req) {
    try {
      return await this.customersService.updateCustomer(data, req.user.id);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @Patch('admin')
  async updateCustomerAsAdmin(@Body() data: UpdateCustomerAsAdminDTO) {
    try {
      return await this.customersService.updateCustomerAsAdmin(data);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @Delete()
  async deleteCustomer(@Request() req) {
    try {
      return await this.customersService.deleteCustomer({ id: req.user.id });
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @Delete('admin')
  async deleteCustomerAsAdmin(@Body() data: DeleteCustomerDTO) {
    try {
      return await this.customersService.deleteCustomer(data);
    } catch (error) {
      return new BadRequestException(error);
    }
  }
}
