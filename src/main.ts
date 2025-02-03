import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  // OPEN API DOCUMENTATION
  const config = new DocumentBuilder()
    .setTitle('SHADOW POS DOCUMENTATION')
    .setDescription('documentacion para la api de SHADOW POS')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // servir  archivos estaticos
  app.useStaticAssets(join(__dirname, '../public'));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
