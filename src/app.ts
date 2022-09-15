import express, { Express } from 'express';
import { Server } from 'http';
import { ILogger } from './logger/logger.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import 'reflect-metadata';
import { json } from 'body-parser';
import { IConfigService } from './config/config.service.interface';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { UsersController } from './users/users.controller';

@injectable()
export class App {
  app: Express;
  port: number;
  server: Server;

  constructor(
    @inject(TYPES.LoggerService) private _logger: ILogger,
    @inject(TYPES.ExceptionFilter) private _exceptionFilter: IExceptionFilter,
    @inject(TYPES.UserController) private _userController: UsersController,
    @inject(TYPES.ConfigService) private _configService: IConfigService
  ) {
    this.app = express();
    this.port = 8000;
  }

  useMiddleware(): void {
    this.app.use(json());
  }

  useRoutes(): void {
    this.app.use('/users', this._userController.router);
  }

  useExceptionFilters(): void {
    this.app.use(this._exceptionFilter.catch.bind(this._exceptionFilter));
  }

  public async init(): Promise<void> {
    this.useMiddleware();
    this.useRoutes();
    this.useExceptionFilters();
    this.server = this.app.listen(this.port);
    this._logger.log(`server started on PORT: ${this.port}`);
  }
}