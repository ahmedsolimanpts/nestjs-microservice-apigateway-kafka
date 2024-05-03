import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(OrdersModule);
  const configService = appContext.get(ConfigService);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrdersModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'orders',
          brokers: [configService.get<string>('KAFKA_URL_BROKER')],
        },
        consumer: {
          groupId: 'orders-consumer',
          allowAutoTopicCreation: true,
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
