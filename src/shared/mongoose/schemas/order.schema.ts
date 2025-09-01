import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from './product.schema';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ required: true })
  clientName: string;

  @Prop({ required: true })
  total: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: Product.name }] })
  products: Product[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
