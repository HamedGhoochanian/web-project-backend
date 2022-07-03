import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document as MongoDocument } from 'mongoose';
import { Base } from './base.schema';
import { applyDeletedFieldBeforeHooks } from './schemaUtils';

export enum UserRole {
  User = 'user',
  Admin = 'admin',
}

@Schema({ collection: 'users' })
export class User extends Base {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  passwordHash: string;

  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  cellphone: string;

  @Prop({
    type: [String],
    required: true,
    default: () => [UserRole.User],
    enum: [UserRole.User, UserRole.Admin],
  })
  roles: string[];

  @Prop({ type: Boolean, default: true, required: true })
  active: boolean;
}

export type UserDocument = User & MongoDocument;
export const UserSchema = SchemaFactory.createForClass(User);
applyDeletedFieldBeforeHooks(UserSchema);
