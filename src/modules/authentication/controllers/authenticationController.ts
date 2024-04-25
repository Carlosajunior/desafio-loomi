import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import { IsPublic } from '../decorators/is-public.decorator';
import { LoginDTO } from '../dtos/login.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @IsPublic()
  @Post('login')
  async userLogin(@Body() data: LoginDTO) {
    try {
      return await this.authenticationService.validateUser(data);
    } catch (error) {
      return new BadRequestException(error);
    }
  }
}
