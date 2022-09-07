import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';

const bootstrap = async () => {
  const app = new App(
    new LoggerService(),
    [
      new UsersController(new LoggerService())
    ]
  );
  await app.init();
};

bootstrap();