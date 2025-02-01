import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { GetProductsQueryDto } from './dto/get-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const category = await this.categoryRepository.findOneBy({
      id: createProductDto.categoryId,
    });
    if (!category) throw new NotFoundException(`La categoria no existe`);
    return this.productRepository.save({
      ...createProductDto,
      category,
    });
  }

  async findAll(id: number, limit: number, offset: number) {
    const clause: FindManyOptions<Product> = id
      ? {
          where: {
            active: true,
            category: {
              id: id,
            },
          },
        }
      : {
          where: {
            active: true,
          },
        };

    const [data, count] = await this.productRepository.findAndCount({
      ...clause,
      // FORMA 1 DE TRAER LOS DATOS DE UNA RELACION DE OTRA TABLA BRINDA CONTROL MANUAL SOBRE CUANDO Y COMO TRAER LOS DATOS DE LA RELACION
      relations: {
        category: true,
      },
      order: {
        id: 'DESC',
      },
      take: limit,
      skip: offset,

      // EN CASO DE QUE SE HAYA CONFIGURADO LA RELACION DESDE EL MODELO(SIEMPRE TRAE LOS DATOS AUTOMATICAMENTE), CON ESTA CONFIGURAICON SE SOBRE ESCRIBE PARA QUE NO  TRAIGA LOS DATOS DE LA RELACION
      // loadEagerRelations:false,
    });

    return {
      products: data,
      total: count,
    };
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: {
        id,
        active: true,
      },
      relations: {
        category: true,
      },
    });

    if (!product) throw new NotFoundException('No se encontro producto');

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);

    // FORMA SE SOBRE ESCRIBIR UN OBJETO ACTUALIZANDO SUS VALORES, PRIMER PARAMETRO EL OBJETO QUE SE VA A ACTUALIZAR, SEGUNDO PARAMETRO LOS NUEVOS VALORES QUE TENDRA EL OBJETO
    Object.assign(product, updateProductDto);

    if (updateProductDto.categoryId) {
      const category = await this.categoryRepository.findOneBy({
        id: updateProductDto.categoryId,
      });

      if (!category) throw new NotFoundException(`la categoria no existe`);

      product.category = category;
    }

    return await this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);

    product.active = false;

    await this.productRepository.save(product);

    return 'Producto eliminado exitosamente!';
  }
}
