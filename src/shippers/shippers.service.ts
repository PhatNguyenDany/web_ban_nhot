import { Injectable } from '@nestjs/common';
import { CreateShipperDto } from './dto/create-shipper.dto';
import { UpdateShipperDto } from './dto/update-shipper.dto';
import { Shipper } from './shipper.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ShippersService {
  constructor(
    @InjectRepository(Shipper)
    private shipperRepository: Repository<Shipper>,
  ) {}
  async create(createShipperDto: CreateShipperDto): Promise<Shipper> {
    const newShipper = this.shipperRepository.create(createShipperDto);
    return this.shipperRepository.save(newShipper);
  }
  async findAll(): Promise<Shipper[]> {
    return this.shipperRepository.find();
  }
  async findOne(shipperId: number): Promise<Shipper> {
    return this.shipperRepository.findOne({ where: { shipperId } });
  }

  async update(shipperId: number, shipper: Partial<Shipper>): Promise<Shipper> {
    await this.shipperRepository.update(shipperId, shipper);
    return this.shipperRepository.findOne({ where: { shipperId } });
  }

  async remove(shipperId: number): Promise<void> {
    await this.shipperRepository.delete(shipperId);
  }
}
