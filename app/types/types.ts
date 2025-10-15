export interface Application {
  id: string;
  title: string;
  agency: string;
  naics: string;
  setAside: string[];
  vehicle: string;
  dueDate: string;
  status: string;
  percentComplete: number;
  fitScore: number;
  ceiling: number;
  keywords: string[];
}