import { BaseController } from '../common/base.controller';
import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';
import { IUserController } from './user.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { IUserService } from './user.service.interface';
import { HTTPError } from '../errors/http-error.class';

@injectable()
export class UsersController extends BaseController implements IUserController{
  constructor(
    @inject(TYPES.LoggerService) private _loggerService: ILogger,
    @inject(TYPES.UserService) private _userService: IUserService
  ) {
    super(_loggerService);

    this.bindRoutes([
      { path: '/login', method: 'post', func: this.login },
      { path: '/register', method: 'post', func: this.register }
    ]);
  }

  login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
    console.log(req.body);
    // next(new HTTPError(401, 'User not found'));
    this.ok<{message: string}>(res, { message: 'login' });
  }

  async register(
    { body }: Request<{}, {}, UserRegisterDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const result = await this._userService.createUser(body);
    if (!result) return next(new HTTPError(422, 'Такой пользователь уже существует'));
    this.ok(res, { email: result.email, name: result.name });
  }
}