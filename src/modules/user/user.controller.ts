import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IdReqDto } from '../common/dtos/id.req.dto';
import { IdResDto } from '../common/dtos/id.res.dto';
import { NumberResDto } from '../common/dtos/number.res.dto';
import { UserCreateUpdateReqDto } from './dtos/user-create-update.req.dto';
import { UserGetResDto } from './dtos/user-get.res.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: UserCreateUpdateReqDto): Promise<IdResDto> {
    const count = await this.userService.checkRepeat(body.email);
    if (count > 0) throw new BadRequestException('邮箱已存在');
    const user = await this.userService.create(body);

    return { id: user._id };
  }

  @Delete(':id')
  async deleteOneById(@Param() { id }: IdReqDto): Promise<NumberResDto> {
    const res = await this.userService.deleteOneById(id);

    return { affected: res.nModified };
  }

  @Put(':id')
  async updateOneById(@Param() { id }: IdReqDto, @Body() body: UserCreateUpdateReqDto): Promise<NumberResDto> {
    const user = await this.userService.findOneById(id);
    if (!user) throw new BadRequestException('用户不存在');

    const count = await this.userService.checkRepeat(body.email, id);
    if (count > 0) throw new BadRequestException('邮箱已存在');

    const res = await this.userService.updateOneById(id, body);

    return { affected: res.nModified };
  }

  @Get(':id')
  async findOneById(@Param() { id }: IdReqDto): Promise<UserGetResDto> {
    const user = await this.userService.findOneById(id);
    if (!user) throw new BadRequestException('用户不存在');

    return await this.userService.findOneById(id);
  }

  @Get()
  async findAll(): Promise<UserGetResDto[]> {
    return await this.userService.findAll();
  }
}
