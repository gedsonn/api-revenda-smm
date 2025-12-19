import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from '@/modules/app.modue';
import { ValidationPipe } from '@nestjs/common';
import { ConfigureWebhook } from './scripts/configure.webhook';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
  //apoś inicializar configurar o webhook da efi ->
  await ConfigureWebhook();
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
