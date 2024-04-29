import { Module } from '@nestjs/common';
import { CustomersService } from './services/customers.service';
import { CustomersController } from './controllers/customers.controller';
import { CustomersRepository } from './repositories/customers.repository';
import { UserRepository } from '../users/repositories/users.repository';
import { UsersService } from '../users/services/users.service';
import { MailService } from '../email-service/email-service';

@Module({
  controllers: [CustomersController],
  providers: [
    CustomersService,
    CustomersRepository,
    UsersService,
    UserRepository,
    MailService,
  ],
})
export class CustomersModule {}
