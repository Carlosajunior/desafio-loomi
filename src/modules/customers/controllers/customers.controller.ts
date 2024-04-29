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
  Request,
} from '@nestjs/common';
import { CustomersService } from '../services/customers.service';
import { CreateCustomerDTO } from '../dtos/create-customer.dto';
import { SearchCustomerDTO } from '../dtos/search-customer.dto';
import { UpdateCustomerDTO } from '../dtos/update-customer-client.dto';
import { DeleteCustomerDTO } from '../dtos/delete-customer.dto';
import { UpdateCustomerAsAdminDTO } from '../dtos/update-customer-as-admin.dto';
import { GetCustomerDTO } from '../dtos/get-customer.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @ApiOperation({
    summary: `Endpoint to create a new customer, returning it's data.`,
  })
  @Post()
  async createCustomer(@Body() data: CreateCustomerDTO, @Request() req) {
    try {
      return await this.customersService.createCustomer(data, req.user.id);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @ApiOperation({
    summary: `Endpoint retrive a customer's data given it's Id.`,
  })
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

  @ApiOperation({
    summary: `Endpoint to make a search for customers, that's paginated and can receive some of his properties to be used as filters on that search.`,
  })
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

  @ApiOperation({
    summary: `Endpoint to update one or more customer's properties given the new value of the property to be updated, returning the customer's data updated.`,
  })
  @Patch()
  async updateCustomer(@Body() data: UpdateCustomerDTO, @Request() req) {
    try {
      return await this.customersService.updateCustomer(data, req.user.id);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @ApiOperation({
    summary: `Endpoint only accessible to users of type administrator. Allows the administrator to update the data of any customer.`,
  })
  @Patch('admin')
  async updateCustomerAsAdmin(@Body() data: UpdateCustomerAsAdminDTO) {
    try {
      return await this.customersService.updateCustomerAsAdmin(data);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @ApiOperation({
    summary: `Endpoint to remove a customer's data from the database.`,
  })
  @Delete()
  async deleteCustomer(@Request() req) {
    try {
      return await this.customersService.deleteCustomer({ id: req.user.id });
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @ApiOperation({
    summary: `Endpoint only accessible to users of type administrator. Allows the administrator to delete any customer.`,
  })
  @Delete('admin')
  async deleteCustomerAsAdmin(@Body() data: DeleteCustomerDTO) {
    try {
      return await this.customersService.deleteCustomer(data);
    } catch (error) {
      return new BadRequestException(error);
    }
  }
}
