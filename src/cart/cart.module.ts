import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductStock } from 'src/products/entity/productstock.entity';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Cart } from './cart.entity';
import { CartItem } from './cart-item.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Cart, ProductStock, CartItem])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
