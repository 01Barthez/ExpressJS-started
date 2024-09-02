import { NextFunction, Request, Response } from "express";
import { HttpCode } from "../core/constants";
import exceptions from "../exceptions/exceptions";
import userToken from "../functions/jwt";

export interface IUser {
    user_id: string;
    name: string; 
    email: string; 
    password: string; 
}

export interface customRequest extends Request{
    user?: IUser;
}

export const auth = {
    authToken: async(req: customRequest, res: Response, next: NextFunction) => {
        try {
            // Fetch access token from header
            const accessToken = req.header('authorization')?.split(" ")[1] || "";
            if(!accessToken || accessToken.startsWith('Bearer ')) return exceptions.unauthorized(res, "Invalid or exipred token !");
            
            const userData = userToken.verifyAccessToken(accessToken);             
            if(!userData) return exceptions.unauthorized(res, "Access token not found or not format well !");

            req.user = userData;
            next();
        } catch (error) {
            return(
                res
                    .status(HttpCode.INTERNAL_SERVER_ERROR)
                    .json({msg: "error when try to authenticate."})
            ) 
        }
    } 
}

