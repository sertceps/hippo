import { IsNotEmpty, IsString } from 'class-validator';

export class TagCreateUpdateReqDto {
  @IsString({ message: 'Tag 为字符串格式' })
  @IsNotEmpty({ message: 'Tag 不能为空' })
  tag: string;
}
