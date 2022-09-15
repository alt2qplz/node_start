import { IUserService } from './user.service.interface';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { UserLoginDto } from './dto/user-login.dto';
import { injectable } from 'inversify';

@injectable()
export class UserService implements IUserService {
  async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
    const user = new User(email, name);
    await user.setPassword(password);

    // проверка что он есть
    // если есть возвращаем null
    // если нет, то создаем

    return null;
  }

  async validateUser(dto: UserLoginDto): Promise<boolean> {
    return false;
  }

}