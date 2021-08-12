import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { Article, ArticleDocument } from '../article/schemas/article.schema';
import { Category, CategoryDocument } from '../category/schemas/category.schema';
import { Tag, TagDocument } from '../tag/schemas/tag.schema';
import { User, UserDocument } from '../user/schemas/user.schema';
import { DelRes } from './interfaces/del-res';

@Injectable()
export class TrashService {
  constructor(
    @InjectModel(Article.name)
    private readonly articleModel: Model<ArticleDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
    @InjectModel(Tag.name)
    private readonly tagModel: Model<TagDocument>
  ) {}

  /** 获取单篇软删除文章 */
  async findOneArticle(id: string): Promise<ArticleDocument> {
    return this.articleModel.findById(id);
  }

  /** 获取所有软删除文章 */
  async findAllArticles(): Promise<ArticleDocument[]> {
    return this.articleModel.find({ deleted: true });
  }

  /** 彻底删除单篇软删除文章 */
  async deleteOneArticle(id: string): Promise<DelRes> {
    return this.articleModel.deleteOne({ _id: id, deleted: true });
  }

  /** 清空所有软删除文章 */
  async deleteAllArticles(): Promise<DelRes> {
    return this.articleModel.deleteMany({ deleted: true });
  }

  /** 恢复单篇软删除文章 */
  async restoreOneArticle(id: string): Promise<UpdateWriteOpResult> {
    return this.articleModel.updateOne({ _id: id, deleted: true }, { deleted: false });
  }

  /** 恢复所有软删除文章 */
  async restoreAllArticles(): Promise<UpdateWriteOpResult> {
    return this.articleModel.updateMany({ deleted: true }, { deleted: false });
  }

  /** 获取所有软删除用户 */
  async findAllUsers(): Promise<UserDocument[]> {
    return this.userModel.find({ deleted: true });
  }

  /** 彻底删除单个软删除用户 */
  async deleteOneUser(id: string): Promise<DelRes> {
    return this.userModel.deleteOne({ _id: id, deleted: true });
  }

  /** 恢复单个软删除用户 */
  async restoreOneUser(id: string): Promise<UpdateWriteOpResult> {
    return this.userModel.updateOne({ _id: id, deleted: true }, { deleted: false });
  }

  /** 获取所有软删除类别 */
  async findAllCategories(): Promise<CategoryDocument[]> {
    return this.categoryModel.find({ deleted: true });
  }

  /** 彻底删除单个软删除类别 */
  async deleteOneCategory(id: string): Promise<DelRes> {
    return this.categoryModel.deleteOne({ _id: id, deleted: true });
  }

  /** 恢复单个软删除类别 */
  async restoreOneCategory(id: string): Promise<UpdateWriteOpResult> {
    return this.categoryModel.updateOne({ _id: id, deleted: true }, { deleted: false });
  }

  /** 获取所有软删除标签 */
  async findAllTags(): Promise<TagDocument[]> {
    return this.tagModel.find({ deleted: true });
  }

  /** 彻底删除单个软删除标签 */
  async deleteOneTag(id: string): Promise<DelRes> {
    return this.tagModel.deleteOne({ _id: id, deleted: true });
  }

  /** 恢复单个软删除标签 */
  async restoreOneTag(id: string): Promise<UpdateWriteOpResult> {
    return this.tagModel.updateOne({ _id: id, deleted: true }, { deleted: false });
  }
}
