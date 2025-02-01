import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 60,
  })
  name: string;

  @OneToMany((category) => Product, (product) => product.category, {
    cascade: true,
  })
  products: Product[];

  @Column({
    type: 'bool',
    default: true,
  })
  active: boolean;
}
