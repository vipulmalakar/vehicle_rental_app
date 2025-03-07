import { BookingRepository } from "../repositories/BookingRepository";
import { VehicleRepository } from "../repositories/VehicleRepository";
import { Booking } from "../entities/Booking";
import { Between } from "typeorm";
import { isValidDateRange } from "../utils/dateUtils";
import { AppError } from "../middlewares/errorHandler";
import { logger } from "../config/logger";

export class BookingService {
    static async createBooking(data: any) {
        const { firstName, lastName, startDate, endDate, vehicleId } = data;
        try {
            if (!isValidDateRange(startDate.toString(), endDate.toString())) {
                throw new AppError("End date must be after start date", 400);
            }

            const vehicle = await VehicleRepository.findOne({ where: { id: vehicleId } });

            if (!vehicle) {
                throw new AppError("Vehicle not found", 404);
            }

            const overlappingBooking = await BookingRepository.findOne({
                where: [
                    {
                        vehicle: { id: vehicle.id },
                        startDate: Between(startDate, endDate),
                    },
                    {
                        vehicle: { id: vehicle.id },
                        endDate: Between(startDate, endDate),
                    },
                    {
                        vehicle: { id: vehicle.id },
                        startDate: startDate,
                        endDate: endDate,
                    },
                ],
            });

            if (overlappingBooking) {
                throw new AppError("Vehicle already booked for these dates", 400);
            }

            const booking = await BookingRepository.save({ firstName, lastName, startDate, endDate, vehicle });
            logger.info(`Booking created successfully for vehicle ID: ${vehicle.name}`);

            return booking;
        } catch (error) {
            logger.error("Error creating booking: " + (error as Error).message);
            throw error;
        }
    }
}