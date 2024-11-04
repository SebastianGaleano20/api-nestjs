import { HttpException, Injectable } from '@nestjs/common';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { UpdateTechnologyDto } from './dto/update-technology.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TechnologiesService {
  //Conectamos a prismaService nuestro constructor
  constructor(private readonly prisma: PrismaService) {}
  //Metodo asincronico para crear una nueva tecnología
  async create(createTechnologyDto: CreateTechnologyDto) {
    //Desestructuramos el proyecto por un lado y los datos de la tecnología a crear por otro.
    const { projects, ...technologyData } = createTechnologyDto;
    //Comprobamos que la tecnología existe
    const existing = await this.prisma.technology.findUnique({
      where: {
        name: technologyData.name,
      },
    });
    //Si existe entonces lanzamos un error
    if (existing) {
      throw new HttpException('Technology already exists', 400);
    }
    //En caso de que no exista, creamos la nueva tecnología
    try {
      const technology = await this.prisma.technology.create({
        data: {
          ...technologyData,
          //Los proyectos son una tabla aparte por lo tanto se conecta de la siguiente manera:
          projects: {
            connect: projects?.map((project) => ({ name: project })),
          },
        },
      });
      return technology;
    } catch (e) {
      throw new HttpException(`${e} Error creating technology`, 500);
    }
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
