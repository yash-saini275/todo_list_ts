import {Request, Response} from 'express';
import * as jwt from 'jsonwebtoken';
import {AuthService} from '../services';
import {env} from '../config';

export class AuthController {
  public authService: AuthService = new AuthService();

  public login_user(req: Request, res: Response) {
    if (req.body.username && req.body.password) {
      // Login the User.
      const params = {
        username: req.body.username,
        password: req.body.password,
      };

      this.authService
        .loginUser(params)
        .then(doc => {
          // Matched the Username and password.
          jwt.sign(
            {userId: doc._id},
            env.SECRET_KEY,
            {expiresIn: '1h', algorithm: 'HS256'},
            (err, token) => {
              if (err) {
                res.status(400).json({msg: 'Invalid Username or Password.'});
              } else {
                res.cookie('token', token);
                res.status(200).json({msg: 'Successfully Logged In.'});
              }
            }
          );
        })
        .catch(reason => {
          // Password and Username doesn't match.
          res.status(400).json({msg: 'Invalid Username or Password.'});
        });
    } else {
      // Error not all parameters are passed.
      res.status(400).json({msg: 'Please provide all the required fields.'});
    }
  }

  public logout_user(req: Request, res: Response) {
    const token: string = req.cookies.token;
    jwt.verify(token, env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(400).json({msg: 'Please Login first'});
      } else {
        if (decoded) {
          res.clearCookie('token');
          res.status(200).json({msg: 'Successfully Logged out.'});
        } else {
          res.status(400).json({msg: 'Please Login First'});
        }
      }
    });
  }
}
