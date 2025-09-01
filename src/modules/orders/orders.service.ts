import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { Product } from 'src/shared/mongoose/schemas/product.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly logger: Logger,
    private readonly repo: OrdersRepository,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async create(dto: CreateOrderDto) {
    const products = await this.productModel
      .find({ _id: { $in: dto.products } })
      .exec();
    if (products.length === 0) {
      this.logger.warn(`Product with ids ${dto.products} not found`);
      throw new NotFoundException('Products not found');
    }
    const total = products.reduce((sum, p) => sum + p.price, 0);
    return this.repo.create({
      clientName: dto.clientName,
      total,
      products,
    });
  }

  async update(id: string, dto: UpdateOrderDto) {
    const order = await this.repo.findById(id);
    if (!order) throw new NotFoundException('Order not found');
    let total = order.total;
    let products = order.products;
    if (dto.products) {
      const newProducts = await this.productModel
        .find({ _id: { $in: dto.products } })
        .exec();
      if (newProducts.length === 0) {
        this.logger.warn(`Product with ids ${dto.products} not found`);
        throw new NotFoundException('Products not found');
      }
      products = newProducts;
      total = newProducts.reduce((sum, p) => sum + p.price, 0);
    }
    return this.repo.update(id, {
      clientName: dto.clientName ?? order.clientName,
      total,
      products,
    });
  }

  async getTotalByDays(days: number) {
    return { total: await this.repo.getTotalByDays(days) };
  }

  async getOrdersByPrice(order: 'asc' | 'desc', limit: number) {
    const orders = await this.repo.getOrdersByPrice(order, limit);
    if (!orders || orders.length === 0) {
      this.logger.warn(`No orders found on ${order}`);
      throw new NotFoundException('No orders found');
    }
    return orders;
  }
}
