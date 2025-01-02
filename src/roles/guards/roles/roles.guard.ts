import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../../enum/role.enum';
import { ROLES_KEY } from '../../decorators/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector:Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const user = context.switchToHttp().getRequest().user;

    const hasRequiredRole =  requiredRoles.some((role)=> user.role === role);

    return hasRequiredRole;
  }
}
