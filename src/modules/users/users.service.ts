import { Prisma } from '@prisma/client';
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import { UserRepository } from 'src/shared/database/repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UserRepository) { }

  async findByUnique(findUniqueDto: Prisma.UserFindUniqueArgs) {
    return this.userRepo.findUnique(findUniqueDto);
  }

  async create(createUserDto: Prisma.UserCreateArgs) {
    return this.userRepo.create(createUserDto);
  }
}
