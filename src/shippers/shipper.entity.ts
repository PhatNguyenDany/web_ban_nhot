import { Order } from 'src/orders/order.entity';
import { SharedProp } from 'src/sharedProp.helper';
import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Shipper extends SharedProp {
  @PrimaryGeneratedColumn({ name: 'shipper_id' })
  shipperId: number;

  @Column({ name: 'shipper_name', nullable: false })
  shipperName: string;

  @Column({ name: 'phone', nullable: false })
  phone: string;

  @OneToMany(() => Order, (order) => order.shipperId) // Mỗi shipper sẽ giao nhiều orders
  orders: Order[];
}
