import { Injectable } from '@nestjs/common';
import { CreateShipperDto } from './dto/create-shipper.dto';
import { UpdateShipperDto } from './dto/update-shipper.dto';

@Injectable()
export class ShippersService {
  create(createShipperDto: CreateShipperDto) {
    return 'This action adds a new shipper';
  }

  findAll() {
    return `This action returns all shippers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shipper`;
  }

  update(id: number, updateShipperDto: UpdateShipperDto) {
    return `This action updates a #${id} shipper`;
  }

  remove(id: number) {
    return `This action removes a #${id} shipper`;
  }
}
