import { Router, RequestHandler } from "express";
import { getVehicleTypes, getVehiclesByType } from "../controllers/VehicleController";
import { validateRequest } from "../middlewares/validateRequest";
import { vehicleValidators } from "../middlewares/validators";

const router = Router();

router.get("/types", getVehicleTypes as RequestHandler);
router.get("/:typeId/models", validateRequest(vehicleValidators.getVehiclesByType), getVehiclesByType as RequestHandler);

export default router;