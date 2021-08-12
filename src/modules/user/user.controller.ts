import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from '../common/decorators/user.decorator';
import { AuthService } from '../auth/auth.service';
import { IdReqDto } from '../common/dtos/id.req.dto';
import { IdResDto } from '../common/dtos/id.res.dto';
import { NumberResDto } from '../common/dtos/number.res.dto';
import { TokenResDto } from '../common/dtos/token.res.dto';
import { UserInfo } from '../common/interfaces/user-info';
import { CommonConfigRegister } from '../config/registers/common.register';
import { Roles } from './decorators/roles.decorator';
import { UserCreateUpdateReqDto } from './dtos/user-create-update.req.dto';
import { UserGetResDto } from './dtos/user-get.res.dto';
import { UserLoginReqDto } from './dtos/user-login.req.dto';
import { RolesGuard } from './guards/roles.guard';
import { UserService } from './user.service';
import { UserRole } from './constants/user.constants';
import * as md5 from 'md5';

@Controller('users')
export class UserController {
  constructor(
    @Inject(CommonConfigRegister.KEY)
    private commonConfig: ConfigType<typeof CommonConfigRegister>,
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  /** 登录 */
  @Post('/login')
  async login(@Body() body: UserLoginReqDto): Promise<TokenResDto> {
    const password = md5(`${body.password}${this.commonConfig.passwordSalt}`);
    const user = await this.authService.validateUser(body.email, password);
    if (!user) throw new BadRequestException('邮箱或密码不正确');

    return { access_token: await this.authService.certificate(user), jwt_expires_in: this.commonConfig.jwtExpiresIn };
  }

  /** 获取已登录用户信息 */
  @UseGuards(AuthGuard('jwt'))
  @Get('/info')
  async getLoginInfo(@AuthUser() userInfo: UserInfo): Promise<UserGetResDto> {
    const user = await this.userService.findOneById(userInfo.id);
    if (!user) throw new BadRequestException('用户不存在或已删除');

    return user;
  }

  /** 创建用户 */
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Super)
  @Post()
  async create(@Body() body: UserCreateUpdateReqDto): Promise<IdResDto> {
    const count = await this.userService.checkRepeat(body.email);
    if (count > 0) throw new BadRequestException('邮箱已存在');

    const password = md5(`${body.password}${this.commonConfig.passwordSalt}`);

    const user = await this.userService.create({ password, ...body });

    return { id: user._id };
  }

  /** 删除用户 */
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Super)
  @Delete(':id')
  async deleteOneById(@Param() { id }: IdReqDto): Promise<NumberResDto> {
    const res = await this.userService.deleteOneById(id);

    return { affected: res.nModified };
  }

  // TODO: 登录用户信息修改接口
  // TODO: 修改密码接口
  // TODO 找回密码

  /** 修改用户信息 */
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Super)
  @Put(':id')
  async updateOneById(@Param() { id }: IdReqDto, @Body() body: UserCreateUpdateReqDto): Promise<NumberResDto> {
    const user = await this.userService.findOneById(id);
    if (!user) throw new BadRequestException('用户不存在');

    const count = await this.userService.checkRepeat(body.email, id);
    if (count > 0) throw new BadRequestException('邮箱已存在');

    const res = await this.userService.updateOneById(id, body);

    return { affected: res.nModified };
  }

  /** 获取单个用户信息 */
  @Get(':id')
  async findOneById(@Param() { id }: IdReqDto): Promise<UserGetResDto> {
    const user = await this.userService.findOneById(id);
    if (!user) throw new BadRequestException('用户不存在');

    return await this.userService.findOneById(id);
  }

  /** 获取用户列表 */
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Super, UserRole.Admin, UserRole.Normal)
  @Get()
  async findAll(): Promise<UserGetResDto[]> {
    return await this.userService.findAll();
  }
}
