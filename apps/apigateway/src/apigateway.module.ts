import { Module } from '@nestjs/common';
import { ApigatewayController } from './apigateway.controller';
import { ApigatewayService } from './apigateway.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDERS_SERVICE } from '@app/common';
import { Partitioners } from 'kafkajs';
import * as Joi from 'joi';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './apps/apigateway/.env',
      validationSchema: Joi.object({
        KAFKA_URL_BROKER: Joi.string().required(),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: ORDERS_SERVICE,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'orders',
              brokers: [configService.get<string>('KAFKA_URL_BROKER')],
            },
            producerOnlyMode: true,
            consumer: { groupId: 'orders-consumer' },
            producer: { createPartitioner: Partitioners.LegacyPartitioner },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [ApigatewayController],
  providers: [ApigatewayService],
})
export class ApigatewayModule {}
