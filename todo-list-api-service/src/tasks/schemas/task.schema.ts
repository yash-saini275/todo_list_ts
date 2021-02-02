import { Schema } from 'mongoose';

export const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    require: true,
  },
  status: {
    type: [
      {
        type: String,
        enum: ['pending', 'ongoing', 'completed'],
      },
    ],
    default: 'pending',
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});
