import express from 'express';
import userController from '../controller/user-controller.js';
import myprojectController from '../controller/myproject-controller.js';

const publicRouter = express.Router();

publicRouter.post('/api/users', userController.register);
publicRouter.post('/api/users/login', userController.login);
publicRouter.get('/api/users', userController.get);
publicRouter.get('/api/users', userController.getUsers);

publicRouter.get('/api/myprojects', myprojectController.search);

export {
    publicRouter,

}