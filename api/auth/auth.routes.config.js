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
exports.AuthRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const middlewares = __importStar(require("./middlewares/auth-middleware"));
const controllers = __importStar(require("./controllers/auth-controller"));
class AuthRoutes extends common_routes_config_1.CommonRouteConfig {
    constructor(app) {
        super(app, 'AuthRoutes');
    }
    configureRoutes() {
        this.app.route('/signup')
            .post(middlewares.notValidTokenMiddleware, controllers.createUser);
        this.app.route('/signin')
            .post(middlewares.notValidTokenMiddleware, controllers.signinUser);
        this.app.route('/signout')
            .all(middlewares.validTokenMiddleware, controllers.signoutUser);
        return this.app;
    }
}
exports.AuthRoutes = AuthRoutes;
