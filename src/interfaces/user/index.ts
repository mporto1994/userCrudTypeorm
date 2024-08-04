import { Request, Response } from 'express';

export interface IUser {
    id: string;
    name: string;
    email: string;
}
export interface IUserLogin {
    email: string;
    password: string;

}

export interface IUserCreate {
    name: string;
    email: string;
    password: string;
}

export interface IRecUser extends Request {
    userEmail?: string;
}

export interface IRecUserPassword extends IRecUser {
    Body: {
        password: string;
    };
}

export interface IUserUpdate {
    id: string;
    name: string;
    userEmail: string;
    password?: string;
}

export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUserListOneService {
    id?: string;
    userEmail?: string;
}

export interface RequestMail extends Request {
    userEmail?: string;
}
