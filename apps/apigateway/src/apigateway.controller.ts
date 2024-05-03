import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ORDERS_SERVICE } from '@app/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateOrderDto } from '@app/common/DTO';

@Controller()
export class ApigatewayController implements OnModuleInit {
  constructor(@Inject(ORDERS_SERVICE) private readonly client: ClientKafka) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf('orders.create_order');
    await this.client.connect();
  }

  @Post()
  CreateOrder(@Body() data: CreateOrderDto) {
    return this.client.emit('create_order', data);
  }
}
