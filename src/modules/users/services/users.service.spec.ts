import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRepository } from '../repositories/users.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfirmSingUpDTO } from '../dtos/confirm-sign-up.dto';
import { simpleFaker, faker } from '@faker-js/faker';
import { userType } from '@prisma/client';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { FindUserByEmailDTO } from '../dtos/findUserByEmailAndPassword.dto';
import { SearchUserDTO } from '../dtos/search-user.dto';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { DeleteUserDTO } from '../dtos/delete-user.dto';
import { MailService } from '../../email-service/email-service';

describe('service', () => {
  let service: UsersService;
  let usersRepository: UserRepository;

  const mockUserRepository = () => ({});
  const mockMailerService = () => ({});
  const mockUser = {
    id: simpleFaker.string.uuid(),
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    type: userType.Administrador,
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
    status: faker.datatype.boolean(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UserRepository, useFactory: mockUserRepository },
        { provide: MailService, useFactory: mockMailerService },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<UserRepository>(UserRepository);
  });

  describe('confirmSignUp', () => {
    const data: ConfirmSingUpDTO = {
      id: simpleFaker.string.uuid(),
    };

    it('should confirm sign up', async () => {
      usersRepository.confirmSignUp = jest.fn().mockResolvedValue(mockUser);

      const result = await service.confirmSignUp(data);
      expect(result).toEqual(mockUser);
    });

    it('should handle error and return NotAcceptableException', async () => {
      const mockError = new Error('Error message');
      usersRepository.confirmSignUp = jest.fn().mockRejectedValue(mockError);

      const result = await service.confirmSignUp(data);
      expect(result).toBeInstanceOf(NotAcceptableException);
    });
  });

  describe('createUser', () => {
    const data: CreateUserDTO = {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      type: userType.Administrador,
    };

    it('should create user and send confirmation email', async () => {
      usersRepository.findUserByEmail = jest.fn().mockResolvedValue(null);
      usersRepository.createUser = jest.fn().mockResolvedValue(mockUser);
      service.sendConfirmationEmail = jest.fn().mockResolvedValue(null);

      const result = await service.createUser(data);
      expect(result).toEqual(
        'Confirme o cadastro acessando o link que foi enviado para o e-mail informado.',
      );
    });

    it('should handle error and return NotAcceptableException', async () => {
      const mockError = new Error('Error message');
      usersRepository.findUserByEmail = jest.fn().mockRejectedValue(mockError);

      const result = await service.createUser(data);
      expect(result).toBeInstanceOf(NotAcceptableException);
    });
  });

  describe('searchUserByEmail', () => {
    const data: FindUserByEmailDTO = {
      email: faker.internet.email(),
    };

    it('should search user by email', async () => {
      usersRepository.findUserByEmail = jest.fn().mockResolvedValue(mockUser);

      const result = await service.searchUserByEmail(data);
      expect(result).toEqual(mockUser);
    });

    it('should handle error and return NotFoundException', async () => {
      const mockError = new Error('Error message');
      usersRepository.findUserByEmail = jest.fn().mockRejectedValue(mockError);

      const result = await service.searchUserByEmail(data);
      expect(result).toBeInstanceOf(NotFoundException);
    });
  });

  describe('searchUsers', () => {
    const data: SearchUserDTO = {
      page: faker.number.int(),
      records_per_page: faker.number.int(),
    };

    it('should search users', async () => {
      usersRepository.listUsers = jest
        .fn()
        .mockResolvedValue({ users: [mockUser] });

      const result = await service.searchUsers(data);
      expect(result).toEqual({ users: [mockUser] });
    });

    it('should handle error and return NotFoundException', async () => {
      const mockError = new Error('Error message');
      usersRepository.listUsers = jest.fn().mockRejectedValue(mockError);

      const result = await service.searchUsers(data);
      expect(result).toBeInstanceOf(NotFoundException);
    });
  });

  describe('updateUser', () => {
    const data: UpdateUserDTO = {
      id: simpleFaker.string.uuid(),
      email: faker.internet.email(),
    };

    it('should update user', async () => {
      usersRepository.findUserByEmail = jest.fn().mockResolvedValue(null);
      usersRepository.updateUserById = jest.fn().mockResolvedValue(mockUser);

      const result = await service.updateUser(data);
      expect(result).toEqual(mockUser);
    });

    it('should handle error and return NotAcceptableException', async () => {
      const mockError = new Error('Error message');
      usersRepository.findUserByEmail = jest.fn().mockRejectedValue(mockError);

      const result = await service.updateUser(data);
      expect(result).toBeInstanceOf(NotAcceptableException);
    });
  });

  describe('deleteUser', () => {
    const data: DeleteUserDTO = {
      id: simpleFaker.string.uuid(),
    };

    it('should delete user', async () => {
      usersRepository.deleteUserById = jest.fn().mockResolvedValue(mockUser);
      const result = await service.deleteUser(data);
      expect(result).toEqual(mockUser);
    });

    it('should handle error and return NotAcceptableException', async () => {
      const mockError = new Error('Error message');
      usersRepository.deleteUserById = jest.fn().mockRejectedValue(mockError);

      const result = await service.updateUser(data);
      expect(result).toBeInstanceOf(NotAcceptableException);
    });
  });
});
