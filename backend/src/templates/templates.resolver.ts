import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { AddGroupDto } from './dto/add-group.dto';
import { CreateTemplateDto } from './dto/create-template.dto';
import { Template, TemplateGroup } from './schemas/templates.schema';
import { TemplatesService } from './templates.service';

const pubSub = new PubSub();

@Resolver(of => Template)
export class TemplatesResolver {
  constructor(private readonly templateService: TemplatesService) {}

  @Query(returns => Template)
  async template(@Args('id') id: string): Promise<Template> {
    const recipe = await this.templateService.findOneById(id);
    if (!recipe) {
      throw new NotFoundException(id);
    }
    return recipe;
  }

  @Query(returns => [Template])
  async getAll(): Promise<Template[]> {
    return await this.templateService.findAll();
  }

  // @Query(returns => [Recipe])
  // recipes(@Args() recipesArgs: RecipesArgs): Promise<Recipe[]> {
  //   return this.recipesService.findAll(recipesArgs);
  // }

  @Mutation(returns => Template)
  async addGroup(
    @Args('templateId') templateId: string,
    @Args('groupData') groupData: AddGroupDto,
  ): Promise<Template> {
    const template = await this.templateService.addGroup(templateId, groupData);
    if (!template) {
      throw new NotFoundException(templateId);
    }
    return template;
  }

  @Mutation(returns => TemplateGroup)
  async addItemToGroup(
    @Args('templateGroupId') templateGroupId: string,
    @Args('item') item: string,
  ): Promise<TemplateGroup> {
    const group = await this.templateService.addItemToGroup(templateGroupId, item);
    if (!group) {
      throw new NotFoundException(group);
    }
    return group;
  }

  @Mutation(returns => Template)
  async createTemplate(
    @Args('templateData') templateData: CreateTemplateDto,
  ): Promise<Template> {
    const template = await this.templateService.create(templateData);
    pubSub.publish('templateCreated', { templateCreated: template });
    return template;
  }

  @Mutation(returns => Template)
  async removeTemplate(@Args('id') id: string) {
    return this.templateService.delete(id);
  }

  @Mutation(returns => Template)
  async removeTemplateGroup(@Args('templateId') templateId: string, @Args('templateGroupId') templateGroupId: string,) {
    return this.templateService.deleteGroup(templateId, templateGroupId);
  }

  @Subscription(returns => Template)
  templateCreated() {
    return pubSub.asyncIterator('templateCreated');
  }
}