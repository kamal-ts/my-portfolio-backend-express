import express from 'express';
import userController from '../controller/user-controller.js';
import { authMiddleware } from '../middleware/auth-middleware.js';
import myprojectController from '../controller/myproject-controller.js';

const userRouter = express.Router();

// important!!! all of "userRouter" have to cross the "authMiddleware" 
userRouter.use(authMiddleware);

// user API
userRouter.get('/api/users/current', userController.get);
userRouter.patch('/api/users/current', userController.update);
userRouter.delete('/api/users/logout', userController.logout);

// myproject API
userRouter.post('/api/myprojects', myprojectController.create);

export {
    userRouter,
}