import mongoose, { Schema, Document } from 'mongoose';

const TaskSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    status: {
        type: [{
            type: String,
            enum: ['pending', 'ongoing', 'completed']
        }],
        default: 'pending',
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

export interface TaskInterface extends Document {
    name: string,
    userId: mongoose.Types.ObjectId,
    status: string,
    created_date: Date
}

const Task = mongoose.model<TaskInterface>('Task', TaskSchema);
export default Task;