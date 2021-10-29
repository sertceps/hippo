import { ArrayNotEmpty, IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class ArticleCreateUpdateReqDto {
  @IsString({ message: 'title 格式应为字符串' })
  @IsNotEmpty({ message: '标题不能为空' })
  @MaxLength(64, { message: '标题最大长度为 64 个字符' })
  title: string;

  @IsString({ message: 'content 格式应为字符串' })
  @IsNotEmpty({ message: '内容不能为空' })
  @MaxLength(30000, { message: '内容超过 3 万字，请拆分' })
  @IsOptional()
  content: string;

  @IsMongoId({ message: 'category 格式应为 mongodb id' })
  @IsNotEmpty({ message: 'category 不能为空' })
  @IsOptional()
  category?: string;

  @IsMongoId({ each: true, message: 'tags 中项目格式应为 mongodb id' })
  @IsArray({ message: 'tags 应为数组' })
  @ArrayNotEmpty({ message: 'tags 不能为空' })
  @IsOptional()
  tags?: string[];
}
