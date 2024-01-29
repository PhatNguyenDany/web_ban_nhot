import { UpdateDateColumn, CreateDateColumn, Timestamp } from 'typeorm';

export class SharedProp {
  @CreateDateColumn()
  createdAt: Timestamp;
  @UpdateDateColumn()
  updatedAt: Timestamp;
}
