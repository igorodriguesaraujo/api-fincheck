/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { BankAccountService } from './services/bank-account.service';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';

@Controller('bank-account')
export class BankAccountController {
  constructor(private readonly bankAccountService: BankAccountService) { }

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createBankAccountDto: CreateBankAccountDto
  ) {
    return this.bankAccountService.create(userId, createBankAccountDto);
  }

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.bankAccountService.findMany(userId);
  }

  @Get(':id')
  findOne(
    @ActiveUserId() userId: string,
    @Param('id') id: string
  ) {
    return this.bankAccountService.findOne(userId, id);
  }

  @Put(':id')
  update(
    @ActiveUserId() userId: string,
    @Param('id') id: string,
    @Body() updateBankAccountDto: UpdateBankAccountDto
  ) {
    return this.bankAccountService.update(userId, id, updateBankAccountDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(
    @ActiveUserId() userId: string,
    @Param('id') bankAccountId: string
  ) {
    return this.bankAccountService.remove(userId, bankAccountId);
  }
}
