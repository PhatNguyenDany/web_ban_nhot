import { PartialType } from '@nestjs/mapped-types';
import { CreateOrder } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrder) {}
