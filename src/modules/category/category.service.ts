import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>) {}

  async create(category: string): Promise<CategoryDocument> {
    return this.categoryModel.create({ category });
  }

  async deleteOne(id: string): Promise<UpdateWriteOpResult> {
    return this.categoryModel.updateOne({ _id: id }, { deleted: true });
  }

  async updateOne(id: string, category: string): Promise<UpdateWriteOpResult> {
    return this.categoryModel.updateOne({ _id: id }, { category });
  }

  async findOneById(id: string): Promise<CategoryDocument> {
    return this.categoryModel.findById(id);
  }

  async findAll(): Promise<CategoryDocument[]> {
    return this.categoryModel.find({ deleted: false });
  }

  async checkRepeat(category: string, id?: string): Promise<number> {
    if (id) return this.categoryModel.countDocuments({ _id: { $ne: id }, category, deleted: false });
    return this.categoryModel.countDocuments({ category, deleted: false });
  }
}
