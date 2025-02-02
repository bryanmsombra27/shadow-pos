import { IsNotEmpty } from 'class-validator';

export class ApplyCouponDto {
  @IsNotEmpty({
    message: 'El cupon es obligatorio',
  })
  coupon_name: string;
}
