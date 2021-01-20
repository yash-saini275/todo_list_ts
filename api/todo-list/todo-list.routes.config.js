"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoListAPIRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const authMiddleware = __importStar(require("../auth/middlewares/auth-middleware"));
const controllers = __importStar(require("./controllers/todo-list-controller"));
class TodoListAPIRoutes extends common_routes_config_1.CommonRouteConfig {
    constructor(app) {
        super(app, 'TodoListAPIRoutes');
    }
    configureRoutes() {
        // Route for all list all the tasks and Create a new task.
        this.app.route('/tasks')
            .all(authMiddleware.validTokenMiddleware)
            .get(controllers.listTasks)
            .post(controllers.createTask);
        // Route to view, modify and delete a particular task.
        this.app.route('/tasks/:taskId')
            .all(authMiddleware.validTokenMiddleware)
            .get(controllers.listOneTask)
            .put(controllers.editTask)
            .delete(controllers.deleteTask);
        return this.app;
    }
}
exports.TodoListAPIRoutes = TodoListAPIRoutes;
