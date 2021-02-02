import mongoose, { Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  userId: mongoose.Types.ObjectId;
  status: string;
  created_date: Date;
}
