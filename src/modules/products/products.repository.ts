import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/shared/mongoose/schemas/product.schema';

export class ProductsRepository {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async create(data: Partial<Product>): Promise<Product> {
    const product = new this.productModel(data);
    return product.save();
  }

  async findById(id: string): Promise<Product | null> {
    return this.productModel.findById(id).exec();
  }
}
