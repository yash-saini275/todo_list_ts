import { Application } from 'express';
import { AuthService } from '../services';

export class AuthRoutes {
    private authService: AuthService = new AuthService();

    public configRoutes(app: Application) {
        // Configure Authentication routes
    }
}