import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../decorators/roles/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  // El Reflector nos permite leer los metadatos (@Roles) de las rutas
  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    // 1. Conseguimos los roles requeridos para esta ruta específica
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si la ruta no tiene el decorador @Roles, significa que es pública para cualquier logueado
    if (!requiredRoles) {
      return true;
    }

    // 2. Extraemos el usuario que nuestro PRIMER guardia (AuthGuard) ya dejó en la petición
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // 3. Verificamos si el rol del usuario está dentro de los roles permitidos
    const tieneRolPermitido = requiredRoles.includes(user?.rol);
    if (!tieneRolPermitido) {
      // Si no tiene el rol, le lanzamos un hermoso Error 403 Forbidden (Prohibido)
      throw new ForbiddenException('No tienes los permisos necesarios para realizar esta acción');
    }
    return true;
  }
}