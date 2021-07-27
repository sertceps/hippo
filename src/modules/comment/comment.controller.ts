import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IdReqDto } from '../common/dtos/id.req.dto';
import { IdResDto } from '../common/dtos/id.res.dto';
import { NumberResDto } from '../common/dtos/number.res.dto';
import { CommentService } from './comment.service';
import { CommentCreateReqDto } from './dtos/comment-create.req.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body() body: CommentCreateReqDto): Promise<IdResDto> {
    const comment = await this.commentService.create(body.article_id, body.name, body.email, body.content, body.website);

    return { id: comment._id };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteOneById(@Param() { id }: IdReqDto): Promise<NumberResDto> {
    const res = await this.commentService.deleteOneById(id);

    return { affected: res.deletedCount };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/articles/:id')
  async deleteAllById(@Param() { id }: IdReqDto): Promise<NumberResDto> {
    const res = await this.commentService.deleteAllById(id);

    return { affected: res.deletedCount };
  }

  @Get(':id')
  async findAllById(@Param() { id }: IdReqDto): Promise<any> {
    return this.commentService.findAllById(id);
  }
}
