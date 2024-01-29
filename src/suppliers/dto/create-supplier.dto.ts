import { IsNotEmpty } from 'class-validator';

export class CreateSupplierDto {
  @IsNotEmpty()
  supplierName: string;

  address: string;

  phone: string;
}
