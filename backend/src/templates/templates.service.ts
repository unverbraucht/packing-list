import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Template, TemplateGroup, TemplateDocument, TemplateGroupDocument } from './schemas/templates.schema';
import { CreateTemplateDto } from './dto/create-template.dto';
import { AddGroupDto } from './dto/add-group.dto';
import { AddItemDto } from './dto/add-item.dto';

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
    return this.templateModel.find().populate("groups").exec();
  }

  async findOneById(id: string): Promise<Template> {
    return this.templateModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedTemplate = await this.templateModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedTemplate;
  }

  async addGroup(id: string, newGroupDto: AddGroupDto): Promise<Template> {
    // // Sanity check: empty items instead of null
    // if (newGroupDto.items == null || newGroupDto.items == undefined) {
    //   newGroupDto.items = [];
    // }
    const template = await this.templateModel.findOne({ _id: id }).populate('groups').exec();
    if (!template) {
      return null;
    }
    const groups = await template.groups;
    if (groups.find(({name}) => name == newGroupDto.name)) {
      // Already exists
      return template;
    }
    const newGroupDoc = new this.templateGroupModel(newGroupDto);
    // newGroupDoc.items = [];
    const newGroup = await newGroupDoc.save();
    newGroup.name = newGroupDto.name;
    groups.push(newGroup);
    return template.save();
  }

  async deleteGroup(templateId: string, templateGroupId: string) {
    const template = await this.templateModel.findOne({ _id: templateId }).exec();
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
    //template.groups.id(templateGroupId).remove();
    
  }

  async addItemToGroup(
    templateId: string,
    groupId: string,
    newLabel: string): Promise<Template> {
    const template = await this.templateModel.findOne({ _id: templateId }).populate('groups').exec();
    if (!template) {
      return null;
    }
    const groups = await template.groups;
    // const group = groups.id
    const group = groups.find(({ _id }) => _id.toString() == groupId);
    if (!group) {
      // Group doesn't exist
      return null;
    }

    // const groups = await template.groups;
    if (group.items.find((label) => label == newLabel)) {
      // Already exists
      return template;
    }
    group.items.push(newLabel);
    return template.save();
  }
}
