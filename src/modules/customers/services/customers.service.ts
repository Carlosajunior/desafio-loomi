import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CustomersRepository } from '../repositories/customers.repository';
import { CreateCustomerDTO } from '../dtos/create-customer.dto';
import { SearchCustomerByNameDTO } from '../dtos/search-customer-by-name.dto';
import { UpdateCustomerDTO } from '../dtos/update-customer-client.dto';
import { DeleteCustomerDTO } from '../dtos/delete-customer.dto';
import { CustomerModel } from '../models/customer.model';
import { UpdateCustomerAsAdminDTO } from '../dtos/update-customer-as-admin.dto';

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

  async searchCustomerByName(data: SearchCustomerByNameDTO) {
    try {
      const customers =
        await this.customersRepository.searchCustomerByName(data);
      if ((customers as unknown as Array<CustomerModel>).length < 1)
        return new NotFoundException(
          'Não há clientes como esse nome cadastrados. ',
        );
      return { customers };
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
