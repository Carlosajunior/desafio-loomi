import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  UseGuards,
  Request,
  Post,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { AuthGuard } from 'src/modules/authentication/guards/authentication.guard';
import { DeleteUserDTO } from '../dtos/delete-user.dto';
import { UpdateUserDTO } from '../dtos/update-ser.dto';
import { CreateUserDTO } from '../dtos/create-user.dto';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUser() {
    try {
      return 'funcionou';
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @Post()
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    try {
      return await this.usersService.createUser(createUserDTO);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @Patch()
  async updateUser(@Body() updateUserDTO: UpdateUserDTO, @Request() req) {
    try {
      console.log(req.user.type);
      if (req.user.type == 'Cliente') {
        updateUserDTO['id'] = req.user.id;
        return await this.usersService.updateUser(updateUserDTO);
      }
      return await this.usersService.updateUser(updateUserDTO);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @Delete()
  async deleteUser(@Body() data: DeleteUserDTO) {
    try {
      return await this.usersService.deleteUser(data);
    } catch (error) {
      return new BadRequestException(error);
    }
  }
}
