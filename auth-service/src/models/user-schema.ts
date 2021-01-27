import mongoose, { Schema } from "mongoose";
import { IUser } from './user-interface';

const UserSchema: Schema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;