import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSupplierDto {
  @IsNotEmpty()
  @ApiProperty()
  supplierName: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  phone: string;
}
