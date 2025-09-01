import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { BucketService } from 'src/shared/bucket/bucket.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly logger: Logger,
    private readonly bucketService: BucketService,
    private readonly repo: ProductsRepository,
  ) {}

  async create(dto: CreateProductDto, file?: Express.Multer.File) {
    const picture = file && { picture: await this.bucketService.upload(file) };

    return this.repo.create({ ...dto, ...picture });
  }

  async findOne(id: string) {
    const product = await this.repo.findById(id);
    if (!product) {
      this.logger.warn(`Product with id ${id} not found`);
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}
