"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonRouteConfig = void 0;
class CommonRouteConfig {
    constructor(app, name) {
        this.app = app;
        this.name = name;
        this.configureRoutes();
    }
    getName() {
        return this.name;
    }
}
exports.CommonRouteConfig = CommonRouteConfig;
