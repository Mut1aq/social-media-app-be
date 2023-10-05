import { Document } from 'mongoose';

export interface UserI extends Document {
  email: string;

  password: string;

  username: string;
}
