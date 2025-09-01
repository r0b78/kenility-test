import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BucketService {
  private s3: S3Client;

  constructor(
    private endpoint: string,
    private accessKeyId: string,
    private secretAccessKey: string,
    private bucket: string,
  ) {
    this.s3 = new S3Client({
      region: 'us-east-1',
      endpoint: this.endpoint,
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
      },
      forcePathStyle: true,
    });
  }

  async upload(file: Express.Multer.File): Promise<string> {
    const key = `${uuid()}-${file.originalname}`;

    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    return `${this.endpoint}/${this.bucket}/${key}`;
  }
}
