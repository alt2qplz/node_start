import { Router, Response } from 'express';
import { IControllerRoute } from './route.interface';
import { ILogger } from '../logger/logger.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';


@injectable()
export abstract class BaseController {
  private readonly _router: Router;
  private logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public created(res: Response): Response {
    return res.sendStatus(201);
  }

  public send<T>(res: Response, code: number, message: T): Response {
    return res.status(code).type('application/json').json(message);
  }

  public ok<T>(res: Response, message: T): Response {
    return this.send<T>(res, 200, message);
  }

  protected bindRoutes(routes: IControllerRoute[]) {
    for (const route of routes) {
      this.logger.log(`[${route.method.toUpperCase()}] ${route.path}`);
      const handler = route.func.bind(this);
      this._router[route.method](route.path, handler);
    }
  }
}