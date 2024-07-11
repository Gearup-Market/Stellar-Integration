import { User, UserId } from './types';
import { HttpException } from '@/core/exceptions/HttpException';
import userModel from './models/users';
import { isEmpty } from '@/core/utils/isEmpty';
import { MissingResourceError } from '@/core/exceptions';

class AuthService {
  private user = userModel;

  public async findUser(userId: UserId): Promise<User> {
    try {
      if (isEmpty(userId)) throw new HttpException(400, 'UserId is required!');
      const user = await this.user.findOne({ userId });
      if (!user) throw new MissingResourceError(`Missing Resource Error: ${userId} does not exist`);
      return user;
    } catch (error) {
      throw new HttpException(500, error?.message);
    }
  }

  public async findUsers(): Promise<User[]> {
    try {
      const users = await this.user.find();
      return users;
    } catch (error) {
      throw new HttpException(500, error?.message);
    }
  }
}

export default AuthService;
