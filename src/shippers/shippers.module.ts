import { Module } from '@nestjs/common';
import { ShippersService } from './shippers.service';
import { ShippersController } from './shippers.controller';

@Module({
  controllers: [ShippersController],
  providers: [ShippersService],
})
export class ShippersModule {}
