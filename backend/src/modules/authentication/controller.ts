import { NextFunction, Request, Response } from 'express';
import UserService from './service';

class AuthController {
  private userService = new UserService();

  public async findUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const user = await this.userService.findUser(userId);
      res.json({ data: user, message: 'success' }).status(200);
    } catch (error) {
      next(error);
    }
  }

  public async findUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userService.findUsers();
      res.json({ data: user, message: 'success' }).status(200);
    } catch (error) {
      next(error);
    }
  }

}

export default AuthController;
