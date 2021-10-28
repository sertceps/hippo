import { Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArticleGetResDto } from '../article/dtos/article-get.res.dto';
import { CategoryGetReqDto } from '../category/dtos/category-get.req.dto';
import { IdReqDto } from '../common/dtos/id.req.dto';
import { NumberResDto } from '../common/dtos/number.res.dto';
import { TagGetResDto } from '../tag/dtos/tag-find-all.res.dto';
import { UserGetResDto } from '../user/dtos/user-get.res.dto';
import { TrashService } from './trash.service';

@ApiTags('Trash')
@Controller('trash')
export class TrashController {
  constructor(private readonly trashService: TrashService) {}

  /** 清空所有软删除文章 */
  @Delete('articles')
  async deleteAllArticles(): Promise<NumberResDto> {
    const res = await this.trashService.deleteAllArticles();

    return { affected: res.deletedCount };
  }

  /** 恢复所有软删除文章 */
  @Patch('articles')
  async restoreAllArticles(): Promise<NumberResDto> {
    const res = await this.trashService.restoreAllArticles();

    return { affected: res.modifiedCount };
  }

  /** 获取所有软删除文章 */
  @Get('articles')
  async findAllArticles(): Promise<ArticleGetResDto[]> {
    return this.trashService.findAllArticles();
  }

  /** 彻底删除单篇软删除文章 */
  @Delete('articles/:id')
  async deleteOneArticle(@Param() { id }: IdReqDto): Promise<NumberResDto> {
    const res = await this.trashService.deleteOneArticle(id);

    return { affected: res.deletedCount };
  }

  /** 恢复单篇软删除文章 */
  @Patch('articles/:id')
  async restoreOneArticle(@Param() { id }: IdReqDto): Promise<NumberResDto> {
    const res = await this.trashService.restoreOneArticle(id);

    return { affected: res.modifiedCount };
  }

  /** 获取单篇软删除文章 */
  @Get('articles/:id')
  async findOneArticle(@Param() { id }: IdReqDto): Promise<ArticleGetResDto> {
    return this.trashService.findOneArticle(id);
  }

  /** 获取所有软删除用户 */
  @Get('users')
  async findAllUsers(): Promise<UserGetResDto[]> {
    return this.trashService.findAllUsers();
  }

  /** 彻底删除单个软删除用户 */
  @Delete('users/:id')
  async deleteOneUser(@Param() { id }: IdReqDto): Promise<NumberResDto> {
    const res = await this.trashService.deleteOneUser(id);

    return { affected: res.deletedCount };
  }

  /** 恢复单个软删除用户 */
  @Patch('users/:id')
  async restoreOneUser(@Param() { id }: IdReqDto): Promise<NumberResDto> {
    const res = await this.trashService.restoreOneUser(id);

    return { affected: res.modifiedCount };
  }

  /** 获取所有软删除类别 */
  @Get('categories')
  async findAllCategories(): Promise<CategoryGetReqDto[]> {
    return await this.trashService.findAllCategories();
  }

  /** 彻底删除单个软删除类别 */
  @Delete('categories/:id')
  async deleteOneCategory(@Param() { id }: IdReqDto): Promise<NumberResDto> {
    const res = await this.trashService.deleteOneCategory(id);

    return { affected: res.deletedCount };
  }

  /** 恢复单个软删除类别 */
  @Patch('categories/:id')
  async restoreOneCategory(@Param() { id }: IdReqDto): Promise<NumberResDto> {
    const res = await this.trashService.restoreOneCategory(id);

    return { affected: res.modifiedCount };
  }

  /** 获取所有软删除标签 */
  @Get('tags')
  async findAllTags(): Promise<TagGetResDto[]> {
    return this.trashService.findAllTags();
  }

  /** 彻底删除单个软删除标签 */
  @Delete('tags/:id')
  async deleteOneTag(@Param() { id }: IdReqDto): Promise<NumberResDto> {
    const res = await this.trashService.deleteOneTag(id);

    return { affected: res.deletedCount };
  }

  /** 恢复单个软删除标签 */
  @Patch('tags/:id')
  async restoreOneTag(@Param() { id }: IdReqDto): Promise<NumberResDto> {
    const res = await this.trashService.restoreOneTag(id);

    return { affected: res.modifiedCount };
  }
}
