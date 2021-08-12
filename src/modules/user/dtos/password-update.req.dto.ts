import { IsNotEmpty } from 'class-validator';

export class PasswordUpdateReqDto {
  @IsNotEmpty({ message: '原密码不能为空' })
  old_password: string;

  @IsNotEmpty({ message: '新密码不能为空' })
  new_password: string;
}
