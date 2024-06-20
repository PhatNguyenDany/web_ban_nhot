import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { CreateOrder } from './dto/create-order.dto';
import { ProductStock } from 'src/products/entity/productstock.entity';
import { OrderDetail } from 'src/orderdetails/orderdetail.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(ProductStock)
    private productStockRepository: Repository<ProductStock>,
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
  ) {}

  async findProductStockById(productStockId: number): Promise<ProductStock> {
    const productStock = await this.productStockRepository.findOne({
      where: { productStockId },
      select: ['productStockId', 'priceOut', 'stock', 'product'],
      relations: ['product'],
    });
    if (!productStock) {
      throw new NotFoundException(
        `Product stock with ID ${productStockId} not found`,
      );
    }

    return productStock;
  }

  async createOrder(
    createOrderDto: CreateOrder,
    userId: number,
  ): Promise<Order> {
    const orderDetails = [...createOrderDto.order];

    let totalAll = 0;
    // kiểm tra productstockid có trong db không
    for (const orderDetail of orderDetails) {
      const dataProductStock = await this.findProductStockById(
        orderDetail.productStockId,
      );
      if (!dataProductStock) {
        throw new NotFoundException(
          `Product stock with ID ${orderDetail.productStockId} not found`,
        );
      }
      const { quantity: quantityOrder } = orderDetail;
      const { stock: stockProduct, product, priceOut } = dataProductStock;
      const productOutOfStock = product.productName;
      // kiểm tra quantity trong stock có > hơn quantity order hay không
      if (quantityOrder > stockProduct) {
        // báo lỗi tên sản phẩm hết hàng
        throw new NotFoundException(`${productOutOfStock} out of stock  `);
      }
      // tính totalDetail và totalAll
      const totalDetail = priceOut * quantityOrder;
      orderDetail['orderDetailTotal'] = totalDetail;
      orderDetail['productStock'] = dataProductStock;
      orderDetail.quantity = quantityOrder;
      totalAll = totalDetail + totalAll;
    }
    // tạo order,
    const dataOrder = {
      userId,
      total: totalAll,
      shipperId: 1,
      status: 'pending',
    };
    const newOrder = this.orderRepository.create(dataOrder);
    const savedOrder = await this.orderRepository.save(newOrder);
    for (const orderDetail of orderDetails) {
      // tạo orderdetail
      const newOrderDetail = this.orderDetailRepository.create({
        orders: savedOrder,
        productStockId: orderDetail.productStockId,
        quantity: orderDetail.quantity,
        orderDetailTotal: orderDetail['orderDetailTotal'],
      });

      await this.orderDetailRepository.save(newOrderDetail);
      // trừ số lượng đã order trong stock,
      orderDetail['productStock'].stock -= orderDetail.quantity;
      await this.productStockRepository.save(orderDetail['productStock']);
    }

    return savedOrder;
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }
  async findOne(orderId: number): Promise<Order> {
    return this.orderRepository.findOne({ where: { orderId } });
  }

  async update(orderId: number, order: Partial<Order>): Promise<Order> {
    await this.orderRepository.update(orderId, order);
    return this.orderRepository.findOne({ where: { orderId } });
  }

  async remove(orderId: number): Promise<void> {
    await this.orderRepository.delete(orderId);
  }
}
