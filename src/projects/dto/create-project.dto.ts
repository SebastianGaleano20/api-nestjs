import { IsString, IsArray, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
    //Documentacion swagger
    @ApiProperty({
        description: 'The name of the project',
        example: 'E-commerce Platform',
        minLength: 3,
        maxLength: 100,
    })
    // Validaciones de datos
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    name: string;

    @ApiProperty({
        description: 'A detailed description of the project',
        example: 'An e-commerce platform built with modern technologies',
        minLength: 10,
        maxLength: 500,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(500)
    description: string;

    @ApiProperty({
        description: 'Technologies used in the project',
        example: ['React', 'Node.js', 'PostgreSQL'],
        type: [String],
    })
    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    technologies: string[];
}