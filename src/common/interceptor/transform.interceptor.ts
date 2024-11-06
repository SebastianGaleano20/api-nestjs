// Importaciones necesarias de NestJS y RxJS
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Define la estructura de la respuesta usando una interfaz TypeScript
export interface Response<T> {
    data: T;           // Datos originales de la respuesta
    timestamp: string; // Marca de tiempo
    path: string;      // URL de la petición
}

// Decorador que marca la clase como inyectable
@Injectable()
// Clase genérica que implementa NestInterceptor
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {

    // Método requerido por la interfaz NestInterceptor
    intercept(
        context: ExecutionContext,    // Contexto de la ejecución
        next: CallHandler            // Manejador para continuar con la ejecución
    ): Observable<Response<T>> {

        // Obtiene el objeto request de la petición HTTP
        const request = context.switchToHttp().getRequest();

        // Procesa la respuesta usando RxJS
        return next.handle().pipe(
            // Transforma la respuesta original
            map(data => ({
                data,                           // Datos originales
                timestamp: new Date().toISOString(), // Añade timestamp actual
                path: request.url,                   // Añade la URL de la petición
            })),
        );
    }
}
/* Este interceptor transforma automáticamente todas las respuestas añadiendo metadata útil 
   como timestamp y path, manteniendo los datos originales en la propiedad data */