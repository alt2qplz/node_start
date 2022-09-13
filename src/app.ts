import express, { Express } from 'express';
import { UsersController } from './users/users.controller';
import { Server } from 'http';
import { ExceptionFilter } from './errors/exception.filter';
import { ILogger } from './logger/logger.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import 'reflect-metadata';

@injectable()
export class App {
  app: Express;
  port: number;
  server: Server;

  constructor(
    @inject(TYPES.LoggerService) private logger: ILogger,
    @inject(TYPES.ExceptionFilter) private exceptionFilter: ExceptionFilter,
    @inject(TYPES.UserController) private userController: UsersController
  ) {
    this.app = express();
    this.port = 8000;
  }

  useRoutes(): void {
    this.app.use('/users', this.userController.router);
  }

  useExceptionFilters(): void {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public async init(): Promise<void> {
    this.useRoutes();
    this.useExceptionFilters();
    this.server = this.app.listen(this.port);
    this.logger.log(`server started on PORT: ${this.port}`);
  }
}