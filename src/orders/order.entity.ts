import { OrderDetail } from 'src/orderdetails/orderdetail.entity';
import { SharedProp } from 'src/sharedProp.helper';
import { Shipper } from 'src/shippers/shipper.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'Order' })
export class Order extends SharedProp {
  @PrimaryGeneratedColumn({ name: 'order_id' })
  orderId: number;

  @Column({ name: 'user_id', nullable: false })
  userId: string;

  @Column({ name: 'order_date', type: 'date', nullable: false })
  orderDate: number;

  @Column({ name: 'shipper_id', nullable: false })
  shipperId: number;

  @ManyToOne(() => User, (user) => user.userId, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Shipper, (shipper) => shipper.shipperId, { eager: true })
  @JoinColumn({ name: 'shipper_id' })
  shippers: Shipper;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.orderId) // Mỗi order sẽ có thể nhiều chi tiết Orderdetail
  orderDetails: OrderDetail[];
}
