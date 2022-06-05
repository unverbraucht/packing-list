import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddItemDto {
  @Field()
  label: string
}
