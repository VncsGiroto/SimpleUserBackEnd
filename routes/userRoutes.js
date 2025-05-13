import { Router } from "express";
import UserController from "../controllers/UserController.js";
import authUserMiddleware from "../middlewares/authUserMiddleware.js";
import admPassword from "../middlewares/admPassword.js";

const userRoutes = Router();

//GET 
    //All
    userRoutes.get('/', admPassword, UserController.getAll);
//POST
    //Create
    userRoutes.post('/', UserController.create);
    //Login
    userRoutes.post('/login', UserController.login);
    //TokenCheck
    userRoutes.post('/token', authUserMiddleware, UserController.checkToken);
    
export default userRoutes;