import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question-dto';
import { FindQuestionsDto } from './dto/find-questions.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Question } from '@prisma/client';

@Injectable()
export class QuestionsService {
  // Crea una instancia de Prisma para acceder a sus métodos
  constructor(private readonly prisma: PrismaService) { }

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    // Verificar si existe la tecnología
    const technology = await this.prisma.technology.findUnique({
      where: { id: createQuestionDto.technologyId },
    });

    if (!technology) { //Si la tecnología no existe, lanzamos error
      throw new NotFoundException(
        `Technology with ID ${createQuestionDto.technologyId} not found`,
      );
    }
    //En caso de que la tecnoñogía exista creamos la pregunta 
    return this.prisma.question.create({
      data: createQuestionDto,
      include: {
        technology: true,
      },
    });
  }


  // Método asíncrono que recibe parámetros de búsqueda y retorna un objeto con preguntas y total
  async findAll(params: FindQuestionsDto): Promise<{ questions: Question[]; total: number }> {

    // Desestructuración de parámetros con valores por defecto
    const {
      search,                    // término de búsqueda
      technologyId,             // ID de tecnología
      skip = 0,                 // Paginación: cuántos registros saltar
      take = 10,                // Paginación: cuántos registros tomar
      orderBy = 'createdAt',    // Campo para ordenar
      order = 'desc',           // Dirección del ordenamiento
    } = params;

    // Objeto para construir condiciones WHERE de Prisma
    const where: Prisma.QuestionWhereInput = {};

    // Si hay término de búsqueda, agregar condición OR
    if (search) {
      where.OR = [
        // Busca en el campo question, insensible a mayúsculas/minúsculas
        { question: { contains: search, mode: 'insensitive' } },
        // Busca en el campo answer, insensible a mayúsculas/minúsculas
        { answer: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Si hay ID de tecnología, agregar al filtro
    if (technologyId) {
      where.technologyId = technologyId;
    }

    // Ejecutar dos consultas en paralelo usando Promise.all
    const [questions, total] = await Promise.all([
      // Primera consulta: Obtener preguntas filtradas
      this.prisma.question.findMany({
        where,                      // Condiciones de filtrado
        include: {                  // Incluir relación
          technology: true,
        },
        skip,                      // Paginación: saltar
        take,                      // Paginación: tomar
        orderBy: {                 // Ordenamiento dinámico
          [orderBy]: order,
        },
      }),
      // Segunda consulta: Contar total de registros
      this.prisma.question.count({ where }),
    ]);

    // Retornar objeto con preguntas y total
    return { questions, total };
  }

  async findOne(id: number): Promise<Question> {
    const question = await this.prisma.question.findUnique({
      where: { id },
      include: {
        technology: true,
      },
    });

    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    return question;
  }


  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
