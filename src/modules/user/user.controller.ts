import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from '../article/decorators/user.decorator';
import { AuthService } from '../auth/auth.service';
import { IdReqDto } from '../common/dtos/id.req.dto';
import { IdResDto } from '../common/dtos/id.res.dto';
import { NumberResDto } from '../common/dtos/number.res.dto';
import { TokenResDto } from '../common/dtos/token.res.dto';
import { UserCreateUpdateReqDto } from './dtos/user-create-update.req.dto';
import { UserGetResDto } from './dtos/user-get.res.dto';
import { UserLoginReqDto } from './dtos/user-login.req.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() body: UserLoginReqDto): Promise<TokenResDto> {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) throw new BadRequestException('邮箱或密码不正确');

    return { access_token: await this.authService.certificate(user) };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/info')
  async getLoginInfo(@AuthUser() authorization: string): Promise<UserGetResDto> {
    const userInfo = await this.authService.decodeToken(authorization);
    const user = await this.userService.findOneById(userInfo.id);
    if (!user) throw new BadRequestException('用户不存在或已删除');

    return user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() body: UserCreateUpdateReqDto): Promise<IdResDto> {
    const count = await this.userService.checkRepeat(body.email);
    if (count > 0) throw new BadRequestException('邮箱已存在');
    const user = await this.userService.create(body);

    return { id: user._id };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteOneById(@Param() { id }: IdReqDto): Promise<NumberResDto> {
    const res = await this.userService.deleteOneById(id);

    return { affected: res.nModified };
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updateOneById(@Param() { id }: IdReqDto, @Body() body: UserCreateUpdateReqDto): Promise<NumberResDto> {
    const user = await this.userService.findOneById(id);
    if (!user) throw new BadRequestException('用户不存在');

    const count = await this.userService.checkRepeat(body.email, id);
    if (count > 0) throw new BadRequestException('邮箱已存在');

    const res = await this.userService.updateOneById(id, body);

    return { affected: res.nModified };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOneById(@Param() { id }: IdReqDto): Promise<UserGetResDto> {
    const user = await this.userService.findOneById(id);
    if (!user) throw new BadRequestException('用户不存在');

    return await this.userService.findOneById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(): Promise<UserGetResDto[]> {
    return await this.userService.findAll();
  }
}
