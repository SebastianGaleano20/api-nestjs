// Importa las clases necesarias del framework NestJS para manejar excepciones HTTP
import { HttpException, HttpStatus } from '@nestjs/common';

// Define una excepción personalizada para tecnologías no encontradas
export class TechnologyNotFoundException extends HttpException {
  // Constructor que recibe el ID de la tecnología no encontrada
  constructor(id: number) {
    // Llama al constructor padre con un mensaje personalizado y código 404
    super(`Technology with ID ${id} not found`, HttpStatus.NOT_FOUND);
  }
}

// Define una excepción personalizada para tecnologías duplicadas
export class DuplicateTechnologyException extends HttpException {
  // Constructor que recibe el nombre de la tecnología duplicada
  constructor(name: string) {
    // Llama al constructor padre con un mensaje personalizado y código 409
    super(`Technology with name ${name} already exists`, HttpStatus.CONFLICT);
  }
}
