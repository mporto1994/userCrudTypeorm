import { Request, Response } from "express";
import { AppError, handleError } from "../../errors";
import { RequestMail } from "../../interfaces/user";
import userDeleteService from "../../services/users/userDelete.services";

const userDeleteController = async (req: RequestMail, res: Response) => {
    const email = req.userEmail;
    try {
        if (!email) {
            throw new AppError(400, "Email is required.");
        }

        const user = await userDeleteService(email);

        return res.status(203).json({
            message: "Your Account has being deleted!",
            user: user
        });
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
export default userDeleteController;
