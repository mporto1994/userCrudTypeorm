import { Request, Response } from "express";
import userCreateService from "../../services/users/userCreate.services";
import { AppError, handleError } from "../../errors";

const userCreateController = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        const newUser = await userCreateService({ name, email, password });

        return res.status(201).send(newUser);

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
export default userCreateController;
