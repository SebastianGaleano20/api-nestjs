import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectsService {
  //Creamos la instancia para interactuar con la db
  constructor(private readonly prisma: PrismaService) { }
  /* Metodo que crea un nuevo proyecto recibiendo por parametro la data
     La estructura de la data debe respetar el CreateProjectDto */
  create(createProjectDto: CreateProjectDto) {
    //Desestructuramos technologías y la data de los proyectos para trabajarlas por separado
    const { technologies, ...projectData } = createProjectDto;
    //Vamos a retornar como valor el resultado del metodo create de prisma:
    return this.prisma.project.create({
      data: {
        //Le enviamos como data projectData desestructurada
        ...projectData,
        //Incluimos las technologías encontradas por el nombre recibido por parametro
        technologies: {
          connect: technologies.map(name => ({ name })),
        },
      },
      //Incluimos la informacion de las technologías encontradas
      include: {
        technologies: true,
      }
    })
  }

  findAll() {
    //Retornamos todos los proyectos con las technologías incluidas
    return this.prisma.project.findMany({
      include: {
        technologies: true,
      }
    });
  }

  findOne(id: number) {
    //Retornamos el proyecto encontrado por id recibido en los parametros
    return this.prisma.project.findUnique({
      where: { id },
      include: {
        technologies: true,
      },
    });
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    const { technologies, ...projectData } = updateProjectDto;

    return this.prisma.project.update({
      where: { id },
      data: {
        ...projectData,
        technologies: technologies ? {
          set: [],
          connect: technologies.map((name) => { name })
        } : undefined,
      },
      include: {
        technologies: true,
      }
    });
  }

  remove(id: number) {
    return this.prisma.project.delete({
      where: { id },
      include: {
        technologies: true,
      },
    });
  }
}