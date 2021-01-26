import express, { NextFunction, Response, Request, Application } from 'express';
import { CommonRouteConfig } from './common/common.routes.config';
import { AuthRoutes } from './auth/auth.routes.config';
import bodyParser from 'body-parser';
import { TodoListAPIRoutes } from './todo-list/todo-list.routes.config';
import * as dotenv from 'dotenv';
import connect from './connect';
import cookieParser from 'cookie-parser';
import * as winston from 'winston';

dotenv.config();
dotenv.config({path: `${__dirname}/../.env`});

// Connect to Database
const DB_URL: string = process.env.DB_URL!;
// console.log(process.env);
connect(DB_URL);

const app: express.Application = express();

// Body Parser and Cookie Parser Middlewares.
app.use(bodyParser.urlencoded());
app.use(cookieParser());
 
const routes: Array<CommonRouteConfig> = [];

// Routes Configuration.
routes.push(new AuthRoutes(app));
routes.push(new TodoListAPIRoutes(app));

// Index Route.
app.get('/', (req: express.Request, res: express.Response) => {
    return res.status(200).send('Server is up and Running');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
});