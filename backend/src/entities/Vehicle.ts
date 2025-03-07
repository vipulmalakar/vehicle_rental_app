import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { VehicleType } from "./VehicleType";
import { Booking } from "./Booking";

@Entity()
export class Vehicle {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @ManyToOne(() => VehicleType, type => type.vehicles, { onDelete: "CASCADE" })
    type!: VehicleType;

    @OneToMany(() => Booking, booking => booking.vehicle)
    bookings!: Booking[];
}