import { Category } from 'src/categories/category.entity';
import { SharedProp } from 'src/sharedProp.helper';
import { Supplier } from 'src/suppliers/supplier.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Variant } from './variant.entity';

@Entity({ name: 'product' })
export class Product extends SharedProp {
  @PrimaryGeneratedColumn({ name: 'product_id' })
  productId: number;

  @Column({ name: 'product_name', nullable: false })
  productName: string;

  @Column({ nullable: false })
  description: string;

  @Column({ name: 'variant_id', nullable: false })
  variantId: number;

  @Column({ name: 'supplier_id', nullable: false })
  supplierId: number;

  @Column({ name: 'category_id', nullable: false })
  categoryId: number;

  @Column('text', { array: true, nullable: false })
  image: string[];

  @ManyToOne(() => Supplier, (supplier) => supplier.products, { eager: true })
  @JoinColumn({ name: 'supplier_id' })
  suppliers: Supplier;

  @ManyToOne(() => Category, (category) => category.categoryId, {
    eager: true,
  })
  @JoinColumn({ name: 'category_id' })
  categories: Category;

  @OneToMany(() => Variant, (variant) => variant.variantId)
  variant: Variant[];
}
