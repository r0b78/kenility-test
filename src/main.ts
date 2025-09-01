import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  return app;
}

if (require.main === module) {
  bootstrap().then((app) => app.listen(process.env.PORT ?? 3000));
}
