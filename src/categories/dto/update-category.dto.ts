import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

@ApiSchema({
  description: 'Actualizar la categoria',
})
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiProperty({
    example: 'Playeras',
    description: 'Nombre de la categoria para el producto',
  })
  @IsOptional()
  name: string;
}
