"use client";

import { JSX, useState } from "react";
import { Application } from "../types/types";
import { motion } from "framer-motion";

type Props = {
  applications: Application[];
  onMarkSubmitted?: (id: string) => void;
  highlightKeywords?: string[];
};

const STATUS_COLORS: Record<string, string> = {
  Draft: "bg-yellow-400",
  Ready: "bg-indigo-400",
  Submitted: "bg-blue-400",
  Awarded: "bg-green-400",
  Lost: "bg-red-400",
};

export default function ResultsCards({
  applications,
  onMarkSubmitted,
  highlightKeywords = [],
}: Props) {
  const [openDrawer, setOpenDrawer] = useState<Application | null>(null);

  if (!applications.length)
    return (
      <p className="text-gray-500 text-center mt-10 text-lg">
        No results found. Try adjusting filters.
      </p>
    );

  const highlightText = (text: string) => {
    let elements: (string | JSX.Element)[] = [text];
    highlightKeywords.forEach((kw) => {
      elements = elements.flatMap((el) =>
        typeof el === "string"
          ? el.split(new RegExp(`(${kw})`, "gi")).map((chunk, idx) =>
              chunk.toLowerCase() === kw.toLowerCase() ? (
                <mark key={idx} className="bg-yellow-200">
                  {chunk}
                </mark>
              ) : (
                chunk
              )
            )
          : [el]
      );
    });
    return elements;
  };

  const renderStageTimeline = (status: string) => {
    const stages = ["Draft", "Ready", "Submitted", "Awarded", "Lost"];
    return (
      <div className="flex gap-2 mt-2">
        {stages.map((stage, idx) => {
          const completed = stages.indexOf(status) >= idx;
          return (
            <div
              key={stage}
              className={`flex-1 h-2 rounded ${
                completed ? STATUS_COLORS[stage] : "bg-gray-300"
              }`}
            ></div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.map((app) => {
          const radius = 30;
          const circumference = 2 * Math.PI * radius;
          const progress = app.fitScore / 100;
          const strokeDashoffset = circumference * (1 - progress);

          return (
            <motion.div
              key={app.id}
              className="relative bg-white rounded-xl shadow p-5 cursor-pointer hover:shadow-lg transition-all"
              onClick={() => setOpenDrawer(app)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
             <div className="flex justify-between items-center mb-2">
  <h3 className="font-bold text-lg text-gray-900">{highlightText(app.title)}</h3>
  
  <div className="flex items-center gap-2">
    <span
      className={`px-2 py-1 rounded-full text-white text-xs ${STATUS_COLORS[app.status]}`}
    >
      {app.status}
    </span>
    {/* Three dots menu */}
    <button className="text-gray-400 hover:text-gray-600 text-xl font-bold">
      ⋮
    </button>
  </div>
</div>


              <div className="text-sm text-gray-600 grid grid-cols-2 gap-2">
                <div>
                  <span className="font-semibold">NAICS:</span> {app.naics}
                </div>
                <div>
                  <span className="font-semibold">Set-Aside:</span>{" "}
                  {app.setAside.join(", ")}
                </div>
                <div>
                  <span className="font-semibold">Ceiling:</span>{" "}
                  ${app.ceiling.toLocaleString()}
                </div>
                <div>
                  <span className="font-semibold">Vehicle:</span> {app.vehicle}
                </div>
              </div>

              {/* Circular progress + button row */}
              <div className="flex justify-between items-center mt-4">
                {/* Circular Fit Score */}
                <div className="relative w-20 h-20">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      className="text-gray-200"
                      strokeWidth="6"
                      stroke="currentColor"
                      fill="transparent"
                      r={radius}
                      cx={40}
                      cy={40}
                    />
                    <circle
                      className="text-green-500"
                      strokeWidth="6"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      fill="transparent"
                      r={radius}
                      cx={40}
                      cy={40}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-900">
                    {app.fitScore}%
                  </div>
                </div>

                {/* Button */}
                {onMarkSubmitted && app.status !== "Submitted" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onMarkSubmitted(app.id);
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition whitespace-nowrap"
                  >
                    Mark as Submitted
                  </button>
                )}
                {app.status === "Submitted" && (
                  <button className="bg-blue-400 text-white px-4 py-2 rounded cursor-not-allowed">
                    Submitted
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Drawer */}
      {openDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setOpenDrawer(null)}
          ></div>
          <div className="bg-white w-full max-w-lg h-full p-6 overflow-y-auto relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold"
              onClick={() => setOpenDrawer(null)}
            >
              X
            </button>
            <h2 className="text-2xl font-bold mb-4">{openDrawer.title}</h2>
            <div className="text-gray-700 space-y-2">
              <div>
                <span className="font-semibold">NAICS:</span> {openDrawer.naics}
              </div>
              <div>
                <span className="font-semibold">Set-Aside:</span>{" "}
                {openDrawer.setAside.join(", ")}
              </div>
              <div>
                <span className="font-semibold">Ceiling:</span> $
                {openDrawer.ceiling.toLocaleString()}
              </div>
              <div>
                <span className="font-semibold">Vehicle:</span> {openDrawer.vehicle}
              </div>
              <div>
                <span className="font-semibold">Due Date:</span>{" "}
                {new Date(openDrawer.dueDate).toLocaleDateString()}
              </div>
              <div>
                <span className="font-semibold">Keywords:</span>{" "}
                {openDrawer.keywords.join(", ")}
              </div>
              <div>
                <span className="font-semibold">Fit Score:</span> {openDrawer.fitScore}%
              </div>
              <div className="mt-4">{renderStageTimeline(openDrawer.status)}</div>
              {onMarkSubmitted && openDrawer.status !== "Submitted" && (
                <button
                  onClick={() => {
                    onMarkSubmitted(openDrawer.id);
                    setOpenDrawer(null);
                  }}
                  className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full"
                >
                  Mark as Submitted
                </button>
              )}
              {openDrawer.status === "Submitted" && (
                <button className="mt-4 bg-blue-400 text-white px-4 py-2 rounded w-full cursor-not-allowed">
                  Submitted
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
