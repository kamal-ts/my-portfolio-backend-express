import express from 'express';
import userController from '../controller/user-controller.js';
import { authMiddleware } from '../middleware/auth-middleware.js';

const userRouter = new express.Router();

// important!!! all of "userRouter" have to cross the "authMiddleware" 
userRouter.use(authMiddleware);

userRouter.get('/api/users/current', userController.get);
userRouter.patch('/api/users/current', userController.update);


export {
    userRouter,
}