import { Router } from "express";
import ROUTES from "../utils/mocks/mocks-routes";
import { auth } from "../middleware/authUser";
import itemsController from "../controllers/items-controllers";
import roleAdmin from "../middleware/roleUser";
import { validate, validator } from "../services/validator/validator";


const item: Router = Router()

item.get(
    ROUTES.ITEM.GET_ONE_ITEM,
    auth.authToken,
    itemsController.get_one_item
)

// Get all items 
item.get(
    ROUTES.ITEM.GET_MANY_ITEM,
    auth.authToken,
    roleAdmin, // we should be an admin to get access to this route
    itemsController.get_many_item
)

// Add new item 
item.post(
    ROUTES.ITEM.CREATE_ONE_ITEM,
    auth.authToken,
    roleAdmin, // we should be an admin to get access to this route
    validator.validateItem,
    validate,
    itemsController.create_one_item
)

// Add Many items 
item.post(
    ROUTES.ITEM.CREATE_MANY_ITEM,
    auth.authToken,
    roleAdmin, // we should be an admin to get access to this route
    validator.validateItem,
    validate,
    itemsController.create_many_item
)

// Update item
item.put(
    ROUTES.ITEM.UPDATE_ITEM,
    auth.authToken,
    roleAdmin, // we should be an admin to get access to this route
    validator.validateIDOfParams,
    validator.validateItem,
    validate,
    itemsController.update_item
)

// Delete One item
item.delete(
    ROUTES.ITEM.DELETE_ONE_ITEM,
    auth.authToken,
    roleAdmin, // we should be an admin to get access to this route
    validator.validateIDOfParams,
    itemsController.delete_one_item
)

// Delete ALL item
item.delete(
    ROUTES.ITEM.DELETE_MANY_ITEM,
    auth.authToken,
    roleAdmin, // we should be an admin to get access to this route
    validator.validateIDOfParams,
    itemsController.delete_All_items
)

export default item;
