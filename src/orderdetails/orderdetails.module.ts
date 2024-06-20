import { Module } from '@nestjs/common';
import { OrderDetailService } from './orderdetails.service';
import { OrderDetailController } from './orderdetail.controller';
import { OrderDetail } from './orderdetail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetail])],
  controllers: [OrderDetailController],
  providers: [OrderDetailService],
})
export class OrderdetailsModule {}
