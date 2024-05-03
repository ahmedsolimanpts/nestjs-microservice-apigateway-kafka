import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ORDERS_SERVICE } from '@app/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateOrderDto } from '@app/common/DTO';

@Controller()
export class ApigatewayController {
  constructor(@Inject(ORDERS_SERVICE) private readonly client: ClientKafka) {}

  // async onModuleInit() {
  //   await this.client.connect();
  //   this.client.subscribeToResponseOf('create_order.reply');
  // }

  @Post()
  CreateOrder(@Body() data: CreateOrderDto) {
    return this.client.send('create_order', data);
  }
}
