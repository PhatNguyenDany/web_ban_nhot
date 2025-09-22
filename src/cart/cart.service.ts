import { Injectable } from "@nestjs/common";
import { Cart } from "./cart.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "src/orders/order.entity";
import { OrderDetail } from "src/orderdetails/orderdetail.entity";
import { CreateCartItemDto } from "./dto/create-cart-item.dto";
import { CartItem } from "./cart-item.entity";
import { ProductStock } from "src/products/entity/productstock.entity";
import { UpdateCartItemDto } from "./dto/update-cart-item.dto";

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepo: Repository<Cart>,
    @InjectRepository(CartItem) private itemRepo: Repository<CartItem>,
    @InjectRepository(ProductStock) private stockRepo: Repository<ProductStock>,
  ) {}
  
  async getUserCart(userId:number): Promise<Cart>{
    let cart = await this.cartRepo.findOne({ where: { userId }, relations: ['items', 'items.productStock'] });
    if (!cart) {
      cart = this.cartRepo.create({ userId, items: [] });
      await this.cartRepo.save(cart);
    }
    return cart;
  }

  async addItem(userId: number, dto: CreateCartItemDto) {
    const cart = await this.getUserCart(userId);
    const existingItem = cart.items.find(item => item.productStock.productStockId === dto.productStockId);
    
    if (existingItem) {
      existingItem.quantity += dto.quantity;
      return this.itemRepo.save(existingItem);
    }

    const productStock = await this.stockRepo.findOneBy({ productStockId: dto.productStockId });
    const newItem = this.itemRepo.create({ cart, productStock, quantity: dto.quantity });
    return this.itemRepo.save(newItem);
  }

  async calculateTotal(userId: number): Promise<number> {
    const cart = await this.getUserCart(userId);
    let total = 0;
  
    for (const item of cart.items) {
      if (!item.productStock || !item.productStock.priceOut) continue;
      total += item.productStock.priceOut * item.quantity;
    }
  
    return total;
  }

  async checkout(userId: number): Promise<{ orderId: number; total: number }> {
    const cart = await this.getUserCart(userId);
    if (!cart.items.length) throw new Error('Cart is empty');
      let total = 0;
      const order = new Order();
    order.userId = userId;
    order.status = 'Pending';
    order.orderDetails = [];  
    for (const item of cart.items) {
      const stock = await this.stockRepo.findOneBy({ productStockId: item.productStock.productStockId });
      if (!stock || stock.stock < item.quantity) {
        throw new Error(`Not enough stock for productStockId: ${item.productStock.productStockId}`);
      }
        const detail = new OrderDetail();
      detail.productStock = stock;
      detail.quantity = item.quantity;
      detail.price = stock.priceOut;
      detail.orderDetailTotal = stock.priceOut * item.quantity;
      order.orderDetails.push(detail);
  
      total += detail.orderDetailTotal;
  
      // Cập nhật số lượng tồn kho
      stock.stock -= item.quantity;
      await this.stockRepo.save(stock);
    }
  
    order.total = total;
  
    const savedOrder = await this.cartRepo.manager.save(Order, order);
  
    // Xoá giỏ hàng sau khi checkout
    await this.itemRepo.delete({ cart: { id: cart.id } });
  
    return { orderId: savedOrder.orderId, total };
  }
  
  async updateItem(itemId: number, dto: UpdateCartItemDto){
    const item = await this.itemRepo.findOneBy({ id: itemId });
    item.quantity = dto.quantity;
    return this.itemRepo.save(item);
  }
  async removeItem(itemId: number) {
    return this.itemRepo.delete(itemId);
  }

  async clearCart(userId: number) {
    const cart = await this.getUserCart(userId);
    return this.cartRepo.delete(cart.id);
  }
}
