import "reflect-metadata";
import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import bcrypt from "bcrypt";
import { AppError } from "../../errors";
import { IUserUpdate } from "../../interfaces/user";

const userUpdatePasswordService = async ({ id, name, userEmail, password }: IUserUpdate) => {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({ id });

    if (!user) {
        throw new AppError(404, "User not found.");
    }

    user.name = name;
    user.email = userEmail;

    if (password) {
        user.password = bcrypt.hashSync(password, 10);
    }

    await userRepository.save(user);

    return user;
};

export default userUpdatePasswordService;
