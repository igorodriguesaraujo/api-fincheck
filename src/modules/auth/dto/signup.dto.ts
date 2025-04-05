import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  @MinLength(8, { message: 'Campo deve ter no mínimo 8 caracteres' })
  password: string;
}
