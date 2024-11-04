import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { QuestionsModule } from './questions/questions.module';
import { ResourcesModule } from './resources/resources.module';
import { TechnologiesModule } from './technologies/technologies.module';

@Module({
  imports: [ProjectsModule, QuestionsModule, ResourcesModule, TechnologiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
