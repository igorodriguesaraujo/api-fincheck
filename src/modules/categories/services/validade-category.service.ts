/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repository';

@Injectable()
export class ValidadeCategoryService {
  constructor(private readonly categoryRepository: CategoriesRepository) { }

  async validate(userId: string, categoryId: string) {
    const isOwner = await this.categoryRepository.findFirst({
      where: {
        id: categoryId,
        userId,
      }
    })

    if (!isOwner) {
      throw new NotFoundException('Categoria não encontrada');
    }

    return true;
  }
}
