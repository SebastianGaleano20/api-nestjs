import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionDto } from './create-question.dto';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) { }
/* PartialType convierte todas las propiedades del DTO base (CreateQuesionDTO) 
 en opcionales:
- Si CreateQuestionDto tiene campos obligatorios
- En UpdateQuestionDto estos mismos campos serán opcionales.
Ventajas de usar PartialType:
- Permite actualizaciones parciales
- Mantiene la validación de tipos
- Evita duplicar código
- Reutiliza las reglas de validación */