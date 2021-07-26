import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from '../category/category.service';
import { IdReqDto } from '../common/dtos/id.req.dto';
import { IdResDto } from '../common/dtos/id.res.dto';
import { NumberResDto } from '../common/dtos/number.res.dto';
import { CategoryCreateUpdateReqDto } from './dtos/category-create-update.req.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() body: CategoryCreateUpdateReqDto): Promise<IdResDto> {
    const count = await this.categoryService.checkRepeat(body.category);
    if (count > 0) throw new BadRequestException('类别已存在');

    const category = await this.categoryService.create(body.category);

    return { id: category.id };
  }

  @Delete(':id')
  async deleteOneById(@Param() { id }: IdReqDto): Promise<NumberResDto> {
    const res = await this.categoryService.deleteOne(id);

    return { affected: res.nModified };
  }

  @Put(':id')
  async updateOneById(@Param() { id }: IdReqDto, @Body() body: CategoryCreateUpdateReqDto): Promise<NumberResDto> {
    const count = await this.categoryService.checkRepeat(body.category, id);
    if (count > 0) throw new BadRequestException('类别已存在');
    const res = await this.categoryService.updateOne(id, body.category);

    return { affected: res.nModified };
  }

  @Get()
  async findAll(): Promise<any> {
    return await this.categoryService.findAll();
  }
}
