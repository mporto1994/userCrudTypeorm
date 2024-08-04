import "reflect-metadata";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";

const userDeleteService = async (id?: string, userEmail?: string) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        let user: User | null;

        if (id) {
            user = await userRepository.findOne({
                where: {
                    id: id,
                }
            });
        } else {
            user = await userRepository.findOne({
                where: {
                    email: userEmail,
                }
            });
        }

        if (!user) {
            throw new AppError(404, "User not found.");
        }

        userRepository.delete(user.id);

        return user;
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError(500, "Internal server error");
    }
};

export default userDeleteService;
