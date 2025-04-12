/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthGuard } from './modules/auth/auth.guard';
import { AuthModule } from './modules/auth/auth.module';

import { UsersModule } from './modules/users/users.module';

import { CategoriesModule } from './modules/categories/categories.module';
import { BankAccountModule } from './modules/bank-account/bank-account.module';
import { TransactionsModule } from './modules/transactions/transactions.module';

import { DatabaseModule } from './shared/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    CategoriesModule,
    BankAccountModule,
    TransactionsModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule { }
