import { IsArray, IsEmail, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

class WebsiteDto {
  @IsString({ message: '格式应为字符串' })
  @IsOptional()
  github: string;

  @IsString({ message: '格式应为字符串' })
  @IsOptional()
  twitter: string;

  @IsString({ message: '格式应为字符串' })
  @IsOptional()
  zhihu: string;

  @IsString({ message: '格式应为字符串' })
  @IsOptional()
  weibo: string;

  @IsString({ message: '格式应为字符串' })
  @IsOptional()
  gitee: string;

  @IsArray({ message: '格式应为字符串数组' })
  @IsOptional()
  personal_websites: string[];
}

export class UserCreateUpdateReqDto {
  @IsString({ message: 'user_name 格式应为字符串' })
  @IsNotEmpty({ message: 'user_name 不能为空' })
  user_name: string;

  @IsEmail({}, { message: 'email 格式不正确' })
  @IsNotEmpty({ message: 'email 不能为空' })
  email: string;

  // TODO 密码修改 单独接口

  @IsString({ message: 'password 应为字符串格式' })
  @IsNotEmpty({ message: 'password 不能为空' })
  @IsOptional()
  password: string;

  @IsString({ message: 'birth 格式应为 Date' })
  @IsOptional()
  birth: Date;

  @IsString({ message: 'gender 格式应为字符串' })
  @IsOptional()
  gender: string;

  @IsString({ message: 'background 格式应为字符串' })
  @IsOptional()
  background: string;

  @IsString({ message: 'avatar 格式应为字符串' })
  @IsOptional()
  avatar: string;

  @IsObject({ message: 'websites 应为对象' })
  @IsOptional()
  websites: WebsiteDto;

  @IsString({ message: 'description 格式应为字符串' })
  @IsOptional()
  description: string;
}
