import { Product } from 'src/products/entity/product.entity';
import { SharedProp } from 'src/sharedProp.helper';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'category' })
export class Category extends SharedProp {
  @PrimaryGeneratedColumn({ name: 'catagory_id' })
  categoryId: number;

  @Column({ name: 'category_name', nullable: false })
  categoryName: string;

  @Column({ nullable: false })
  desription: string;

  @OneToMany(() => Product, (product) => product.categoryId) // Mỗi category sẽ diễn giải cho nhiều product
  products: Product[];
}
