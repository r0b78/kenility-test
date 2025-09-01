import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { MongooseProviderModule } from './shared/mongoose/mongoose.module';
import { LoggerModule } from './shared/logger/logger.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { MongooseExceptionFilter } from './shared/mongoose/mongoose.exception.filter';
import { BucketModule } from './shared/bucket/bucket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    BucketModule,
    LoggerModule,
    MongooseProviderModule,
    AuthModule,
    ProductsModule,
    OrdersModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: MongooseExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
