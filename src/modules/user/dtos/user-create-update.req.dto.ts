import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../constants/user.constants';

export class UserCreateReqDto {
  @IsString({ message: 'user_name 格式应为字符串' })
  @IsNotEmpty({ message: 'user_name 不能为空' })
  user_name: string;

  @IsEmail({}, { message: 'email 格式不正确' })
  @IsNotEmpty({ message: 'email 不能为空' })
  email: string;

  @IsString({ message: 'password 应为字符串格式' })
  @IsNotEmpty({ message: 'password 不能为空' })
  @IsOptional()
  password: string;

  @IsEnum(UserRole, { message: 'role 不在选项中' })
  @IsNotEmpty({ message: 'role 不能为空' })
  role: UserRole;
}
