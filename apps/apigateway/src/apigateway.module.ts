import { Module } from '@nestjs/common';
import { ApigatewayController } from './apigateway.controller';
import { ApigatewayService } from './apigateway.service';
import { ConfigModule } from '@nestjs/config';

import * as Joi from 'joi';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/apigateway/.env',
      validationSchema: Joi.object({
        KAFKA_URL_BROKER: Joi.string().required(),
        KAFKA_ORDER_CONSUMER_GROUP_ID: Joi.string().required(),
        KAFKA_API_GATEWAY_ORDER_CLIENT_ID: Joi.string().required(),
      }),
    }),
  ],
  controllers: [ApigatewayController],
  providers: [ApigatewayService],
})
export class ApigatewayModule {}
