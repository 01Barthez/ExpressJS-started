import { NextFunction, Response } from "express";
import prisma from "../core/config/prisma";
import exceptions from "../functions/errors/exceptions";
import { customRequest } from "../core/Interfaces/interfaces";

const roleAdmin = async (
        req: customRequest, 
        res: Response,
        next: NextFunction,
    ) =>
{
    try {
        // fetch employeID from authentification
        const userID = req.user?.user_id;
        if(!userID) return exceptions.unauthorized(res, "authentification error !");

        // Check if user user exist
        const user = await prisma.user.findUnique({where: {user_id: userID}})
        if(!user) return exceptions.badRequest(res, "user not found !");
    
        if(user.role !== "admin") return exceptions.forbiden(res, "You are not allow to do this action !");
        
        next()
    } catch (error) {
        return exceptions.serverError(res, error);
    }
}

export default roleAdmin;