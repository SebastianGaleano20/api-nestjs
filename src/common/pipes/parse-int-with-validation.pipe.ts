import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

// Permite que NestJS pueda inyectar esta clase como dependencia
@Injectable()
// La clase implementa PipeTransform con tipos genéricos:
// string: Tipo de entrada
// number: Tipo de salida
export class ParseIntWithValidationPipe implements PipeTransform<string, number> {
    // value: El valor a transformar (recibe un string)
    // metadata: Contiene información sobre el parámetro decorado
    // Retorna un número
    transform(value: string, metadata: ArgumentMetadata): number {
        // Convierte el string a número usando base 10
        const val = parseInt(value, 10);
        // Verifica si la conversión fue exitosa
        // Si no es un número válido, lanza una excepción con mensaje descriptivo
        if (isNaN(val)) {
            throw new BadRequestException(
                `Validation failed. "${value}" is not a valid integer`,
            );
        }
        return val;
    }
}