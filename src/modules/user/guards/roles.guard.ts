import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../constants/user.constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 从控制器注解中得到的角色组信息。
    const requiredRoles = this.reflector.get<UserRole[]>('roles', context.getHandler());

    if (!requiredRoles) return true;
    const { user } = context.switchToHttp().getRequest();

    return requiredRoles.some(role => user?.role === role);
  }
}
