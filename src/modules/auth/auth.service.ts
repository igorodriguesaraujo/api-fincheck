/* eslint-disable prettier/prettier */
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async signin(SigninDto: SigninDto) {
    const { email, password } = SigninDto;

    const user = await this.usersService.findByUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return this.generateToken(user.id);
  }

  async signup(SignupDto: SignupDto) {
    const { email, name, password } = SignupDto;

    const existEmail = await this.usersService.findByUnique({
      where: { email },
      select: { id: true },
    });

    if (existEmail) {
      throw new ConflictException('E-mail já cadastrado');
    }

    const hashPassword = await hash(password, 12);

    const user = await this.usersService.create({
      data: {
        email,
        name,
        password: hashPassword,
        category: {
          createMany: {
            data: [
              // Income
              { name: 'Salário', icon: 'salary', type: 'INCOME' },
              { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
              { name: 'Outro', icon: 'other', type: 'INCOME' },
              // Expense
              { name: 'Casa', icon: 'home', type: 'EXPENSE' },
              { name: 'Alimentação', icon: 'food', type: 'EXPENSE' },
              { name: 'Educação', icon: 'education', type: 'EXPENSE' },
              { name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
              { name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
              { name: 'Roupas', icon: 'clothes', type: 'EXPENSE' },
              { name: 'Transporte', icon: 'transport', type: 'EXPENSE' },
              { name: 'Viagem', icon: 'travel', type: 'EXPENSE' },
              { name: 'Outro', icon: 'other', type: 'EXPENSE' },
            ],
          },
        },
      },
    });

    return this.generateToken(user.id);
  }

  async me(userId: string) {
    const user = await this.usersService.findByUnique({
      where: {
        id: userId
      },
      select: {
        id: true,
        name: true,
        email: true
      },
    })

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    return user;
  }

  private async generateToken(userId: string) {
    const accessToken = await this.jwtService.signAsync({ sub: userId });
    return { accessToken };
  }
}
