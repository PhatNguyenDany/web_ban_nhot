import { Product } from 'src/products/entity/product.entity';
import { SharedProp } from 'src/sharedProp.helper';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'category' })
export class Category extends SharedProp {
  @PrimaryGeneratedColumn({ name: 'category_id' })
  categoryId: number;

  @Column({ name: 'category_name', nullable: false })
  categoryName: string;

  @Column({ nullable: false })
  description: string;

  @OneToMany(() => Product, (product) => product.category) // Mỗi category sẽ diễn giải cho nhiều product
  products: Product[];
}
