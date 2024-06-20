import { Module } from '@nestjs/common';
import { ShippersService } from './shippers.service';
import { ShippersController } from './shippers.controller';
import { Shipper } from './shipper.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Shipper])],
  controllers: [ShippersController],
  providers: [ShippersService],
})
export class ShippersModule {}
