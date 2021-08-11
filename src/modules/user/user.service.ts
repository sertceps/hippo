import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { UserCreateUpdateReqDto } from './dtos/user-create-update.req.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService implements OnApplicationBootstrap {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async onApplicationBootstrap() {
    const user = await this.findOneByEmail('admin@admin.com');
    if (!user) {
      await this.userModel.create({ email: 'admin@admin.com', password: 'admin' });
    }
  }

  async create(body: UserCreateUpdateReqDto): Promise<UserDocument> {
    return this.userModel.create(body);
  }

  async deleteOneById(id: string): Promise<UpdateWriteOpResult> {
    return this.userModel.updateOne({ _id: id, deleted: false }, { deleted: true });
  }

  async updateOneById(id: string, body: UserCreateUpdateReqDto): Promise<UpdateWriteOpResult> {
    return this.userModel.updateOne({ _id: id, deleted: false }, body);
  }

  async findOneById(id: string): Promise<UserDocument> {
    return this.userModel.findOne({ _id: id, deleted: false });
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
