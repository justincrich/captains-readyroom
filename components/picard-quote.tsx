"use client";

import { Settings } from "lucide-react";
import { useState, useEffect } from "react";

interface PicardQuoteProps {
  displayMode: "standard" | "night";
  advice: string;
  borgMode?: boolean;
}

export function PicardQuote({
  displayMode,
  advice,
  borgMode = false,
}: PicardQuoteProps) {
  const [quote, setQuote] = useState("");

  // Classic Picard quotes
  const picard_quotes = [
    "Things are only impossible until they're not.",
    "It is possible to commit no mistakes and still lose. That is not a weakness; that is life.",
    "If we're going to be damned, let's be damned for what we really are.",
    "The line must be drawn here! This far, no further!",
    "There are times when men of good conscience cannot blindly follow orders.",
    "Tea. Earl Grey. Hot.",
    "Make it so.",
    "Engage.",
  ];

  // Locutus/Borg quotes
  const locutus_quotes = [
    "Resistance is futile.",
    "You will be assimilated.",
    "Your biological and technological distinctiveness will be added to our own.",
    "We are the Borg.",
    "Strength is irrelevant. Resistance is futile. We wish to improve ourselves.",
    "Your culture will adapt to service us.",
    "We are the Borg. Lower your shields and surrender your ships.",
    "We will add your distinctiveness to our own. Your culture will adapt to service us.",
  ];

  useEffect(() => {
    // If there's advice being displayed, don't show a random quote
    if (advice) {
      setQuote("");
      return;
    }

    // Select a random quote from the appropriate list
    const quotes = borgMode ? locutus_quotes : picard_quotes;
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, [advice, borgMode]);

  if (!quote) return null;

  const quoteClasses = borgMode
    ? "flex items-center text-[#00FF00] italic"
    : displayMode === "standard"
    ? "flex items-center text-[#E0A458] italic"
    : "flex items-center text-[#acb6c4] italic";

  return (
    <div className={quoteClasses}>
      <span className="hidden md:inline text-sm max-w-[300px] truncate">
        {quote}
      </span>
    </div>
  );
}
