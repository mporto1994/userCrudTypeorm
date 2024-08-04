import "reflect-metadata";
import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors";
import { IUserLogin } from "../../interfaces/user";

const userLoginService = async ({ email, password }: IUserLogin) => {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
        where: {
            email: email,
        }
    });

    if (!user) {
        throw new AppError(401, "Invalid credentials.");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new AppError(401, "Invalid credentials.");
    }

    const token = jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET || "default",
        { expiresIn: "1h" }
    );

    return token;
};

export default userLoginService;
