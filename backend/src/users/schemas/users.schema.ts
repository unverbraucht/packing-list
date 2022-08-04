import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field } from '@nestjs/graphql';

import * as mongoose from 'mongoose';

export type UserDocument = User & mongoose.Document;
export type LeanUserDocument = mongoose.LeanDocument<User>;

@Schema()
@ObjectType()
export class User {
  @Field(() => String)
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: false })
  localPassword: string;

  @Prop()
  tokens: [string];

  @Field(() => String)
  @Prop({ required: true })
  email: string;

  @Field(() => String)
  @Prop({ required: true })
  name: string;

  @Field(() => [String], { description: 'Roles' })
  @Prop({ required: true, default: ['user']})
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);