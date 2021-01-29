import * as express from 'express';
import {Request, Response} from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import {AuthRoutes, UserRoutes} from '../routes';
import DBConfig from './db';
import {logger, errorLogger} from './logger';

export default class App {
  public app: express.Application;

  private authRoutes: AuthRoutes = new AuthRoutes();

  private userRoutes: UserRoutes = new UserRoutes();

  constructor() {
    this.app = express();
    this.configDB();

    this.authRoutes.configRoutes(this.app);
    this.userRoutes.configRoutes(this.app);

    this.configMiddleware();

    this.app.use(errorLogger);
    this.app.use((req: Request, res: Response) => {
      res.status(404).json({msg: `${req.url} not found.`});
    });
  }

  private configMiddleware(): void {
    // Use Body Parser
    this.app.use(bodyParser.urlencoded());

    // Cookie Parser
    this.app.use(cookieParser());

    // Logger
    this.app.use(logger);
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
