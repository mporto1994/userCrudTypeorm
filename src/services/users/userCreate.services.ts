import "reflect-metadata";

import { User } from "../../entities/user.entity";
import { IUserCreate } from "../../interfaces/user";
import { AppDataSource } from "../../data-source";
import bcrypt from "bcrypt";
import { AppError } from "../../errors/";

const userCreateService = async ({ name, email, password }: IUserCreate) => {
    const userRepository = AppDataSource.getRepository(User);

    const users = await userRepository.find();

    const emailAlreadyExists = users.find((user: IUserCreate) => user.email === email);

    if (emailAlreadyExists) {
        throw new AppError(409, "Email Already Exists");
    }

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = bcrypt.hashSync(password, 10);

    userRepository.create(user);

    await userRepository.save(user);

    return user;

};
export default userCreateService;
