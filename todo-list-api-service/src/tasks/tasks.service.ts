import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ITask } from './interfaces/task.interface';
import { TaskDto } from './tasks.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<ITask>) {}

  public async getAllTasks(userId: string): Promise<ITask[]> {
    const tasks = await this.taskModel.find({ userId }).exec();
    if (!tasks || !tasks[0]) throw new HttpException('Not Found', 404);

    return tasks;
  }

  public async createTask(newTask: TaskDto, userId: mongoose.Types.ObjectId) {
    const task = new this.taskModel(newTask);
    task.userId = userId;
    return await task.save();
  }

  public async getTaskById(id: string, userId: mongoose.Types.ObjectId) {
    const task = await this.taskModel.findOne({ id, userId }).exec();
    if (!task) throw new HttpException('Not Found', 404);

    return task;
  }

  public async deleteTask(id: string, userId: mongoose.Types.ObjectId) {
    const task = await this.taskModel.deleteOne({ id, userId }).exec();
    if (task.deleteCount === 0) throw new HttpException('Not Found', 404);

    return task;
  }

  public async updateTask(
    id: string,
    userId: mongoose.Types.ObjectId,
    propertyName: string,
    propertyValue: string,
  ): Promise<TaskDto> {
    const task = await this.taskModel
      .findOneAndUpdate({ id, userId }, { [propertyName]: propertyValue })
      .exec();

    if (!task) throw new HttpException('Not Found', 404);

    return task;
  }
}
