import { IsInt, IsNotEmpty } from "class-validator";
import { ProductStockDto } from "./create-product.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductStockDto extends ProductStockDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  productId: number;
}
