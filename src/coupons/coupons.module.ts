import { Module } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CouponsController } from './coupons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';

@Module({
  controllers: [CouponsController],
  providers: [CouponsService],
  imports: [TypeOrmModule.forFeature([Coupon])],
  exports: [CouponsService],
})
export class CouponsModule {}
