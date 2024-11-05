import { HttpException, Injectable } from '@nestjs/common';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { UpdateTechnologyDto } from './dto/update-technology.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Technology } from '@prisma/client';

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

  async findAll(params: {
    //Metodo asincronico que recibe parametros opcionales
    tag?: string;
    search?: string;
    project?: string;
    //Paginación y ordenamiento
    skip?: number;
    take?: number;
    orderBy?: 'name' | 'createdAt';
    order?: 'asc' | 'desc';
  }): Promise<{ technologies: Technology[]; total: number }> {
    //Desestructuramos los parametros
    const {
      tag,
      search,
      project,
      //Skip y take reciben un valor por defecto
      skip = 0,
      take = 10,
      orderBy = 'createdAt',
      order = 'desc',
    } = params;

    const where: Prisma.TechnologyWhereInput = {};
    //Si hay tag, busca tecnologías que contengan ese tag
    if (tag) {
      where.tags = {
        has: tag, //Indicamos que el tag que recibo por parametro es el que buscamos en la db
      };
    }
    /* Filtra por busqueda
    Si hay término de búsqueda, busca en:
    Nombre (insensible a mayúsculas/minúsculas)
    Descripción (insensible a mayúsculas/minúsculas)
    Tags */
    if (search) {
      where.OR = [
        //Puede contener nombre, description o tag
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { tags: { has: search } },
      ];
    }
    //Si hay proyecto, busca tecnologías asociadas a ese proyecto
    if (project) {
      where.projects = {
        some: {
          name: project,
        },
      };
    }
    //Validamos campos de ordenamiento
    const validOrderFields = ['name', 'createdAt'];
    const validOrderTypes = ['asc', 'desc'];
    //Establece valores seguros para ordenamiento
    const sortField = validOrderFields.includes(orderBy)
      ? orderBy
      : 'createdAt';
    const sortOrder = validOrderTypes.includes(order) ? order : 'desc';

    const [technologies, total] = await Promise.all([
      this.prisma.technology.findMany({
        //Obtiene tecnologías filtradas con relaciones incluidas
        where,
        include: {
          questions: true,
          resources: true,
          projects: true,
        },
        skip,
        take,
        orderBy: {
          [sortField]: sortOrder,
        },
      }),
      //Cuenta total de registros que cumplen los filtros
      this.prisma.technology.count({ where }),
    ]);
    //Retorna las tecnologías encontradas y el total de registros
    return { technologies, total };
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
