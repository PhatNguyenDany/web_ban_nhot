import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { OrderDetailService } from './orderdetails.service';
import { CreateOrderDetailDto } from './dto/create-orderdetail.dto';
import { UpdateOrderDetailDto } from './dto/update-orderdetail.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/enums/role.decorator';
import { Role } from 'src/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/enums/roles.guard';
import { OrderDetail } from './orderdetail.entity';

@Controller('orderdetail')
@ApiTags('OrderDetail')
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}

  @Get()
  @ApiBearerAuth('JWT')
  @ApiOperation({summary:'Retrieve all orderDetail'})
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll():Promise<OrderDetail[]> {
    return this.orderDetailService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth('JWT')
  @ApiOperation({summary:'Retrieve a orderDetail by ID'})
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findOne(@Param('id', ParseIntPipe) id: number): Promise<OrderDetail> {
    return this.orderDetailService.findOne(id);
  }
  
  @Post()
  @ApiBearerAuth('JWT')
  @ApiOperation({summary:'Create a new orderDetail'})
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)  
  create(@Body() createOrderDetailDto: CreateOrderDetailDto): Promise<OrderDetail> {
    return this.orderDetailService.createOrder(createOrderDetailDto);
  }

  @Patch(':id')
  @ApiBearerAuth('JWT')
  @ApiOperation({summary:'Update a orderDetail by ID'})
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDetailDto: UpdateOrderDetailDto,
  ): Promise<OrderDetail> {
    return this.orderDetailService.update(id, updateOrderDetailDto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT')
  @ApiOperation({summary:'Delete a orderDetail by ID'})
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.orderDetailService.remove(id);
  }
}
