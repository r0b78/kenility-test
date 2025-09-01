import { Module } from '@nestjs/common';
import { ProductsRepository } from '../products/products.repository';
import { SchemasModule } from 'src/shared/mongoose/schemas/schemas.module';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { OrdersService } from './orders.service';

@Module({
  imports: [SchemasModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository, ProductsRepository],
})
export class OrdersModule {}
