import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateOrderDto } from '@app/common/DTO';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern('create_order')
  createOrder(@Payload() data: CreateOrderDto) {
    return data;
  }
}
