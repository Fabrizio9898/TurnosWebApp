import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne
} from 'typeorm';
import { DoctorAvailability } from './doctor-availability.entity';
import { Appointment } from './appointments.entity';
import { DoctorSpeciality } from './doctor-specialities.entity';
import { User_Status } from 'src/enums/userStatus.enum';
import { UserRole } from 'src/enums/roles.enum';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default:
      'https://res.cloudinary.com/dvgvcleky/image/upload/f_auto,q_auto/v1/RestO/ffgx6ywlaix0mb3jghux'
  })
  profile_image: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, select: false })
  password: string;

  @Column({ type: 'varchar', length: 100 })
  fullname: string;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: true })
  dni: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: true })
  medicalLicenseNumber?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phoneNumber?: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.DOCTOR })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: User_Status,
    default: User_Status.INACTIVE
  })
  status: User_Status;

  // --- INTEGRACIÓN n8n / GOOGLE CALENDAR ---
  @Column({ type: 'varchar', nullable: true })
  googleCalendarId?: string;


  @OneToMany(() => Appointment, (turno) => turno.doctor)
  appointments: Appointment[];

  @OneToMany(() => DoctorAvailability, (disp) => disp.doctor)
  disponibilidades: DoctorAvailability[];

  @ManyToMany(() => DoctorSpeciality, (especialidad) => especialidad.doctors)
  @JoinTable({
    name: 'doctors_specialities', 
    joinColumn: { name: 'doctorId', referencedColumnName: 'id' }, 
    inverseJoinColumn: { name: 'specialityId', referencedColumnName: 'id' } 
  })
  specialities: DoctorSpeciality[];

  // --- RELACIONES DE SECRETARIAS/ASISTENTES ---
  @ManyToOne(() => User, (user) => user.assistants, {
    nullable: true,
    onDelete: 'SET NULL'
  })
  boss: User;

  @OneToMany(() => User, (user) => user.boss)
  assistants: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}