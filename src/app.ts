import express, { Express } from 'express';
// import { userRouter } from './users/users';
import { UsersController } from './users/users.controller';
import { Server } from 'http';
import { LoggerService } from './logger/logger.service';
import { BaseController } from './common/base.controller';

export class App {
  app: Express;
  port: number;
  server: Server;
  logger: LoggerService;

  constructor(
    logger: LoggerService,
    routes: BaseController[]
  ) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    for (const route of routes) {
      this.app.use(route.route, route.router);
    }
  }

  // useRoutes() {
  //   this.app.use('/users', userRouter);
  // }

  public async init() {
    // this.useRoutes();
    this.server = this.app.listen(this.port);
    this.logger.log(`server started on PORT: ${this.port}`);
  }
}