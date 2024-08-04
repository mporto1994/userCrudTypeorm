import "reflect-metadata";
import express from "express";
import { AppError } from "./errors";
import { Request, Response, NextFunction } from "express";
import { appRoutes } from "./routes/index";
import cors from "cors";
import { DataSourceInitialize } from "./data-source";

const app = express();

app.use(cors());

app.use(express.json());

DataSourceInitialize();
appRoutes(app);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: "error",
            message: err.message
        });
    }
    console.log(err);

    return response.status(500).json({
        status: "error",
        message: "Internal server error."
    });
});

app.listen(3131);

export default app;