import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { CatOwnerResolver } from './cat-owner.resolver';
// import { CatsResolver } from './templates.resolver';
import { TemplatesService } from './templates.service';
import { TemplatesResolver } from './templates.resolver';
import { Template, TemplateGroup, TemplateSchema, TemplateGroupSchema } from './schemas/templates.schema';


@Module({
  imports: [MongooseModule.forFeature([
    { name: Template.name, schema: TemplateSchema },
    { name: TemplateGroup.name, schema: TemplateGroupSchema },
  ])],
  providers: [TemplatesService, TemplatesResolver],
})
export class TemplatesModule {}