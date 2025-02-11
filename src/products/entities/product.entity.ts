import { Category } from '../../categories/entities/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 60,
  })
  name: string;
  @Column({
    type: 'varchar',
    length: 120,
    nullable: true,
    default: 'default.svg',
  })
  image: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'int' })
  inventory: number;

  //   FORMA 2 DE OBTENER LOS DATOS REALCIONADOS SIEMPRE LOS TRAE DE FORMA AUTOMATICA CUANDO SE CONSULTA LOS DATOS DEL MODELO
  //   @ManyToOne(() => Category, { eager: true })
  @ManyToOne(() => Category)
  category: Category;

  @Column({ type: 'int' })
  categoryId: number;

  @Column({
    type: 'bool',
    default: true,
  })
  active: boolean;
}
