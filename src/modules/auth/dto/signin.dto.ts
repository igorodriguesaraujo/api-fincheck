import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SigninDto {
  @IsString()
  @IsEmail({}, { message: 'E-mail inválido' })
  @IsNotEmpty({ message: 'Campo obrigatório' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  @MinLength(8, { message: 'Campo deve ter no mínimo 8 caracteres' })
  password: string;
}
