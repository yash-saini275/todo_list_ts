import {User, IUser} from '../models';

export class UserService {
  public createUser(userParams: any) {
    // Create a new User
    return new Promise<IUser>((resolve, reject) => {
      const user = new User(userParams);
      user.save((err, userData: IUser) => {
        if (err) {
          reject(new Error('Error Creating new User.'));
        }
        resolve(userData);
      });
    });
  }
}
