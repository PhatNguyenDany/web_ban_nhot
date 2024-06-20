import { Order } from 'src/orders/order.entity';
import { ProductStock } from 'src/products/entity/productstock.entity';
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
  orderId: number;

  @Column({ name: 'productstockid', nullable: false })
  productStockId: number;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false })
  orderDetailTotal: number;

  @ManyToOne(() => Order, (order) => order.orderId, { eager: true })
  @JoinColumn({ name: 'order_id' })
  orders: Order;

  @ManyToOne(
    () => ProductStock,
    (productStock) => productStock.productStockId,
    { eager: true },
  )
  @JoinColumn({ name: 'productstockid' })
  productStock: ProductStock;
}
