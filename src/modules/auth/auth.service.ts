/* eslint-disable prettier/prettier */
import { SignupDto } from './dto/signup.dto';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { SigninDto } from './dto/signin.dto';
import { UserRepository } from 'src/shared/database/repositories/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) { }

  async signin(SigninDto: SigninDto) {
    const { email, password } = SigninDto;

    const user = await this.userRepo.findUnique({
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

    const existEmail = await this.userRepo.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existEmail) {
      throw new ConflictException('E-mail já cadastrado');
    }

    const hashPassword = await hash(password, 12);

    const user = await this.userRepo.create({
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

  private async generateToken(userId: string) {
    const accessToken = await this.jwtService.signAsync({ sub: userId });
    return { accessToken };
  }
}
