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
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, ProductFilterDTO } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Product } from './entity/product.entity';
import { CreateVariantDto } from './dto/create-variant.dto';
import { Variant } from './entity/variant.entity';
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
  @ApiOperation({summary:'Retrieve all products'})
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll(
    @Query() filter: ProductFilterDTO,
  ): Promise<{ product: Product[]; count: number }> {
    return this.productsService.findAll(filter);
  }
  @Get('variant/:id')
  @ApiBearerAuth('JWT')
  @ApiOperation({summary:'Retrieve variant by a ID'})
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findOneVariant(@Param('id', ParseIntPipe) id: number): Promise<Variant> {
    const variant = await this.productsService.findOneVariant(id);
    if (!variant) {
      throw new NotFoundException('Variant does not exist!');
    } else {
      return variant;
    }
  }
  @Get('productbyid/:id')
  @ApiBearerAuth('JWT')
  @ApiOperation({summary:'Retrieve product by a ID'})
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findOne( @Param('id', ParseIntPipe) id: number): Promise<Product> {
    const product = await this.productsService.findOne(id);
    if (!product) {
      throw new NotFoundException('Product does not exist!');
    } else {
      return product;
    }
  }

  @Get('productStock')
  @ApiBearerAuth('JWT')
  @ApiOperation({summary:'Retrieve all productStock'})
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAllProductStock(): Promise<ProductStock[]> {
    return this.productsService.findAllProductStock();
  }
  @Get('variant')
  @ApiBearerAuth('JWT')
  @ApiOperation({summary:'Retrieve all variant'})
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAllVariant(): Promise<Variant[]> {
    return this.productsService.findAllVariant();
  }

  @Post()
  @ApiBearerAuth('JWT')
  @ApiOperation({summary:'Create new Product and ProductStock'})
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Body() createProductDto: CreateProductDto): Promise<Product>  {
    return this.productsService.createFullProduct(createProductDto);
  }

  @Post('variant')
  @ApiBearerAuth('JWT')
  @ApiOperation({summary:'Create new variant'}) 
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createVariant(@Body() createvariantDto: CreateVariantDto): Promise<Variant>  {
    return this.productsService.createVariant(createvariantDto);
  }

  @Patch(':id')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Update product by a ID' })
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(
    @Param('id', ParseIntPipe) productId: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(productId, updateProductDto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Delete product by a Id' })
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void>  {
    return this.productsService.remove(id);
  }
}
