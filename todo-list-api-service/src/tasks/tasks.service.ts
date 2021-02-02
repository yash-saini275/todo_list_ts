import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
// import { ITask } from './interfaces/task.interface';
import { Task, TaskDocument } from './schemas/task.schema';
import { TaskDto } from './tasks.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  public async getTasks(
    userId: mongoose.Schema.Types.ObjectId,
  ): Promise<Task[]> {
    const tasks = await this.taskModel.find({ userId }).exec();
    if (!tasks || !tasks[0]) throw new HttpException('Not Found', 404);

    return tasks;
  }

  public async createTask(
    newTask: TaskDto,
    userId: mongoose.Schema.Types.ObjectId,
  ): Promise<Task> {
    const task = new this.taskModel(newTask);
    task.userId = userId;
    return await task.save();
  }

  public async getTaskById(
    id: string,
    userId: mongoose.Schema.Types.ObjectId,
  ): Promise<Task> {
    const task = this.taskModel.findOne({ _id: id, userId }).exec();
    if (!task) throw new HttpException('Not Found', 404);

    return task;
  }

  public async deleteTask(id: string, userId: mongoose.Schema.Types.ObjectId) {
    const task = await this.taskModel.deleteOne({ _id: id, userId }).exec();
    if (task.deletedCount === 0) throw new HttpException('Not Found', 404);

    return task;
  }

  public async updateTask(
    id: string,
    userId: mongoose.Schema.Types.ObjectId,
    propertyName: string,
    propertyValue: string,
  ): Promise<Task> {
    const task = this.taskModel
      .updateOne({ _id: id, userId }, { [propertyName]: propertyValue })
      .exec();

    if (!task) throw new HttpException('Not Found', 404);

    return task;
  }
}
