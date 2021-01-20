"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.editTask = exports.listOneTask = exports.createTask = exports.listTasks = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const todo_list_model_1 = __importDefault(require("../models/todo-list-model"));
const listTasks = (req, res) => {
    // List all the tasks.
    const decoded = jwt.decode(req.cookies.token);
    if (decoded) {
        // If token exists process further
        const userId = decoded['userId'];
        todo_list_model_1.default.find({ userId: userId }, (err, tasks) => {
            if (err) {
                return res.status(400).json({ message: 'Some Error Occured.' });
            }
            return res.status(200).json(tasks);
        });
    }
    else {
        // Send the response No token available.
        return res.status(400).json({ message: 'Invalid Token.' });
    }
};
exports.listTasks = listTasks;
const createTask = (req, res) => {
    // Create a new task.
    const decoded = jwt.decode(req.cookies.token);
    if (decoded) {
        // Create a task if a valid username exists.
        const task = new todo_list_model_1.default(req.body);
        // console.log(decoded);
        task.userId = decoded.userId;
        task.save((err) => {
            if (err) {
                // console.log(err);
                return res.status(400).json({ message: 'Error Occured.' });
            }
            return res.status(200).json(task);
        });
    }
    else {
        // Return error.
        return res.status(400).json({ message: 'Invalid Token.' });
    }
};
exports.createTask = createTask;
const listOneTask = (req, res) => {
    // List one task.
    const decoded = jwt.decode(req.cookies.token);
    const taskId = req.params.taskId;
    const userId = decoded.userId;
    todo_list_model_1.default.findOne({
        $and: [
            { _id: taskId },
            { userId: userId },
        ]
    }, {}, {}, (err, task) => {
        if (err) {
            return res.status(400).json({ message: 'Some error occured.' });
        }
        if (task) {
            return res.status(200).json(task);
        }
        else {
            return res.status(400).json({ message: 'Unauthorized Request.' });
        }
    });
};
exports.listOneTask = listOneTask;
const editTask = (req, res) => {
    // Modify a task.
    const decoded = jwt.decode(req.cookies.token);
    const taskId = req.params.taskId;
    const userId = decoded.userId;
    todo_list_model_1.default.updateOne({
        $and: [
            { _id: taskId },
            { userId: userId },
        ]
    }, req.body, { new: true }, (err, task) => {
        if (err) {
            return res.status(400).json({ message: 'Error Occured.' });
        }
        // console.log(task);
        if (task.n || task.nModified) {
            return res.status(200).json({ message: 'Task Updated successfully.' });
        }
        else {
            return res.status(400).json({ message: 'Unauthorized Request.' });
        }
    });
};
exports.editTask = editTask;
const deleteTask = (req, res) => {
    // Delete a task.
    const decoded = jwt.decode(req.cookies.token);
    const taskId = req.params.taskId;
    const userId = decoded.userId;
    todo_list_model_1.default.findOneAndDelete({
        $and: [
            { _id: taskId },
            { userId: userId }
        ]
    }, {}, (err, task, r) => {
        if (err) {
            return res.status(400).json({ message: 'Error Occured.' });
        }
        if (task) {
            return res.status(200).json({ message: 'Task Deleted Successfully.' });
        }
        else {
            return res.status(403).json({ message: 'Unauthorized request.' });
        }
    });
};
exports.deleteTask = deleteTask;
