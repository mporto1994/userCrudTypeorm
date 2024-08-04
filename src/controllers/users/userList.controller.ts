import { Request, Response } from "express";
import userListService from "../../services/users/userList.services";
import { AppError, handleError } from "../../errors";

const userListController = async (req: Request, res: Response) => {
    try {
        const users = await userListService();

        return res.status(200).send(users);

    } catch (error) {
        if (error instanceof AppError) {
            return handleError(error, res);
        }
        if (error instanceof Error) {
            return res.status(500).send({
                error: error.name,
                message: error.message
            });
        }
    }
};
export default userListController;
