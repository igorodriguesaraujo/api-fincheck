import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { TransactionType } from '../entities/Transactions';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  @IsUUID()
  bankAccountId: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  @IsUUID()
  categoryId: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  name: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  @IsPositive()
  value: number;

  @IsNotEmpty({ message: 'Campo obrigatório' })
  @IsDateString()
  date: string;

  @IsString()
  @IsEnum(TransactionType)
  type: 'INCOME' | 'EXPENSE';
}
