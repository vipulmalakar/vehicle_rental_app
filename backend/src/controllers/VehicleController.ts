import { Request, Response, NextFunction } from "express";
import { VehicleService } from "../services/VehicleService";
import { ResponseHandler } from "../utils/responseHandler";

export const getVehicleTypes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const wheels = req.query.wheels ? Number(req.query.wheels) : undefined;
        const vehicleTypes = await VehicleService.getVehicleTypes(wheels);
        return ResponseHandler.success(res, "Vehicle types fetched successfully", vehicleTypes);
    } catch (error) {
        next(error);
    }
};

export const getVehiclesByType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { typeId } = req.params;
        const vehicles = await VehicleService.getVehiclesByType(Number(typeId));
        return ResponseHandler.success(res, "Vehicles fetched successfully", vehicles);
    } catch (error) {
        next(error);
    }
};