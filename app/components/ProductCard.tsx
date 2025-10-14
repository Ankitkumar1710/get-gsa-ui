"use client";

import { Application } from "../types";
import { CalendarDays, DollarSign, Tag } from "lucide-react";

export default function ProductCard({ app }: { app: Application }) {
  const colorMap: Record<string, string> = {
    Draft: "bg-yellow-100 text-yellow-700",
    Submitted: "bg-blue-100 text-blue-700",
    Awarded: "bg-green-100 text-green-700",
    Ready: "bg-purple-100 text-purple-700",
    Lost: "bg-red-100 text-red-700",
  };

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 p-5">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg text-gray-800 group-hover:text-indigo-600 transition">
          {app.title}
        </h3>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${colorMap[app.status]}`}>
          {app.status}
        </span>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-indigo-500" />
          <span><strong>NAICS:</strong> {app.naics}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-green-500" />
          <span><strong>Due:</strong> {app.dueDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-yellow-500" />
          <span><strong>Ceiling:</strong> ${app.ceiling.toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-gray-700">
          <strong>Fit Score:</strong> <span className="text-indigo-600">{app.fitScore}%</span>
        </p>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg text-sm shadow-sm transition">
          View
        </button>
      </div>
    </div>
  );
}
