import { Router } from "express";
import { userRoute } from "../utils/mock-routes";
import { auth } from "../middleware/authUser";
import usersControllers from "../controllers/users-controllers";
import { validate, validator } from "../functions/validator/validator";

const user = Router();

// Inscription of new user
user.post(
    userRoute.INSCRIPTION, 
    validator.validateUser, 
    validate, 
    usersControllers.inscription
);

// Connexion of user
user.post(
    userRoute.CONNEXION, 
    validator.validateUserAtLogin, 
    validate, 
    usersControllers.connexion
);

// Deconnexion of user
user.post(
    userRoute.DECONNEXION, 
    auth.authToken,
    usersControllers.deconnexion
);

// consultation of user
user.get(
    userRoute.GET_USER, 
    auth.authToken,
    usersControllers.consultuser
);

// update user
user.put(
    userRoute.UPDATE_USER, 
    auth.authToken,
    validator.validateUser,
    validate, 
    usersControllers.updateUserData
);

// Delete user
user.delete(
    userRoute.DELETE_USER, 
    auth.authToken,
    usersControllers.deleteUser
);

user.post(
    userRoute.REFRESH_TOKEN,
    validator.validateUserID,
    validate,
    usersControllers.refreshAccessToken
);

export default user;