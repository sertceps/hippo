import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserRole } from '../constants/user.constants';

export class RoleUpdateReqDto {
  @IsEnum(UserRole, { message: 'role 不在选项中' })
  @IsNotEmpty({ message: 'role 不能为空' })
  role: UserRole;
}
