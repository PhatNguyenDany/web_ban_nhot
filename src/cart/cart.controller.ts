import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { CreateCartItemDto } from "./dto/create-cart-item.dto";
import { UpdateCartItemDto } from "./dto/update-cart-item.dto";
import { CartService } from "./cart.service";
import { RolesGuard } from "src/enums/roles.guard";
import { Roles } from 'src/enums/role.decorator';
import { Role } from 'src/enums/role.enum';
import { JwtRequest } from "src/auth/jwt-payload.interface";

@Controller('cart')
@ApiTags('Cart')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard,RolesGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Get current user cart' })
  getCart(@Req() req: JwtRequest) {
    return this.cartService.getUserCart(req.user.sub);
  }
  // New route to get total cart value
  @Get('total')
  @ApiOperation({ summary: 'Get total cart value' })
  getTotal(@Req() req) {
    return this.cartService.calculateTotal(req.user.sub);
  }

  // New route to checkout (create order)
  @Post('checkout')
  @ApiOperation({ summary: 'Add item to cart' })
  checkout(@Req() req) {
    return this.cartService.checkout(req.user.sub);
  }

  @Post('add')
  @ApiOperation({ summary: 'Add item to cart' })
  addItem(@Req() req, @Body() dto: CreateCartItemDto) {
    return this.cartService.addItem(req.user.sub, dto);
  }

  @Patch('update/:itemId')
  @ApiOperation({ summary: 'Update item quantity in cart' })
  updateItem(
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() dto: UpdateCartItemDto,
  ) {
    return this.cartService.updateItem(itemId, dto);
  }

  @Delete('item/:itemId')
  @ApiOperation({ summary: 'Remove item from cart' })
  removeItem(@Param('itemId', ParseIntPipe) itemId: number) {
    return this.cartService.removeItem(itemId);
  }

  @Delete()
  @ApiOperation({ summary: 'Clear entire cart' })
  clearCart(@Req() req) {
    return this.cartService.clearCart(req.user.sub);
  }
    
}