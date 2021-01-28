import {Application, Request, Response} from 'express';
import {AuthController} from '../controllers';

export default class AuthRoutes {
  private authController: AuthController = new AuthController();

  public configRoutes(app: Application) {
    // Configure Authentication routes
    app.post('/signin', (req: Request, res: Response) => {
      this.authController.login_user(req, res);
    });

    app.all('/signout', (req: Request, res: Response) => {
      this.authController.logout_user(req, res);
    });
  }
}
