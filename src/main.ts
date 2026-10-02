import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. ¡LA MAGIA DE CORS!
  // Esto le dice a NestJS que acepte peticiones desde cualquier origen (incluyendo tu React)
  app.enableCors();

  // Si quisieras ser súper estricto y seguro en producción, harías esto:
  // app.enableCors({ origin: 'http://localhost:5173' }); // Solo permite a tu React

  // Guardia Global de los DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  // Servidor de archivos estáticos para las fotos de las mascotas
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  await app.listen(3000);
}
bootstrap();