import { Request, Response, NextFunction } from "express";
import { BookingService } from "../services/BookingService";
import { ResponseHandler } from "../utils/responseHandler";

export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const booking = await BookingService.createBooking(req.body);
        return ResponseHandler.success(res, "Booking successful", booking, 201);
    } catch (error) {
        next(error);
    }
};