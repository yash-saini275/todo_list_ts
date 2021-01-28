import {Request, Response} from 'express';
import {UserService} from '../services';

export class UserController {
  private userService: UserService = new UserService();

  public create_user(req: Request, res: Response) {
    if (
      req.body.first_name &&
      req.body.last_name &&
      req.body.username &&
      req.body.password
    ) {
      // Request is Valid Create a new User.
      const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: req.body.password,
      };

      this.userService
        .createUser(user)
        .then(userData => {
          res.status(201).json({msg: 'User Created Successfully.'});
        })
        .catch((err: any) => {
          res.status(403).json({msg: 'Error creating new User.'});
        });
    } else {
      // Request is not valid Don't create a new user send Error.
      res.status(400).json({msg: 'Please provide all the fields.'});
    }
  }
}
