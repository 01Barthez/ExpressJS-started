import { Router } from "express";
import usersControllers from "../controllers/users-controller";
import { validate, validator } from "../functions/validator";
import { auth } from "../middleware/authUser";
const user = Router();

// Inscription of new user
user.post(
    '/signup', 
    validator.validateUser, 
    validate, 
    usersControllers.inscription
);

// Connexion of user
user.post(
    '/login', 
    validator.validateUserAtLogin, 
    validate, 
    usersControllers.connexion
);

// Deconnexion of user
user.post(
    '/logout', 
    auth.authToken,
    usersControllers.deconnexion
);

// consultation of user
user.get(
    '/profile', 
    auth.authToken,
    usersControllers.consultuser
);

// update user
user.put(
    '/profile', 
    auth.authToken,
    validator.validateUser,
    validate, 
    usersControllers.updateUserData
);

// Delete user
user.delete(
    '/profile', 
    auth.authToken,
    usersControllers.deleteUser
);

user.post(
    '/refresh/:userID',
    validator.validateUserID,
    validate,
    usersControllers.refreshAccessToken
);

export default user;