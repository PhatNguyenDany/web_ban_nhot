import { PartialType } from '@nestjs/mapped-types';
import { CreateProductStockDto } from './create-productstock.dto';

export class UpdateProductStockDto extends PartialType(CreateProductStockDto) {}
