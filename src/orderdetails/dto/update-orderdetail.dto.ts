import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDetailDto } from './create-orderdetail.dto';

export class UpdateOrderDetailDto extends PartialType(CreateOrderDetailDto) {}
