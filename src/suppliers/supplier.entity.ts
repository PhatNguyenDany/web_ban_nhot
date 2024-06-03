import { Product } from 'src/products/entity/product.entity';
import { SharedProp } from 'src/sharedProp.helper';
import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Supplier extends SharedProp {
  @PrimaryGeneratedColumn({ name: 'supplier_id' })
  supplierId: number;

  @Column({ name: 'supplier_name', nullable: false })
  supplierName: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  phone: string;

  @OneToMany(() => Product, (product) => product.supplier) // Mỗi nhà cung cấp cung cấp nhiều sản phẩm
  products: Product[];
}
