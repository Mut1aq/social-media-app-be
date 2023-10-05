import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { UserI } from './interface/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    await createdUser.save();
    return createdUser;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, _updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserByProperty(
    property: string,
    value: string,
  ): Promise<UserI | null> {
    const user = await this.userModel
      .findOne<UserI>({ [property]: value })
      .exec();

    return user;
  }

  async findUserByCredentials(credentials: string): Promise<UserI | null> {
    const user = await this.userModel.findOne<UserI>({
      $or: [
        {
          email: credentials,
        },
        {
          username: credentials,
        },
      ],
    });
    return user;
  }
}
