import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CategoryCreateUpdateReqDto {
  @IsNotEmpty({ message: 'category 不能为空' })
  @IsString({ message: 'category 应为字符串类型' })
  @MaxLength(32, { message: '类别最大长度为 32 个字符' })
  category: string;
}
