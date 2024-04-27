import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Patch,
  UseGuards,
  Request,
  Post,
  Query,
  ValidationPipe,
  Get,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { AuthGuard } from 'src/modules/authentication/guards/authentication.guard';
import { DeleteUserDTO } from '../dtos/delete-user.dto';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { UpdateUserAsClientDTO } from '../dtos/update-user-as-client.dto';
import { CreateUserAsClientDTO } from '../dtos/create-user-as-client.dto';
import { userType } from '@prisma/client';
import { ConfirmSingUpDTO } from '../dtos/confirm-singn-up.dto';
import { IsPublic } from 'src/modules/authentication/decorators/is-public.decorator';
import { SearchUserDTO } from '../dtos/search-user.dto';
import { FindUserByEmailDTO } from '../dtos/findUserByEmailAndPassword.dto';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @IsPublic()
  @Get('confirm-signup')
  async confirmSignUp(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    data: ConfirmSingUpDTO,
  ) {
    try {
      await this.usersService.confirmSignUp(data);
      return 'Cadastro confirmado.';
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @Post('admin')
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    try {
      return await this.usersService.createUser(createUserDTO);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @Post()
  async createUserAsClient(
    @Body() createUserAsClientDTO: CreateUserAsClientDTO,
  ) {
    try {
      return await this.usersService.createUser({
        ...createUserAsClientDTO,
        type: userType.Cliente,
      });
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @Get()
  async searchUserByEmail(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query: FindUserByEmailDTO,
  ) {
    try {
      return await this.usersService.searchUserByEmail(query);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @Get('search')
  async searchUser(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query: SearchUserDTO,
  ) {
    try {
      return await this.usersService.searchUsers(query);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @Patch()
  async updateUser(
    @Body() updateUserAsClientDTO: UpdateUserAsClientDTO,
    @Request() req,
  ) {
    try {
      return await this.usersService.updateUser({
        ...updateUserAsClientDTO,
        id: req.user.id,
      });
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @Patch('admin')
  async updateUserAsAdmin(@Body() updateUserDTO: UpdateUserDTO) {
    try {
      return await this.usersService.updateUser(updateUserDTO);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @Delete()
  async deleteUser(@Request() req) {
    try {
      return await this.usersService.deleteUser({ id: req.user.id });
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @Delete('admin')
  async deleteUserAsAdmin(@Body() data: DeleteUserDTO) {
    try {
      return await this.usersService.deleteUser(data);
    } catch (error) {
      return new BadRequestException(error);
    }
  }
}
