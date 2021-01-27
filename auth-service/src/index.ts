import { App } from './config/app';
import env from './config/env';

const application: App = new App()

application.listen(env.PORT);
