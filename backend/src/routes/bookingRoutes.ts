import { Router, RequestHandler } from "express";
import { createBooking } from "../controllers/BookingController";
import { validateRequest } from "../middlewares/validateRequest";
import { bookingValidators } from "../middlewares/validators";

const router = Router();

router.post("/", validateRequest(bookingValidators.createBooking), createBooking as RequestHandler);

export default router;