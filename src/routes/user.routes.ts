import { Router } from "express";
import userCreateController from "../controllers/users/userCreate.controller";
import userListController from "../controllers/users/userList.controller";
import userLoginController from "../controllers/users/userLogin.controller";
import authUserMiddleware from "../middlewares/authUser.middleware";
import userDeleteSelfController from "../controllers/users/userDelete.controller";
import userUpdateController from "../controllers/users/userUpdate.controller";
import userListOneController from "../controllers/users/userListOne.controller";

const routes = Router();

export const userRoutes = () => {
    routes.post("/", userCreateController);
    routes.get("/", authUserMiddleware, userListController);
    routes.post("/login", userLoginController);

    // using token
    routes.get("/me", authUserMiddleware, userListOneController);
    routes.patch("/me/", authUserMiddleware, userUpdateController);
    routes.delete("/me/", authUserMiddleware, userDeleteSelfController);

    //any user
    routes.get("/:id", authUserMiddleware, userListOneController);
    routes.patch("/:id/", authUserMiddleware, userUpdateController);
    routes.delete("/:id/", authUserMiddleware, userDeleteSelfController);

    return routes;
};