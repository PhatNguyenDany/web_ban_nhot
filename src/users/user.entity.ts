import { Order } from 'src/orders/order.entity';
import { SharedProp } from 'src/sharedProp.helper';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'user' })
export class User extends SharedProp {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Column({ name: 'first_name', nullable: false })
  firstName: string;

  @Column({ name: 'last_name', nullable: false })
  lastName: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: false })
  email: string;

  @Column({ name: 'birth_date', type: 'date', nullable: false })
  birthDate: Date;

  @Column({ enum: ['USER', 'ADMIN'], default: 'USER' })
  role: 'USER' | 'ADMIN';

  @Column({ nullable: false })
  username: string;

  @Column({ unique: true, nullable: false, length: 255 })
  password: string;

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  @OneToMany(() => Order, (order) => order.userId) // Mỗi user sẽ có nhiều orders
  orders: Order[];
}
