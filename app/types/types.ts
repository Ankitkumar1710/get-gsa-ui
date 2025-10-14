export type Application = {
  id: string;
  title: string;
  naics: string;
  setAside: string[];
  agency: string[];
  vehicle: string;
  dueDate: string;
  status: "Draft" | "Submitted" | "Awarded" | "Ready" | "Lost";
  percentComplete: number;
  fitScore: number;
  ceiling: number;
  keywords: string[];
};
