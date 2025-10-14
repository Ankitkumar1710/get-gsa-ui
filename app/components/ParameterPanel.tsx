"use client";

import React, { useState } from "react";

type Props = {
  filters: any;
  setFilters: any;
  onApply: () => void;
  onReset: () => void;
  onSavePreset: () => void;
  onLoadPreset: () => void;
};

const SETASIDE_OPTIONS = ["8(a)", "WOSB", "SB", "SDVOSB", "VOSB", "HUBZone"];

export default function ParameterPanel({
  filters,
  setFilters,
  onApply,
  onReset,
  onSavePreset,
  onLoadPreset,
}: Props) {
  const [ceilingRange, setCeilingRange] = useState<[number, number]>([
    filters.ceilingMin || 0,
    filters.ceilingMax || 5000000,
  ]);

  const handleSetAsideClick = (option: string) => {
    const newSetAside = filters.setAside.includes(option)
      ? filters.setAside.filter((s: string) => s !== option)
      : [...filters.setAside, option];
    setFilters({ ...filters, setAside: newSetAside });
  };

  return (
    <div className="space-y-5 ">
      {/* NAICS */}
      <div>
        <label htmlFor="naics" className="block font-semibold mb-1">
          NAICS
        </label>
        <input
          id="naics"
          type="text"
          value={filters.naics}
          onChange={(e) => setFilters({ ...filters, naics: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter NAICS code"
        />
      </div>

      {/* Set-Aside */}
      <div>
        <span className="block font-semibold mb-1">Set-Aside</span>
        <div className="flex flex-wrap gap-2">
          {SETASIDE_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => handleSetAsideClick(opt)}
              className={`px-3 py-1 rounded-full border ${
                filters.setAside.includes(opt)
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-gray-100 text-gray-700 border-gray-300"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Vehicle */}
      <div>
        <label htmlFor="vehicle" className="block font-semibold mb-1">
          Vehicle
        </label>
        <input
          id="vehicle"
          type="text"
          value={filters.vehicle}
          onChange={(e) => setFilters({ ...filters, vehicle: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Vehicle"
        />
      </div>

      {/* Ceiling Range */}
      <div>
        <label className="block font-semibold mb-1">Ceiling Range ($)</label>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={ceilingRange[0]}
            onChange={(e) => {
              const min = Number(e.target.value);
              setCeilingRange([min, ceilingRange[1]]);
              setFilters({ ...filters, ceilingMin: min });
            }}
            className="w-1/2 border border-gray-300 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            value={ceilingRange[1]}
            onChange={(e) => {
              const max = Number(e.target.value);
              setCeilingRange([ceilingRange[0], max]);
              setFilters({ ...filters, ceilingMax: max });
            }}
            className="w-1/2 border border-gray-300 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Keywords */}
      <div>
        <label htmlFor="keywords" className="block font-semibold mb-1">
          Keywords
        </label>
        <input
          id="keywords"
          type="text"
          value={filters.keywords.join(", ")}
          onChange={(e) =>
            setFilters({ ...filters, keywords: e.target.value.split(",").map((k) => k.trim()) })
          }
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter comma separated keywords"
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2">
        <button
          onClick={onApply}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded transition"
        >
          Apply Filters
        </button>
        <button
          onClick={onReset}
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 rounded transition"
        >
          Reset Filters
        </button>
        <button
          onClick={onSavePreset}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded transition"
        >
          Save Preset
        </button>
        <button
          onClick={onLoadPreset}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 rounded transition"
        >
          Load Preset
        </button>
      </div>
    </div>
  );
}
