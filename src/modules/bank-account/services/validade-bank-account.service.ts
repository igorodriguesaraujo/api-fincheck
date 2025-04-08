/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { BankAccountRepository } from 'src/shared/database/repositories/bankAccount.repository';

@Injectable()
export class ValidadeBankAccountService {
  constructor(private readonly BankAccountRepository: BankAccountRepository) { }

  async validate(userId: string, bankAccountId: string) {
    const isOwner = await this.BankAccountRepository.findFirst({
      where: {
        id: bankAccountId,
        userId,
      },
    });

    if (!isOwner) {
      throw new NotFoundException('Conta não encontrada');
    }

    return true;
  }
}
