import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1774922583520 implements MigrationInterface {
    name = 'InitDatabase1774922583520'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "doctor_weekly_availability" ("id" SERIAL NOT NULL, "diaSemana" integer NOT NULL, "horaInicio" TIME NOT NULL, "horaFin" TIME NOT NULL, "duracionCita" integer NOT NULL DEFAULT '30', "doctorId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_43831974f33714413b15ddc76f1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."appointments_status_enum" AS ENUM('pending', 'confirmed', 'completed', 'cancelled')`);
        await queryRunner.query(`CREATE TYPE "public"."appointments_modality_enum" AS ENUM('VIRTUAL', 'PRESENCIAL')`);
        await queryRunner.query(`CREATE TABLE "appointments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "dateHour" TIMESTAMP NOT NULL, "status" "public"."appointments_status_enum" NOT NULL DEFAULT 'pending', "modality" "public"."appointments_modality_enum" NOT NULL DEFAULT 'VIRTUAL', "patientName" character varying(150) NOT NULL, "patientEmail" character varying(100) NOT NULL, "patientPhone" character varying(20) NOT NULL, "notes" text, "meetingLink" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "doctorId" uuid, CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."doctor_specialities_name_enum" AS ENUM('Medicina General', 'Pediatría', 'Dermatología', 'Cardiología', 'Ortopedia', 'Ginecología', 'Psiquiatría', 'Endocrinología', 'Neurología', 'Gastroenterología', 'Urología', 'Oftalmología', 'Otorrinolaringología', 'Reumatología', 'Hematología', 'Oncología', 'Enfermedades Infecciosas', 'Alergia e Inmunología', 'Nefrología', 'Neumología')`);
        await queryRunner.query(`CREATE TABLE "doctor_specialities" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" "public"."doctor_specialities_name_enum" NOT NULL DEFAULT 'Medicina General', "description" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0beb4c018b5743e4e1566a56ab2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('assistant', 'admin', 'super_admin', 'doctor')`);
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('pending', 'inactive', 'active', 'suspended', 'banned', 'rejected')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "profile_image" character varying NOT NULL DEFAULT 'https://res.cloudinary.com/dvgvcleky/image/upload/f_auto,q_auto/v1/RestO/ffgx6ywlaix0mb3jghux', "email" character varying(100) NOT NULL, "password" character varying(255) NOT NULL, "fullname" character varying(100) NOT NULL, "dni" character varying(20), "medicalLicenseNumber" character varying(50), "phoneNumber" character varying(20), "role" "public"."user_role_enum" NOT NULL DEFAULT 'doctor', "status" "public"."user_status_enum" NOT NULL DEFAULT 'inactive', "googleCalendarId" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "bossId" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_027941f32603b418d9bf0db0e82" UNIQUE ("dni"), CONSTRAINT "UQ_3916c4ccecb723702ae254c1cd2" UNIQUE ("medicalLicenseNumber"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "doctors_specialities" ("doctorId" uuid NOT NULL, "specialityId" uuid NOT NULL, CONSTRAINT "PK_8287b270195e0f2d4d498eb4c1e" PRIMARY KEY ("doctorId", "specialityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_30c079ac33bb8669929bca5b1e" ON "doctors_specialities" ("doctorId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c019eff4a8e4ebee241711cb20" ON "doctors_specialities" ("specialityId") `);
        await queryRunner.query(`ALTER TABLE "doctor_weekly_availability" ADD CONSTRAINT "FK_6aff20dc95d6d2c53a706f6fcad" FOREIGN KEY ("doctorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_0c1af27b469cb8dca420c160d65" FOREIGN KEY ("doctorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_f92b3d839b53b5c4ff75bec5945" FOREIGN KEY ("bossId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doctors_specialities" ADD CONSTRAINT "FK_30c079ac33bb8669929bca5b1e7" FOREIGN KEY ("doctorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "doctors_specialities" ADD CONSTRAINT "FK_c019eff4a8e4ebee241711cb20c" FOREIGN KEY ("specialityId") REFERENCES "doctor_specialities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctors_specialities" DROP CONSTRAINT "FK_c019eff4a8e4ebee241711cb20c"`);
        await queryRunner.query(`ALTER TABLE "doctors_specialities" DROP CONSTRAINT "FK_30c079ac33bb8669929bca5b1e7"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_f92b3d839b53b5c4ff75bec5945"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_0c1af27b469cb8dca420c160d65"`);
        await queryRunner.query(`ALTER TABLE "doctor_weekly_availability" DROP CONSTRAINT "FK_6aff20dc95d6d2c53a706f6fcad"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c019eff4a8e4ebee241711cb20"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_30c079ac33bb8669929bca5b1e"`);
        await queryRunner.query(`DROP TABLE "doctors_specialities"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "doctor_specialities"`);
        await queryRunner.query(`DROP TYPE "public"."doctor_specialities_name_enum"`);
        await queryRunner.query(`DROP TABLE "appointments"`);
        await queryRunner.query(`DROP TYPE "public"."appointments_modality_enum"`);
        await queryRunner.query(`DROP TYPE "public"."appointments_status_enum"`);
        await queryRunner.query(`DROP TABLE "doctor_weekly_availability"`);
    }

}
