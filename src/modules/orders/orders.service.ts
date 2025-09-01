import { Injectable, Logger, NotFoundException, Inject } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ProductsPort } from '../products/ports/products.port';
import { PRODUCTS_PORT } from '../products/products.module';

@Injectable()
export class OrdersService {
  constructor(
    private readonly logger: Logger,
    private readonly repo: OrdersRepository,
    @Inject(PRODUCTS_PORT) private readonly productsPort: ProductsPort,
  ) {}

  async create(dto: CreateOrderDto) {
    const products = await this.productsPort.findByIds(dto.products);
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
      const newProducts = await this.productsPort.findByIds(dto.products);
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
