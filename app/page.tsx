"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Dashboard from "./components/Dashboard";
import ResultsCards from "./components/ResultsList";
import ParameterPanel from "./components/ParameterPanel";
import { Toaster, toast } from "react-hot-toast";
import { Application } from "./types/types";
import Header from "./components/Header";
import SAMPLE_DATA from "../public/data/applications.json";

export default function Page() {
  const router = useRouter();

  const [applications, setApplications] = useState<Application[]>(SAMPLE_DATA);
  const [results, setResults] = useState<Application[]>(applications);

  const [filters, setFilters] = useState<any>({
    naics: "",
    setAside: [],
    vehicle: "",
    keywords: [],
    ceilingMin: undefined,
    ceilingMax: undefined,
  });

  const [sortKey, setSortKey] = useState<string>("dueDate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Apply filters
  const applyFilters = () => {
    let filtered = [...applications];

    if (filters.naics) filtered = filtered.filter(a => a.naics.includes(filters.naics));
    if (filters.setAside.length)
      filtered = filtered.filter(a => a.setAside.some(s => filters.setAside.includes(s)));
    if (filters.vehicle)
      filtered = filtered.filter(a => a.vehicle.toLowerCase().includes(filters.vehicle.toLowerCase()));
    if (filters.ceilingMin !== undefined) filtered = filtered.filter(a => a.ceiling >= filters.ceilingMin);
    if (filters.ceilingMax !== undefined) filtered = filtered.filter(a => a.ceiling <= filters.ceilingMax);
    if (filters.keywords.length)
      filtered = filtered.filter(a =>
        filters.keywords.some(
          k =>
            a.title.toLowerCase().includes(k.toLowerCase()) ||
            a.keywords.some(kw => kw.toLowerCase().includes(k.toLowerCase()))
        )
      );

    // Sort
    filtered.sort((a, b) => {
      const valA = sortKey === "dueDate" ? new Date(a.dueDate).getTime() : a[sortKey as keyof Application];
      const valB = sortKey === "dueDate" ? new Date(b.dueDate).getTime() : b[sortKey as keyof Application];
      return sortOrder === "asc" ? Number(valA) - Number(valB) : Number(valB) - Number(valA);
    });

    setResults(filtered);
    toast.success("Filters applied!");
    setIsSidebarOpen(false);
  };

  const resetFilters = () => {
    setFilters({ naics: "", setAside: [], vehicle: "", keywords: [], ceilingMin: undefined, ceilingMax: undefined });
    setResults(applications);
    toast("Filters reset");
  };

  const savePreset = () => {
    localStorage.setItem("preset", JSON.stringify(filters));
    toast.success("Preset saved!");
  };

  const loadPreset = () => {
    const preset = localStorage.getItem("preset");
    if (preset) {
      setFilters(JSON.parse(preset));
      toast.success("Preset loaded!");
    }
  };

  // Update URL
  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => {
      if (v && (Array.isArray(v) ? v.length : true)) {
        const valueStr = Array.isArray(v) ? v.join(",") : String(v);
        params.set(k, valueStr);
      }
    });
    router.replace(`?${params.toString()}`);
  }, [filters]);

  // Totals for dashboard
  const totals = results.reduce<Record<string, number>>((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
     <Header
        filters={filters}
        setFilters={setFilters}
        onApply={applyFilters}
        onReset={resetFilters}
        onSavePreset={savePreset}
        onLoadPreset={loadPreset} applyFilters={function (): void {
          throw new Error("Function not implemented.");
        } } resetFilters={function (): void {
          throw new Error("Function not implemented.");
        } } savePreset={function (): void {
          throw new Error("Function not implemented.");
        } } loadPreset={function (): void {
          throw new Error("Function not implemented.");
        } }/>


      {/* Layout */}
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside
          className={`fixed md:relative top-0 left-0 w-72 h-screen bg-white p-5 border-r border-gray-200 overflow-y-auto z-40 transform transition-transform duration-300
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >
          <div className="flex justify-between items-center mb-4 md:hidden">
            <h2 className="font-bold text-lg">Filters</h2>
            <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500 font-bold">✕</button>
          </div>
          <ParameterPanel
            filters={filters}
            setFilters={setFilters}
            onApply={applyFilters}
            onReset={resetFilters}
            onSavePreset={savePreset}
            onLoadPreset={loadPreset}
          />
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 md:pt-10 space-y-6">
          <Dashboard applications={results} totals={totals} />

          {/* Sorting controls */}
          <div className="flex flex-wrap justify-end gap-4 items-center mb-4">
            <label htmlFor="sortKey" className="font-semibold">Sort by:</label>
            <select
              id="sortKey"
              value={sortKey}
              onChange={e => setSortKey(e.target.value)}
              className="border px-2 py-1 rounded"
            >
              <option value="dueDate">Due Date</option>
              <option value="percentComplete">Percent Complete</option>
              <option value="fitScore">Fit Score</option>
            </select>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value as "asc" | "desc")}
              className="border px-2 py-1 rounded"
            >
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>
          </div>

          {/* Results */}
          <ResultsCards
            applications={results}
            onMarkSubmitted={(id) => {
              setApplications(prev => prev.map(a => a.id === id ? { ...a, status: "Submitted" } : a));
              setResults(prev => prev.map(a => a.id === id ? { ...a, status: "Submitted" } : a));
              toast.success("Marked as Submitted");
            }}
          />
        </main>

        <Toaster position="top-right" />
      </div>
    </>
  );
}
