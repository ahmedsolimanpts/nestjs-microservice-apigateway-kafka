import { NestFactory } from '@nestjs/core';
import { ApigatewayModule } from './apigateway.module';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create(ApigatewayModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');
  await app.listen(PORT);
}
bootstrap();
