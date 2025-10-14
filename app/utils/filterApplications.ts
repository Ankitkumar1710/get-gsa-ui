import { Application } from "../types";

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

export function filterApplications(apps: Application[], f: Filters): Application[] {
  return apps.filter(a => {
    if (f.naics && a.naics !== f.naics) return false;
    if (f.setAside.length && !f.setAside.every(s => a.setAside.includes(s))) return false;
    if (f.vehicle && !a.vehicle.toLowerCase().includes(f.vehicle.toLowerCase())) return false;
    if (f.agency.length && !f.agency.every(s => a.agency.includes(s))) return false;
    if (f.ceilingMin !== undefined && a.ceiling < f.ceilingMin) return false;
    if (f.ceilingMax !== undefined && a.ceiling > f.ceilingMax) return false;
    if (f.keywords.length && !f.keywords.every(k => a.title.toLowerCase().includes(k.toLowerCase()))) return false;
    return true;
  });
}
