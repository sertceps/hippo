import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { NumberResDto } from '../common/dtos/number.res.dto';
import { IdReqDto } from '../common/dtos/id.req.dto';
import { IdResDto } from '../common/dtos/id.res.dto';
import { TagCreateUpdateReqDto } from './dtos/tag-create-update.req.dto';
import { TagFindAllResDto } from './dtos/tag-find-all.res.dto';
import { TagService } from './tag.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../user/guards/roles.guard';
import { Roles } from '../user/decorators/roles.decorator';
import { UserRole } from '../user/constants/user.constants';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  /** 创建标签 */
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Super, UserRole.Admin, UserRole.Normal)
  @Post()
  async create(@Body() body: TagCreateUpdateReqDto): Promise<IdResDto> {
    const count = await this.tagService.checkRepeat(body.tag);
    if (count > 0) throw new BadRequestException('标签已存在');

    const tag = await this.tagService.create(body.tag);

    return { id: tag._id };
  }

  /** 删除标签 */
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Super, UserRole.Admin)
  @Delete(':id')
  async deleteOneById(@Param() { id }: IdReqDto): Promise<NumberResDto> {
    const res = await this.tagService.deleteOneById(id);

    return { affected: res.ok };
  }

  /** 修改标签 */
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Super, UserRole.Admin)
  @Put(':id')
  async updateOneById(@Param() { id }: IdReqDto, @Body() body: TagCreateUpdateReqDto): Promise<NumberResDto> {
    const res = await this.tagService.updateOneById(id, body.tag);
    const count = await this.tagService.checkRepeat(body.tag, id);
    if (count > 0) throw new BadRequestException('标签已存在');

    return { affected: res.ok };
  }

  /** 获取标签列表 */
  @Get()
  async findAll(): Promise<TagFindAllResDto[]> {
    return await this.tagService.findAll();
  }
}
