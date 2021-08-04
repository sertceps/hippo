import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
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
import { AuthUser } from './decorators/user.decorator';
import { ArticleCreateUpdateReqDto } from './dtos/article-create-update.req.dto';
import { ArticleGetResDto } from './dtos/article-get.res.dto';

@Controller('articles')
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly tagService: TagService,
    private readonly categoryService: CategoryService,
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  // 为什么这里不需要在 module 导入 jwt 策略就可以用
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() body: ArticleCreateUpdateReqDto, @Headers('authorization') authorization: string, @AuthUser() us: any): Promise<IdResDto> {
    const userInfo = await this.authService.decodeToken(authorization);
    console.log(us);

    let category: Category;
    if (body.category) {
      category = await this.categoryService.findOneById(body.category);
      if (!category) throw new BadRequestException('类别不存在或已删除');
    }

    // https://stackoverflow.com/questions/57833669/how-to-get-jwt-token-from-headers-in-controller
    const user = await this.userService.findOneById(userInfo.id);
    if (!user) throw new BadRequestException('用户不存在或已删除');

    let tags: TagDocument[];
    if (body.tags) {
      tags = await Promise.all(body.tags.map(async item => this.tagService.findOneById(item)));
    }

    const articleDoc = { ...body, tags, category, user, deleted: false };
    const article = await this.articleService.create(articleDoc);

    return { id: article._id };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteOneById(@Param() { id }: IdReqDto): Promise<NumberResDto> {
    const res = await this.articleService.deleteOneById(id);

    return { affected: res.nModified };
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updateOneById(@Param() { id }: IdReqDto, @Body() body: ArticleCreateUpdateReqDto): Promise<NumberResDto> {
    const article = await this.articleService.findOneById(id);
    if (!article) throw new BadRequestException('文章不存在或已删除');

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
    const res = await this.articleService.updateOneById(id, articleDoc);

    return { affected: res.nModified };
  }

  @Get(':id')
  async findOneById(@Param() { id }: IdReqDto): Promise<ArticleGetResDto> {
    const article = await this.articleService.findOneById(id);
    if (!article) throw new BadRequestException('文章不存在或已删除');

    return await this.articleService.findOneById(id);
  }

  @Get()
  async findAndPaging(@Query() query: PagingReqDto): Promise<ArticleGetResDto[]> {
    return await this.articleService.findAndPaging((query.page - 1) * query.size, query.size, query.orderBy);
  }
}
