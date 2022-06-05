import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field } from '@nestjs/graphql';

import * as mongoose from 'mongoose';

export type TemplateDocument = Template & mongoose.Document;
export type TemplateGroupDocument = TemplateGroup & mongoose.Document;

@Schema()
@ObjectType()
export class Template {
  @Field(() => String)
  _id: mongoose.Schema.Types.ObjectId;

  @Field(() => String)
  @Prop({ required: true, unique: true })
  name: string;

  @Field(() => [TemplateGroup], { description: 'Groups' })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TemplateGroup' }] })
  groups: TemplateGroup[];
}

@Schema()
@ObjectType()
export class TemplateGroup {
  @Field(() => String)
  _id: mongoose.Schema.Types.ObjectId;
  
  @Field(() => String)
  @Prop({ required: true })
  name: string;

  @Field(() => [String], { description: 'Items' })
  @Prop()
  items: string[];
}

export const TemplateSchema = SchemaFactory.createForClass(Template);
export const TemplateGroupSchema = SchemaFactory.createForClass(TemplateGroup);