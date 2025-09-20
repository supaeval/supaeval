import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectsModule } from './projects/projects.module';
import { DatasetsModule } from './datasets/datasets.module';

@Module({
  imports: [ConfigModule, PrismaModule, ProjectsModule, DatasetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
