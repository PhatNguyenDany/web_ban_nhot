import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';
import {
  ProductFilterDTO,
  ProductFilterLimitDTO,
} from './dto/create-product.dto';
import { Variant } from './entity/variant.entity';
import { ProductStock } from './entity/productstock.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductStock)
    private productStockRepository: Repository<ProductStock>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Variant)
    private variantRepository: Repository<Variant>,
  ) {}

  async findAll(
    filter: ProductFilterDTO,
  ): Promise<{ product: Product[]; count: number }> {
    const queryBuilder = await this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.productStock', 'productStock')
      .innerJoinAndSelect('productStock.variant', 'variant')
      .innerJoinAndSelect('product.supplier', 'supplier')
      .innerJoinAndSelect('product.category', 'category')
      .select([
        'product.productName',
        'productStock.productStockId',
        'productStock.productId',
        'productStock.variantId',
        'productStock.priceIn',
        'productStock.priceOut',
        'productStock.stock',
        'product.image',
        'variant.variantId',
        'variant.capacity',
        'supplier.supplierId',
        'supplier.supplierName',
        'supplier.address',
        'supplier.phone',
        'category.categoryId',
        'category.categoryName',
        'category.description',
      ]);
    if (filter.productName) {
      queryBuilder.andWhere('product.product_name = :productName', {
        productName: filter.productName,
      });
    }
    if (filter.categoryId) {
      queryBuilder.andWhere('product.categoryId = :categoryId', {
        categoryId: filter.categoryId,
      });
    }
    if (filter.supplierId) {
      queryBuilder.andWhere('product.supplierId = :supplierId', {
        supplierId: filter.supplierId,
      });
    }
    if (filter.sortByDate) {
      queryBuilder.orderBy('product.createdAt', filter.sortByDate);
    }
    if (filter.sortByPrice) {
      queryBuilder.addOrderBy('productStock.priceOut', filter.sortByPrice);
    }
    const product = await queryBuilder
      .offset(filter.skip)
      .limit(filter.limit)
      .getMany();

    const count = await queryBuilder.getCount();
    return { product, count };
    // const query = { where: {}, order: {} } as any;
    // }
    // if (filter.productName) {
    //   query.where.productName = filter.productName;
    // }
    // if (filter.categoryId) {
    //   query.where.categoryId = filter.categoryId;
    // }
    // if (filter.supplierId) {
    //   query.where.supplierId = filter.supplierId;
    // }
    // if (filter.sortByDate) {
    //   query.order.createdAt = filter.sortByDate;
    // }
    // if (filter.sortByPrice) {
    //   query.order.priceOut = filter.sortByPrice;
    // }
    // return this.productRepository.find({ ...query, relations: ['variant'] });
    // lấy tổng số product có trong DB
    // lấy số lượng product theo số lượng truyền vào
  }

  async findAllProductStock(): Promise<ProductStock[]> {
    return this.productStockRepository.find({
      relations: ['products', 'variant'],
    });
  }
  async findAllVariant(): Promise<Variant[]> {
    return this.variantRepository.find();
  }
  async findOneVariant(variantId: number): Promise<Variant> {
    return this.variantRepository.findOne({ where: { variantId } });
  }

  async findOne(productId: number): Promise<Product> {
    return this.productRepository.findOne({
      where: { productId },
      relations: ['supplier', 'category', 'productStock'],
    });
  }

  async createProduct(product: Partial<Product>): Promise<Product> {
    const newProduct = this.productRepository.create(product);
    return this.productRepository.save(newProduct);
  }
  async createProductStock(
    productStock: Partial<ProductStock>,
  ): Promise<ProductStock> {
    const newProductStock = this.productStockRepository.create(productStock);
    return this.productStockRepository.save(newProductStock);
  }
  async createVariant(variant: Partial<Variant>): Promise<Variant> {
    const newVariant = this.variantRepository.create(variant);
    return this.variantRepository.save(newVariant);
  }
  async update(productId: number, product: Partial<Product>): Promise<Product> {
    await this.productRepository.update({ productId }, product);
    return this.productRepository.findOne({ where: { productId } });
  }

  async remove(productId: number): Promise<void> {
    await this.productRepository.delete(productId);
  }
}
