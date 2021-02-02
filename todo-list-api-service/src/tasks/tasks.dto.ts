import mongoose from 'mongoose';

export class TaskDto {
  title: string;
  status?: string;
  date?: Date;
  userId: mongoose.Schema.Types.ObjectId;
}
