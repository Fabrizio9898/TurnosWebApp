export interface Appointment {
  id: string;
  doctorId: string;
  patientName: string;
  dateTime: Date;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
}
