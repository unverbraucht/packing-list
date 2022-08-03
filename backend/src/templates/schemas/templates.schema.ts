import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field } from '@nestjs/graphql';

import * as mongoose from 'mongoose';
import { User } from '../../users/schemas/users.schema';

export type TemplateDocument = Template & mongoose.Document;
export type TemplateGroupDocument = TemplateGroup & mongoose.Document;

@Schema()
@ObjectType()
export class Template {
  @Field(() => String)
  _id: mongoose.Schema.Types.ObjectId;

  @Field(() => String)
  @Prop({ required: true, unique: true, index: true })
  name: string;

  @Field(() => [TemplateGroup], { description: 'Groups' })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TemplateGroup' }] })
  groups: TemplateGroup[];

  @Field(() => User)
  // @Prop({ required: true, index: true})
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  owner: User;
}

@Schema()
@ObjectType()
export class TemplateGroup {
  @Field(() => String)
  _id: mongoose.Schema.Types.ObjectId;
  
  @Field(() => String)
  @Prop({ required: true })
  name: string;

  @Field(() => String)
  @Prop({ required: true, default: 'en' })
  lang: string;

  @Field(() => String)
  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } })
  // @Prop({ required: true, index: true})
  owner: User;

  @Field(() => [String], { description: 'Items' })
  @Prop({ default: []})
  items: string[];
}

export const TemplateSchema = SchemaFactory.createForClass(Template);
export const TemplateGroupSchema = SchemaFactory.createForClass(TemplateGroup);