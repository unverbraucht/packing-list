import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field, Extensions } from '@nestjs/graphql';
import * as mongoose from 'mongoose';

import { Role } from '../../auth/role';
import { checkOwnEmailMiddleware } from '../users.fields';

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

  @Extensions({ role: Role.ADMIN })
  @Field(() => String, { middleware: [checkOwnEmailMiddleware] })
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