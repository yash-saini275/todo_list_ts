import * as mongoose from 'mongoose';
import env from './env';

export default function DBConfig() {
  mongoose.connection.once('open', () => {
    console.log('MongoDB Event Open.');

    mongoose.connection.on('connected', () => {
      console.log('Connected to Database.');
    });

    mongoose.connection.on('disconnected', () => {
      mongoose.connect(env.DB_URL, {useNewUrlParser: true});
      console.log('Disconnected with database.');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('Reconnected wit database.');
    });

    mongoose.connection.on('error', () => {
      console.log('Error connection with database!!!');
      throw Error('Disconnected with database.');
    });
  });

  return mongoose.connect(
    env.DB_URL,
    {useNewUrlParser: true, useCreateIndex: true},
    err => {
      if (err) {
        console.log('Error!!!');
        throw Error('Disconnected with database.');
      }
    }
  );
}
