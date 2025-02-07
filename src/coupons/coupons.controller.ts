import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { IdValidationPipe } from '../common/pipes/id-validation/id-validation.pipe';
import { ApplyCouponDto } from './dto/apply-coupon.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Post()
  @ApiBody({
    type: CreateCouponDto,
    description: 'Crear un cupon de descuento',
    examples: {
      coupon: {
        value: {
          expirationDate: new Date(),
          name: 'INAUGURACION',
          percentage: 50,
        } as CreateCouponDto,
      },
    },
  })
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponsService.create(createCouponDto);
  }

  @Get()
  findAll() {
    return this.couponsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: number) {
    return this.couponsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', IdValidationPipe) id: number,
    @Body() updateCouponDto: UpdateCouponDto,
  ) {
    return this.couponsService.update(id, updateCouponDto);
  }

  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: number) {
    return this.couponsService.remove(id);
  }

  @Post('/apply-coupon')
  @ApiBody({
    type: ApplyCouponDto,
    description: 'Comprobar si un cupon es valido o ya expiro',
    examples: {
      coupon: {
        value: {
          coupon_name: 'INAUGURACION',
        } as ApplyCouponDto,
      },
    },
  })
  @HttpCode(200)
  applyCuppons(@Body() applyCouponDto: ApplyCouponDto) {
    return this.couponsService.applyCoupon(applyCouponDto.coupon_name);
  }
}
