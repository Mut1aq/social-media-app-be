import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    type: String,
    trim: true,
    minlength: 5,
    maxlength: 320,
    unique: true,
    required: [true, 'Email must be provided'],
  })
  email!: string;

  @Prop({
    type: String,
    required: true,
  })
  password!: string;

  @Prop({
    type: String,
    minlength: 3,
    maxlength: 30,
    unique: true,
    required: true,
    trim: true,
  })
  username!: string;

  @Prop({
    type: Number,
    min: 2,
    max: 5,
    required: true,
  })
  test!: number;
}

export const userSchema = SchemaFactory.createForClass(User);

export const userMongooseFeature = { name: User.name, schema: userSchema };
