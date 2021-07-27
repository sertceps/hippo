import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { Tag, TagDocument } from './schemas/tag.schema';

@Injectable()
export class TagService {
  constructor(@InjectModel(Tag.name) private readonly tagModel: Model<TagDocument>) {}

  async create(tag: string): Promise<TagDocument> {
    const tagDoc = new this.tagModel({ tag });

    return tagDoc.save();
  }

  async deleteOneById(id: string): Promise<UpdateWriteOpResult> {
    return this.tagModel.updateOne({ _id: id }, { deleted: true });
  }

  async updateOneById(id: string, tag: string): Promise<UpdateWriteOpResult> {
    return this.tagModel.updateOne({ _id: id }, { tag });
  }

  async findOneById(id: string): Promise<TagDocument> {
    return this.tagModel.findById(id);
  }

  async findAll(): Promise<TagDocument[]> {
    return await this.tagModel.find({ deleted: false });
  }

  async checkRepeat(tag: string, id?: string): Promise<number> {
    if (id) return this.tagModel.countDocuments({ _id: { $ne: id }, tag, deleted: false });

    return this.tagModel.countDocuments({ tag, deleted: false });
  }
}
