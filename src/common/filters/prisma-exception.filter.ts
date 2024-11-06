// Importaciones necesarias de NestJS y Prisma
import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

// Decorador que indica que esta clase manejará errores específicos de Prisma
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
    // Método que maneja las excepciones
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        // Obtiene el contexto HTTP
        const ctx = host.switchToHttp();
        // Obtiene el objeto response
        const response = ctx.getResponse<Response>();

        // Switch para manejar diferentes códigos de error de Prisma
        switch (exception.code) {
            // P2002: Error de violación de restricción única
            case 'P2002': {
                const status = HttpStatus.CONFLICT;
                response.status(status).json({
                    statusCode: status,
                    message: 'Unique constraint violation',
                    error: 'Conflict',
                });
                break;
            }
            // P2025: Error de registro no encontrado
            case 'P2025': {
                const status = HttpStatus.NOT_FOUND;
                response.status(status).json({
                    statusCode: status,
                    message: 'Record not found',
                    error: 'Not Found',
                });
                break;
            }
            // Cualquier otro error de Prisma
            default:
                response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Internal server error',
                });
        }
    }
}

/* 
Este código es un filtro de excepciones personalizado para NestJS
que maneja específicamente errores de Prisma ORM. Su principal función es:
Manejo de Errores de Base de Datos: Intercepta y transforma los errores de Prisma 
en respuestas HTTP apropiadas.
Maneja violaciones de restricciones únicas (P2002) → retorna 409 Conflict
Maneja registros no encontrados (P2025) → retorna 404 Not Found
Otros errores → retorna 500 Internal Server Error
*/