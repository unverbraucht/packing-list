import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTemplateDto {
  @Field()
  name: string
}