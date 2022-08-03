import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TemplatesService } from './templates.service';
import { TemplatesResolver } from './templates.resolver';
import { Template, TemplateGroup, TemplateSchema, TemplateGroupSchema } from './schemas/templates.schema';
import { UsersModule } from '../users/users.module';


@Module({
  imports: [ MongooseModule.forFeature([
    { name: Template.name, schema: TemplateSchema },
    { name: TemplateGroup.name, schema: TemplateGroupSchema },
  ]),
    UsersModule],
  providers: [TemplatesService, TemplatesResolver],
})
export class TemplatesModule {}