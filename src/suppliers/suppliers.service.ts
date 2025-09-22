import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
// import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from './supplier.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
  ) {}
  async create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    const newsupplier = this.supplierRepository.create(createSupplierDto);
    return this.supplierRepository.save(newsupplier);
  }

  async findAll(): Promise<Supplier[]> {
    return this.supplierRepository.find();
  }

  async findOne(supplierId: number): Promise<Supplier> {
    return this.supplierRepository.findOne({ where: { supplierId } });
  }

  async update(
    supplierId: number,
    supplier: UpdateSupplierDto,
  ): Promise<Supplier> {const existing = await this.supplierRepository.findOne({ where: { supplierId } });
  if (!existing) {
    throw new NotFoundException(`Supplier with id ${supplierId} not found`);}
    await this.supplierRepository.update(supplierId, supplier);
  return this.supplierRepository.findOne({ where: { supplierId } });
  }

  async remove(supplierId: number): Promise<void> {
    const result = await this.supplierRepository.delete(supplierId);
    if (result.affected === 0) {
      throw new NotFoundException(`Supplier with id ${supplierId} not found`);
    }
  }
}
