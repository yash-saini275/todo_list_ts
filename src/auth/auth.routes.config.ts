import { CommonRouteConfig } from "../common/common.routes.config";
import express from  'express';
import * as middlewares from './middlewares/auth-middleware';
import * as controllers from './controllers/auth-controller';


export class AuthRoutes extends CommonRouteConfig {
    constructor(app: express.Application) {
        super(app, 'AuthRoutes');
    }

    configureRoutes() {
        this.app.route('/signup')
            .post(
                middlewares.notValidTokenMiddleware,
                controllers.createUser,
            );
        
        this.app.route('/signin')
            .post(
                middlewares.notValidTokenMiddleware,
                controllers.signinUser
            );
        
        this.app.route('/signout')
            .all(
                middlewares.validTokenMiddleware,
                controllers.signoutUser,
            );
        
        return this.app;
    }
}