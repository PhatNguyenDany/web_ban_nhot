import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateOrderdetailDto {
  @IsNotEmpty()
  @ApiProperty()
  quantity: string;
}
