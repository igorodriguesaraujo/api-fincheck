/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BankAccountRepository {
  constructor(private readonly prismaService: PrismaService) { }

  create(createBankAccountDto: Prisma.BankAccountCreateArgs) {
    return this.prismaService.bankAccount.create(createBankAccountDto);
  }

  findMany(findAllBankAccountDto: Prisma.BankAccountFindManyArgs) {
    return this.prismaService.bankAccount.findMany(findAllBankAccountDto);
  }

  findFirst(findByIdBankAccountDto: Prisma.BankAccountFindUniqueArgs) {
    return this.prismaService.bankAccount.findFirst(findByIdBankAccountDto);
  }

  update(UpdateBankAccountDto: Prisma.BankAccountUpdateArgs) {
    return this.prismaService.bankAccount.update(UpdateBankAccountDto);
  }

  remove(removeBankAccountDto: Prisma.BankAccountDeleteArgs) {
    return this.prismaService.bankAccount.delete(removeBankAccountDto);
  }

}
