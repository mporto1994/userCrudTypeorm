import { Request, Response } from "express";
import userLoginService from "../../services/users/userLogin.services";
import { AppError, handleError } from "../../errors";

const userLoginController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const token = await userLoginService({ email, password });

        return res.status(200).json({ token });

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
export default userLoginController;
