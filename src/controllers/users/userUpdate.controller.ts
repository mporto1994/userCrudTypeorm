import { Response } from "express";
import userUpdatePasswordService from "../../services/users/userUpdate.services";
import { AppError, handleError } from "../../errors";
import { RequestMail } from "../../interfaces/user";

const userUpdateController = async (req: RequestMail, res: Response) => {
    try {
        if (!req.userEmail) return;
        if (!req.body) {
            throw new AppError(400, "Update data are required.");
        }

        const userEmail = req.userEmail;
        const { name, password } = req.body;
        const { id } = req.params;

        const user = await userUpdatePasswordService({ id, name, userEmail, password });

        return res.status(200).json({
            message: "The user is successfully updated!",
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
export default userUpdateController;
