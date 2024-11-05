import { SetMetadata } from '@nestjs/common';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

/* ROLES_KEY es una constante que almacena la clave con la que se 
   guardará la metadata de roles en el decorador. 
   Esta clave se usará para recuperar los roles en un guard o interceptor. */
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);