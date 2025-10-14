"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Filters = {
  naics: string;
  setAside: string[];
  vehicle: string;
  agency: string[];
  ceilingMin?: number;
  ceilingMax?: number;
  period: { type: string; value: number };
  keywords: string[];
};

export type Application = {
  id: string;
  naics: string;
  setAside: string[];
  vehicle: string;
  agency: string[];
  ceiling: number;
  period: { type: string; value: number };
  status: "Draft" | "Awarded" | "Submitted";
  fitScore: number;
  keywords: string[];
};

type FilterContextType = {
  filters: Filters;
  setFilters: (f: Filters) => void;
  applications: Application[];
  setApplications: (a: Application[]) => void;
};

const defaultFilters: Filters = {
  naics: "",
  setAside: [],
  vehicle: "",
  agency: [],
  ceilingMin: undefined,
  ceilingMax: undefined,
  period: { type: "days", value: 30 },
  keywords: [],
};

const defaultApplications: Application[] = []; // initial empty data

const FilterContext = createContext<FilterContextType>({
  filters: defaultFilters,
  setFilters: () => {},
  applications: defaultApplications,
  setApplications: () => {},
});

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [applications, setApplications] = useState<Application[]>(defaultApplications);

  return (
    <FilterContext.Provider value={{ filters, setFilters, applications, setApplications }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);
