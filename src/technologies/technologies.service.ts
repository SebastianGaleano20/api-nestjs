import { Injectable } from '@nestjs/common';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { UpdateTechnologyDto } from './dto/update-technology.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TechnologiesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTechnologyDto: CreateTechnologyDto) {
    return this.prisma.technology.create({
      data: createTechnologyDto,
    });
  }

  findAll() {
    return `This action returns all technologies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} technology`;
  }

  update(id: number, updateTechnologyDto: UpdateTechnologyDto) {
    return `This action updates a #${id} technology`;
  }

  remove(id: number) {
    return `This action removes a #${id} technology`;
  }
}
