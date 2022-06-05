import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddGroupDto {
  @Field()
  name: string

  items: string[] = []
}