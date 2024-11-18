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
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({summary: 'Create a new question'})
  @ApiResponse({status: 201, description: 'The question has been successfully created.'})
  @ApiResponse({status: 400, description: 'Invalid input data'})
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }

  @Get()
  @Roles(Role.USER, Role.ADMIN) // Endpoint autorizado para usuarios y administradores
  @ApiOperation({ summary: 'Get all questions with optional filtering and pagination' }) //Descripcíon del endpoint para SwaggerUI
  @ApiResponse({ status: 200, description: 'Return all questions.' }) // Response del endpoint
  findAll() {
    return this.questionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(+id);
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
