import { Body, Controller, Get, OnModuleInit, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { CreateOrderDto } from '@app/common/DTO';

@Controller()
export class ApigatewayController implements OnModuleInit {
  private client: ClientKafka;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    this.client = new ClientKafka({
      client: {
        clientId: 'apigateway',
        brokers: [this.configService.get<string>('KAFKA_URL_BROKER')],
      },
      consumer: {
        groupId: this.configService.get<string>(
          'KAFKA_ORDER_CONSUMER_GROUP_ID',
        ),
      },
    });

    this.client.subscribeToResponseOf('create-order');
    this.client.subscribeToResponseOf('get-orders');
    await this.client.connect();
  }

  @Post()
  CreateOrder(@Body() data: CreateOrderDto) {
    return this.client.send('create-order', data);
  }

  @Get()
  GetOrder() {
    return this.client.send('get-orders', {});
  }

  async onModuleDestroy() {
    await this.client.close();
  }
}
