import { CommandFactory } from 'nest-commander';

import { AppModule } from './app.module';

async function bootstrap() {
  // We only want to print Nest's warnings and errors
  await CommandFactory.run(AppModule, ['warn', 'error']);
}
bootstrap();