import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class GetProductsQueryDto {
  @ApiProperty({
    name: 'category_id',
    type: 'number',
    description: 'obtener productos por categoria',
  })
  @IsOptional()
  @IsNumberString({}, { message: 'La categoria debe ser un numero' })
  category_id?: number;

  @ApiProperty({
    name: 'limit',
    type: 'number',
    description: 'limitar los registros que se obtienen de base de datos',
  })
  @IsOptional()
  @IsNumberString({}, { message: 'limite debe ser un numero' })
  limit?: number;
  @ApiProperty({
    name: 'offset',
    type: 'number',
    description: 'saltar una cantidad de registros de base de datos',
  })
  @IsOptional()
  @IsNumberString({}, { message: 'offset debe ser un numero' })
  offset?: number;
}
