import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class TagCreateUpdateReqDto {
  @IsString({ message: 'Tag 为字符串格式' })
  @IsNotEmpty({ message: 'Tag 不能为空' })
  @MaxLength(32, { message: '标签最大长度为 32 个字符' })
  tag: string;
}
