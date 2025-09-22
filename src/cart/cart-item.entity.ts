import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cart.entity";
import { ProductStock } from "src/products/entity/productstock.entity";

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cart, cart => cart.items, { onDelete: 'CASCADE' })
  cart: Cart;

  @ManyToOne(() => ProductStock)
  productStock: ProductStock;

  @Column()
  quantity: number;
}