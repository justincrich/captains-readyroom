"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CaptainsLogProps {
  entries: {
    dilemma: string;
    advice: string;
    locutusMode?: boolean;
    title?: string;
    stardate?: string;
  }[];
  displayMode: "standard" | "night";
  borgMode?: boolean;
}

export function CaptainsLog({
  entries,
  displayMode,
  borgMode = false,
}: CaptainsLogProps) {
  const borderColor = borgMode ? "border-[#00FF00]" : "border-[#5C88C6]";
  const headerColor = borgMode
    ? "bg-[#00FF00] text-black"
    : "bg-[#5C88C6] text-white";
  const contentBgColor = borgMode
    ? displayMode === "standard"
      ? "bg-[#0a1a0a80]"
      : "bg-[#00100060]"
    : displayMode === "standard"
    ? "bg-[#00082080]"
    : "bg-[#00000080]";

  // Define content for Borg/Picard mode
  const headerTitle = borgMode
    ? "Borg Collective Memory Banks"
    : "Captain's Log";
  const emptyMessage = borgMode
    ? "No data has been stored in the collective."
    : "No entries in the Captain's Log yet.";

  return (
    <div className={`rounded-lg overflow-hidden border ${borderColor}`}>
      <div className={`p-4 ${headerColor} font-bold flex items-center`}>
        <span className="mr-2 text-[#E0A458]">&#x2022;</span>
        {headerTitle}
        <span className="ml-2 text-[#E0A458]">&#x2022;</span>
      </div>

      <div className={`p-6 ${contentBgColor}`}>
        {entries.length === 0 ? (
          <p className="text-center text-[#acb6c4] py-8">{emptyMessage}</p>
        ) : (
          <div className="space-y-6">
            {entries.map((entry, index) => {
              // Determine if this particular entry was created in Locutus mode
              const isLocutusEntry = entry.locutusMode === true;

              // Apply appropriate styling based on the current theme and entry's mode
              const entryTitleColor = borgMode
                ? "text-[#00FF00]"
                : isLocutusEntry
                ? "text-[#1dd21d]"
                : "text-[#E0A458]";

              // Define labels based on entry's mode
              const questionLabel = isLocutusEntry ? "Query" : "Dilemma";
              const responseLabel = isLocutusEntry
                ? "Borg Analysis"
                : "Captain's Advice";

              // Define text color based on entry's mode and current theme
              const responseTextColor = borgMode
                ? "text-[#a0ffa0]"
                : isLocutusEntry
                ? "text-[#7fde7f]"
                : "text-white";

              // Stardate color
              const stardateColor = borgMode
                ? "text-[#00FF00]"
                : isLocutusEntry
                ? "text-[#1dd21d]"
                : "text-gray-400";

              return (
                <div
                  key={index}
                  className={`border-b ${borderColor} pb-6 last:border-0 last:pb-0`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <h3 className={`font-bold ${entryTitleColor}`}>
                        {entry.title ||
                          `${questionLabel} #${entries.length - index}`}
                      </h3>
                      {isLocutusEntry && !borgMode && (
                        <span className="ml-2 text-xs text-[#1dd21d] bg-[#0a1a0a80] px-2 py-0.5 rounded">
                          Locutus Mode
                        </span>
                      )}
                    </div>
                    {entry.stardate && (
                      <div className={`text-xs ${stardateColor}`}>
                        Stardate {entry.stardate}
                      </div>
                    )}
                  </div>
                  <p className="text-[#acb6c4] mb-4">{entry.dilemma}</p>
                  <h4 className={`font-bold mb-2 ${entryTitleColor}`}>
                    {responseLabel}
                  </h4>
                  <p className={responseTextColor}>{entry.advice}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
