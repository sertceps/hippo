import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { CommonConfigRegister } from '../config/registers/common.register';
import { UserConfigRegister } from '../config/registers/user.register';
import { UserRole } from './constants/user.constants';
import { UserCreateReqDto } from './dtos/user-create-update.req.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Md5 } from 'ts-md5';
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
      const md5Password = Md5.hashStr(this.userConfig.superUserPassword);
      const password = Md5.hashStr(`${md5Password}${this.commonConfig.passwordSalt}`);
      return await this.userModel.create({ email: this.userConfig.superUserEmail, password, role: UserRole.Super });
    }
  }

  /** 创建用户 */
  async create(body: UserCreateReqDto): Promise<UserDocument> {
    return this.userModel.create(body);
  }

  /** 删除用户 */
  async deleteOneById(id: string): Promise<UpdateWriteOpResult> {
    return this.userModel.updateOne({ _id: id, deleted: false }, { deleted: true });
  }

  /** 修改密码 */
  async updatePassword(id: string, password: string): Promise<UpdateWriteOpResult> {
    return this.userModel.updateOne({ _id: id, deleted: false }, { password });
  }

  /** 修改用户信息 */
  async updateOneById(id: string, body: UserUpdateReqDto): Promise<UpdateWriteOpResult> {
    return this.userModel.updateOne({ _id: id, deleted: false }, body);
  }

  /** 修改权限 */
  async updateRole(id: string, role: UserRole): Promise<UpdateWriteOpResult> {
    return this.userModel.updateOne({ _id: id, deleted: false }, { role });
  }

  /** 获取单个用户信息 */
  async findOneById(id: string): Promise<UserDocument> {
    return this.userModel.findOne({ _id: id, deleted: false });
  }

  /** 返回密码信息 */
  async findOneByIdWithPassword(id: string): Promise<UserDocument> {
    return this.userModel.findOne({ _id: id, deleted: false }).select('password');
  }

  /** 通过 email 查找用户 */
  async findOneByEmail(email: string, login?: boolean): Promise<UserDocument> {
    if (login) return this.userModel.findOne({ email, deleted: false }).select('password email role');
    return this.userModel.findOne({ email, deleted: false });
  }

  /** 获取用户列表 */
  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find({ deleted: false });
  }

  /** 检查邮箱重复 */
  async checkRepeat(email: string, id?: string): Promise<number> {
    if (id) return this.userModel.countDocuments({ email, _id: { $ne: id }, deleted: false });

    return this.userModel.countDocuments({ email, deleted: false });
  }
}
