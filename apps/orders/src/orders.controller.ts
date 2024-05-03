import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateOrderDto } from '@app/common/DTO';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @EventPattern('create_order')
  createOrder(@Payload() data: CreateOrderDto) {
    console.log(data);
    return data;
  }
}
