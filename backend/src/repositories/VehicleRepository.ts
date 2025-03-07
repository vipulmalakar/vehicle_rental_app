import { AppDataSource } from "../config/ormconfig";
import { VehicleType } from "../entities/VehicleType";
import { Vehicle } from "../entities/Vehicle";

export const VehicleRepository = AppDataSource.getRepository(Vehicle);
export const VehicleTypeRepository = AppDataSource.getRepository(VehicleType);