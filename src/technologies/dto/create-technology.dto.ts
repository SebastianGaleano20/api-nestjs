//Importamos todas las validaciones a utilizar
import {
  IsString,
  IsArray,
  IsNotEmpty,
  MinLength,
  MaxLength,
  ArrayMinSize,
  isArray,
  isNotEmpty,
} from 'class-validator';

//Al crear una tecnología utilizara las siguientes validaciones para cada propiedad:
export class CreateTechnologyDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  description: string;

  @isArray()
  @ArrayMinSize(1)
  tags: string[];

  @IsArray()
  @IsString({ each: true }) //Cada elemento del arreglo va a ser string
  @isNotEmpty({ each: true }) //Que ningun elemento este vacio
  projects?: string[];
}
