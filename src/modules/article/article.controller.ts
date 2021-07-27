import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CategoryService } from '../category/category.service';
import { Category } from '../category/schemas/category.schema';
import { IdResDto } from '../common/dtos/id.res.dto';
import { TagService } from '../tag/tag.service';
import { UserService } from '../user/user.service';
import { ArticleService } from './article.service';
import { ArticleCreateUpdateReqDto } from './dtos/article-create-update.req.dto';

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

    const tags = await Promise.all(body.tags.map(async item => this.tagService.findOneById(item)));
    const articleDoc = { ...body, tags, category, user, deleted: false };
    const article = await this.articleService.create(articleDoc);

    return { id: article._id };
  }
}
