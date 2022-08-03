import { Command, CommandRunner, Option } from 'nest-commander';
import { hash } from 'bcrypt';

import { UsersService } from '../users.service';
import { RegisterUserDto } from '../dto/register-user.dto';
import { saltRounds } from '../../auth/constants';

interface BasicCommandOptions {
  name: string;
  password?: string
  roles?: string[]
  email?: string
}

@Command({
  name: 'upsert',
  description: 'Create or update a user',
  arguments: '<email>'
})
export class UsersUpdateCommand extends CommandRunner {
  constructor(private readonly usersService: UsersService) {
    super()
  }

  async run(
    passedParam: string[],
    options?: BasicCommandOptions,
  ): Promise<void> {
    const email = passedParam[0];
    const existingUser = await this.usersService.findOneByEmail(email);
    const creationDto = new RegisterUserDto();
    creationDto.name = options.name;
    if (!existingUser && !options.name) {
      creationDto.name = email;
    }
    creationDto.email = email;
    if (!options.password && !existingUser) {
      throw Error("We need a password when creating a new user");
    }
    creationDto.password = options.password;
    creationDto.lang = "en";
    if (!existingUser) {
      creationDto.roles = options.roles || ['user'];
    } else if (options.roles) {
      creationDto.roles = options.roles;
    }

    await this.usersService.create(creationDto);

    console.info(existingUser ? `User ${email} updated` : `User ${email} created`);
  }

  @Option({
    flags: '-e, --email [string]',
    description: 'update or set email',
  })
  parseEmail(val: string): string {
    return val;
  }

  @Option({
    flags: '-p, --password [string]',
    description: 'update or set password',
  })
  parsePassword(val: string): string {
    return val;
  }

  @Option({
    flags: '-n, --name [string]',
    description: 'update or set username',
  })
  parseUsername(val: string): string {
    return val;
  }

  @Option({
    flags: '-r, --roles [string1,string2,...]',
    description: 'update or set roles',
  })
  parseRoles(val: string): string[] {
    return val.split(",");
  }
}
