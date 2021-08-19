import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { IdReqDto } from '../common/dtos/id.req.dto';
import { IdResDto } from '../common/dtos/id.res.dto';
import { NumberResDto } from '../common/dtos/number.res.dto';
import { UserRole } from '../user/constants/user.constants';
import { Roles } from '../user/decorators/roles.decorator';
import { RolesGuard } from '../user/guards/roles.guard';
import { CommentService } from './comment.service';
import { CommentCreateReqDto } from './dtos/comment-create.req.dto';

@ApiTags('Comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  /** 创建评论 */
  @Post()
  async create(@Body() body: CommentCreateReqDto): Promise<IdResDto> {
    const comment = await this.commentService.create(body.article_id, body.name, body.email, body.content, body.website);

    return { id: comment._id };
  }

  /** 删除评论 */
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Super, UserRole.Admin)
  @Delete(':id')
  async deleteOneById(@Param() { id }: IdReqDto): Promise<NumberResDto> {
    const res = await this.commentService.deleteOneById(id);

    return { affected: res.deletedCount };
  }

  /** 删除文章下所有评论 */
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Super)
  @Delete('/articles/:id')
  async deleteAllById(@Param() { id }: IdReqDto): Promise<NumberResDto> {
    const res = await this.commentService.deleteAllById(id);

    return { affected: res.deletedCount };
  }

  /** 获取文章下所有评论 */
  @Get(':id')
  async findAllById(@Param() { id }: IdReqDto): Promise<any> {
    return this.commentService.findAllById(id);
  }
}
