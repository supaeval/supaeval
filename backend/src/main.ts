import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { AppModule } from './app.module';
import { validateEnv } from './config/validate-env';
import { ProjectsModule } from './projects/projects.module';

const printOASToFile = () => {
  const env = validateEnv(process.env);

  if (process.env.PRINT_OAS_TO_FILE) {
    fetch(`http://localhost:${env.PORT || 3000}/v1/docs-json`)
      .then((res) => res.json())
      .then((data) => {
        writeFileSync(
          join(__dirname, '../../openapi/', 'spec.json'),
          JSON.stringify(data, null, 2),
        );
        console.log('OpenAPI spec written to openapi.json');
      });
  }
};

async function bootstrap() {
  const env = validateEnv(process.env);
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    snapshot: true,
    cors: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // autoconvert types
      whitelist: true, // strips unknown properties
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  const config = new DocumentBuilder()
    .setTitle('SUPAEVAL API')
    .setVersion('1.0')
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, config, {
      include: [ProjectsModule],
      extraModels: [],
    });

  SwaggerModule.setup('v1/docs', app, documentFactory);

  console.log(
    `Listening on port ${env.PORT || 3000}: http://localhost:${env.PORT || 3000}`,
  );
  await app.listen(env.PORT || 3000, () => {
    printOASToFile();
  });
}
bootstrap();
