import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { CategoryService } from '../category/category.service';
import { Category } from '../category/schemas/category.schema';
import { AuthUser } from '../common/decorators/user.decorator';
import { IdReqDto } from '../common/dtos/id.req.dto';
import { IdResDto } from '../common/dtos/id.res.dto';
import { NumberResDto } from '../common/dtos/number.res.dto';
import { PagingReqDto } from '../common/dtos/paging.req.dto';
import { UserInfo } from '../common/interfaces/user-info';
import { TagDocument } from '../tag/schemas/tag.schema';
import { TagService } from '../tag/tag.service';
import { UserRole } from '../user/constants/user.constants';
import { Roles } from '../user/decorators/roles.decorator';
import { RolesGuard } from '../user/guards/roles.guard';
import { UserService } from '../user/user.service';
import { ArticleService } from './article.service';
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
  // 创建文章
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Super, UserRole.Admin, UserRole.Normal)
  @Post()
  async create(@Body() body: ArticleCreateUpdateReqDto, @AuthUser() userInfo: UserInfo): Promise<IdResDto> {
    let category: Category;
    if (body.category) {
      category = await this.categoryService.findOneById(body.category);
      if (!category) throw new BadRequestException('类别不存在或已删除');
    }

    // https://stackoverflow.com/questions/62299932/how-to-get-user-data-with-req-user-on-decorator-in-nest-js
    const user = await this.userService.findOneById(userInfo.id);
    if (!user) throw new BadRequestException('用户不存在或已删除');

    let tags: TagDocument[];
    if (body.tags) {
      tags = await Promise.all(body.tags.map(async item => this.tagService.findOneById(item)));
    }

    const abstract = body.content.substring(0, 200);

    const articleDoc = { ...body, tags, category, user, abstract, deleted: false };
    const article = await this.articleService.create(articleDoc);

    return { id: article._id };
  }

  /** 删除文章 */
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Super, UserRole.Admin)
  @Delete(':id')
  async deleteOneById(@Param() { id }: IdReqDto): Promise<NumberResDto> {
    const res = await this.articleService.deleteOneById(id);

    return { affected: res.nModified };
  }

  /** 修改文章 */
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Super, UserRole.Admin, UserRole.Normal)
  @Put(':id')
  async updateOneById(@Param() { id }: IdReqDto, @Body() body: ArticleCreateUpdateReqDto, @AuthUser() userInfo: UserInfo): Promise<NumberResDto> {
    const article = await this.articleService.findOneById(id);
    if (!article) throw new BadRequestException('文章不存在或已删除');

    let category = article.category;
    if (body.category) {
      category = await this.categoryService.findOneById(body.category);
      if (!category) throw new BadRequestException('类别不存在或已删除');
    }

    const user = await this.userService.findOneByEmail(userInfo.email);
    if (!user) throw new BadRequestException('用户不存在或已删除');

    let tags = article.tags;
    if (body.tags) {
      tags = await Promise.all(body.tags.map(async item => this.tagService.findOneById(item)));
    }

    let abstract = article.abstract;
    if (body.content) {
      abstract = body.content.substring(0, 200);
    }

    const articleDoc = { ...body, tags, category, user, abstract, deleted: false };
    const res = await this.articleService.updateOneById(id, articleDoc);

    return { affected: res.nModified };
  }

  /** 获取文章 */
  @Get(':id')
  async findOneById(@Param() { id }: IdReqDto): Promise<ArticleGetResDto> {
    const article = await this.articleService.findOneById(id);
    if (!article) throw new BadRequestException('文章不存在或已删除');

    return await this.articleService.findOneById(id);
  }

  /** 获取文章列表 */
  @Get()
  async findAndPaging(@Query() query: PagingReqDto): Promise<ArticleGetResDto[]> {
    return await this.articleService.findAndPaging((query.page - 1) * query.size, query.size, query.orderBy);
  }
}
