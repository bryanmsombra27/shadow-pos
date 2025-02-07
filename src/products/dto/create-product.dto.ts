import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'camisa',
    description: 'Nombre del producto',
    type: 'string',
  })
  @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
  @IsString({ message: 'Valor no valido' })
  name: string;

  @ApiProperty({
    example: 30.99,
    description: 'Precio del producto',
    type: 'number',
  })
  @IsNotEmpty({
    message: 'El precio es obligatorio',
  })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'el precio no es valido' })
  price: number;

  @ApiProperty({
    example: 10,
    description: 'cantidad del producto',
    type: 'number',
  })
  @IsNotEmpty({
    message: 'la cantidad es obligatoria',
  })
  @IsNumber({ maxDecimalPlaces: 0 }, { message: 'cantidad debe ser un numero' })
  inventory: number;

  @ApiProperty({
    example: 1,
    description: 'id de la categoria a la que pertenece el producto',
    type: 'number',
  })
  @IsNotEmpty({
    message: 'la categoria es obligatoria',
  })
  @IsInt({ message: 'La categoria no es valida' })
  @Min(1, { message: 'debe ser una categoria valida' })
  categoryId: number;
}
