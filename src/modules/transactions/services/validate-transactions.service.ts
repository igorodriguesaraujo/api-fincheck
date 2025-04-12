/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionsRepository } from 'src/shared/database/repositories/transitions.repository';

@Injectable()
export class ValidadeTransactionService {
  constructor(private readonly transactionRepository: TransactionsRepository) { }

  async validate(userId: string, transactionId: string) {
    const isOwner = await this.transactionRepository.findFirst({
      where: {
        id: transactionId,
        userId,
      },
    });

    if (!isOwner) {
      throw new NotFoundException('Transação não encontrada');
    }

    return true;
  }
}
