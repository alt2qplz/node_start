import { LoggerService } from '../logger/logger.service';
import { Router, Response } from 'express';
import { IControllerRoute } from './route.interface';

export abstract class BaseController {
  private readonly _router: Router;
  readonly route: string;

  protected constructor(
    private logger: LoggerService,
    route: string
  ) {
    this._router = Router();
    this.route = route;
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
      this.logger.log(`[${route.method.toUpperCase()}] ${this.route}${route.path}`);
      const handler = route.func.bind(this);
      this._router[route.method](route.path, handler);
    }
  }
}