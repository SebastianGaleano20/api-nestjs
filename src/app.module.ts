import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { QuestionsModule } from './questions/questions.module';
import { ResourcesModule } from './resources/resources.module';
import { TechnologiesModule } from './technologies/technologies.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      //Permite acceder a los modulos en toda la aplicación
      isGlobal: true,
    }),
    ProjectsModule,
    QuestionsModule,
    ResourcesModule,
    TechnologiesModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
