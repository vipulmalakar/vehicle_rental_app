import axios from "axios";
import { FinalBookingValues } from "../interfaces/BookingFormInterfaces";

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

export const fetchVehicleTypes = (wheels?: number) =>
  axios.get(`${API_URL}/vehicles/types${wheels ? `?wheels=${wheels}` : ""}`);

export const fetchVehicleModels = (typeId: number) =>
  axios.get(`${API_URL}/vehicles/${typeId}/models`);

export const submitBooking = (data: FinalBookingValues) =>
  axios.post(`${API_URL}/bookings`, data);