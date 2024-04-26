import {
  Injectable,
  NestMiddleware,
  NotAcceptableException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class UserAccessLevelMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(request: Request, res: Response, next: NextFunction) {
    try {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      if (!type) throw new NotAcceptableException('JWT Token missing.');
      if (type != 'Bearer')
        throw new NotAcceptableException('Invalid type of token.');
      const payload = await this.jwtService.decode(token);
      if (payload.type != 'Administrador')
        throw new NotAcceptableException('User isn`t an administrator.');
      next();
    } catch (error) {
      next(new NotAcceptableException(error));
    }
  }
}
