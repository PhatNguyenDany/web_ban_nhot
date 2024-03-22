import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

enum SortOptions {
  ASC = 'ASC',
  DESC = 'DESC',
}
export class CreateProductDto {
  @IsNotEmpty()
  @ApiProperty()
  productName: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  variantId: number;

  @ApiProperty()
  supplierId: number;

  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  image: string[];
}

export class ProductFilterDTO {
  @ApiProperty()
  productName: string;

  @ApiProperty()
  categoryId: string;

  @ApiProperty()
  supplierId: number;

  @ApiProperty({
    enum: SortOptions,
    isArray: true,
    example: [SortOptions.ASC, SortOptions.DESC],
  })
  sortByDate: string;

  @ApiProperty({
    enum: SortOptions,
    isArray: true,
    example: [SortOptions.ASC, SortOptions.DESC],
  })
  sortByPrice: string;
}
