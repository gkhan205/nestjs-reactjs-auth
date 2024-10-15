import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { createHashedPassword } from '@/common/utils/password-utils';

import { User } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel
      .findOne({ email: createUserDto.email })
      .lean()
      .exec();

    if (!!user) {
      throw new HttpException(
        'User with this email already exist.',
        HttpStatus.CONFLICT,
      );
    }

    const password = await createHashedPassword(createUserDto.password);

    const newUser = new this.userModel({
      ...createUserDto,
      password,
    });

    return await newUser.save();
  }

  async findAll(): Promise<User[] | []> {
    return await this.userModel.find().lean().exec();
  }

  async findOne(id: number): Promise<User | null> {
    return await this.userModel.findById(id).lean().exec();
  }

  async findMe(id: number): Promise<User | null> {
    return await this.userModel.findById(id).select('-password').lean().exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).lean().exec();
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(
      id,
      {
        $set: updateUserDto,
      },
      {
        new: true,
      },
    );
  }

  async remove(id: number) {
    return this.userModel.findByIdAndDelete(id);
  }
}
