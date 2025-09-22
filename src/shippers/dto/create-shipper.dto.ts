import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';

export class CreateShipperDto {
  @IsNotEmpty({ message: 'Shipper name is required' })
  @ApiProperty()
  shipperName: string;

  @IsNotEmpty({ message: 'Phone number is required' })
  @ApiProperty()
  @Matches(/^(0|\+84)\d{9,10}$/, {
    message: 'Phone number must be valid Vietnamese format',
  })
  phone: string;
}
