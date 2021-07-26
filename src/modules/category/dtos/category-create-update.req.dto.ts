import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryCreateUpdateReqDto {
  @IsNotEmpty({ message: 'category 不能为空' })
  @IsString({ message: 'category 应为字符串类型' })
  category: string;
}
