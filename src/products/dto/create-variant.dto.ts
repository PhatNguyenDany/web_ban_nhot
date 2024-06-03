import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateVariantDto {
  @IsNotEmpty()
  @ApiProperty()
  capacity: string;
}
