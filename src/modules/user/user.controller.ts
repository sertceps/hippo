import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
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
import { UserCreateReqDto } from './dtos/user-create-update.req.dto';
import { UserGetResDto } from './dtos/user-get.res.dto';
import { UserLoginReqDto } from './dtos/user-login.req.dto';
import { RolesGuard } from './guards/roles.guard';
import { UserService } from './user.service';
import { UserRole } from './constants/user.constants';
import { PasswordUpdateReqDto } from './dtos/password-update.req.dto';
import { UserUpdateReqDto } from './dtos/user-update.req.dto';
import { RoleUpdateReqDto } from './dtos/role-update.req.dto';

@Controller('users')
export class UserController {
  constructor(
    @Inject(CommonConfigRegister.KEY)
    private commonConfig: ConfigType<typeof CommonConfigRegister>,
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  /** 登录 */
  @Post('login')
  async login(@Body() body: UserLoginReqDto): Promise<TokenResDto> {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) throw new BadRequestException('邮箱或密码不正确');

    return { access_token: await this.authService.certificate(user), jwt_expires_in: this.commonConfig.jwtExpiresIn };
  }

  /** 获取已登录用户信息 */
  @UseGuards(AuthGuard('jwt'))
  @Get('info')
  async getLoginInfo(@AuthUser() userInfo: UserInfo): Promise<UserGetResDto> {
    const user = await this.userService.findOneById(userInfo.id);
    if (!user) throw new BadRequestException('用户不存在或已删除');

    return user;
  }

  /** 登录用户修改资料 */
  @UseGuards(AuthGuard('jwt'))
  @Patch('info')
  async updateUserInfo(@Body() body: UserUpdateReqDto, @AuthUser() userInfo: UserInfo): Promise<NumberResDto> {
    const count = await this.userService.checkRepeat(body.email);
    if (count > 0) throw new BadRequestException('邮箱已存在');

    const res = await this.userService.updateOneById(userInfo.id, body);

    return { affected: res.nModified };
  }

  // TODO 找回密码
  /** 找回密码 */
  /** 发邮件？ */

  /** 修改密码 */
  @UseGuards(AuthGuard('jwt'))
  @Patch('password')
  async updatePassword(@Body() body: PasswordUpdateReqDto, @AuthUser() userInfo: UserInfo): Promise<NumberResDto> {
    const user = await this.authService.validatePassword(userInfo.id, body.old_password);
    if (!user) throw new BadRequestException('原密码错误');

    const md5Password = await this.authService.encrypt(body.new_password);
    const res = await this.userService.updatePassword(user.id, md5Password);

    return { affected: res.nModified };
  }

  /** 创建用户 */
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Super)
  @Post()
  async create(@Body() body: UserCreateReqDto): Promise<IdResDto> {
    const count = await this.userService.checkRepeat(body.email);
    if (count > 0) throw new BadRequestException('邮箱已存在');

    const md5Password = this.authService.encrypt(body.password);

    const user = await this.userService.create({ password: md5Password, ...body });

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

  /** 修改用户信息 */
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Super)
  @Patch(':id')
  async updateOneById(@Param() { id }: IdReqDto, @Body() body: UserUpdateReqDto): Promise<NumberResDto> {
    const user = await this.userService.findOneById(id);
    if (!user) throw new BadRequestException('用户不存在');

    const count = await this.userService.checkRepeat(body.email, id);
    if (count > 0) throw new BadRequestException('邮箱已存在');

    const res = await this.userService.updateOneById(id, body);

    return { affected: res.nModified };
  }

  /** 修改权限 */
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Super)
  @Patch('roles/:id')
  async updateRole(@Param() { id }: IdReqDto, @Body() { role }: RoleUpdateReqDto): Promise<NumberResDto> {
    const user = await this.userService.findOneById(id);
    if (!user) throw new BadRequestException('用户不存在');

    const res = await this.userService.updateRole(user.id, role);
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
