/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { BankAccountRepository } from 'src/shared/database/repositories/bankAccount.repository';
import { ValidadeBankAccountService } from './validade-bank-account.service';

@Injectable()
export class BankAccountService {
  constructor(
    private readonly bankAccountRepository: BankAccountRepository,
    private readonly validadeBankAccountService: ValidadeBankAccountService,
  ) { }

  async create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { name, initialBalance, type, color } = createBankAccountDto;

    return await this.bankAccountRepository.create({
      data: {
        userId,
        name,
        initialBalance,
        type,
        color,
      },
    });
  }

  async findMany(userId: string) {
    return await this.bankAccountRepository.findMany({
      where: {
        userId,
      },
    });
  }

  async findOne(userId: string, id: string) {
    const bankAccount = await this.bankAccountRepository.findFirst({
      where: {
        id,
        userId,
      },
      select: {
        name: true,
        initialBalance: true,
        type: true,
        color: true,
      }
    });

    if (!bankAccount) {
      throw new Error('Essa Conta não existe');
    }

    return bankAccount;
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto
  ) {

    const { name, initialBalance, type, color } = updateBankAccountDto;

    await this.validadeBankAccountService.validate(userId, bankAccountId);

    return await this.bankAccountRepository.update({
      where: {
        id: bankAccountId,
      },
      data: {
        name,
        initialBalance,
        type,
        color,
      }
    })
  }

  async remove(userId: string, bankAccountId: string) {
    await this.validadeBankAccountService.validate(userId, bankAccountId);

    await this.bankAccountRepository.remove({
      where: {
        id: bankAccountId,
      },
    });

    return null;
  }
}
