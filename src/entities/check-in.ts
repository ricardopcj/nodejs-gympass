export interface CheckIn {
  id: string;
  userId: string;
  gymId: string;
  createdAt: Date;
  validatedAt: Date | null;
}
