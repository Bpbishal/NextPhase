export class CreateTrainingDto {
  name: string;
  department: string;
  totalSeats: number;
  startDate: string; // ISO date string
  endDate: string;   // ISO date string
}
