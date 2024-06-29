import express from "express";
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { userRouter } from "../route/api.js";
import FileUpload from 'express-fileupload';
import cors from 'cors';

import { config } from 'dotenv';
config();

export const web = express();
web.use(cors());
web.use(express.json());
web.use(FileUpload({
    createParentPath: true,
    useTempFiles: false, // Don't use temporary files
    limits: { fileSize: 50 * 1024 * 1024 } // Limit file size to 50MB
}));

web.get('/', function (req, res) {
    res.send('Hello World')
});

web.use('/uploads', express.static('uploads'));
web.use(publicRouter);
web.use(userRouter)

// handle error
web.use(errorMiddleware);