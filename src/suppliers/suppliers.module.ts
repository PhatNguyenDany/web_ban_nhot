import { Module } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import { Supplier } from './supplier.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Supplier])],
  controllers: [SuppliersController],
  providers: [SuppliersService],
})
export class SuppliersModule {}
