import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './Schema/Order.Schema';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/orders/.env',
      validationSchema: Joi.object({
        KAFKA_URL_BROKER: Joi.string().required(),
        KAFKA_ORDERS_GROUP_ID: Joi.string().required(),
        MONGO_CLUSTER_USERNAME: Joi.string().required(),
        MONGO_CLUSTER_PASSWORD: Joi.string().required(),
        MONGO_CLUSTER_HOST: Joi.string().required(),
        MONGO_CLUSTER_PORT: Joi.string().required(),
        DB_NAME: Joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const username = configService.get<string>('MONGO_CLUSTER_USERNAME');
        const password = configService.get<string>('MONGO_CLUSTER_PASSWORD');
        const host = configService.get<string>('MONGO_CLUSTER_HOST');
        const dbName = configService.get<string>('DB_NAME');
        const uri = `mongodb+srv://${username}:${password}@${host}/${dbName}?retryWrites=true&w=majority`;
        return { uri };
      },
      inject: [ConfigService],
    }),

    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
