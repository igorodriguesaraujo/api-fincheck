/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import { UserRepository } from 'src/shared/database/repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UserRepository) { }
}
