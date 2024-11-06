import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable() // Permite que NestJS pueda inyectar esta clase como dependencia
 //LoggerMiddleware es un middleware que implementa la interfaz NestMiddleware
export class LoggerMiddleware implements NestMiddleware {
  //Su función es registrar información sobre cada petición HTTP que pasa por la aplicación
    use(req: Request, _res: Response, next: NextFunction) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
  }
}