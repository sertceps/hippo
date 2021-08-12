import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { CommonConfigRegister } from '../config/registers/common.register';
import { UserConfigRegister } from '../config/registers/user.register';
import { UserRole } from './constants/user.constants';
import { UserCreateReqDto } from './dtos/user-create-update.req.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as md5 from 'md5';
import { UserUpdateReqDto } from './dtos/user-update.req.dto';

@Injectable()
export class UserService implements OnApplicationBootstrap {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @Inject(UserConfigRegister.KEY)
    private userConfig: ConfigType<typeof UserConfigRegister>,
    @Inject(CommonConfigRegister.KEY)
    private commonConfig: ConfigType<typeof CommonConfigRegister>
  ) {}

  async onApplicationBootstrap() {
    const user = await this.findOneByEmail(this.userConfig.superUserEmail);
    if (!user) {
      const password = md5(`${this.userConfig.superUserPassword}${this.commonConfig.passwordSalt}`);
      await this.userModel.create({ email: this.userConfig.superUserEmail, password, role: UserRole.Super });
    }
  }

  async create(body: UserCreateReqDto): Promise<UserDocument> {
    return this.userModel.create(body);
  }

  async deleteOneById(id: string): Promise<UpdateWriteOpResult> {
    return this.userModel.updateOne({ _id: id, deleted: false }, { deleted: true });
  }

  async updatePassword(id: string, password: string): Promise<UpdateWriteOpResult> {
    return this.userModel.updateOne({ _id: id, deleted: false }, { password });
  }

  async updateOneById(id: string, body: UserUpdateReqDto): Promise<UpdateWriteOpResult> {
    return this.userModel.updateOne({ _id: id, deleted: false }, body);
  }

  async updateRole(id: string, role: UserRole): Promise<UpdateWriteOpResult> {
    return this.userModel.updateOne({ _id: id, deleted: false }, { role });
  }

  async findOneById(id: string): Promise<UserDocument> {
    return this.userModel.findOne({ _id: id, deleted: false });
  }

  async findOneByIdWithPassword(id: string): Promise<UserDocument> {
    return this.userModel.findOne({ _id: id, deleted: false }).select('password');
  }

  async findOneByEmail(email: string, login?: boolean): Promise<UserDocument> {
    if (login) return this.userModel.findOne({ email, deleted: false }).select('password email role');
    return this.userModel.findOne({ email, deleted: false });
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find({ deleted: false });
  }

  async checkRepeat(email: string, id?: string): Promise<number> {
    if (id) return this.userModel.countDocuments({ email, _id: { $ne: id }, deleted: false });

    return this.userModel.countDocuments({ email, deleted: false });
  }
}
