/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionsRepository } from 'src/shared/database/repositories/transitions.repository';
import { ValidadeBankAccountService } from '../../bank-account/services/validade-bank-account.service';
import { ValidadeCategoryService } from '../../categories/services/validade-category.service';
import { ValidadeTransactionService } from './validate-transactions.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly validadeBankAccountService: ValidadeBankAccountService,
    private readonly validadeCategoryService: ValidadeCategoryService,
    private readonly validadeTransactionService: ValidadeTransactionService,
  ) { }

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const {
      bankAccountId,
      categoryId,
      name,
      value,
      date,
      type
    } = createTransactionDto;

    await this.validatedOnwer(userId, bankAccountId, categoryId);

    const transaction = await this.transactionsRepository.create({
      data: {
        userId,
        bankAccountId,
        categoryId,
        name,
        value,
        date,
        type
      }
    })

    return transaction;
  }

  findAllByUserId(userId: string) {
    return this.transactionsRepository.findMany({
      where: { userId }
    });
  }

  findOne(userId: string, transactionId: string) {
    return this.transactionsRepository.findFirst({
      where: {
        id: transactionId,
        userId
      }
    });
  }

  async update(
    userId: string,
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto) {

    const {
      name,
      value,
      date,
      type,
      categoryId,
      bankAccountId
    } = updateTransactionDto;

    await this.validatedTransaction(userId, transactionId);
    await this.validatedOnwer(userId, bankAccountId, categoryId);

    return this.transactionsRepository.update({
      where: {
        id: transactionId,
      },
      data: {
        bankAccountId,
        categoryId,
        name,
        value,
        date,
        type
      }
    });
  }

  async remove(userId: string, transactionId: string) {

    await this.validatedTransaction(userId, transactionId);

    await this.transactionsRepository.remove({
      where: {
        id: transactionId,
        userId
      }
    });

    return null;
  }

  private async validatedOnwer(userId: string, bankAccountId: string, categoryId: string) {
    return Promise.all([
      this.validadeBankAccountService.validate(userId, bankAccountId),
      this.validadeCategoryService.validate(userId, categoryId),
    ]);
  }

  private async validatedTransaction(userId: string, transactionId: string) {
    return this.validadeTransactionService.validate(userId, transactionId);
  }
}
