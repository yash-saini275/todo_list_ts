import mongoose from 'mongoose';
import env from './env';

export default function DBConfig() {
    mongoose.connection.once('open', () => {
        console.log('MongoDB Event Open.');
    
        mongoose.connection.on('connected', () => {
            console.log('Connected to Database.');
        });
    
        mongoose.connection.on('disconnected', () => {
            mongoose.connect(env.DB_URL as string, { useNewUrlParser: true });
            console.log('Disconnected with database.');
        });
    
        mongoose.connection.on('reconnected', () => {
            console.log('Reconnected wit database.');
        });
    
        mongoose.connection.on('error', () => {
            console.log('Error connection with database!!!');
            process.exit(1);
        })
    });

    return mongoose.connect(env.DB_URL as string, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
        if(err) {
            console.log('Error!!!');
            process.exit(1);
        }
    });
}