import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/shared/mongoose/schemas/order.schema';

export class OrdersRepository {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  async create(data: Partial<Order>): Promise<Order> {
    const order = new this.orderModel(data);
    return order.save();
  }

  async findById(id: string): Promise<Order | null> {
    return this.orderModel.findById(id).populate('products').exec();
  }

  async update(id: string, data: Partial<Order>): Promise<Order | null> {
    return this.orderModel
      .findByIdAndUpdate(id, data, { new: true })
      .populate('products')
      .exec();
  }

  async getTotalByDays(days: number): Promise<number> {
    const start = new Date();
    start.setDate(start.getDate() - days);
    const result = await this.orderModel.aggregate([
      { $match: { createdAt: { $gte: start } } },
      { $group: { _id: null, total: { $sum: '$total' } } },
    ]);
    return result[0]?.total || 0;
  }

  async getOrdersByPrice(
    order: 'asc' | 'desc',
    limit: number,
  ): Promise<Order[]> {
    const sortValue = order === 'asc' ? 1 : -1;
    return this.orderModel
      .find()
      .sort({ total: sortValue })
      .limit(limit)
      .populate('products')
      .exec();
  }
}
