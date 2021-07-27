import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { Article, ArticleDocument } from './schemas/article.schema';

@Injectable()
export class ArticleService {
  constructor(@InjectModel(Article.name) private readonly articleModel: Model<ArticleDocument>) {}

  async create(article: Article): Promise<ArticleDocument> {
    return this.articleModel.create(article);
  }

  async deleteOneById(id: string): Promise<UpdateWriteOpResult> {
    return this.articleModel.updateOne({ _id: id }, { deleted: true });
  }

  async updateOneById(id: string, article: Article): Promise<UpdateWriteOpResult> {
    return this.articleModel.updateOne({ _id: id }, { ...article });
  }

  async findOneById(id: string): Promise<ArticleDocument> {
    return this.articleModel.findById(id);
  }

  async findAndPaging(page: number, size: number): Promise<ArticleDocument[]> {
    return this.articleModel.find().limit(size).skip(page);
  }
}
