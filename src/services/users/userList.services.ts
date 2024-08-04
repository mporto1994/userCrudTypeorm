import "reflect-metadata";

import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";

const userListService = async () => {
    const userRepository = AppDataSource.getRepository(User);

    const users = await userRepository.find();

    if (!users) {
        throw new AppError(404, "No users found.");
    }

    return users;
};
export default userListService;
