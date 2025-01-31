import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({
    message: 'El nombre de la categoria no debe ir vacio',
  })
  name: string;
}
