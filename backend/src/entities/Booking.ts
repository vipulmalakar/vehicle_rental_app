import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Vehicle } from "./Vehicle";

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @ManyToOne(() => Vehicle, vehicle => vehicle.bookings, { onDelete: "CASCADE" })
    vehicle!: Vehicle;

    @Column({ type: "date" })
    startDate!: Date;

    @Column({ type: "date" })
    endDate!: Date;
}