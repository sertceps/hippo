import { IsEmail, IsHash, IsNotEmpty, IsString } from 'class-validator';

export class UserLoginReqDto {
  @IsEmail({}, { message: '邮箱地址格式不正确' })
  @IsNotEmpty({ message: '邮箱地址不能为空' })
  email: string;

  @IsString({ message: '密码应为字符串格式' })
  @IsNotEmpty({ message: '密码不能为空' })
  @IsHash('md5', { message: '密码格式应为 MD5' })
  password: string;
}
