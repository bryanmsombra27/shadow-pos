import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';
import { DataSource, Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { categories } from './data/categories';
import { products } from './data/products';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private dataSource: DataSource,
  ) {}

  async seed() {
    const conection = this.dataSource;

    await conection.dropDatabase();
    await conection.synchronize();

    await this.categoryRepository.save(categories);

    const allCategories = await this.categoryRepository.find({
      where: {
        active: true,
      },
    });

    let productInstances = [];

    for (const product of products) {
      const category = allCategories.find(
        (item) => item.id === product.categoryId,
      );
      const productInstance = this.productRepository.create(product);

      productInstances.push({
        ...productInstance,
        category,
      });
    }

    await this.productRepository.save(productInstances);

    console.log('IMPORTANDO DATA DESDE SEED ========');
  }

  async resetTables() {}
}
