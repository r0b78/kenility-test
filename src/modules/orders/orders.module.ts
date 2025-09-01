import { Module } from '@nestjs/common';
import { SchemasModule } from 'src/shared/mongoose/schemas/schemas.module';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { OrdersService } from './orders.service';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [SchemasModule, ProductsModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
