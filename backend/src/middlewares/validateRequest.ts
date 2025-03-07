import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { AppError } from "./errorHandler";

export const validateRequest = (validations: any[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(validations.map((validation) => validation.run(req)));

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new AppError("Validation failed", 400, errors.array()));
        }

        next();
    };
};