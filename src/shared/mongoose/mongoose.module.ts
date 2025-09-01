import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URI');

        if (!uri) {
          throw new Error('Missing Mongo configuration: MONGO_URI');
        }

        return { uri };
      },
    }),
  ],
  exports: [MongooseModule],
})
export class MongooseProviderModule {}
