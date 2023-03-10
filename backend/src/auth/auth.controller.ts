import { Request, Response } from 'express'
import logger from '@/common/logger'
import {createUserValidation, IUser, UserService} from "@/user";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import HttpException from "@/common/http-exception";
import {hashPassword} from "@/common/hashPassword";
import {CookieEnum} from "@/types/cookie-enums";
import {generateAuthToken} from "@/common/generateAuthToken";


class AuthController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public register = async (req: Request, res: Response) => {

        const {error} = createUserValidation(req.body);

        if (error) {
            return res.status(400).json({ message: `Invalid input: ${error.message}` });
        }

        const { username, password } = req.body;

        // Check if user with the username already exists
        const existingUser = await this.userService.getByUserName(username);
        if (existingUser) {
            return res.status(409).json({ message: 'User with that username already exists' });
        }

        // Create a new user
        const newUser = { username, password };

        // Hash password
        newUser.password =  await hashPassword(password)


        // Save user to database
        try {
            await this.userService.createNew(newUser);
            res.status(201).json({ message: 'User created successfully' });
        } catch (err) {
            logger.error(err);
            res.status(500).json({ message: 'Failed to create User' });
        }
    };

    public login = async (req: Request, res: Response) => {
        const { username, password } = req.body;

        // Check if user with the username exists
        const existingUser = await this.userService.getByUserName(username);
        // console.log(existingUser);

        if (!existingUser) {
            const error = new HttpException(400, 'User with that username does not exist');
            logger.error(error);
            return res.status(error.statusCode).json({ message: error.message });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            const error = new HttpException(400, 'Invalid password');
            logger.error(error);
            return res.status(error.statusCode).json({ message: error.message });
        }


        // Generate a JWT token
        // const token = jwt.sign({ userId: existingUser._id ,role : existingUser.role}, process.env.JWT_SECRET as string);
        const token = generateAuthToken({userId: existingUser._id as unknown as string ,role : existingUser.role}, process.env.JWT_SECRET as string);

        // Set token as a cookie
        res.cookie(CookieEnum.token, token, { httpOnly: true , maxAge: Number(process.env.JWT_MAX_AGE)});

        // user to return
        const user = {_id : existingUser._id, username: existingUser.username, role: existingUser.role  ,createdAt : existingUser.createdAt};

        res.status(200).json({token,user});
    };


    public logout = async (req: Request, res: Response) => {
        // res.clearCookie('token');
        res.clearCookie(CookieEnum.token);
        res.status(200).json({ message: 'Logged out successfully' });
    };
}

export  {AuthController};




