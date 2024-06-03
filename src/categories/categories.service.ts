import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const newCategories = this.categoriesRepository.create(createCategoryDto);
    return this.categoriesRepository.save(newCategories);
  }

  async findAll(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  async findOne(categoryId: number): Promise<Category> {
    return this.categoriesRepository.findOne({ where: { categoryId } });
  }

  async update(
    categoryId: number,
    category: Partial<Category>,
  ): Promise<Category> {
    await this.categoriesRepository.update(categoryId, category);
    return this.categoriesRepository.findOne({ where: { categoryId } });
  }

  async remove(categoryId: number): Promise<void> {
    await this.categoriesRepository.delete(categoryId);
  }
}
