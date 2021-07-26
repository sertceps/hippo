import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';

@Injectable()
export class CommentService {
  constructor(@InjectModel(Comment.name) private readonly commentModel: Model<CommentDocument>) {}

  async create(name: string, email: string, content: string, website?: string): Promise<CommentDocument> {
    const comment = new this.commentModel({ name, email, content });
    if (website) comment.website = website;

    return comment.save();
  }

  async deleteOneById(id: string): Promise<{ ok?: number; n?: number } & { deletedCount?: number }> {
    return this.commentModel.deleteOne({ id });
  }

  async deleteAllById(id: string): Promise<{ ok?: number; n?: number } & { deletedCount?: number }> {
    return this.commentModel.deleteMany({ article_id: id });
  }

  async findAllById(id: string): Promise<CommentDocument[]> {
    return this.commentModel.find({ article_id: id });
  }
}
