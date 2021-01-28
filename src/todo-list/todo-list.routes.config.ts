import { CommonRouteConfig } from "../common/common.routes.config";
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import * as authMiddleware from '../auth/middlewares/auth-middleware';
import * as controllers from './controllers/todo-list-controller';

export class TodoListAPIRoutes extends CommonRouteConfig{
    constructor(app: express.Application) {
        super(app, 'TodoListAPIRoutes');
    }

    configureRoutes() {
        // Route for all list all the tasks and Create a new task.
        this.app.route('/tasks')
            .all(
                authMiddleware.validTokenMiddleware
            )
            .get(
                controllers.listTasks
            )
            .post(
                controllers.createTask
            )
        
        // Route to view, modify and delete a particular task.
        this.app.route('/tasks/:taskId')
            .all(
                authMiddleware.validTokenMiddleware
            )
            .get(
                controllers.listOneTask
            )
            .put(
                controllers.editTask
            )
            .delete(
                controllers.deleteTask
            );

        return this.app;
    }
}