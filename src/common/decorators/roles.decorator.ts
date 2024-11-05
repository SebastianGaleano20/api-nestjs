import { SetMetadata } from '@nestjs/common';
//Definimos tipos de roles de la app
export enum Role {
    USER = 'user',
    ADMIN = 'admin',
}

/* ROLES_KEY es una constante que almacena la clave con la que se 
   guardará la metadata de roles en el decorador. 
   Esta clave se usará para recuperar los roles en un guard o interceptor. */
export const ROLES_KEY = 'roles';
//Creamos un decorador que acepta multiples roles como argumento y almacena los roles como metadatos en los endpoints
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);