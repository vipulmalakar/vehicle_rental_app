import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1741336354301 implements MigrationInterface {
    name = 'InitSchema1741336354301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "booking" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "startDate" date NOT NULL, "endDate" date NOT NULL, "vehicleId" integer, CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vehicle" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "typeId" integer, CONSTRAINT "PK_187fa17ba39d367e5604b3d1ec9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vehicle_type" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "wheels" integer NOT NULL, CONSTRAINT "UQ_972be84035335f3a9c1e8db66ee" UNIQUE ("name"), CONSTRAINT "PK_465137c10960b54f82f1b145e43" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_dc9f6a94644e45d49872c1e2f10" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicle" ADD CONSTRAINT "FK_ebd38cb579309815d2f6521c9e9" FOREIGN KEY ("typeId") REFERENCES "vehicle_type"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicle" DROP CONSTRAINT "FK_ebd38cb579309815d2f6521c9e9"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_dc9f6a94644e45d49872c1e2f10"`);
        await queryRunner.query(`DROP TABLE "vehicle_type"`);
        await queryRunner.query(`DROP TABLE "vehicle"`);
        await queryRunner.query(`DROP TABLE "booking"`);
    }

}
