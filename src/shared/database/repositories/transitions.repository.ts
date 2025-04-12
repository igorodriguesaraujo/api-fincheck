/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TransactionsRepository {
  constructor(private readonly prismaService: PrismaService) { }

  create(createTransactionDto: Prisma.TransactionCreateArgs) {
    return this.prismaService.transaction.create(createTransactionDto);
  }

  findMany(findManyDto: Prisma.TransactionFindManyArgs) {
    return this.prismaService.transaction.findMany(findManyDto);
  }

  findFirst(findByIdTransactionDto: Prisma.TransactionFindUniqueArgs) {
    return this.prismaService.transaction.findFirst(findByIdTransactionDto);
  }

  update(UpdateTransactionDto: Prisma.TransactionUpdateArgs) {
    return this.prismaService.transaction.update(UpdateTransactionDto);
  }

  remove(removeTransactionDto: Prisma.TransactionDeleteArgs) {
    return this.prismaService.transaction.delete(removeTransactionDto);
  }
}
