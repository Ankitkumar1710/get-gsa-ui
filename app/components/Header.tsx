"use client";

import { useState } from "react";
import { Bell, User } from "lucide-react";
import ParameterPanel from "./ParameterPanel"; // Adjust path if needed

type HeaderProps = {
  filters: any;
  setFilters: (filters: any) => void;
  onApply: () => void;
  onReset: () => void;
  onSavePreset: () => void;
  onLoadPreset: () => void;
  applyFilters: () => void;
  resetFilters: () => void;
  savePreset: () => void;
  loadPreset: () => void;
};

export default function Header({
  filters,
  setFilters,
  onApply,
  onReset,
  onSavePreset,
  onLoadPreset,
}: HeaderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-6 py-3">
        {/* Left: Hamburger + Title */}
        <div className="flex items-center gap-2">
          <button
            className="md:hidden text-xl font-bold"
            onClick={() => setIsSidebarOpen(true)}
          >
            ☰
          </button>
          <h1 className="text-xl font-bold text-gray-800 hidden md:block">
            Get-GSA Dashboard
          </h1>
        </div>

        {/* Right: Notifications + User */}
        <div className="flex items-center gap-4">
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition"
            title="Notifications"
          >
            <Bell size={20} />
          </button>

          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold cursor-pointer">
            <User size={18} />
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Popup */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex justify-start">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsSidebarOpen(false)}
          />

          {/* Sidebar */}
          <aside className="relative w-72 h-screen bg-white p-5 border-r border-gray-200 overflow-y-auto shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">Filters</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-gray-500 font-bold"
              >
                ✕
              </button>
            </div>

            <ParameterPanel
              filters={filters}
              setFilters={setFilters}
              onApply={onApply}
              onReset={onReset}
              onSavePreset={onSavePreset}
              onLoadPreset={onLoadPreset}
            />
          </aside>
        </div>
      )}
    </>
  );
}
