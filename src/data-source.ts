import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PWD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    logging: true,
    entities: ["src/entities/*.ts"],
    migrations: ["src/migrations/*.ts"]
});

export const DataSourceInitialize = () => AppDataSource.initialize()
    .then(() => {
        console.log("DataSource Initialized");
    })
    .catch((err) => {
        console.error("Error during DataSource Initialization", err);
    });
