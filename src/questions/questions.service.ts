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

    if (!technology) {
      throw new NotFoundException(
        `Technology with ID ${createQuestionDto.technologyId} not found`,
      );
    }

    return this.prisma.question.create({
      data: createQuestionDto,
      include: {
        technology: true,
      },
    });
  }


  findAll() {
    return `This action returns all questions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
