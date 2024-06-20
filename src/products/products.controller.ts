import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, ProductFilterDTO } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Product } from './entity/product.entity';
import { CreateVariantDto } from './dto/create-variant.dto';
import { Variant } from './entity/variant.entity';
import { readFile } from 'src/Util/util';
import { ProductStock } from './entity/productstock.entity';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/enums/role.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/enums/roles.guard';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiBearerAuth('JWT')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll(
    @Query() filter: ProductFilterDTO,
  ): Promise<{ product: Product[]; count: number }> {
    return this.productsService.findAll(filter);
  }
  @Get('variant/:id')
  @ApiBearerAuth('JWT')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findOneVariant(@Param('id') id: number): Promise<Variant> {
    const variant = await this.productsService.findOneVariant(id);
    if (!variant) {
      throw new NotFoundException('Variant does not exist!');
    } else {
      return variant;
    }
  }
  @Get('productbyid/:id')
  @ApiBearerAuth('JWT')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findOne(@Param('id') id: number): Promise<Product> {
    const product = await this.productsService.findOne(id);
    if (!product) {
      throw new NotFoundException('Product does not exist!');
    } else {
      return product;
    }
  }

  @Get('productStock')
  @ApiBearerAuth('JWT')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAllProductStock(): Promise<ProductStock[]> {
    return this.productsService.findAllProductStock();
  }
  @Get('variant')
  @ApiBearerAuth('JWT')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAllVariant(): Promise<Variant[]> {
    return this.productsService.findAllVariant();
  }

  @Post()
  @ApiBearerAuth('JWT')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Body() createProductDto: CreateProductDto) {
    for (let i = 0; i < createProductDto.image.length; i++) {
      const imageData = readFile(createProductDto.image[i]);
      if (!imageData) {
        throw new NotFoundException('ImageData does not exist!');
      }
    }
    const newProduct =
      await this.productsService.createProduct(createProductDto);
    const productStockDataAll = [];
    for (let i = 0; i < createProductDto.productstock.length; i++) {
      const productStock = createProductDto.productstock[i];
      productStock['productId'] = newProduct.productId;

      const variantData = await this.productsService.findOneVariant(
        productStock.variantId,
      );
      if (!variantData) {
        throw new NotFoundException('VariantData does not exist!');
      }
      const productStockData =
        await this.productsService.createProductStock(productStock);
      productStockDataAll.push(productStockData);
    }
    newProduct['productStock'] = productStockDataAll;
    return newProduct;
  }

  @Post('variant')
  async createVariant(@Body() createvariantDto: CreateVariantDto) {
    return this.productsService.createVariant(createvariantDto);
  }

  @Put(':id')
  @ApiBearerAuth('JWT')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(
    @Param('id') productId: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<any> {
    return this.productsService.update(productId, updateProductDto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
