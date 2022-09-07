import { Request, Response, NextFunction } from 'express';
import { LoggerService } from '../logger/logger.service';
import { IExceptionFilter } from './exception.filter.interface';
import { HTTPError } from './http-error.class';

export class ExceptionFilter implements IExceptionFilter{
  private logger: LoggerService;

  constructor(logger: LoggerService) {
    this.logger = logger;
  }

  catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
    if (err instanceof HTTPError) {
      const context = err.context ? err.context : 'no context';
      this.logger.error(`[${context}] [CODE: ${err.statusCode}] Error: "${err.message}"`);
      res.status(err.statusCode).send({ err: err.message, context: context });
    } else {
      this.logger.error(`${err.message}`);
      res.status(500).send({ err: err.message });
    }




  }
}