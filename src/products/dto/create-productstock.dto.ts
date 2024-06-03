import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
enum SortOptions {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class CreateProductStockDto {
  @IsNotEmpty()
  @ApiProperty()
  productId: number;

  @ApiProperty()
  variantId: number;

  @ApiProperty({
    enum: SortOptions,
    isArray: true,
    example: [SortOptions.ASC, SortOptions.DESC],
  })
  priceIn: SortOptions;

  @ApiProperty({
    enum: SortOptions,
    isArray: true,
    example: [SortOptions.ASC, SortOptions.DESC],
  })
  priceOut: SortOptions;

  @ApiProperty()
  stock: number;
}
