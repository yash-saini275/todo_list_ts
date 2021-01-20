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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_config_1 = require("./auth/auth.routes.config");
const body_parser_1 = __importDefault(require("body-parser"));
const todo_list_routes_config_1 = require("./todo-list/todo-list.routes.config");
const dotenv = __importStar(require("dotenv"));
const connect_1 = __importDefault(require("./connect"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// dotenv.config();
dotenv.config({ path: `${__dirname}/../.env` });
// Connect to Database
const DB_URL = process.env.DB_URL;
// console.log(process.env);
connect_1.default(DB_URL);
const app = express_1.default();
// Body Parser and Cookie Parser Middlewares.
app.use(body_parser_1.default.urlencoded());
app.use(cookie_parser_1.default());
const routes = [];
// Routes Configuration.
routes.push(new auth_routes_config_1.AuthRoutes(app));
routes.push(new todo_list_routes_config_1.TodoListAPIRoutes(app));
// // CORS Policy
// app.use((req: Request, res: Response, next: NextFunction) => {
//     res.header("Access-Control-Allow-Headers","*");
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     next();
// })
// Index Route.
app.get('/', (req, res) => {
    return res.status(200).send('Server is up and Running');
});
app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
