import { Response } from "express";
import userListOneService from "../../services/users/userListOne.services";
import { AppError, handleError } from "../../errors";
import { RequestMail } from "../../interfaces/user";

const userListOneController = async (req: RequestMail, res: Response) => {
    try {
        if (req.params.id) {
            const user = await userListOneService({ id: req.params.id });
            return res.status(200).send(user);
        }
        const user = await userListOneService({ userEmail: req.userEmail });

        return res.status(200).send(user);
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
export default userListOneController;
