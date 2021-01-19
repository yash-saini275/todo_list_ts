import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export const notValidTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Not valid token middleware.
    if(!req.cookies.token)
        return next();
    
    jwt.verify(req.cookies['token'], process.env.SECRET_KEY!, { algorithms: ['HS256'] }, (err, decoded) => {
        if(err)
            return res.status(400).json({message: 'Invalid Token'});
        
        if(decoded)
            return res.status(403).json({ message: 'Already Logged-In.' });
        else
            return next();
    });
}

export const validTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Valid token Middleware.
    jwt.verify(req.cookies['token'], process.env.SECRET_KEY!, { algorithms: ['HS256'] }, (err, decoded) => {
        if(err)
            return res.status(400).json({ message: 'Invalid Token.' });
        
        if(decoded)
            next();
        else
            return res.status(400).json({ message: 'Invalid Token.' });
    })
}