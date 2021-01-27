import express from 'express';
import { AuthRoutes, UserRoutes } from '../routes';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import DBConfig from './db';

export class App {
    public app : express.Application;

    // private authRoutes: AuthRoutes = new AuthRoutes();
    private userRoutes: UserRoutes = new UserRoutes();

    constructor() {
        this.app = express();
        this.configDB();
        this.configMiddleware();
        // this.authRoutes.configRoutes(this.app);
        this.userRoutes.configRoutes(this.app);
    }

    private configMiddleware(): void {
        // Use Body Parser
        this.app.use(bodyParser.urlencoded());
        
        // Cookie Parser
        this.app.use(cookieParser());

    }

    private configDB(): void {
        DBConfig();
    }

    public listen(port: string): void {
        this.app.listen(port, () => {
            console.log(`Express server listening on port ${port}`);
        });
    }
}