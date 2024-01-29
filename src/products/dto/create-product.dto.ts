import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

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
