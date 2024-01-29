import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { Product } from './entity/product.entity';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    const product = await this.productsService.findOne(id);
    if (!product) {
      throw new NotFoundException('Product does not exist!');
    } else {
      return product;
    }
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Put(':id')
  async update(
    @Param('id') productId: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<any> {
    return this.productsService.update(productId, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
