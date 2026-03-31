import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany
} from 'typeorm';
import { User } from './doctor.entity'; // Relación inversa
import { DoctorSpecialityEnum } from 'src/enums/doctorSpecialities.enum';

@Entity('doctor_specialities')
export class DoctorSpeciality {
  @PrimaryGeneratedColumn('uuid')
  id: string;

 @Column({
    type: 'enum',
    enum: DoctorSpecialityEnum,
    default: DoctorSpecialityEnum.GENERAL_MEDICINE
  })
  name: DoctorSpecialityEnum;

  @Column({ type: 'text', nullable: true })
  description: string; // ej: 'Consultas generales de salud'

  @ManyToMany(() => User, (doctor) => doctor.specialities) // Si ManyToMany
  doctors: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
