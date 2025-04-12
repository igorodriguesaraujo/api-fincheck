/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) { }

  findAllByUser(userId: string) {
    return this.categoriesRepository.findMany({
      where: { userId }
    });
  }
}
