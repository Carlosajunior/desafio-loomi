import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { LoginDTO } from '../dtos/login.dto';
import { UserRepository } from '../../users/repositories/users.repository';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(data: LoginDTO) {
    try {
      const user = await this.userRepository.findUserByEmail({
        email: data.email,
      });
      if (!compareSync(data.password, user.password))
        return new NotAcceptableException('Credenciais inválidas. ');
      user.password = undefined;
      return this.login(user);
    } catch (error) {
      return new NotFoundException(error.message);
    }
  }

  private login(user: User) {
    return { token: this.jwtService.sign(user) };
  }
}
