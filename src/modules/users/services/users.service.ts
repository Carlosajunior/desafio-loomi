import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}
}
