import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaModule } from './prisma/prisma.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
