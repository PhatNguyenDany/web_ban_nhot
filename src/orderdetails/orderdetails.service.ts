import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetail } from './orderdetail.entity';
import { CreateOrderDetailDto } from './dto/create-orderdetail.dto';

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
  ) {}

  async createOrder(
    createOrderDetailDto: CreateOrderDetailDto,
  ): Promise<OrderDetail> {
    const newOrder = this.orderDetailRepository.create(createOrderDetailDto);
    return this.orderDetailRepository.save(newOrder);
  }

  async findAll(): Promise<OrderDetail[]> {
    const queryBuilder = await this.orderDetailRepository
      .createQueryBuilder('orderDetail')
      .innerJoinAndSelect('orderDetail.orders', 'order')
      .innerJoinAndSelect('orderDetail.productStock', 'productStock')
      .innerJoinAndSelect('order.user', 'user')
      .innerJoinAndSelect('order.shippers', 'shipper')
      .innerJoinAndSelect('productStock.product', 'product')
      .innerJoinAndSelect('productStock.variant', 'variant')
      .innerJoinAndSelect('product.supplier', 'supplier')
      .innerJoinAndSelect('product.category', 'category')
      .select([
        'orderDetail.orderDetailId',
        'orderDetail.quantity',
        'orderDetail.orderDetailTotal',
        'orderDetail.createdAt',
        'orderDetail.updatedAt',
        'order.orderId',
        'order.total',
        'order.status',
        'user.userId',
        'user.firstName',
        'user.lastName',
        'user.phone',
        'user.email',
        'user.address',
        'shipper.shipperId',
        'shipper.shipperName',
        'productStock.productStockId',
        'productStock.priceOut',
        'productStock.stock',
        'product.productId',
        'product.productName',
        'product.description',
        'variant.variantId',
        'variant.capacity',
        'supplier.supplierId',
        'supplier.supplierName',
        'category.categoryId',
        'category.categoryName',
      ]);
    const orderDetails = await queryBuilder.getMany();
    return orderDetails;
  }
  async findOne(orderDetailId: number): Promise<OrderDetail> {
    return this.orderDetailRepository.findOne({ where: { orderDetailId } });
  }

  async update(
    orderDetailId: number,
    orderDetail: Partial<OrderDetail>,
  ): Promise<OrderDetail> {
    await this.orderDetailRepository.update(orderDetailId, orderDetail);
    return this.orderDetailRepository.findOne({ where: { orderDetailId } });
  }

  async remove(orderDetailId: number): Promise<void> {
    await this.orderDetailRepository.delete(orderDetailId);
  }
}
