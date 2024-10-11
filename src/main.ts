import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:8080'], // replace with your frontend URLs
    allowedHeaders: [
      'Accept',
      'Authorization',
      'Origin',
      'Content-Type',
      'X-Requested-With',
      'apollo-require-preflight',
    ],
    credentials: true,
  });
  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 1 })); // use graphql-upload middleware
  await app.listen(3000);
}
bootstrap();
