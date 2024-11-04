import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

//Modulo global para utilizar en toda la aplicación
@Global()
@Module({
  providers: [PrismaService],
})
export class PrismaModule {}
