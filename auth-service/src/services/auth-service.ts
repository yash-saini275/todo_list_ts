import {Request, Response} from 'express';
import {User, IUser} from '../models';

export class AuthService {
  public loginUser(params: any) {
    // Log in A User.
    return new Promise<IUser>((resolve, reject) => {
      const filter = {
        username: params.username,
      };
      User.findOne(filter, (err: any, doc: IUser) => {
        if (err) {
          reject(new Error('Invalid Username or Password.'));
        }
        if (doc.password === params.password) {
          resolve(doc);
        } else {
          reject(new Error('Invalid Username or Password.'));
        }
      });
    });
  }

  public logoutUser(req: Request, res: Response) {
    // Logout a User.
  }
}
