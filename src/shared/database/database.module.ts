/* eslint-disable prettier/prettier */
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositories/users.repository';
import { CategoriesRepository } from './repositories/categories.repository';

@Global()
@Module({
  providers: [PrismaService, UserRepository, CategoriesRepository],
  exports: [UserRepository, CategoriesRepository],
})
export class DatabaseModule { }
