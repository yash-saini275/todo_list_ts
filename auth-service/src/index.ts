import {App, env} from './config/';

const application: App = new App();

application.listen(env.PORT);
