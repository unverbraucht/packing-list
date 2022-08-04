import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterUserDto {
  @Field()
  name: string

  @Field()
  email: string

  @Field()
  lang: string

  @Field()
  password: string

  @Field(type => [String])
  roles: string[];
}