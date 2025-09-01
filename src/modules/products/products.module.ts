import { Module } from '@nestjs/common';
import { SchemasModule } from 'src/shared/mongoose/schemas/schemas.module';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';
import { ProductsPort } from './ports/products.port';
import { BucketModule } from 'src/shared/bucket/bucket.module';

export const PRODUCTS_PORT = 'PRODUCTS_PORT';

@Module({
  imports: [SchemasModule, BucketModule],
  controllers: [ProductsController],
  providers: [
    {
      provide: PRODUCTS_PORT,
      useClass: ProductsService,
    },
    ProductsService,
    ProductsRepository,
  ],
  exports: [PRODUCTS_PORT],
})
export class ProductsModule {}
