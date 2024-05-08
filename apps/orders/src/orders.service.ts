import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './Schema/Order.Schema';
import { Model } from 'mongoose';
import { CreateOrderDto } from '@app/common';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private OrderModel: Model<Order>) {}

  async create(data: CreateOrderDto) {
    try {
      const newOrder = new this.OrderModel(data);
      return await newOrder.save();
    } catch (err) {
      throw err;
    }
  }

  async findAll() {
    try {
      return await this.OrderModel.find().exec();
    } catch (err) {
      throw err;
    }
  }
}
