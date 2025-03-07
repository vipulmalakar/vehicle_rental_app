import { AppDataSource } from "../config/ormconfig";
import { Booking } from "../entities/Booking";

export const BookingRepository = AppDataSource.getRepository(Booking);