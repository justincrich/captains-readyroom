"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// import { CupSodaIcon as Cup } from "lucide-react";

interface PicardQuoteProps {
  displayMode: "standard" | "night";
  advice: string;
}

export function PicardQuote({ displayMode, advice }: PicardQuoteProps) {
  const [quote, setQuote] = useState("");

  return (
    <Popover>
      <PopoverTrigger asChild>
        {/* <Button
          variant="ghost"
          size="icon"
          onClick={getRandomQuote}
          className={`text-[#E0A458] hover:text-[#f0b468] hover:bg-[#00082030] ${
            displayMode === "night" ? "opacity-80" : ""
          }`}
        >
          <Cup className="h-5 w-5" />
          <span className="sr-only">Earl Grey Tea - Random Picard Quote</span>
        </Button> */}
      </PopoverTrigger>
      <PopoverContent
        className={`w-80 p-4 border-[#5C88C6] ${
          displayMode === "standard"
            ? "bg-[#000820] text-white"
            : "bg-black text-[#acb6c4]"
        }`}
      >
        <div className="text-center">
          <h3 className="font-bold text-[#E0A458] mb-2">
            Captain Picard says:
          </h3>
          <p className="italic text-[#acb6c4]">"{advice}"</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
