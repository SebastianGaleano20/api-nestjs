import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role, ROLES_KEY } from '@/decorators/roles.decorator';

@Injectable()
// Guard para rutas de usuario
export class RolesGuard implements CanActivate {
    // reflector me ayuda a recuperar las metadata de roles en un guard o interceptor.
    constructor(private reflector: Reflector) { }
    // canActive determina el acceso
    canActivate(context: ExecutionContext): boolean {
        // Obtiene los roles requeridos del decorador @Roles()
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(), // Nivel de metodo
            context.getClass(),   // Nivel de clase
        ]);
        // Si no hay roles requeridos, permite el acceso
        if (!requiredRoles) {
            return true;
        }
        // Obtiene el usuario de la request
        const { user } = context.switchToHttp().getRequest();
        // Verifica si el usuario tiene al menos uno de los roles requeridos
        return requiredRoles.some((role) => user?.roles?.includes(role));
        return requiredRoles.every((role) => user?.roles?.includes(role));
    }
}