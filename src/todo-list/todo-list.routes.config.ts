import { CommonRouteConfig } from "../common/common.routes.config";
import express from 'express';
import { Request, Response, NextFunction } from 'express';

export class TodoListAPIRoutes extends CommonRouteConfig{
    constructor(app: express.Application) {
        super(app, 'TodoListAPIRoutes');
    }

    configureRoutes() {
        // Route for all list all the tasks and Create a new task.
        this.app.route('/tasks')
            .get((req: Request, res: Response) => {
                return res.status(200).send('List all the Tasks');
            })
            .post((req: Request, res: Response) => {
                return res.status(200).send('Creating a new Task.')
            })
        
        // Route to view, modify and delete a particular task.
        this.app.route('/tasks/:taskId')
            .all((req: Request, res: Response, next: NextFunction) => {
                next();
            })
            .get((req: Request, res: Response) => {
                return res.status(200).send('List just one task.');
            })
            .put((req: Request, res: Response) => {
                return res.status(200).send('Modify the task.');
            })
            .delete((req: Request, res: Response) => {
                return res.status(200).send('Delete the task');
            });

        return this.app;
    }
}