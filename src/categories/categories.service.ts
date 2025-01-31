import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.save(createCategoryDto);
  }

  findAll() {
    // return `This action returns all categories`;
    return this.categoryRepository.find({
      where: {
        active: true,
      },
    });
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOneBy({
      id,
      active: true,
    });

    if (!category) throw new NotFoundException(`No se encontro la categoria`);

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);

    category.name = updateCategoryDto.name;

    return await this.categoryRepository.save(category);
    // return await this.categoryRepository.update(
    //   {
    //     id,
    //   },
    //   updateCategoryDto,
    // );
  }

  async remove(id: number) {
    const category = await this.findOne(id);

    category.active = false;

    await this.categoryRepository.save(category);

    return `Categoria eliminada !`;
  }
}
