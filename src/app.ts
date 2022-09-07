import express, { Express } from 'express';
// import { userRouter } from './users/users';
import { UsersController } from './users/users.controller';
import { Server } from 'http';
import { LoggerService } from './logger/logger.service';
import { BaseController } from './common/base.controller';
import { ExceptionFilter } from './errors/exception.filter';

export class App {
  app: Express;
  port: number;
  server: Server;
  logger: LoggerService;
  exceptionFilter: ExceptionFilter;

  constructor(
    port: number,
    logger: LoggerService,
    exceptionFilter: ExceptionFilter,
    routes: BaseController[]
  ) {
    this.app = express();
    this.port = port;
    this.logger = logger;
    this.exceptionFilter = exceptionFilter;
    for (const route of routes) this.app.use(route.route, route.router);
  }

  // useRoutes() {
  //   this.app.use('/users', userRouter);
  // }

  useExceptionFilters() {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public async init() {
    // this.useRoutes();
    this.useExceptionFilters();
    this.server = this.app.listen(this.port);
    this.logger.log(`server started on PORT: ${this.port}`);
  }
}