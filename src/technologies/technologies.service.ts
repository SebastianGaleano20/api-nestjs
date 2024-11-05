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

  async findOne(id: number): Promise<Technology> {
    //Buscamos filtrando por id la tecnología
    const technology = await this.prisma.technology.findUnique({
      where: { id },
      include: {
        questions: true,
        resources: true,
        projects: true,
      },
    });
    //Si no existe el id lanzamos el error 404
    if (!technology) {
      throw new HttpException(`Technology with ID ${id} not found`, 404);
    }
    //Si existe lo retornamos
    return technology;
  }

  async update(
    //Recibe el id por parametro y el DTO de actualización
    id: number,
    updateTechnologyDto: UpdateTechnologyDto,
  ): Promise<Technology> {
    //Desestructuramos los proyectos recibidos y los datos de las tecnologías
    const { projects, ...technologyData } = updateTechnologyDto;

    // Verificar si existe la tecnología
    const existing = await this.prisma.technology.findUnique({
      where: { id },
    });
    //Error por si no existe tecnología con id indicado por parametro
    if (!existing) {
      throw new HttpException(`Technology with ID ${id} not found`, 404);
    }

    // Si se está actualizando el nombre, verificar que no exista otro con ese nombre
    if (technologyData.name) {
      const nameExists = await this.prisma.technology.findFirst({
        where: {
          name: technologyData.name,
          id: { not: id },
        },
      });
      //Si el nombre existe, lanzamos el error
      if (nameExists) {
        throw new HttpException(
          `Technology with name ${technologyData.name} already exists`,
          500,
        );
      }
    }

    try {
      //Actualizamos los datos
      return await this.prisma.technology.update({
        where: { id }, //Filtramos por id
        data: {
          ...technologyData, //Enviamos la data desestructurada
          projects: projects //Enviamos los proyectos
            ? {
                set: [], // Desvincula todos los proyectos existentes
                connect: projects.map((name) => ({ name })), // Conecta los nuevos proyectos
              }
            : undefined,
        },
        include: {
          questions: true,
          resources: true,
          projects: true,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new HttpException('One or more projects not found', 404);
        }
      }
      throw error;
    }
  }

  async remove(id: number): Promise<Technology> {
    // Verificar si existe la tecnología
    const existing = await this.prisma.technology.findUnique({
      //Filtramos por id
      where: { id },
      include: {
        questions: true,
        resources: true,
        projects: true,
      },
    });
    //Si no existe lanzamos error 404
    if (!existing) {
      throw new HttpException(`Technology with ID ${id} not found`, 404);
    }

    // Verificar si tiene relaciones y eliminarlas si es necesario
    if (existing.questions.length > 0 || existing.resources.length > 0) {
      // Eliminar primero las relaciones
      await this.prisma.$transaction([
        this.prisma.question.deleteMany({
          where: { technologyId: id },
        }),
        this.prisma.resource.deleteMany({
          where: { technologyId: id },
        }),
      ]);
    }

    // Eliminar la tecnología
    return await this.prisma.technology.delete({
      where: { id },
      include: {
        projects: true,
      },
    });
  }
}
