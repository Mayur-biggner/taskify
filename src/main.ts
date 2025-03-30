import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔹 Configure Swagger
  const config = new DocumentBuilder()
    .setTitle('Task API') // API Title
    .setDescription('Task management API documentation') // API Description
    .setVersion('1.0') // API Version
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document); // Set Swagger UI route

  await app.listen(3000);
}
bootstrap();
