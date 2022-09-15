import { IUserService } from './user.service.interface';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { UserLoginDto } from './dto/user-login.dto';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.ConfigService) private _configService: IConfigService
  ) {}

  async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
    const user = new User(email, name);
    const salt = Number(this._configService.get('SALT'));
    await user.setPassword(password, salt);

    // проверка что он есть
    // если есть возвращаем null
    // если нет, то создаем

    return null;
  }

  async validateUser(dto: UserLoginDto): Promise<boolean> {
    return false;
  }

}