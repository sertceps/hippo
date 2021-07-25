import { IsMongoId } from 'class-validator';

export class IdReqDto {
  @IsMongoId({ message: 'id 格式应为 mongodb id' })
  id: string;
}
