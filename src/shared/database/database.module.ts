/* eslint-disable prettier/prettier */
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositories/users.repository';
import { CategoriesRepository } from './repositories/categories.repository';
import { BankAccountRepository } from './repositories/bankAccount.repository';
import { TransactionsRepository } from './repositories/transitions.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    UserRepository,
    CategoriesRepository,
    BankAccountRepository,
    TransactionsRepository
  ],
  exports: [
    UserRepository,
    CategoriesRepository,
    BankAccountRepository,
    TransactionsRepository
  ],
})
export class DatabaseModule { }
