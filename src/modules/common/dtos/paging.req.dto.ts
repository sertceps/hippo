import { Type } from 'class-transformer';
import { IsInt, IsNumber, Max, Min } from 'class-validator';

export class PagingReqDto {
  @Min(1, { message: 'page 最小值应为 1' })
  @IsInt({ message: 'page 格式应为整数' })
  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'page 格式应为数字' })
  @Type(() => Number)
  page: number;

  @Max(20, { message: 'size 最大值应为 20' })
  @Min(1, { message: 'size 最小值应为 1' })
  @IsInt({ message: 'size 格式应为整数' })
  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'size 格式应为数字' })
  @Type(() => Number)
  size: number;
}
