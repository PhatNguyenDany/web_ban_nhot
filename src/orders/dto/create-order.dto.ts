import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserOrderDetailDto {
  @IsNotEmpty()
  @ApiProperty()
  productStockId: number;

  @ApiProperty()
  quantity: number;
}
export class CreateOrder {
  @IsNotEmpty()
  @ApiProperty({ isArray: true, type: CreateUserOrderDetailDto })
  order: CreateUserOrderDetailDto[];
}
