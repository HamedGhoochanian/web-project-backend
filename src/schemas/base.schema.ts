import { Prop, Schema } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';

@Schema({})
export class Base {
  _id?: ObjectId;

  @Prop({
    type: Boolean,
    required: false,
    default: false,
  })
  deleted: boolean;

  @Prop({
    type: Date,
    required: false,
    default: null,
  })
  deletedAt: Date;

  @Prop({
    type: Date,
    required: false,
    default: null,
  })
  updatedAt: Date;

  @Prop({
    type: Date,
    required: false,
    default: () => new Date(),
  })
  createdAt: Date;
}
