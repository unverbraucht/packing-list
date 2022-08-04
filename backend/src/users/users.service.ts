import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcrypt';

import { User, UserDocument, LeanUserDocument } from './schemas/users.schema';
import { RegisterUserDto } from './dto/register-user.dto';

import { saltRounds } from '../auth/constants';
@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

  async create(registerUserDto: RegisterUserDto): Promise<User> {
    let user = await this.userModel.findOne({ email: registerUserDto.email }).exec();
    if (!user) {
      user = new this.userModel(registerUserDto);
    }
    if (registerUserDto.password) {
      user.localPassword = await hash(registerUserDto.password, saltRounds);
    }
    if (registerUserDto.name) {
      user.name = registerUserDto.name;
    }
    if (registerUserDto.email) {
      user.email = registerUserDto.email;
    }
    if (registerUserDto.roles) {
      user.roles = registerUserDto.roles;
    }
    return user.save();
  }

  async findOneById(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  /**
   * 
   * @param email This retrieves one user via email, making it lean (turning the arrays into actual ES6 arrays).
   * These results are not meant to have their roles modified.
   * @returns a User or undefined
   */
  async findOneByEmailLean(email: string): Promise<LeanUserDocument | undefined> {
    return this.userModel.findOne({ email }).lean().exec();
  }

  update(user: User, email: string) {
    this.userModel.replaceOne({ email }, user);
  }
}