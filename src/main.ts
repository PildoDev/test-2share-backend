import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('archetype-nest-postgres-2share')
    .setDescription(
      'This archetype is for microservices with nestjs and postgres for 2share test',
    )
    .setVersion('1.0')
    .addTag('archetype-nest-postgres-2share')
    .build();

  app.enableCors({
    origin: ['http://localhost:4200'],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/api/doc', app, document, {
    explorer: false,
    swaggerOptions: {
      filter: false,
      showRequestDuration: true,
    },
  });

  console.log(
    'Application successfully started, running in port: ' + process.env.PORT ||
      3000,
  );
  await app.listen(process.env.PORT || 3000);
}
bootstrap().then();