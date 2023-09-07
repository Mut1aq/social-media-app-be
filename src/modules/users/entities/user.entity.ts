import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
}

export const userSchema = SchemaFactory.createForClass(User);

export const userMongooseFeature = { name: User.name, schema: userSchema };
