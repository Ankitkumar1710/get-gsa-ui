"use client";

import { Application } from "../types/types";

type Props = {
  applications: Application[];
  totals: Record<string, number>; // Draft, Submitted, Awarded, Lost
};

export default function Dashboard({ applications, totals }: Props) {
  const totalApps = applications?.length || 0;
  const fullTotal = Object.values(totals).reduce((acc, val) => acc + val, 0);

  const radius = 50;
  const strokeWidth = 15;
  const circumference = 2 * Math.PI * radius;

  // Calculate progress for circular total
  const progress = fullTotal ? totalApps / fullTotal : 0;

  // Status colors
  const colors: Record<string, string> = {
    Draft: "#FACC15",
    Submitted: "#3B82F6",
    Awarded: "#10B981",
    Lost: "#EF4444", // Red for Lost
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      {/* Circular Total Applications */}
      <div className="bg-gray-200 p-6 rounded-lg shadow flex flex-col items-center justify-center">
        <h3 className="text-xl mb-2 font-bold">Total Applications</h3>
        <div className="relative w-32 h-32">
          <svg className="transform -rotate-90" width="100%" height="100%" viewBox="0 0 120 120">
            {/* Background circle */}
            <circle
              r={radius}
              cx="60"
              cy="60"
              fill="transparent"
              stroke="#E5E7EB"
              strokeWidth={strokeWidth}
            />
            {/* Foreground progress */}
            <circle
              r={radius}
              cx="60"
              cy="60"
              fill="transparent"
              stroke="#3B82F6" // Single-color filled
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference}`}
              strokeDashoffset={`${circumference * (1 - progress)}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-3xl font-bold text-gray-700">{totalApps}</p>
            <span className="text-sm text-gray-500">of {fullTotal}</span>
          </div>
        </div>
      </div>

      {/* Status Breakdown Card */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h3 className="text-sm font-semibold">Application Status</h3>
        {Object.entries(totals).map(([status, count]) => {
          const percent = fullTotal ? Math.round((count / fullTotal) * 100) : 0;
          return (
            <div key={status}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{status}</span>
                <span className="text-sm font-medium">{count}</span>
              </div>
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-4 rounded-full"
                  style={{ width: `${percent}%`, backgroundColor: colors[status] || "#9CA3AF" }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
