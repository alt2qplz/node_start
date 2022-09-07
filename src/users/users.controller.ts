import { BaseController } from '../common/base.controller';
import { LoggerService } from '../logger/logger.service';
import { Request, Response, NextFunction } from 'express';
import { HTTPError } from '../errors/http-error.class';

export class UsersController extends BaseController {
  constructor(logger: LoggerService) {
    super(logger, '/users');
    this.bindRoutes([
      { path: '/login', method: 'post', func: this.login },
      { path: '/register', method: 'post', func: this.register }
    ]);
  }

  login(req: Request, res: Response, next: NextFunction) {
    // this.ok<{message: string}>(res, { message: 'login' });
    next(new HTTPError(401, 'User not found'));
  }

  register(req: Request, res: Response, next: NextFunction) {
    this.ok<{message: string}>(res, { message: 'register' });
  }
}