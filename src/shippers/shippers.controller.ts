import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShippersService } from './shippers.service';
import { CreateShipperDto } from './dto/create-shipper.dto';
import { UpdateShipperDto } from './dto/update-shipper.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('shippers')
@ApiTags('Shippers')
export class ShippersController {
  constructor(private readonly shippersService: ShippersService) {}

  @Post()
  create(@Body() createShipperDto: CreateShipperDto) {
    return this.shippersService.create(createShipperDto);
  }

  @Get()
  findAll() {
    return this.shippersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shippersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShipperDto: UpdateShipperDto) {
    return this.shippersService.update(+id, updateShipperDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shippersService.remove(+id);
  }
}
