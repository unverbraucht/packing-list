import { join } from 'path';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { DirectiveLocation, GraphQLDirective } from 'graphql';

import { TemplatesModule } from './templates/templates.module';
import { AppController } from './app.controller';
import { upperDirectiveTransformer } from './common/directives/upper-case.directive';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/nest'),
    TemplatesModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      path: '/api',
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      transformSchema: schema => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}