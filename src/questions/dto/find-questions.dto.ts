// Importa los decoradores de validación
import { IsOptional, IsString, IsNumber, IsInt, Min, IsEnum } from 'class-validator';
// Importa decorador para documentación Swagger
import { ApiProperty } from '@nestjs/swagger';
// Importa Type para transformación de tipos
import { Type } from 'class-transformer';

export class FindQuestionsDto {
    // Campo para búsqueda por texto
    @ApiProperty({ required: false })              // Documenta el campo en Swagger como opcional
    @IsOptional()                                 // Marca el campo como opcional
    @IsString()                                   // Valida que sea string
    search?: string;                              // Campo opcional de tipo string

    // ID de tecnología para filtrar
    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()                                   // Valida que sea número
    technologyId?: number;

    // Paginación: Cuántos registros saltar
    @ApiProperty({ required: false, default: 0 })  // Valor por defecto 0
    @IsOptional()
    @Type(() => Number)                           // Transforma el valor a número
    @IsInt()                                      // Valida que sea entero
    @Min(0)                                       // Valor mínimo permitido
    skip?: number;

    // Paginación: Cuántos registros tomar
    @ApiProperty({ required: false, default: 10 }) // Valor por defecto 10
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)                                       // Mínimo 1 registro
    take?: number;

    // Campo por el cual ordenar
    @ApiProperty({ required: false, enum: ['question', 'createdAt'] })
    @IsOptional()
    @IsEnum(['question', 'createdAt'])            // Solo permite estos valores
    orderBy?: 'question' | 'createdAt';           // Union type con valores permitidos

    // Dirección del ordenamiento
    @ApiProperty({ required: false, enum: ['asc', 'desc'] })
    @IsOptional()
    @IsEnum(['asc', 'desc'])                      // Solo permite asc o desc
    order?: 'asc' | 'desc';                       // Union type para el orden
}
