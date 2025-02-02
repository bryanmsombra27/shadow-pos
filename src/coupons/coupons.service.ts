import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Repository } from 'typeorm';
import { Coupon } from './entities/coupon.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { endOfDay, isAfter } from 'date-fns';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
  ) {}

  async create(createCouponDto: CreateCouponDto) {
    const coupon = this.couponRepository.create(createCouponDto);

    await this.couponRepository.save(coupon);
    return 'El nuevo cupon a sido registrado! ';
  }

  async findAll() {
    const coupons = await this.couponRepository.find({
      where: {
        active: true,
      },
    });

    return coupons;
  }

  async findOne(id: number) {
    const coupon = await this.couponRepository.findOneBy({
      active: true,
      id,
    });

    if (!coupon)
      throw new NotFoundException(`El cupon no es valido o ya fue eliminado`);

    return coupon;
  }

  async update(id: number, updateCouponDto: UpdateCouponDto) {
    const coupon = await this.findOne(id);
    Object.assign(coupon, updateCouponDto);

    await this.couponRepository.save(coupon);

    return coupon;
  }

  async remove(id: number) {
    const coupon = await this.findOne(id);

    coupon.active = false;

    await this.couponRepository.save(coupon);

    return 'El cupon ha sido eliminado!';
  }

  async applyCoupon(couponName: string) {
    const coupon = await this.couponRepository.findOne({
      where: {
        active: true,
        name: couponName,
      },
    });

    if (!coupon) throw new NotFoundException(`El cupón no existe o ya expiro`);

    const currentDate = new Date();
    const expirationDate = endOfDay(coupon.expirationDate);

    if (isAfter(currentDate, expirationDate))
      throw new UnprocessableEntityException(`El cupon ha expirado`);

    return {
      message: 'Cupon Valido',
      ...coupon,
    };
  }
}
