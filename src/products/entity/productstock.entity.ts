import { SharedProp } from 'src/sharedProp.helper';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { Variant } from './variant.entity';

@Entity({ name: 'productstock' })
export class ProductStock extends SharedProp {
  @PrimaryGeneratedColumn({ name: 'productstock_id' })
  productStockId: number;

  @Column({ nullable: false })
  productId: number;

  @Column({ nullable: false })
  variantId: number;

  @Column({ name: 'price_in', nullable: false })
  priceIn: number;

  @Column({ name: 'price_out', nullable: false })
  priceOut: number;

  @Column({ nullable: false })
  stock: number;

  @ManyToOne(() => Product, (product) => product.productStock, {
    eager: true,
  })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @ManyToOne(() => Variant, (variant) => variant.productstock, { eager: true })
  @JoinColumn({ name: 'variantId' })
  variant: Variant;
}
