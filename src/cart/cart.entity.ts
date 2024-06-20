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

@Entity({ name: 'preorder' })
export class PreOrder extends SharedProp {
  @PrimaryGeneratedColumn({ name: 'preorder_id' })
  preOrderId: number;

  @Column({ name: 'user_id', nullable: false })
  userId: number;

  @ManyToOne(() => User, (user) => user.userId, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.orderId) // Mỗi order sẽ có thể nhiều chi tiết Orderdetail
  orderDetails: OrderDetail[];
}
