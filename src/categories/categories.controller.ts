import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { IdValidationPipe } from '../common/pipes/id-validation/id-validation.pipe';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiBody({ type: CreateCategoryDto })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiResponse({
    description: 'Obtener todas las categorias',
    example: {},
  })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'Se recibe el id de la categoria ',
    type: Number,
  })
  findOne(
    @Param('id', IdValidationPipe)
    id: number,
  ) {
    return this.categoriesService.findOne(id);
  }
  @ApiParam({
    name: 'id',
    description: 'Se recibe el id de la categoria  para actualizar',
    type: Number,
  })
  @ApiBody({
    description: 'Se recibe el objeto para actualizar ',
    type: UpdateCategoryDto,
  })
  @Patch(':id')
  update(
    @Param('id', IdValidationPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'Se recibe el id de la categoria  para eliminar',
    type: Number,
  })
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.categoriesService.remove(+id);
  }
}
