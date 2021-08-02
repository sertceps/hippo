import { ArrayNotEmpty, IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ArticleCreateUpdateReqDto {
  @IsString({ message: 'title 格式应为字符串' })
  @IsNotEmpty({ message: '标题不能为空' })
  title: string;

  @IsMongoId({ message: 'user 格式应为 mongodb id' })
  @IsNotEmpty({ message: 'user 不能为空' })
  user: string;

  @IsMongoId({ message: 'category 格式应为 mongodb id' })
  @IsNotEmpty({ message: 'category 不能为空' })
  @IsOptional()
  category: string;

  @IsMongoId({ each: true, message: 'tags 中项目格式应为 mongodb id' })
  @IsArray({ message: 'tags 应为数组' })
  @ArrayNotEmpty({ message: 'tags 不能为空' })
  @IsOptional()
  tags: string[];

  @IsString({ message: 'content 格式应为字符串' })
  @IsNotEmpty({ message: '内容不能为空' })
  content: string;
}
