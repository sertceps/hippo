import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CommentCreateReqDto {
  @MaxLength(60, { message: 'name 最长为 60 字符' })
  @IsString({ message: 'name 应为字符串格式' })
  @IsNotEmpty({ message: 'name 不能为空' })
  name: string;

  @MaxLength(140, { message: 'email 最长为 140 字符' })
  @IsEmail({}, { message: 'email 格式不正确' })
  @IsNotEmpty({ message: 'email 不能为空' })
  email: string;

  @MaxLength(140, { message: 'website 最长为 140 字符' })
  @IsString({ message: 'website 格式应为字符串' })
  @IsOptional()
  website?: string;

  @MaxLength(140, { message: '评论最长为 140 字符' })
  @IsString({ message: '评论格式应为字符串' })
  @IsNotEmpty({ message: '评论内容不能为空' })
  content: string;
}
