import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Category } from './category.schema';

@Schema({ collection: 'products' })
export class Product {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'categories' })
  category: Category;

  @Prop({ min: 0 })
  listPrice: number;

  @Prop({ min: 0 })
  unitCost: number;

  @Prop()
  status: string;

  @Prop({ type: [String] })
  attributes: string[];

  @Prop({ min: 0 })
  quantity: number;
}

export const productsSchema = SchemaFactory.createForClass(Product);
export type ProductsDocument = mongoose.Document & Product;
