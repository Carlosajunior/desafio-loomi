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
import { SearchCustomerByNameDTO } from '../dtos/search-customer-by-name.dto';
import { UpdateCustomerDTO } from '../dtos/update-customer-client.dto';
import { DeleteCustomerDTO } from '../dtos/delete-customer.dto';
import { AuthGuard } from 'src/modules/authentication/guards/authentication.guard';
import { UpdateCustomerAsAdminDTO } from '../dtos/update-customer-as-admin.dto';

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
  async searchCustomerByName(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query: SearchCustomerByNameDTO,
  ) {
    try {
      return await this.customersService.searchCustomerByName(query);
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
