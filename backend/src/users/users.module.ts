import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersService } from './users.service';
import { UserSchema, User } from './schemas/users.schema';
import { UsersUpdateCommand } from './cli/users.cli';

@Module({
  imports: [MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
  ])],
  providers: [UsersService, UsersUpdateCommand],
  exports: [UsersService],
})
export class UsersModule {}