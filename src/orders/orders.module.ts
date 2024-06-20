import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { ProductStock } from 'src/products/entity/productstock.entity';
import { OrderDetail } from 'src/orderdetails/orderdetail.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Order, ProductStock, OrderDetail])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
