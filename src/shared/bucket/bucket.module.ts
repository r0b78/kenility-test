import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BucketService } from './bucket.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: BucketService,
      useFactory: (configService: ConfigService) => {
        const endpoint = configService.get<string>('MINIO_ENDPOINT');
        const rootUser = configService.get<string>('MINIO_ROOT_USER');
        const rootPassword = configService.get<string>('MINIO_ROOT_PASSWORD');
        const bucket = configService.get<string>('MINIO_BUCKET');

        if (!endpoint || !rootUser || !rootPassword || !bucket) {
          throw new Error('Missing MinIO configuration variables in .env');
        }

        return new BucketService(endpoint, rootUser, rootPassword, bucket);
      },
      inject: [ConfigService],
    },
  ],
  exports: [BucketService],
})
export class BucketModule {}
