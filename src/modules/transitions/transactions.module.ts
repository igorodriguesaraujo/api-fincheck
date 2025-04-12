/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TransactionsService } from './services/transactions.service';
import { TransactionsController } from './transactions.controller';
import { DatabaseModule } from 'src/shared/database/database.module';
import { ValidadeBankAccountService } from '../bank-account/services/validade-bank-account.service';
import { ValidadeCategoryService } from '../categories/services/validade-category.service';
import { ValidadeTransactionService } from './services/validate-transactions.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    ValidadeBankAccountService,
    ValidadeCategoryService,
    ValidadeTransactionService
  ],
})
export class TransactionsModule { }
