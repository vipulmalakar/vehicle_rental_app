import { AppDataSource } from "../config/ormconfig";
import { VehicleType } from "../entities/VehicleType";
import { Vehicle } from "../entities/Vehicle";

const seedDatabase = async () => {
    await AppDataSource.initialize();

    console.log("🌱 Seeding database...");

    const vehicleTypes = [
        { name: "Hatchback", wheels: 4 },
        { name: "SUV", wheels: 4 },
        { name: "Sedan", wheels: 4 },
        { name: "Cruiser", wheels: 2 },
        { name: "Sports Bike", wheels: 2 },
    ];

    const savedTypes: Record<string, VehicleType> = {};

    for (const typeData of vehicleTypes) {
        let vehicleType = await AppDataSource.getRepository(VehicleType).findOne({ where: { name: typeData.name } });

        if (!vehicleType) {
            vehicleType = new VehicleType();
            vehicleType.name = typeData.name;
            vehicleType.wheels = typeData.wheels;
            await AppDataSource.manager.save(vehicleType);
        }

        savedTypes[typeData.name] = vehicleType;
    }

    const vehicles = [
        { name: "Toyota Yaris", type: savedTypes["Hatchback"] },
        { name: "Ford EcoSport", type: savedTypes["SUV"] },
        { name: "Honda Civic", type: savedTypes["Sedan"] },
        { name: "Harley-Davidson Street 750", type: savedTypes["Cruiser"] },
        { name: "Yamaha R1", type: savedTypes["Sports Bike"] },
    ];

    for (const v of vehicles) {
        let vehicle = await AppDataSource.getRepository(Vehicle).findOne({ where: { name: v.name } });

        if (!vehicle) {
            vehicle = new Vehicle();
            vehicle.name = v.name;
            vehicle.type = v.type;
            await AppDataSource.manager.save(vehicle);
        }
    }

    console.log("✅ Seeding complete!");
    process.exit();
};

seedDatabase().catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
});