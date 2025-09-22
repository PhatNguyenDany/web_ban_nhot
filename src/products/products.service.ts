import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';
import { CreateProductDto, ProductFilterDTO } from './dto/create-product.dto';
import { Variant } from './entity/variant.entity';
import { ProductStock } from './entity/productstock.entity';
import { CreateProductStockDto } from './dto/create-productstock.dto';
import { CreateVariantDto } from './dto/create-variant.dto';
import { readFile } from 'src/Util/util';

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
    const totalPage = Math.ceil(count / filter.limit || 1);
if (filter.page > totalPage) {
  throw new NotFoundException(`Page ${filter.page} exceeds total pages (${totalPage})`);
}
const skip = (filter.page - 1) * filter.limit;
    const product = await queryBuilder
      .offset(skip)
      .limit(filter.limit)
      .getMany();

    return { product, count };
  }

  async findAllProductStock(): Promise<ProductStock[]> {
    const queryBuilder = this.productStockRepository
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
    if (!productStockFinal || productStockFinal.length === 0) {
      throw new NotFoundException('No product stock found');
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
  
  async createFullProduct(createProductDto: CreateProductDto): Promise<Product>  {
      for (const image of createProductDto.image)  {
        const imageData = readFile(image);
        if (!imageData) {
          throw new NotFoundException('ImageData does not exist!');
        }
      }
      const newProduct =
        await this.createProduct(createProductDto);
      const productStockDataAll = [];
      for (let i = 0; i < createProductDto.productstock.length; i++) {
        const stockItem = createProductDto.productstock[i];
      
        const variantData = await this.findOneVariant(stockItem.variantId);
        if (!variantData) {
          throw new NotFoundException('VariantData does not exist!');
        }
      
        const createStockDto: CreateProductStockDto = {
          ...stockItem,
          productId: newProduct.productId, 
        };
      
        const productStockData = await this.createProductStock(createStockDto);
        productStockDataAll.push(productStockData);
      }
      newProduct['productStock'] = productStockDataAll;
    return newProduct;
    }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = this.productRepository.create(createProductDto);
    return this.productRepository.save(newProduct);
  }
  async createProductStock(
    createProductStockDto: CreateProductStockDto,
  ): Promise<ProductStock> {
    const newProductStock = this.productStockRepository.create(createProductStockDto);
    return this.productStockRepository.save(newProductStock);
  }
  async createVariant(
    createVariantDto: CreateVariantDto,
  ): Promise<Variant> {
    const newVariant = this.variantRepository.create(createVariantDto);
    return this.variantRepository.save(newVariant);
  }
  async update(productId: number, product: Partial<Product>): Promise<Product> {
    await this.productRepository.update({ productId }, product);
    return this.productRepository.findOne({ where: { productId } });
  }

  async remove(productId: number): Promise<void> {
    const found = await this.productRepository.findOne({ where: { productId } });
    if (!found) {
      throw new NotFoundException('Product not found');
    }
    await this.productRepository.delete(productId);
  }
}
