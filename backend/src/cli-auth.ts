import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
import { RegisterUserDto } from './users/dto/register-user.dto';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService: UsersService = app.get(UsersService);

  const creationDto = new RegisterUserDto();
  creationDto.name = "admin";
  creationDto.email = "admin@packing-list.org";
  creationDto.password = "admin";
  creationDto.lang = "en";
  creationDto.roles = ['admin', 'user'];

  await usersService.create(creationDto);

  console.info('Created');
  
  await app.close();
}
bootstrap();