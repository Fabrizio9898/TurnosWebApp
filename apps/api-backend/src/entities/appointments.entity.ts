import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from './doctor.entity';
import { AppointmentStatus } from 'src/enums/appointmentStatus.enum';

export enum Modality {
  VIRTUAL = 'VIRTUAL',
  PRESENCIAL = 'PRESENCIAL'
}

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  dateHour: Date; // La fecha y hora exacta del turno

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDING
  })
  status: AppointmentStatus;

  // ACÁ ESTÁ LO QUE ELIGE EL PACIENTE
  @Column({
    type: 'enum',
    enum: Modality,
    default: Modality.VIRTUAL // Podés poner uno por defecto
  })
  modality: Modality;

  // --- DATOS DEL PACIENTE (Todo en la misma tabla, cero complicaciones) ---
  @Column({ type: 'varchar', length: 150 })
  patientName: string;

  @Column({ type: 'varchar', length: 100 })
  patientEmail: string;

  // ¡CLAVE! Con este campo, tu webhook le avisa a n8n a qué número mandar el WhatsApp
  @Column({ type: 'varchar', length: 20 })
  patientPhone: string; 

  // Un campo de texto libre viene joya para que el paciente diga por qué saca el turno
  @Column({ type: 'text', nullable: true })
  notes: string; 

  @Column({ type: 'varchar', nullable: true })
  meetingLink: string; 

  // --- RELACIONES ---
  // A qué doctor (User) le pertenece este turno
  @ManyToOne(() => User, (doctor) => doctor.appointments, {
    onDelete: 'CASCADE'
  })
  doctor: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}