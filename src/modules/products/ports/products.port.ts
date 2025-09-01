import { Product } from 'src/shared/mongoose/schemas/product.schema';

export interface ProductsPort {
  findByIds(ids: string[]): Promise<Product[]>;
}
