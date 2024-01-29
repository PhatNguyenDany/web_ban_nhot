import { SharedProp } from 'src/sharedProp.helper';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity({ name: 'variant' })
export class Variant extends SharedProp {
  @PrimaryGeneratedColumn({ name: 'variant_id' })
  variantId: number;

  @Column({ name: 'variant_name', nullable: false })
  variantName: string;

  @Column({ nullable: false })
  capacity: string;

  @Column({ name: 'price_in', nullable: false })
  priceIn: number;

  @Column({ name: 'price_out', nullable: false })
  priceOut: number;

  @Column({ nullable: false })
  stock: string;

  @ManyToOne(() => Product, (product) => product.variantId, { eager: true })
  @JoinColumn({ name: 'variant_id' })
  product: Product;
}
