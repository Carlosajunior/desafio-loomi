import { Test, TestingModule } from '@nestjs/testing';
import { simpleFaker, faker } from '@faker-js/faker';
import { userType } from '@prisma/client';
import { AuthenticationService } from './authentication.service';
import { UserRepository } from '../../users/repositories/users.repository';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from '../dtos/login.dto';
import { NotAcceptableException, NotFoundException } from '@nestjs/common';

describe('service', () => {
  let service: AuthenticationService;
  let usersRepository: UserRepository;
  let jwtService: JwtService;

  const mockUserRepository = () => ({});
  const mockJwtService = () => ({});

  const mockUser = {
    id: simpleFaker.string.uuid(),
    name: faker.person.firstName(),
    email: 'email@email.com',
    password: '$2a$10$DhPRkfLE7rQEW42Pk6al2OCIItcPPi6UA3puVjpk.LC7lZ5LIAGV2',
    type: userType.Administrador,
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
    status: true,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        { provide: UserRepository, useFactory: mockUserRepository },
        { provide: JwtService, useFactory: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthenticationService>(AuthenticationService);
    usersRepository = module.get<UserRepository>(UserRepository);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('validateUser', () => {
    const loginData: LoginDTO = {
      email: 'email@email.com',
      password: 'senha123',
    };

    it('should validate user successfully and return token', async () => {
      usersRepository.findUserByEmail = jest.fn().mockResolvedValue(mockUser);
      jwtService.sign = jest.fn().mockReturnValue('mockedToken');
      expect(await service.validateUser(loginData)).toEqual({
        token: 'mockedToken',
      });
    });

    it('should throw NotFoundException if user is not found', async () => {
      usersRepository.findUserByEmail = jest.fn().mockResolvedValue(null);
      expect(await service.validateUser(loginData)).toBeInstanceOf(
        NotFoundException,
      );
    });

    it('should throw NotAcceptableException if user status is false', async () => {
      const mockUserFalse = {
        id: simpleFaker.string.uuid(),
        name: faker.person.firstName(),
        email: 'email@email.com',
        password:
          '$2a$10$DhPRkfLE7rQEW42Pk6al2OCIItcPPi6UA3puVjpk.LC7lZ5LIAGV2',
        type: userType.Administrador,
        createdAt: faker.date.anytime(),
        updatedAt: faker.date.anytime(),
        status: false,
      };

      usersRepository.findUserByEmail = jest
        .fn()
        .mockResolvedValue(mockUserFalse);
      expect(await service.validateUser(loginData)).toBeInstanceOf(
        NotAcceptableException,
      );
    });

    it('should throw NotAcceptableException if password is incorrect', async () => {
      const mockUser = {
        id: simpleFaker.string.uuid(),
        name: faker.person.firstName(),
        email: 'email@email.com',
        password:
          '$2a$10$DhPRkfLE7rQEW42Pk6al2OCIItcPPi6UA3puVjpk.LC7lZ5LIAGV2',
        type: userType.Administrador,
        createdAt: faker.date.anytime(),
        updatedAt: faker.date.anytime(),
        status: true,
      };

      const loginData: LoginDTO = {
        email: 'email@email.com',
        password: 'senha13',
      };

      usersRepository.findUserByEmail = jest.fn().mockResolvedValue(mockUser);
      expect(await service.validateUser(loginData)).toBeInstanceOf(
        NotAcceptableException,
      );
    });
  });
});
