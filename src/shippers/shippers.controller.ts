import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ShippersService } from './shippers.service';
import { CreateShipperDto } from './dto/create-shipper.dto';
import { UpdateShipperDto } from './dto/update-shipper.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('shippers')
@ApiTags('Shippers')
export class ShippersController {
  constructor(private readonly shippersService: ShippersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new shipper' })
  create(@Body() createShipperDto: CreateShipperDto) {
    return this.shippersService.create(createShipperDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all shippers' })
  findAll() {
    return this.shippersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a shipper by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.shippersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a shipper by ID' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateShipperDto: UpdateShipperDto,
  ) {
    return this.shippersService.update(id, updateShipperDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a shipper by ID' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.shippersService.remove(id);
  }
}