import { IConfigService } from './config.service.interface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class ConfigService implements IConfigService {
  private readonly _config: DotenvParseOutput;

  constructor(
    @inject(TYPES.LoggerService) private _logger: ILogger
  ) {
    const result: DotenvConfigOutput = config();
    if (result.error) _logger.error('[ConfigService] Не удалось прочитать файл .env или он отсутствует');
    else {
      this._logger.log('[ConfigService] Конфигурация .env загружена');
      this._config = result.parsed as DotenvParseOutput;
    }
  }

  get(key: string): string {
    return this._config[key];
  }
}