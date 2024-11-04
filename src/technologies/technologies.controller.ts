import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TechnologiesService } from './technologies.service';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { UpdateTechnologyDto } from './dto/update-technology.dto';

@Controller('technologies')
export class TechnologiesController {
  constructor(private readonly technologiesService: TechnologiesService) {}

  @Post()
  create(@Body() createTechnologyDto: CreateTechnologyDto) {
    return this.technologiesService.create(createTechnologyDto);
  }

  @Get()
  findAll() {
    return this.technologiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.technologiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTechnologyDto: UpdateTechnologyDto) {
    return this.technologiesService.update(+id, updateTechnologyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.technologiesService.remove(+id);
  }
}
