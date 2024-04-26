import { Module } from '@nestjs/common';
import { CustomersService } from './services/customers.service';
import { CustomersController } from './controllers/customers.controller';
import { JwtService } from '@nestjs/jwt';
import { CustomersRepository } from './repositories/customers.repository';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService, JwtService, CustomersRepository],
})
export class CustomersModule {}
