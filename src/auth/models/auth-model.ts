import mongoose, { Schema, Document } from 'mongoose';

const UserSchema: Schema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});


export interface UserInterface extends Document {
    first_name: string,
    last_name: string,
    username: string,
    password: string
};

const User = mongoose.model<UserInterface>("User", UserSchema);
export default User;