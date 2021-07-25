import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from './schemas/article.schema';

@Injectable()
export class ArticleService {
  constructor(@InjectModel(Article.name) private readonly articleModel: Model<ArticleDocument>) {}

  async create(title: string, userId: string, content: string, category?: string, tags?: string[]): Promise<ArticleDocument> {
    const article = new this.articleModel({ title, user: userId, content, category });
    if (category) article.category = category;
    if (tags) article.tags = tags;

    return article.save();
  }
}
