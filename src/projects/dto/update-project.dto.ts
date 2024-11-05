import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  technologies?: string[];
}