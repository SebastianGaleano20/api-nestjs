import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { FindQuestionsDto } from './dto/find-questions.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles, Role } from '../common/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('questions') //Agrupa endpoints de questions
@Controller('questions')
@UseGuards(AuthGuard, RolesGuard) //Uso de guards 
@ApiBearerAuth() //Autenticacíon e tokens
export class QuestionsController {
  // Instancia de questions service para utilizar sus métodos.
  constructor(private readonly questionsService: QuestionsService) { }

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create a new question' })
  @ApiResponse({ status: 201, description: 'The question has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }

  @Get()
  @Roles(Role.USER, Role.ADMIN) // Endpoint autorizado para usuarios y administradores
  @ApiOperation({ summary: 'Get all questions with optional filtering and pagination' }) //Descripcíon del endpoint para SwaggerUI
  @ApiResponse({ status: 200, description: 'Return all questions.' }) // Response del endpoint
  findAll(
    // Define parametros de consulta 
    @Query() findQuestionsDto: FindQuestionsDto, // Captura todos los parámetros de consulta y los mapea al DTO FindQuestionsDto
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number, // Define por defecto cuantos saltear, y con ParseIntPipe los convienrte en number
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number, // Define por defecto cuantos mostrar
  ) {
    return this.questionsService.findAll({
      ...findQuestionsDto,  // Spread operator: expande todos los filtros del DTO
      skip,                 // Añade el offset para paginación
      take,                 // Añade el límite de registros
    });
  }

  @Get('by-technology/:technologyId') // Ruta para buscar preguntas por tecnologías
  @Roles(Role.USER, Role.ADMIN) // Roles autorizados
  @ApiOperation({ summary: 'Get questions by technology ID' }) // Descripcíon de la funcionalidad de este endpoint
  @ApiResponse({ status: 200, description: 'Return questions for the specified technology.' }) // Response
  // Indicamos que el parametro technologyId es nuestro filtro. 
  findByTechnology(@Param('technologyId', ParseIntPipe) technologyId: number) { 
    return this.questionsService.findByTechnology(technologyId);
  }
  

  @Get(':id') // Buscador por id de pregunta
  @Roles(Role.USER, Role.ADMIN) // Roles autorizados
  @ApiOperation({ summary: 'Get a question by id' }) // Descripcíon de funcionalidad del endpoint
  @ApiResponse({ status: 200, description: 'Return the question.' }) // Response en caso de exito
  @ApiResponse({ status: 404, description: 'Question not found.' }) // Response en caso de error
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.questionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionsService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(+id);
  }
}
