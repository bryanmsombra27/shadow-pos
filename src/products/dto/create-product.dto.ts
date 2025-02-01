import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
  @IsString({ message: 'Valor no valido' })
  name: string;

  @IsNotEmpty({
    message: 'El precio es obligatorio',
  })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'el precio no es valido' })
  price: number;
  @IsNotEmpty({
    message: 'la cantidad es obligatoria',
  })
  @IsNumber({ maxDecimalPlaces: 0 }, { message: 'cantidad debe ser un numero' })
  inventory: number;

  @IsNotEmpty({
    message: 'la categoria es obligatoria',
  })
  @IsInt({ message: 'La categoria no es valida' })
  @Min(1, { message: 'debe ser una categoria valida' })
  categoryId: number;
}
