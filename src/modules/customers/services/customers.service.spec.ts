import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { simpleFaker, faker } from '@faker-js/faker';
import { CustomersService } from './customers.service';
import { CustomersRepository } from '../repositories/customers.repository';
import { UsersService } from '../../users/services/users.service';
import { UserRepository } from '../../users/repositories/users.repository';
import { CreateCustomerDTO } from '../dtos/create-customer.dto';
import { GetCustomerDTO } from '../dtos/get-customer.dto';
import { SearchCustomerDTO } from '../dtos/search-customer.dto';
import { UpdateCustomerDTO } from '../dtos/update-customer-client.dto';
import { DeleteCustomerDTO } from '../dtos/delete-customer.dto';
import { MailService } from '../../email-service/email-service';

describe('service', () => {
  let service: CustomersService;
  let userService: UsersService;
  let customersRepository: CustomersRepository;

  const mockCustomersRepository = () => ({});
  const mockUserRepository = () => ({});
  const mockMailerService = () => ({});

  const mockCustomer = {
    id: simpleFaker.string.uuid(),
    name: faker.person.firstName(),
    description: faker.string.sample(),
    price: faker.number.int(),
    stockQuantity: faker.number.int(),
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        UsersService,
        { provide: CustomersRepository, useFactory: mockCustomersRepository },
        { provide: UserRepository, useFactory: mockUserRepository },
        { provide: MailService, useFactory: mockMailerService },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
    userService = module.get<UsersService>(UsersService);
    customersRepository = module.get<CustomersRepository>(CustomersRepository);
  });

  describe('createCustomer', () => {
    const data: CreateCustomerDTO = {
      fullName: faker.person.firstName(),
      contact: faker.string.sample(),
      address: faker.string.sample(),
    };

    it('should create a customer', async () => {
      customersRepository.createCustomer = jest
        .fn()
        .mockResolvedValue(mockCustomer);

      const result = await service.createCustomer(
        data,
        simpleFaker.string.uuid(),
      );
      expect(result).toEqual(mockCustomer);
    });

    it('should handle error and return NotAcceptableException', async () => {
      const mockError = new Error('Error message');
      customersRepository.createCustomer = jest
        .fn()
        .mockRejectedValue(mockError);

      const result = await service.createCustomer(
        data,
        simpleFaker.string.uuid(),
      );
      expect(result).toBeInstanceOf(NotAcceptableException);
    });
  });

  describe('detailCustomer', () => {
    const data: GetCustomerDTO = {
      id: simpleFaker.string.uuid(),
    };

    it('should return a customer', async () => {
      customersRepository.detailCustomer = jest
        .fn()
        .mockResolvedValue(mockCustomer);

      const result = await service.detailCustomer(data);
      expect(result).toEqual(mockCustomer);
    });

    it('should handle error and return NotFoundException', async () => {
      const mockError = new Error('Error message');
      customersRepository.detailCustomer = jest
        .fn()
        .mockRejectedValue(mockError);

      const result = await service.detailCustomer(data);
      expect(result).toBeInstanceOf(NotFoundException);
    });
  });

  describe('searchCustomers', () => {
    const data: SearchCustomerDTO = {
      page: faker.number.int(),
      records_per_page: faker.number.int(),
    };

    it('should search customers', async () => {
      customersRepository.listCustomers = jest
        .fn()
        .mockResolvedValue({ customers: [mockCustomer] });

      const result = await service.searchCustomers(data);
      expect(result).toEqual({ customers: [mockCustomer] });
    });

    it('should handle error and return NotFoundException', async () => {
      const mockError = new Error('Error message');
      customersRepository.listCustomers = jest
        .fn()
        .mockRejectedValue(mockError);

      const result = await service.searchCustomers(data);
      expect(result).toBeInstanceOf(NotFoundException);
    });
  });

  describe('updateCustomer', () => {
    const data: UpdateCustomerDTO = {
      fullName: faker.person.firstName(),
    };

    it('should update a customer', async () => {
      customersRepository.updateCustomer = jest
        .fn()
        .mockResolvedValue(mockCustomer);

      const result = await service.updateCustomer(
        data,
        simpleFaker.string.uuid(),
      );
      expect(result).toEqual(mockCustomer);
    });

    it('should handle error and return NotAcceptableException', async () => {
      const mockError = new Error('Error message');
      customersRepository.updateCustomer = jest
        .fn()
        .mockRejectedValue(mockError);

      const result = await service.updateCustomer(
        data,
        simpleFaker.string.uuid(),
      );
      expect(result).toBeInstanceOf(NotAcceptableException);
    });
  });

  describe('deleteCustomer', () => {
    const data: DeleteCustomerDTO = {
      userId: simpleFaker.string.uuid(),
    };

    it('should delete a customer', async () => {
      customersRepository.findCustomerByUserId = jest
        .fn()
        .mockResolvedValue(mockCustomer);
      customersRepository.deleteCustomer = jest
        .fn()
        .mockResolvedValue(mockCustomer);
      userService.deleteUser = jest.fn().mockResolvedValue(null);
      const result = await service.deleteCustomer(data);
      expect(result).toEqual(mockCustomer);
    });

    it('should handle error and return NotAcceptableException', async () => {
      const mockError = new Error('Error message');
      customersRepository.deleteCustomer = jest
        .fn()
        .mockRejectedValue(mockError);

      const result = await service.deleteCustomer(data);
      expect(result).toBeInstanceOf(NotAcceptableException);
    });
  });
});
