"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings } from "lucide-react";
import { PicardQuote } from "@/components/picard-quote";
import { StarfieldBackground } from "@/components/starfield-background";
import { CaptainsLog } from "@/components/captains-log";
import { SettingsPanel } from "@/components/settings-panel";
import { PicardResponse } from "@/components/picard-response";
import { useToast } from "@/components/ui/use-toast";
import { useSettings } from "@/hooks/useSettings";

const STORAGE_KEY = "captainsLogEntries";

export function PicardAdviceInterface() {
  const [isLoading, setIsLoading] = useState(false);
  const [isTitleLoading, setIsTitleLoading] = useState(false);
  const [dilemma, setDilemma] = useState("");
  const [picardResponse, setPicardResponse] = useState("");
  const [responseTitle, setResponseTitle] = useState("");
  const [responseStardate, setResponseStardate] = useState("");
  const [savedAdvice, setSavedAdvice] = useState<
    {
      dilemma: string;
      advice: string;
      locutusMode?: boolean;
      title?: string;
      stardate?: string;
    }[]
  >([]);
  const [displayMode, setDisplayMode] = useState<"standard" | "night">(
    "standard"
  );
  const { toast } = useToast();
  const { settings } = useSettings();

  // Load saved advice from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem(STORAGE_KEY);
    if (savedEntries) {
      try {
        setSavedAdvice(JSON.parse(savedEntries));
      } catch (error) {
        console.error("Failed to parse saved entries:", error);
      }
    }
  }, []);

  // Save to localStorage whenever savedAdvice changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedAdvice));
  }, [savedAdvice]);

  // Clear responses when settings change
  useEffect(() => {
    // Only clear if there's an unsaved response
    if (picardResponse) {
      setPicardResponse("");
      setResponseTitle("");
      setResponseStardate("");
    }
  }, [settings]);

  // Generate a title when we receive a new response, but only after streaming is complete
  useEffect(() => {
    // Only generate title when we have a response AND we're not loading AND streaming has finished
    const shouldGenerateTitle =
      picardResponse &&
      !isLoading &&
      !isTitleLoading &&
      // This responseTitle check prevents regenerating the title every time picardResponse changes
      !responseTitle;

    if (shouldGenerateTitle) {
      generateTitle();
    }
  }, [picardResponse, isLoading, isTitleLoading, responseTitle]);

  // Function to generate title
  const generateTitle = async () => {
    if (!picardResponse.trim() || isTitleLoading) return;

    setIsTitleLoading(true);
    try {
      const response = await fetch("/api/generate-title", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dilemma,
          advice: picardResponse,
          isLocutusMode: settings.locutusMode,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResponseTitle(data.title);
      setResponseStardate(data.stardate);
    } catch (error) {
      console.error("Error generating title:", error);
      setResponseTitle(
        settings.locutusMode ? "Collective Analysis" : "Captain's Wisdom"
      );
      setResponseStardate(
        `${new Date().getFullYear().toString().slice(2)}.${Math.floor(
          Math.random() * 9000 + 1000
        )}`
      );
    } finally {
      setIsTitleLoading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dilemma.trim()) return;

    try {
      setIsLoading(true);
      setPicardResponse("");
      setResponseTitle("");
      setResponseStardate("");

      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dilemma, settings }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error("Response body is null");
      }

      // Process the stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      // If animationSpeed is 0, collect all text and show at once
      if (settings.animationSpeed === 0) {
        let fullText = "";
        let done = false;

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          if (value) {
            fullText += decoder.decode(value);
          }
        }

        setIsLoading(false);
        setPicardResponse(fullText);
      } else {
        // Stream with controlled speed
        let buffer = "";
        let fullText = "";
        let done = false;

        const processChunk = () => {
          if (buffer.length === 0) return;

          // Add one character at a time with speed based on the animation speed setting
          const char = buffer.charAt(0);
          buffer = buffer.substring(1);

          setPicardResponse((prev) => prev + char);

          if (buffer.length > 0) {
            // Calculate delay based on animation speed (1-100)
            // Higher speed = shorter delay
            // Assuming 100 = 10ms delay, 1 = 100ms delay
            const delay = Math.max(10, 110 - settings.animationSpeed);
            setTimeout(processChunk, delay);
          }
        };

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          setIsLoading(false);
          done = doneReading;

          if (value) {
            const text = decoder.decode(value);
            fullText += text;
            buffer += text;

            // Start processing if this is the first chunk
            if (buffer.length > 0 && buffer === text) {
              processChunk();
            }
          }
        }

        // Ensure all text is displayed
        if (fullText !== picardResponse) {
          setPicardResponse(fullText);
        }
      }

      setDilemma("");
    } catch (error) {
      console.error("Error fetching Picard's advice:", error);
      setIsLoading(false);
    }
  };

  const saveToLog = () => {
    if (picardResponse) {
      // Check if this exact dilemma and advice pair already exists
      const isDuplicate = savedAdvice.some(
        (entry) => entry.dilemma === dilemma && entry.advice === picardResponse
      );

      // Only save if it's not a duplicate
      if (!isDuplicate) {
        setSavedAdvice([
          ...savedAdvice,
          {
            dilemma,
            advice: picardResponse,
            locutusMode: settings.locutusMode,
            title: responseTitle,
            stardate: responseStardate,
          },
        ]);

        toast({
          title: "Log Entry Saved",
          description: responseTitle
            ? `"${responseTitle}" has been saved to the log.`
            : "Entry has been saved to the log.",
          variant: "default",
        });
      } else {
        toast({
          title: "Entry already exists",
          description:
            "This advice has already been saved to the Captain's Log.",
          variant: "destructive",
        });
      }
    }
  };

  const toggleDisplayMode = () => {
    setDisplayMode(displayMode === "standard" ? "night" : "standard");
  };

  // Determine if we should use Borg theme
  const borgTheme = settings.locutusMode;

  // Base background class based on display mode and Borg theme
  const bgClass = borgTheme
    ? displayMode === "standard"
      ? "bg-[#0a1a0a] text-[#a0ffa0]"
      : "bg-black text-[#00FF00]"
    : displayMode === "standard"
    ? "bg-[#000820] text-white"
    : "bg-black text-[#acb6c4]";

  // Define theme colors based on Borg mode
  const primaryColor = borgTheme ? "#00FF00" : "#B5435A";
  const accentColor = borgTheme ? "#1a3a1a" : "#E0A458";
  const buttonColor = borgTheme
    ? "bg-[#1a3a1a] hover:bg-[#0a1a0a]"
    : "bg-[#B5435A] hover:bg-[#943347]";
  const borderColor = borgTheme ? "border-[#00FF00]" : "border-[#5C88C6]";
  const contentBgColor = borgTheme ? "bg-[#0a1a0a60]" : "bg-[#00082060]";

  return (
    <div className={`min-h-screen ${bgClass} transition-colors duration-300`}>
      <StarfieldBackground displayMode={displayMode} borgMode={borgTheme} />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <h1
              className={`text-3xl md:text-4xl font-bold text-[${primaryColor}] flex items-center`}
            >
              <span className={`mr-2 text-[${accentColor}]`}>&#x2022;</span>
              {borgTheme ? "Borg Collective Interface" : "Picard's Ready Room"}
              <span className={`ml-2 text-[${accentColor}]`}>&#x2022;</span>
            </h1>
            <div className="flex items-center gap-4">
              <PicardQuote
                displayMode={displayMode}
                advice={picardResponse}
                borgMode={borgTheme}
              />
              <Button
                onClick={toggleDisplayMode}
                className={`h-10 w-10 ${
                  borgTheme
                    ? "text-[#00FF00] hover:text-white hover:bg-[#1a3a1a30]"
                    : "text-[#5C88C6] hover:text-[#E0A458] hover:bg-[#00082030]"
                }`}
              >
                <span className="sr-only">Toggle display mode</span>
                {displayMode === "standard" ? "🌙" : "☀️"}
              </Button>
            </div>
          </div>
          <div
            className={`h-2 bg-[${primaryColor}] rounded-full mt-2 mb-4 w-full`}
          ></div>
        </header>

        <Tabs defaultValue="advice" className="w-full">
          <TabsList className={`grid grid-cols-3 mb-8 ${contentBgColor}`}>
            <TabsTrigger
              value="advice"
              className={`data-[state=active]:bg-[${primaryColor}] data-[state=active]:text-white`}
            >
              {borgTheme ? "Submit Query" : "Seek Advice"}
            </TabsTrigger>
            <TabsTrigger
              value="log"
              className={`data-[state=active]:bg-[${primaryColor}] data-[state=active]:text-white`}
            >
              {borgTheme ? "Collective Memory" : "Captain's Log"}
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className={`data-[state=active]:bg-[${primaryColor}] data-[state=active]:text-white`}
            >
              {borgTheme ? "Adjustments" : "Ship's Computer"}{" "}
              <Settings className="w-4 h-4 ml-2" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="advice" className="space-y-6">
            <div
              className={`rounded-lg overflow-hidden border ${borderColor} ${contentBgColor}`}
            >
              <div
                className={`p-4 bg-[${primaryColor}] text-black font-bold flex items-center`}
              >
                <span className={`mr-2 text-[${accentColor}]`}>&#x2022;</span>
                {borgTheme
                  ? "State your inquiry for assimilation"
                  : "State your dilemma, Number One"}
                <span className={`ml-2 text-[${accentColor}]`}>&#x2022;</span>
              </div>
              <form onSubmit={handleFormSubmit} className="p-6">
                <Textarea
                  value={dilemma}
                  onChange={(e) => setDilemma(e.target.value)}
                  placeholder={
                    borgTheme
                      ? "Specify data for Borg analysis..."
                      : "Describe your situation requiring the Captain's wisdom..."
                  }
                  className={`min-h-[150px] ${
                    borgTheme ? "bg-[#0a1a0a90]" : "bg-[#00082090]"
                  } ${borderColor} text-white placeholder:text-gray-400 mb-4`}
                />
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className={`${buttonColor} text-white`}
                    disabled={isLoading || !dilemma.trim()}
                  >
                    {isLoading
                      ? borgTheme
                        ? "Processing query..."
                        : "The Captain is considering..."
                      : borgTheme
                      ? "Assimilate"
                      : "Make it so"}
                  </Button>
                </div>
              </form>
            </div>

            {(isLoading || picardResponse) && (
              <PicardResponse
                isLoading={isLoading}
                response={picardResponse}
                onSave={saveToLog}
                displayMode={displayMode}
                borgMode={borgTheme}
                title={responseTitle}
                stardate={responseStardate}
                isTitleLoading={isTitleLoading}
              />
            )}
          </TabsContent>

          <TabsContent value="log">
            <CaptainsLog
              entries={savedAdvice}
              displayMode={displayMode}
              borgMode={borgTheme}
            />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsPanel displayMode={displayMode} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
