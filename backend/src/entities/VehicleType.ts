import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Vehicle } from "./Vehicle";

@Entity()
export class VehicleType {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    name!: string;

    @Column()
    wheels!: number;

    @OneToMany(() => Vehicle, vehicle => vehicle.type, { cascade: true })
    vehicles!: Vehicle[];
}