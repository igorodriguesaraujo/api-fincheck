import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, validateSync } from 'class-validator';

class Env {
  @IsString()
  @IsNotEmpty()
  jwtSecret: string;

  // Adicione mais variaveis de ambiente aqui
}

export const env: Env = {
  jwtSecret: process.env.JWT_SECRET_API,
  // Precisando adicionar mais variaveis de ambiente aqui
};

const validated = plainToInstance(Env, env);

const errors = validateSync(validated, { skipMissingProperties: false });

if (errors.length > 0) {
  throw new Error(`Erro nas variaveis de ambiente: ${JSON.stringify(errors)}`);
}
