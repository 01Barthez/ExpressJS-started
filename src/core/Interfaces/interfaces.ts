import { Request } from "express";

export interface IUser {
    user_id: string;
    name: string; 
    email: string; 
    password: string; 
}

export interface IItem {
    items_id: string,
    title: string,
    content: string,
    number:  number,
}

export interface customRequest extends Request{
    user?: IUser;
}
