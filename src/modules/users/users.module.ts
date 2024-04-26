import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { UserRepository } from './repositories/users.repository';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../email-service/email-service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, JwtService, MailService],
})
export class UsersModule {}
