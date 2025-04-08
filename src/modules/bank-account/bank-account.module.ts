/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BankAccountController } from './bank-account.controller';
import { DatabaseModule } from 'src/shared/database/database.module';
import { BankAccountService } from './services/bank-account.service';
import { ValidadeBankAccountService } from './services/validade-bank-account.service';

@Module({
  imports: [DatabaseModule],
  controllers: [BankAccountController],
  providers: [BankAccountService, ValidadeBankAccountService],
})
export class BankAccountModule { }
