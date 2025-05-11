"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface PicardResponseProps {
  isLoading: boolean;
  response: string;
  onSave: () => void;
  displayMode: "standard" | "night";
  borgMode?: boolean;
  title?: string;
  stardate?: string;
  isTitleLoading?: boolean;
}

export function PicardResponse({
  isLoading,
  response,
  onSave,
  displayMode,
  borgMode = false,
  title = "",
  stardate = "",
  isTitleLoading = false,
}: PicardResponseProps) {
  // Define theme colors based on Borg mode
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
  const headerTitle = borgMode ? "Locutus of Borg" : "Captain Jean-Luc Picard";
  const loadingText = borgMode
    ? "Processing inquiry..."
    : "The Captain is considering...";

  // Determine text color for title
  const titleColor = borgMode ? "text-[#00FF00]" : "text-[#E0A458]";
  const stardateColor = borgMode ? "text-[#00FF00]" : "text-gray-400";

  return (
    <div className={`rounded-lg overflow-hidden border ${borderColor}`}>
      <div
        className={`p-4 ${headerColor} font-bold flex items-center justify-between`}
      >
        <div className="flex items-center">
          <span className="mr-2 text-[#E0A458]">&#x2022;</span>
          {headerTitle}
          <span className="ml-2 text-[#E0A458]">&#x2022;</span>
        </div>
        {response && !isLoading && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onSave}
            className="hover:bg-[#5C88C620]"
            title="Save to Captain's Log"
          >
            <Save className="h-4 w-4" />
            <span className="sr-only">Save to log</span>
          </Button>
        )}
      </div>

      {/* Title and Stardate */}
      {!isLoading && title && (
        <div className={`px-6 pt-4 flex justify-between items-center`}>
          <h3 className={`font-bold text-lg ${titleColor}`}>{title}</h3>
          {stardate && (
            <div className={`text-sm ${stardateColor}`}>
              Stardate {stardate}
            </div>
          )}
        </div>
      )}

      <div
        className={`p-6 ${contentBgColor} ${!isLoading && title ? "pt-2" : ""}`}
      >
        {isLoading ? (
          <p className="italic text-[#acb6c4]">{loadingText}</p>
        ) : isTitleLoading ? (
          <div className="flex justify-center pb-2">
            <div className="h-1 w-16 bg-gray-600 rounded-full animate-pulse"></div>
          </div>
        ) : (
          <div className="prose prose-invert max-w-none">
            <p
              className={`${
                borgMode ? "text-[#00FF00]" : "text-white"
              } whitespace-pre-wrap`}
            >
              {response}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
