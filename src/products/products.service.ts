import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';
import { ProductFilterDTO } from './dto/create-product.dto';
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
      queryBuilder.andWhere('product.product_name LIKE :productName', {
        productName: `%${filter.productName}%`,
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
    const count = await queryBuilder.getCount();
    const totalPage = count / filter.limit;
    if (filter.page > totalPage) {
      throw new Error('page lớn hơn totalPage');
    }
    let skip = 0;
    if (filter.page != 1) {
      skip = filter.page * filter.limit;
    }
    const product = await queryBuilder
      .offset(skip)
      .limit(filter.limit)
      .getMany();

    return { product, count };
  }

  async findAllProductStock(): Promise<ProductStock[]> {
    const queryBuilder = await this.productStockRepository
      .createQueryBuilder('productstock')
      .innerJoinAndSelect('productstock.product', 'product')
      .innerJoinAndSelect('productstock.variant', 'variant')
      .innerJoinAndSelect('product.supplier', 'supplier')
      .innerJoinAndSelect('product.category', 'category')
      .select([
        'productstock.productStockId',
        'productstock.productId',
        'productstock.variantId',
        'productstock.priceIn',
        'productstock.priceOut',
        'productstock.stock',
        'productstock.product',
        'product.productName',
        'product.productId',
        'product.description',
        'product.productStockId',
        'product.supplierId',
        'product.categoryId',
        'product.image',
        'supplier.supplierId',
        'supplier.supplierName',
        'supplier.address',
        'supplier.phone',
        'category.categoryId',
        'category.categoryName',
        'category.description',
        'variant.variantId',
        'variant.capacity',
      ]);
    const productStockFinal = await queryBuilder.getMany();
    if (!productStockFinal) {
      throw new NotFoundException('ProductStock does not exist!');
    }
    return productStockFinal;
  }
  async findAllVariant(): Promise<Variant[]> {
    return this.variantRepository.find();
  }
  async findOneVariant(variantId: number): Promise<Variant> {
    return this.variantRepository.findOne({ where: { variantId } });
  }

  async findOne(productId: number): Promise<Product> {
    const queryBuilder = await this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.productStock', 'productStock')
      .innerJoinAndSelect('productStock.variant', 'variant')
      .innerJoinAndSelect('product.supplier', 'supplier')
      .innerJoinAndSelect('product.category', 'category')
      .where('product.productId = :productId', { productId: productId })
      .select([
        'product.productId',
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
    const productFinal = await queryBuilder.getOne();
    if (!productFinal) {
      throw new NotFoundException('Product does not exist!');
    }
    return productFinal;
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
