import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateShipperDto {
  @IsNotEmpty()
  @ApiProperty()
  shipperName: string;

  @ApiProperty()
  phone: string;
}
