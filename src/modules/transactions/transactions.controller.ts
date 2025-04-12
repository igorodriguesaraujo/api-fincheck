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
  ParseUUIDPipe,
} from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsService } from './services/transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly TransactionsService: TransactionsService) { }

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createTransactionDto: CreateTransactionDto) {
    return this.TransactionsService.create(userId, createTransactionDto);
  }

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.TransactionsService.findAllByUserId(userId);
  }

  @Get(':id')
  findOne(
    @ActiveUserId() userId: string,
    @Param('id') id: string) {
    return this.TransactionsService.findOne(userId, id);
  }

  @Put(':id')
  update(
    @ActiveUserId() userId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.TransactionsService.update(userId, id, updateTransactionDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(
    @ActiveUserId() userId: string,
    @Param('id') id: string
  ) {
    return this.TransactionsService.remove(userId, id);
  }
}
