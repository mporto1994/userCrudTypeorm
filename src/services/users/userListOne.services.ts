import "reflect-metadata";
import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { IUserListOneService } from "../../interfaces/user";

const userListOneService = async (props: IUserListOneService) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        let user: User | null;

        if (props.id) {
            user = await userRepository.findOne({
                where: {
                    id: props.id,
                }
            });
        } else {
            user = await userRepository.findOne({
                where: {
                    email: props.userEmail,
                }
            });
        }

        if (!user) {
            throw new AppError(404, "User not found.");
        }

        return user;
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError(500, "Internal server error");
    }
};

export default userListOneService;
