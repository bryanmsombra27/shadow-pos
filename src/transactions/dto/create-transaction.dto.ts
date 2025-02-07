import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

export class TransactionContentsDto {
  @IsNotEmpty({ message: 'El ID del producto no puede estar vacío' })
  @IsInt({ message: 'Producto no válido' })
  productId: number;

  @IsNotEmpty({ message: 'Cantidad no puede estar vacía' })
  @IsInt({ message: 'Cantidad no válida' }) // Validate quantity too
  quantity: number;

  @IsNotEmpty({ message: 'Precio no puede estar vacío' })
  @IsNumber({}, { message: 'Precio no válido' })
  price: number;
}

export class CreateTransactionDto {
  @ApiProperty({
    name: 'total',
    description: 'Total de la orden',
    type: 'number',
  })
  @IsNotEmpty({ message: 'El Total no puede ir vacio' })
  @IsNumber({}, { message: 'Cantidad no válida' })
  total: number;

  @ApiProperty({
    name: 'coupon',
    description: 'cupon de descuento para la orden de productos',
    type: 'string',
  })
  @IsOptional()
  @IsString()
  coupon: string;

  @ApiProperty({
    name: 'contents',
    description: 'cantidad de productos agregados a la orden',
    type: 'array',
    isArray: true,
  })
  @IsArray()
  @ArrayNotEmpty({ message: 'Los Contenidos no pueden ir vacios' })
  @ValidateNested()
  @Type(() => TransactionContentsDto)
  contents: TransactionContentsDto[];
}
