import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class CreateCartItemDto {
  @ApiProperty({  description: 'ID của ProductStock' })
  @IsInt()
  productStockId: number;

  @ApiProperty({description: 'Số lượng sản phẩm' })
  @IsInt()
  @Min(1)
  quantity: number;
}