// require('module-alias/register');
import 'module-alias/register';
import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose'

// Import routers
import { userRouter, userPath} from '@/user'
import { authRouter } from "@/auth"


// Import middleware
import * as middleware from '@/middleware'
import {taskPath, taskRouter} from "@/task";

// Load environment variables
dotenv.config();

// Set up database connection
const mongoString = process.env.MONGO_URL || '';
mongoose.set('strictQuery', true);
mongoose.connect(mongoString, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Database Connected');
    }
});

// Create Express app instance
const app: Express = express();

// Apply middleware
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use(express.json());

// Define routes
app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello world');
});
app.use(userPath, userRouter);
app.use(taskPath, taskRouter);
app.use('', authRouter);

// Error handling middleware
app.use(middleware.httpLogger);
app.use(middleware.errorHandler);
app.use(middleware.notFoundHandler);

// Start the server
const PORT = process.env.PORT || 8080;
const ENV = process.env.NODE_ENV || 'production';
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${ENV} environment`);
});

export { app as default, server };
