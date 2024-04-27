import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CustomersRepository } from '../repositories/customers.repository';
import { CreateCustomerDTO } from '../dtos/create-customer.dto';
import { UpdateCustomerDTO } from '../dtos/update-customer-client.dto';
import { DeleteCustomerDTO } from '../dtos/delete-customer.dto';
import { UpdateCustomerAsAdminDTO } from '../dtos/update-customer-as-admin.dto';
import { GetCustomerDTO } from '../dtos/get-customer.dto';
import { SearchCustomerDTO } from '../dtos/search-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private readonly customersRepository: CustomersRepository) {}

  async createCustomer(data: CreateCustomerDTO, user_id: string) {
    try {
      return await this.customersRepository.createCustomer(data, user_id);
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async detailCustomer(data: GetCustomerDTO) {
    try {
      return await this.customersRepository.detailCustomer(data);
    } catch (error) {
      return new NotFoundException(error);
    }
  }

  async searchCustomers(data: SearchCustomerDTO) {
    try {
      let customersSQLQuery = `SELECT * FROM "Customer"`;
      const conditions: string[] = [];

      if (data.fullName)
        conditions.push(`LOWER("fullName") LIKE LOWER('${data.fullName}%')`);
      if (data.contact) {
        conditions.push(`LOWER("contact") LIKE LOWER('%${data.contact}%')`);
      }
      if (data.address) conditions.push(`"address" = ${data.address}`);
      if (data.date_start && data.date_end)
        conditions.push(
          `"created_at" BETWEEN '${data.date_start}' AND '${data.date_end}'`,
        );

      conditions.push(`"status" = ${data.status}`);

      if (conditions.length > 0)
        customersSQLQuery += ' WHERE ' + conditions.join(' AND ');

      customersSQLQuery =
        customersSQLQuery +
        ` LIMIT ${data.records_per_page} OFFSET ${(data.page - 1) * data.records_per_page}`;

      return await this.customersRepository.listCustomers(customersSQLQuery);
    } catch (error) {
      return new NotFoundException(error);
    }
  }

  async updateCustomer(data: UpdateCustomerDTO, user_id: string) {
    try {
      return await this.customersRepository.updateCustomer(data, user_id);
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async updateCustomerAsAdmin(data: UpdateCustomerAsAdminDTO) {
    try {
      return await this.customersRepository.updateCustomerAsAdmin(data);
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async deleteCustomer(data: DeleteCustomerDTO) {
    try {
      return await this.customersRepository.deleteCustomer(data);
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }
}
