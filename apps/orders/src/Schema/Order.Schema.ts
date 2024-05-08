import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Order {
  @Prop()
  name: string;

  @Prop()
  amount: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
