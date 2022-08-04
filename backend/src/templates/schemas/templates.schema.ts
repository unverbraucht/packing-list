import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field } from '@nestjs/graphql';

import * as mongoose from 'mongoose';
import { User } from '../../users/schemas/users.schema';
import { AddItemDto } from '../dto/add-item.dto';

export type TemplateDocument = Template & mongoose.Document;
export type TemplateGroupDocument = TemplateGroup & mongoose.Document;

// This is not it's own collection, just subdocuments
@ObjectType()
export class ListItem {
  static from(dto: AddItemDto): ListItem {
    const item = new ListItem();
    item.label = dto.label;
    return item;
  }

  @Field(() => String)
  _id: mongoose.Schema.Types.ObjectId;

  @Field(() => String)
  // @Prop({ required: true })
  label: string;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  // @Prop({ default: false })
  checked: boolean;
}

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

  @Field(() => User)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  // @Prop({ required: true, index: true})
  owner: User;

  @Field(() => [ListItem], { description: 'Items' })
  @Prop({ type:  [{ label: String, checked: Boolean }], default: []})
  items: ListItem[];
}

export const TemplateSchema = SchemaFactory.createForClass(Template);
export const TemplateGroupSchema = SchemaFactory.createForClass(TemplateGroup);
// export const ListeItemSchema = SchemaFactory.createForClass(ListItem);