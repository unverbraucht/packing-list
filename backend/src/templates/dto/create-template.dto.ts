import { Field, InputType } from '@nestjs/graphql';
import { User } from '../../users/schemas/users.schema';

@InputType()
export class CreateTemplateDto {
  @Field()
  name: string
  owner: User;
}