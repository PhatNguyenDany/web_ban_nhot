import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipper } from './shipper.entity';
import { CreateShipperDto } from './dto/create-shipper.dto';
import { UpdateShipperDto } from './dto/update-shipper.dto';

@Injectable()
export class ShippersService {
  constructor(
    @InjectRepository(Shipper)
    private readonly shipperRepository: Repository<Shipper>,
  ) {}

  async create(createShipperDto: CreateShipperDto): Promise<Shipper> {
    const newShipper = this.shipperRepository.create(createShipperDto);
    return this.shipperRepository.save(newShipper);
  }

  async findAll(): Promise<Shipper[]> {
    return this.shipperRepository.find();
  }

  async findOne(shipperId: number): Promise<Shipper> {
    const shipper = await this.shipperRepository.findOne({
      where: { shipperId },
    });
    if (!shipper) {
      throw new NotFoundException(`Shipper with ID ${shipperId} not found`);
    }
    return shipper;
  }

  async update(
    shipperId: number,
    updateShipperDto: UpdateShipperDto,
  ): Promise<Shipper> {
    await this.shipperRepository.update(shipperId, updateShipperDto);
    return this.findOne(shipperId); // reuse findOne with error handling
  }

  async remove(shipperId: number): Promise<void> {
    const result = await this.shipperRepository.delete(shipperId);
    if (result.affected === 0) {
      throw new NotFoundException(`Shipper with ID ${shipperId} not found`);
    }
  }
}