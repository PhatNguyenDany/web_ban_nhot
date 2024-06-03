import { SharedProp } from 'src/sharedProp.helper';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductStock } from './productstock.entity';

@Entity({ name: 'variant' })
export class Variant extends SharedProp {
  @PrimaryGeneratedColumn({ name: 'variant_id' })
  variantId: number;

  @Column({ nullable: false, unique: true })
  capacity: string;

  @OneToMany(() => ProductStock, (productstock) => productstock.variant) // Mỗi category sẽ diễn giải cho nhiều product
  productstock: ProductStock[];
}
