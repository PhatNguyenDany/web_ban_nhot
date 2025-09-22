import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/enums/role.decorator';
import { Role } from 'src/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/enums/roles.guard';
import { CreateOrder } from './dto/create-order.dto';
import { Order } from './order.entity';

@Controller('orders')
@ApiTags('Orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

   @Get()
  @ApiBearerAuth('JWT')
  @ApiOperation({summary:'Retrieve all orders'})
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth('JWT')
  @ApiOperation({summary:'Retrieve a order by ID'})
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return this.ordersService.findOne(id);
  }

  @Post()
  @ApiBearerAuth('JWT')
  @ApiOperation({summary:'Create a new order'})
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Req() req: any, @Body() createOrderDto: CreateOrder): Promise<Order>  {
    return this.ordersService.createOrderForUser(req.user, createOrderDto);
  }

  @Patch(':id')
  @ApiBearerAuth('JWT')
  @ApiOperation({summary:'Update a order by ID'})
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: Order): Promise<Order>  {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT')
  @ApiOperation({summary:'Delete a order by ID'})
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void>  {
    return this.ordersService.remove(id);
  }
}
