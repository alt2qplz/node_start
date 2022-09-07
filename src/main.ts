import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';
import { ExceptionFilter } from './errors/exception.filter';

const bootstrap = async () => {
  const logger = new LoggerService();
  const app = new App(
    8000,
    logger,
    new ExceptionFilter(logger),
    [
      new UsersController(logger)
    ]
  );
  await app.init();
};

bootstrap();