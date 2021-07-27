import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { NumberResDto } from '../common/dtos/number.res.dto';
import { IdReqDto } from '../common/dtos/id.req.dto';
import { IdResDto } from '../common/dtos/id.res.dto';
import { TagCreateUpdateReqDto } from './dtos/tag-create-update.req.dto';
import { TagFindAllResDto } from './dtos/tag-find-all.res.dto';
import { TagService } from './tag.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() body: TagCreateUpdateReqDto): Promise<IdResDto> {
    const count = await this.tagService.checkRepeat(body.tag);
    if (count > 0) throw new BadRequestException('标签已存在');

    const tag = await this.tagService.create(body.tag);

    return { id: tag._id };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteOneById(@Param() { id }: IdReqDto): Promise<NumberResDto> {
    const res = await this.tagService.deleteOneById(id);

    return { affected: res.ok };
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updateOneById(@Param() { id }: IdReqDto, @Body() body: TagCreateUpdateReqDto): Promise<NumberResDto> {
    const res = await this.tagService.updateOneById(id, body.tag);
    const count = await this.tagService.checkRepeat(body.tag, id);
    if (count > 0) throw new BadRequestException('标签已存在');

    return { affected: res.ok };
  }

  @Get()
  async findAll(): Promise<TagFindAllResDto[]> {
    return await this.tagService.findAll();
  }
}
