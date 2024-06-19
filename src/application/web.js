import express from "express";
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { userRouter } from "../route/api.js";
import FileUpload from 'express-fileupload';

export const web = express();
web.use(express.json());
web.use(FileUpload());
web.use('/uploads', express.static('uploads'));
web.use(publicRouter);
web.use(userRouter)

// handle error
web.use(errorMiddleware);