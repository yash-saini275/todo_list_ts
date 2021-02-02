import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { TasksService } from './tasks.service';
import { TaskDto } from './tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  public async getAllTasks(@Req() req: Request) {
    const token = req.cookies.token;
    const decoded = jwt.decode(token);
    return this.taskService.getTasks(decoded['userId']);
  }

  @Post()
  public createTask(@Body() body: TaskDto, @Req() req: Request) {
    const token = req.cookies.token;
    const decoded = jwt.decode(token);

    return this.taskService.createTask(body, decoded['userId']);
  }

  @Get(':id')
  public getTaskById(@Param() params, @Req() req: Request) {
    const decoded = jwt.decode(req.cookies.token);
    const taskId = params.id;
    return this.taskService.getTaskById(taskId, decoded['userId']);
  }

  @Put(':id')
  public updateTaskById(@Param() params, @Body() body, @Req() req: Request) {
    const decoded = jwt.decode(req.cookies.token);
    const taskId = params.id;

    return this.taskService.updateTask(
      taskId,
      decoded['userId'],
      body.propertyName,
      body.propertyValue,
    );
  }

  @Delete(':id')
  public deleteTaskById(@Param() params, @Req() req: Request) {
    const decoded = jwt.decode(req.cookies.token);
    const taskId = params.id;

    return this.taskService.deleteTask(taskId, decoded['userId']);
  }
}
