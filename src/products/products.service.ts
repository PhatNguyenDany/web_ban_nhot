import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';
import { ProductFilterDTO } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(filter: ProductFilterDTO): Promise<Product[]> {
    const query = { where: {}, order: {} } as any;

    if (filter.productName) {
      query.where.productName = filter.productName;
    }
    if (filter.categoryId) {
      query.where.categoryId = filter.categoryId;
    }
    if (filter.supplierId) {
      query.where.supplierId = filter.supplierId;
    }
    if (filter.sortByDate) {
      query.order.createdAt = filter.sortByDate;
    }
    if (filter.sortByPrice) {
      query.order.priceOut = filter.sortByPrice;
    }

    return this.productRepository.find({ ...query, relations: ['variant'] });
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
