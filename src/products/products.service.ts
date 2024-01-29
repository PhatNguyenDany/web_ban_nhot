import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(productId: number): Promise<Product> {
    return this.productRepository.findOne({ where: { productId } });
  }

  async create(product: Partial<Product>): Promise<Product> {
    const newProduct = this.productRepository.create(product);
    return this.productRepository.save(newProduct);
  }

  async update(productId: number, product: Partial<Product>): Promise<Product> {
    await this.productRepository.update({ productId }, product);
    return this.productRepository.findOne({ where: { productId } });
  }

  async remove(productId: number): Promise<void> {
    await this.productRepository.delete(productId);
  }
}
