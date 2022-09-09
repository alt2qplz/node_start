import { BaseController } from '../common/base.controller';
import { Request, Response, NextFunction } from 'express';
import { HTTPError } from '../errors/http-error.class';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';
import { IUserController } from './user.controller.interface';

@injectable()
export class UsersController extends BaseController implements IUserController{
  constructor(
    @inject(TYPES.LoggerService) private  loggerService: ILogger
  ) {
    super(loggerService);

    this.bindRoutes([
      { path: '/login', method: 'post', func: this.login },
      { path: '/register', method: 'post', func: this.register }
    ]);
  }

  login(req: Request, res: Response, next: NextFunction): void {
    // this.ok<{message: string}>(res, { message: 'login' });
    next(new HTTPError(401, 'User not found'));
  }

  register(req: Request, res: Response, next: NextFunction): void {
    this.ok<{message: string}>(res, { message: 'register' });
  }
}