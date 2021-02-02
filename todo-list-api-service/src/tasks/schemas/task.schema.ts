import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// export const TaskSchema = new Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   userId: {
//     type: Schema.Types.ObjectId,
//     require: true,
//   },
//   status: {
//     type: [
//       {
//         type: String,
//         enum: ['pending', 'ongoing', 'completed'],
//       },
//     ],
//     default: 'pending',
//   },
//   created_date: {
//     type: Date,
//     default: Date.now,
//   },
// });

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ enum: ['pending', 'ongoing', 'completed'], default: 'pending' })
  status: string;

  @Prop({ default: Date.now })
  date: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
