import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';
import { ExceptionFilter } from './errors/exception.filter';
import { Container, ContainerModule, interfaces } from 'inversify';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { IUserController } from './users/user.controller.interface';

const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.LoggerService).to(LoggerService);
  bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
  bind<IUserController>(TYPES.UserController).to(UsersController);
  bind<App>(TYPES.Application).to(App);
});

const bootstrap = (): { appContainer: Container; app: App } => {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  app.init();
  return { app, appContainer };
};

export const { app, appContainer } = bootstrap();