import { ObjectId } from 'mongodb';

export interface JwtPayload {
  _id: ObjectId;
  name: string;
  cellphone?: string;
}
