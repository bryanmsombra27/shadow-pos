import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ApplyCouponDto {
  @ApiProperty({
    name: 'coupon_name',
    type: 'string',
    description: 'Nombre del cupon',
    example: 'INAUGURACION',
  })
  @IsNotEmpty({
    message: 'El cupon es obligatorio',
  })
  coupon_name: string;
}
