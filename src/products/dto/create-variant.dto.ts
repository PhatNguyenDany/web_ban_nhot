import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateVariantDto {
  @IsNotEmpty()
  @ApiProperty()
  variantName: string;

  @ApiProperty()
  capacity: string;

  @ApiProperty()
  priceIn: number;

  @ApiProperty()
  priceOut: number;

  @ApiProperty()
  stock: string;
}
