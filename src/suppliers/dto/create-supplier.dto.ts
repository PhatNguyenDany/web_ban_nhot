import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateSupplierDto {
  @IsNotEmpty()
  @ApiProperty()
  supplierName: string;

  @ApiProperty()
  address: string;

  @ApiProperty({ description: 'Phone number of the user' })
  @IsNotEmpty()
  @IsString()
     @Matches(/^(0|\+84)\d{9,10}$/, {
        message: 'Phone number must be valid Vietnamese format',
      })
    phone: string;
}
