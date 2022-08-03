import { Field, InputType } from '@nestjs/graphql';
import { User } from '../../users/schemas/users.schema';

@InputType()
export class AddGroupDto {
  @Field()
  name: string

  @Field()
  lang: string

  @Field(type => [String])
  items: string[] = []

  owner: User
}