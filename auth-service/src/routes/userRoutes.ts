import { Application, Request, Response } from 'express';
import { UserController } from '../controllers/user-controller';

export class UserRoutes {
    private userController: UserController = new UserController();

    public configRoutes(app: Application) {
        // Configure User Management routes.
        app.post('/signup', (req: Request, res: Response) => {
            this.userController.create_user(req, res);
        });
    }
}