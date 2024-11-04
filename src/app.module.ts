import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { QuestionsModule } from './questions/questions.module';
import { ResourcesModule } from './resources/resources.module';
import { TechnologiesModule } from './technologies/technologies.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
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
