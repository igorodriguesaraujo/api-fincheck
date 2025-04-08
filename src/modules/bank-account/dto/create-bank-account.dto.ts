import Prisma from '@prisma/client';

import { IsHexColor, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBankAccountDto {
  @IsString()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  name: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  initialBalance: number;

  @IsString()
  type: Prisma.AccountType;

  @IsString()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  @IsHexColor({ message: 'Cor inválida' })
  color: string;
}
