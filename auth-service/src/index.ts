import {App, env} from './config/';

const application: App = new App();

process.on('uncaughtException', err => {
  console.error('Uncaught Exception: ', err);
});

process.on('unhandledRejection', err => {
  console.error('Unhandled Rejection: ', err);
});

application.listen(env.PORT);
