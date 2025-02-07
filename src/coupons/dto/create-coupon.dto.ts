import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateCouponDto {
  @ApiProperty({
    name: 'name',
    type: 'string',
    description: 'Nombre del cupon',
    example: 'INAUGURACION',
  })
  @IsNotEmpty({
    message: 'El nombre del cupon es obligatorio',
  })
  @IsString()
  name: string;

  @ApiProperty({
    name: 'percentage',
    type: 'number',
    description: 'Porcentaje de descuento',
    example: 20,
  })
  @IsNotEmpty({
    message: 'El porcentaje es obligatorio',
  })
  @IsInt({ message: 'El descuento debe ser entre 1 y 100' })
  @Max(100, { message: 'No se puede aplicar un descuento mayor al 100%' })
  @Min(1, { message: 'No se puede aplicar un descuento menor al 1%' })
  percentage: number;

  @ApiProperty({
    name: 'expirationDate',
    type: Date,
    description: 'Fecha en la que expirara el cupon',
    example: new Date(),
  })
  @IsNotEmpty({
    message: 'La fecha es obligatoria',
  })
  @IsDateString({}, { message: 'Debe ser una fecha valida' })
  expirationDate: Date;
}
