import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Playeras',
    description: 'Nombre de la categoria para el producto',
  })
  @IsString()
  @IsNotEmpty({
    message: 'El nombre de la categoria no debe ir vacio',
  })
  name: string;
}
