import { VehicleTypeRepository, VehicleRepository } from "../repositories/VehicleRepository";
import { AppError } from "../middlewares/errorHandler";
import { logger } from "../config/logger";

export class VehicleService {
    static async getVehicleTypes(wheels?: number) {
        try {
            let query = VehicleTypeRepository.createQueryBuilder("vehicleType").select(["vehicleType.id", "vehicleType.name"]);

            if (wheels) {
                query = query.where("vehicleType.wheels = :wheels", { wheels });
            }

            const vehicleTypes = await query.getMany();
            return vehicleTypes;
        } catch (error) {
            logger.error("Error fetching vehicle types: " + (error as Error).message);
            throw error;
        }
    }

    static async getVehiclesByType(typeId: number) {
        try {
            const vehicles = await VehicleRepository.find({ where: { type: { id: typeId } } });
            if (!vehicles.length) {
                throw new AppError("No vehicles found for this type", 404);
            }
            return vehicles;
        } catch (error) {
            logger.error("Error fetching vehicles: " + (error as Error).message);
            throw error;
        }
    }
}