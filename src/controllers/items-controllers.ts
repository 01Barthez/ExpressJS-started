import { Request, Response } from "express"
import prisma from "../core/config/prismaClient"
import { HttpCode } from "../core/constants"
import exceptions from "../utils/errors/exceptions"
import { GLOBAL_MSG } from "../utils/mocks/mocks-message"


const itemsController = {
    // Function to create One item
    create_one_item: async(req: Request, res: Response) => {
        try {
            const {title, content, number} = req.body

            const new_item = await prisma.item.create({
                data: {
                    title, content, number: parseInt(number)
                }
            })
            if(!new_item) return exceptions.badRequest(res, GLOBAL_MSG.TRAITEMENT_FAILED)

            res.status(HttpCode.CREATED).json({msg: GLOBAL_MSG.SUCCESS})
        } catch (error) {
            exceptions.serverError(res, error)
        }
    },

    // Function to create many items
    create_many_item: async(req: Request, res: Response) => {
        try {
            const {title, content, number} = req.body

            const item = await prisma.item.createMany({
                data: [{title, content, number}]
            })
            if(item.count === 0) return exceptions.badRequest(res, GLOBAL_MSG.TRAITEMENT_FAILED) 
                
            res.status(HttpCode.CREATED).json({msg: GLOBAL_MSG.SUCCESS})
        } catch (error) {
            exceptions.serverError(res, error)
        }
    },

    // Function to get/fetch One item
    get_one_item: async(req: Request, res: Response) => {
        try {
            const {itemID} = req.params

            const item = await prisma.item.findUnique({
                where: {items_id: itemID}
            })
            if(!item) return exceptions.badRequest(res, GLOBAL_MSG.TRAITEMENT_FAILED)

            res.status(HttpCode.OK).json({msg: item})
        } catch (error) {
            exceptions.serverError(res, error)
        }
    },

    // Function to get/fetch many items
    get_many_item: async(req: Request, res: Response) => {
        try {
            const items = await prisma.item.findMany();

            res.status(HttpCode.OK).json({msg: items})
        } catch (error) {
            exceptions.serverError(res, error)
        }
    },

    // Function to modify/update One item
    update_item: async(req: Request, res: Response) => {
        try {
            const {itemID} = req.params
            const {title, content, number} = req.body

            const new_item = await prisma.item.update({
                where: {items_id: itemID},
                data: {
                    title, content, number: parseInt(number)
                }
            })
            if(!new_item) return exceptions.badRequest(res, GLOBAL_MSG.TRAITEMENT_FAILED)

            res.status(HttpCode.OK).json({msg: GLOBAL_MSG.SUCCESS})
        } catch (error) {
            exceptions.serverError(res, error)
        }
    },

    // Function to delete One item
    delete_one_item: async(req: Request, res: Response) => {
        try {
            const {itemID} = req.params
            await prisma.item.delete({where: {items_id: itemID}})

            res.status(HttpCode.OK).json({msg: GLOBAL_MSG.SUCCESS})
        } catch (error) {
            exceptions.serverError(res, error)
        }
    },

    // Function to delete many item
    delete_All_items: async(req: Request, res: Response) => {
        try {
            await prisma.item.deleteMany()
            res.status(HttpCode.CREATED).json({msg: GLOBAL_MSG.SUCCESS})
        } catch (error) {
            exceptions.serverError(res, error)
        }
    }
}

export default itemsController;