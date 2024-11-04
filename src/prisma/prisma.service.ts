//Conexión con la base de datos.
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    //Conecta a la db
  async onModuleInit() {
    await this.$connect();
  }
  //Desconecta a la db
  async OnModuleDestroy() {
    await this.$disconnect();
  }
}
