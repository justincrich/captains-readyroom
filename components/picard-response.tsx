"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface PicardResponseProps {
  isLoading: boolean;
  response: string;
  onSave: () => void;
  displayMode: "standard" | "night";
}

export function PicardResponse({
  isLoading,
  response,
  onSave,
  displayMode,
}: PicardResponseProps) {
  const bgClass =
    displayMode === "standard"
      ? "bg-[#00082090] border-[#5C88C6]"
      : "bg-[#00000080] border-[#5C88C6]";

  return (
    <Card className={`${bgClass} border rounded-lg overflow-hidden`}>
      <CardHeader className="bg-[#B5435A] text-white font-bold">
        <div className="flex items-center">
          <span className="mr-2 text-[#E0A458]">&#x2022;</span>
          Captain Picard&apos;s Wisdom
          <span className="ml-2 text-[#E0A458]">&#x2022;</span>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-32">
            <div className="w-12 h-12 border-4 border-t-[#B5435A] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-center text-[#E0A458]">
              Captain Picard is considering your dilemma...
            </p>
          </div>
        ) : (
          <div className="text-lg">
            {response.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4 last:mb-0 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </CardContent>
      {!isLoading && response && (
        <CardFooter className="flex justify-end p-4 border-t border-[#5C88C6]">
          <Button
            onClick={onSave}
            className="bg-[#5C88C6] hover:bg-[#3A689C] text-white"
          >
            Save to Captain&apos;s Log
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
