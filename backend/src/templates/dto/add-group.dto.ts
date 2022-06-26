import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddGroupDto {
  @Field()
  name: string

  @Field()
  lang: string

  @Field(type => [String])
  items: string[] = []
}