import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IdValidationPipe } from '../common/pipes/id-validation/id-validation.pipe';
import { GetProductsQueryDto } from './dto/get-product.dto';
import { ApiBody, ApiProperty, ApiQuery } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query() query: GetProductsQueryDto) {
    const category = query.category_id ?? null;
    const limit = query.limit ?? 10;
    const offset = query.offset ?? 0;

    return this.productsService.findAll(category, limit, offset);
  }

  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({
    type: UpdateProductDto,

    description: 'propiedades para actualizar un producto',
    examples: {
      product: {
        value: {
          name: 'camisa',
          categoryId: 1,
          inventory: 1,
          price: 30.99,
        } as UpdateProductDto,
      },
    },
  })
  update(
    @Param('id', IdValidationPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: number) {
    return this.productsService.remove(+id);
  }
}
