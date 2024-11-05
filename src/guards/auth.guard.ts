import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
//Guard para autenticar usuario
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      // Aquí iría la lógica de verificación del token
      // Por ejemplo, usando JWT:
      // const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // request.user = decoded;
      request.user = {
        id: 1,
        roles: ["admin", "user"],
      };
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}