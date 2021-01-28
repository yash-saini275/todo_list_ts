import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import Task, { TaskInterface } from '../models/todo-list-model';

export const listTasks = (req: Request, res: Response) => {
    // List all the tasks.
    const decoded: any = jwt.decode(req.cookies.token);

    if(decoded) {
        // If token exists process further
        const userId: string = decoded['userId'];
        Task.find({ userId: userId }, (err, tasks: TaskInterface) => {
            if(err) {
                return res.status(400).json({ message: 'Some Error Occured.' });
            }

            return res.status(200).json(tasks);
        })

    } else {
        // Send the response No token available.
        return res.status(400).json({ message: 'Invalid Token.' });
    }

}

export const createTask = (req: Request, res: Response) => {
    // Create a new task.
    const decoded: any = jwt.decode(req.cookies.token);

    if(decoded) {
        // Create a task if a valid username exists.
        const task = new Task(req.body);
        // console.log(decoded);
        task.userId = decoded.userId;
        task.save((err) => {
            if(err) {
                // console.log(err);
                return res.status(400).json({ message: 'Error Occured.' });
            }

            return res.status(200).json(task);
        });
    } else {
        // Return error.
        return res.status(400).json({ message: 'Invalid Token.' });
    }
}

export const listOneTask = (req: Request, res: Response) => {
    // List one task.
    const decoded: any = jwt.decode(req.cookies.token);
    const taskId: string = req.params.taskId;
    const userId: string = decoded.userId;

    Task.findOne({
        $and: [
            {_id: taskId},
            {userId: userId},
        ]
    }, {}, {}, 
    (err, task) => {
        if(err) {
            return res.status(400).json({ message: 'Some error occured.' });
        }
        
        if(task){
            return res.status(200).json(task);
        } else {
            return res.status(400).json({ message: 'Unauthorized Request.' });
        }
    });
}

export const editTask = (req: Request, res: Response) => {
    // Modify a task.
    const decoded: any = jwt.decode(req.cookies.token);
    const taskId: string = req.params.taskId;
    const userId: string = decoded.userId;

    Task.updateOne({
        $and: [
            { _id: taskId },
            { userId: userId },
        ]
    }, req.body, { new: true }, (err, task) => {
        if(err) {
            return res.status(400).json({ message: 'Error Occured.' });
        }
        // console.log(task);
        if(task.n || task.nModified) {
            return res.status(200).json({ message: 'Task Updated successfully.' });
        } else {
            return res.status(400).json({ message: 'Unauthorized Request.' });
        }
    });
}

export const deleteTask = (req: Request, res: Response) => {
    // Delete a task.
    const decoded: any = jwt.decode(req.cookies.token);
    const taskId: string = req.params.taskId;
    const userId: string = decoded.userId;
    
    Task.findOneAndDelete({
        $and: [
            {_id: taskId},
            {userId: userId}
        ]
    }, {}, (err, task, r) => {
        if(err) {
            return res.status(400).json({ message: 'Error Occured.' });
        }

        if(task) {
            return res.status(200).json({ message: 'Task Deleted Successfully.' });
        } else {
            return res.status(403).json({ message: 'Unauthorized request.' });
        }
    });
}