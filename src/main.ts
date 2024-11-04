import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

//boostrap se encarga de inicializar toda la aplicación de NestJS
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Validación de entrada de datos global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Aseguramos que solo sean permitidas propiedades dentro de las DTO
      forbidNonWhitelisted: true, //Rechaza cualquier propiedad no permitida
      transform: true, //Transforma los datos recibidos a los tipos apropiados de las clases DTO
    }),
  );
  //Inicializa la aplicación
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
