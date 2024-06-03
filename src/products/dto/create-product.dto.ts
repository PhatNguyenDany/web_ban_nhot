import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

enum SortOptions {
  ASC = 'ASC',
  DESC = 'DESC',
}
export class ProductStoctDto {
  @IsNotEmpty()
  @ApiProperty()
  variantId: number;

  @ApiProperty()
  priceIn: number;

  @ApiProperty()
  priceOut: number;

  @ApiProperty()
  stock: number;
}
export class CreateProductDto {
  @IsNotEmpty()
  @ApiProperty()
  productName: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  productStockId: number;

  @ApiProperty()
  supplierId: number;

  @ApiProperty()
  categoryId: number;

  @ApiProperty({ isArray: true, type: ProductStoctDto })
  productstock: ProductStoctDto[];

  @ApiProperty()
  image: string[];
}

export class ProductFilterDTO {
  @ApiProperty()
  skip: number;

  @ApiProperty()
  limit: number;

  @ApiProperty({ required: false })
  productName: string;

  @ApiProperty({ required: false })
  categoryId: string;

  @ApiProperty({ required: false })
  supplierId: number;

  @ApiProperty({
    required: false,
    enum: SortOptions,
    isArray: true,
    example: [SortOptions.ASC, SortOptions.DESC],
  })
  sortByDate: SortOptions;

  @ApiProperty({
    required: false,
    enum: SortOptions,
    isArray: true,
    example: [SortOptions.ASC, SortOptions.DESC],
  })
  sortByPrice: SortOptions;
}
export class ProductFilterLimitDTO {
  @ApiProperty()
  skip: number;

  @ApiProperty()
  limit: number;
}
