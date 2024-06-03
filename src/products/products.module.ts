import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entity/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Variant } from './entity/variant.entity';
import { ProductStock } from './entity/productstock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Variant, ProductStock])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
