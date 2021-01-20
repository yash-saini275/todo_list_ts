import { Request, Response } from 'express';
import User, { UserInterface } from '../models/auth-model';
import jwt from 'jsonwebtoken';

export const createUser = (req: Request, res: Response) => {
    const user = new User(req.body);
    user.save((err: any) => {
        if(err) {
            return res.status(400).json({ message: 'Their is some error. '});
        }
        
        return res.status(200).json({message: 'User Created Successfully.'});
        
    });
};

export const signinUser = (req: Request, res: Response) => {
    const username = req.body.username;
    // const password: string = req.body.password;

    User.findOne({username: username}, (err: any, user: UserInterface) => {
        if(err)
            return res.status(400).json({message: 'Invalid username or password.'});
        
        // console.log(user);
        
        if(user && req.body.password === user.password) {
            jwt.sign({userId: user._id}, process.env.SECRET_KEY!, { algorithm: 'HS256' }, (err, token) => {
                if(err){
                    return res.status(400).json({message: 'Invalid username or password.'});
                }

                if(token !== undefined) {
                    res.cookie('token', token);
                    return res.status(200).json({message: 'Logged in Successfully'});
                } else {
                    return res.status(400).json({message: 'Invalid username or password.'});
                }
            });
        } else {
            return res.status(400).json({ message: 'Invalid username or password.' });
        }
    });
}

export const signoutUser = (req: Request, res: Response) => {
    // Signout the user.
    res.clearCookie('token');
    return res.status(200).json({message: 'Logged Out Successfully.'});
}