import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Partitioners } from 'kafkajs';

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
          // brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'orders-consumer',
          allowAutoTopicCreation: true,
        },
        producer: {
          createPartitioner: Partitioners.LegacyPartitioner,
          allowAutoTopicCreation: true,
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
