import { Document } from 'mongoose';

export interface IUser extends Document {
    first_name: string,
    last_name: string,
    username: string,
    password: string
};