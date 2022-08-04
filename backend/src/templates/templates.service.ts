import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Template, TemplateGroup, TemplateDocument, TemplateGroupDocument, ListItem } from './schemas/templates.schema';
import { CreateTemplateDto } from './dto/create-template.dto';
import { AddGroupDto } from './dto/add-group.dto';
import { AddItemDto } from './dto/add-item.dto';
import { User } from 'src/users/schemas/users.schema';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectModel(Template.name) private templateModel: Model<TemplateDocument>,
    @InjectModel(TemplateGroup.name) private templateGroupModel: Model<TemplateGroupDocument>,
    ) {}

  async create(createTemplateDto: CreateTemplateDto): Promise<Template> {
    const createdTemplate = new this.templateModel(createTemplateDto);
    return createdTemplate.save();
  }

  async findAll(): Promise<Template[]> {
    return this.templateModel
      .find()
      .populate({
        path:     'groups',			
        populate: { path:  'owner',
              model: User.name }
        })
      .populate('owner')
      .exec();
  }

  async findOneById(id: string): Promise<Template> {
    return this.templateModel.findOne({ _id: id }).populate("groups").exec();
  }

  async delete(id: string, userId: string) {
    const deletedTemplate = await this.templateModel
      .findByIdAndRemove({ _id: id, owner: userId })
      .exec();
    return deletedTemplate;
  }

  async addGroup(id: string, newGroupDto: AddGroupDto, userId: string): Promise<Template> {
    const template = await this.templateModel.findOne({ _id: id, owner: userId }).populate('owner').populate('groups').exec();
    if (!template) {
      return null;
    }
    const groups = await template.groups;
    if (groups.find(({name}) => name == newGroupDto.name)) {
      // Already exists
      return template;
    }
    const newGroupDoc = new this.templateGroupModel(newGroupDto);
    newGroupDoc.owner = newGroupDto.owner;
    const newGroup = await newGroupDoc.save();
    newGroup.name = newGroupDto.name;
    groups.push(newGroup);
    return template.save();
  }

  async deleteGroup(templateId: string, templateGroupId: string, userId: string) {
    const template = await this.templateModel.findOne({ _id: templateId, owner: userId }).exec();
    if (!template) {
      return null;
    }
    const itemToRemove = template.groups.find((item) => item._id.toString() === templateGroupId);
    if (itemToRemove) {
      const removeIndex = template.groups.indexOf(itemToRemove);
      if (removeIndex > -1) {
        template.groups.splice(removeIndex);
        return template.save();
      }
    }
    return null;

    // TODO: we should delete dangling groups
    //template.groups.id(templateGroupId).remove();

  }

  async addItemToGroup(
    groupId: string,
    item: AddItemDto,
    userId: string): Promise<TemplateGroup> {
      const newLabel = item.label;
    const group = await this.templateGroupModel.findOne({ _id: groupId, owner: userId }).exec();
    if (!group) {
      // Group doesn't exist
      return null;
    }

    // const groups = await template.groups;
    if (group.items.find(({ label }) => label == newLabel)) {
      // Already exists
      return group;
    }
    group.items.push(ListItem.from(item));
    return await group.save();
  }
}
