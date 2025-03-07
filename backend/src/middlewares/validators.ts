import { body, param } from "express-validator";

export const vehicleValidators = {
    getVehiclesByType: [
        param("typeId").isInt().withMessage("Type ID must be a number"),
    ],
};

export const bookingValidators = {
    createBooking: [
        body("firstName").isString().trim().notEmpty().withMessage("First name is required"),
        body("lastName").isString().trim().notEmpty().withMessage("Last name is required"),
        body("vehicleId").isInt().withMessage("Vehicle ID must be a number"),
        body("startDate").isISO8601().withMessage("Invalid start date format"),
        body("endDate").isISO8601().withMessage("Invalid end date format"),
        body("startDate").custom((value, { req }) => {
            const startDate = new Date(value);
            const endDate = new Date(req.body.endDate);
            const currentDate = new Date();
            if (startDate < currentDate) {
                throw new Error("Start date cannot be in the past");
            }
            if (startDate > endDate) {
                throw new Error("Start date must be before or equal to end date");
            }
            return true;
        }),
        body("endDate").custom((value, { req }) => {
            const endDate = new Date(value);
            const currentDate = new Date();
            if (endDate < currentDate) {
                throw new Error("End date cannot be in the past");
            }
            return true;
        }),
    ],
};