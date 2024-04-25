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
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (type != 'Bearer')
      throw new NotAcceptableException('Invalid type of token.');
    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
    if (payload.type != 'ADMIN')
      throw new NotAcceptableException('User isn`t an administrator.');
    next();
  }
}
