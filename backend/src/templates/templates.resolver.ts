import { NotFoundException, UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { UsersService } from '../users/users.service';
import { CurrentUser } from '../auth/graphql-current-user.decorator';
import { GqlAuthGuard } from '../auth/graphql-jwt-auth.guard';
import { User } from '../users/schemas/users.schema';
import { AddGroupDto } from './dto/add-group.dto';
import { CreateTemplateDto } from './dto/create-template.dto';
import { ListItem, Template, TemplateGroup } from './schemas/templates.schema';
import { TemplatesService } from './templates.service';
import { OptionalJwtAuthGuard } from '../auth/graphql-optional-jwt-auth.guard';
import { AddItemDto } from './dto/add-item.dto';

const pubSub = new PubSub();

@Resolver(of => Template)
export class TemplatesResolver {
  constructor(private readonly templateService: TemplatesService, private readonly usersService: UsersService) {}

  @UseGuards(OptionalJwtAuthGuard)
  @Query(returns => Template)
  async template(@Args('id') id: string): Promise<Template> {
    const recipe = await this.templateService.findOneById(id);
    if (!recipe) {
      throw new NotFoundException(id);
    }
    return recipe;
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Query(returns => [Template])
  async getAll(): Promise<Template[]> {
    return await this.templateService.findAll();
  }

  // @Query(returns => [Recipe])
  // recipes(@Args() recipesArgs: RecipesArgs): Promise<Recipe[]> {
  //   return this.recipesService.findAll(recipesArgs);
  // }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Template)
  async addGroup(
    @Args('templateId') templateId: string,
    @Args('groupData') groupData: AddGroupDto,
    @CurrentUser() user: User,
  ): Promise<Template> {
    groupData.owner = user;
    const template = await this.templateService.addGroup(templateId, groupData, user._id.toString());
    if (!template) {
      throw new NotFoundException(templateId);
    }
    return template;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => TemplateGroup)
  async addItemToGroup(
    @Args('templateGroupId') templateGroupId: string,
    @Args('item') item: AddItemDto,
    @CurrentUser() user: User,
  ): Promise<TemplateGroup> {
    const group = await this.templateService.addItemToGroup(templateGroupId, item, user._id.toString());
    if (!group) {
      throw new NotFoundException(group);
    }
    return group;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Template)
  async createTemplate(
    @Args('templateData') templateData: CreateTemplateDto,
    @CurrentUser() user: User
  ): Promise<Template> {
    templateData.owner = await this.usersService.findOneById(user._id.toString());
    const template = await this.templateService.create(templateData);
    pubSub.publish('templateCreated', { templateCreated: template });
    return template;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Template)
  async removeTemplate(@Args('id') id: string, @CurrentUser() user: User): Promise<Template> {
    return this.templateService.delete(id, user._id.toString());
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Template)
  async removeTemplateGroup(
    @Args('templateId') templateId: string,
    @Args('templateGroupId') templateGroupId: string,
    @CurrentUser() user: User) {
    return this.templateService.deleteGroup(templateId, templateGroupId, user._id.toString());
  }

  @Subscription(returns => Template)
  templateCreated() {
    return pubSub.asyncIterator('templateCreated');
  }
}