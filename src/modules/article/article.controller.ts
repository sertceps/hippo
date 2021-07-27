import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CategoryService } from '../category/category.service';
import { Category } from '../category/schemas/category.schema';
import { IdReqDto } from '../common/dtos/id.req.dto';
import { IdResDto } from '../common/dtos/id.res.dto';
import { NumberResDto } from '../common/dtos/number.res.dto';
import { PagingReqDto } from '../common/dtos/paging.req.dto';
import { TagDocument } from '../tag/schemas/tag.schema';
import { TagService } from '../tag/tag.service';
import { UserService } from '../user/user.service';
import { ArticleService } from './article.service';
import { ArticleCreateUpdateReqDto } from './dtos/article-create-update.req.dto';
import { ArticleGetReqDto } from './dtos/article-get.req.dto';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService, private readonly tagService: TagService, private readonly categoryService: CategoryService, private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: ArticleCreateUpdateReqDto): Promise<IdResDto> {
    let category: Category;
    if (body.category) {
      category = await this.categoryService.findOneById(body.category);
      if (!category) throw new BadRequestException('类别不存在或已删除');
    }

    const user = await this.userService.findOneById(body.user);
    if (!user) throw new BadRequestException('用户不存在或已删除');

    let tags: TagDocument[];
    if (body.tags) {
      tags = await Promise.all(body.tags.map(async item => this.tagService.findOneById(item)));
    }

    const articleDoc = { ...body, tags, category, user, deleted: false };
    const article = await this.articleService.create(articleDoc);

    return { id: article._id };
  }

  @Delete(':id')
  async deleteOneById(@Param() { id }: IdReqDto): Promise<NumberResDto> {
    const res = await this.articleService.deleteOneById(id);

    return { affected: res.nModified };
  }

  @Put(':id')
  async updateOneById(@Param() { id }: IdReqDto, @Body() body: ArticleCreateUpdateReqDto): Promise<NumberResDto> {
    let category: Category;
    if (body.category) {
      category = await this.categoryService.findOneById(body.category);
      if (!category) throw new BadRequestException('类别不存在或已删除');
    }

    const user = await this.userService.findOneById(body.user);
    if (!user) throw new BadRequestException('用户不存在或已删除');

    let tags: TagDocument[];
    if (body.tags) {
      tags = await Promise.all(body.tags.map(async item => this.tagService.findOneById(item)));
    }

    const article = { ...body, tags, category, user, deleted: false };
    const res = await this.articleService.updateOneById(id, article);

    return { affected: res.nModified };
  }

  @Get(':id')
  async findOneById(@Param() { id }: IdReqDto): Promise<ArticleGetReqDto> {
    return await this.articleService.findOneById(id);
  }

  @Get()
  async findAndPaging(@Query() query: PagingReqDto): Promise<ArticleGetReqDto[]> {
    console.log(typeof query.page);

    return await this.articleService.findAndPaging(query.page - 1, query.size);
  }
}
