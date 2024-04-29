import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import { IsPublic } from '../decorators/is-public.decorator';
import { LoginDTO } from '../dtos/login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('authentication')
@ApiTags('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @ApiOperation({
    summary: `Endpoint to authenticate a user with it's email and password, returning the corresponding token.`,
  })
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
