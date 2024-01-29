import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from './supplier.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
    supplier: Partial<Supplier>,
  ): Promise<Supplier> {
    await this.supplierRepository.update(supplierId, supplier);
    return this.supplierRepository.findOne({ where: { supplierId } });
  }

  async remove(supplierId: number): Promise<void> {
    await this.supplierRepository.delete(supplierId);
  }
}
