export interface Doctor {
  id: string;
  fullName: string;
  email: string;
  specialtyId: string;
  avatarUrl?: string; // Opcional por si no sube foto a AWS todavía
  active: boolean;
}
