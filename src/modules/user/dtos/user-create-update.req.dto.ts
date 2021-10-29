import { IsEmail, IsEnum, IsHash, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { UserRole } from '../constants/user.constants';

export class UserCreateReqDto {
  @IsString({ message: 'user_name 格式应为字符串' })
  @IsNotEmpty({ message: 'user_name 不能为空' })
  @MaxLength(60, { message: 'user_name 最长为 60 字符' })
  user_name: string;

  @IsEmail({}, { message: 'email 格式不正确' })
  @IsNotEmpty({ message: 'email 不能为空' })
  @MaxLength(140, { message: 'email 最长为 140 字符' })
  email: string;

  @IsString({ message: 'password 应为字符串格式' })
  @IsNotEmpty({ message: 'password 不能为空' })
  @IsHash('md5', { message: 'password 应为 MD5' })
  @MaxLength(140, { message: 'password 最长为 140 字符' })
  @IsOptional()
  password: string;

  @IsEnum(UserRole, { message: 'role 不在选项中' })
  @IsNotEmpty({ message: 'role 不能为空' })
  role: UserRole;
}
