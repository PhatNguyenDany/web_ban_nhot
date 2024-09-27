import { Order } from 'src/orders/order.entity';
import { Product } from 'src/products/entity/product.entity';
import { SharedProp } from 'src/sharedProp.helper';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'OrderDetail' })
export class OrderDetail extends SharedProp {
  @PrimaryGeneratedColumn({ name: 'orderdetail_id' })
  orderDetailId: number;

  @Column({ name: 'order_id', nullable: false })
  orderId: string;

  @Column({ name: 'product_id', nullable: false })
  productId: number;

  @Column({ nullable: false })
  quantity: number;

  @ManyToOne(() => Order, (order) => order.orderId, { eager: true })
  @JoinColumn({ name: 'order_id' })
  orders: Order;

  @ManyToOne(() => Product, (product) => product.productId, { eager: true })
  @JoinColumn({ name: 'product_id' })
  products: Product;
}
