"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signoutUser = exports.signinUser = exports.createUser = void 0;
const auth_model_1 = __importDefault(require("../models/auth-model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = (req, res) => {
    const user = new auth_model_1.default(req.body);
    user.save((err) => {
        if (err) {
            return res.status(400).json({ message: 'Their is some error. ' });
        }
        return res.status(200).json({ message: 'User Created Successfully.' });
    });
};
exports.createUser = createUser;
const signinUser = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    auth_model_1.default.findOne({ username: username }, (err, user) => {
        if (err)
            return res.status(400).json({ message: 'Invalid username or password.' });
        // console.log(user);
        if (user && req.body.password === user.password) {
            jsonwebtoken_1.default.sign({ username: username }, process.env.SECRET_KEY, { algorithm: 'HS256' }, (err, token) => {
                if (err) {
                    return res.status(400).json({ message: 'Invalid username or password.' });
                }
                if (token !== undefined) {
                    res.cookie('token', token);
                    return res.status(200).json({ message: 'Logged in Successfully' });
                }
                else {
                    return res.status(400).json({ message: 'Invalid username or password.' });
                }
            });
        }
        else {
            return res.status(400).json({ message: 'Invalid username or password.' });
        }
    });
};
exports.signinUser = signinUser;
const signoutUser = (req, res) => {
    // Signout the user.
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logged Out Successfully.' });
};
exports.signoutUser = signoutUser;
