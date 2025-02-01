import { IsNumberString, IsOptional } from 'class-validator';

export class GetProductsQueryDto {
  @IsOptional()
  @IsNumberString({}, { message: 'La categoria debe ser un numero' })
  category_id?: number;

  @IsOptional()
  @IsNumberString({}, { message: 'limite debe ser un numero' })
  limit?: number;

  @IsOptional()
  @IsNumberString({}, { message: 'offset debe ser un numero' })
  offset?: number;
}
