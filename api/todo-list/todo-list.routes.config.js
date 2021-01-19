"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoListAPIRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
class TodoListAPIRoutes extends common_routes_config_1.CommonRouteConfig {
    constructor(app) {
        super(app, 'TodoListAPIRoutes');
    }
    configureRoutes() {
        // Route for all list all the tasks and Create a new task.
        this.app.route('/tasks')
            .get((req, res) => {
            return res.status(200).send('List all the Tasks');
        })
            .post((req, res) => {
            return res.status(200).send('Creating a new Task.');
        });
        // Route to view, modify and delete a particular task.
        this.app.route('/tasks/:taskId')
            .all((req, res, next) => {
            next();
        })
            .get((req, res) => {
            return res.status(200).send('List just one task.');
        })
            .put((req, res) => {
            return res.status(200).send('Modify the task.');
        })
            .delete((req, res) => {
            return res.status(200).send('Delete the task');
        });
        return this.app;
    }
}
exports.TodoListAPIRoutes = TodoListAPIRoutes;
