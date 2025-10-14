export type Application = {
  id: string;
  name: string;
  naics: string;
  setAside: string;
  vehicle: string;
  agency: string;
  ceiling: number;
  status: "Draft" | "Ready" | "Submitted" | "Awarded" | "Lost";
  fitScore: number;
};

export type Filters = {
  naics: string;
  setAside: string[];
  vehicle: string;
  agency: string[];
  period?: { type: string; value: number };
  ceilingMin?: number;
  ceilingMax?: number;
  keywords: string[];
};
