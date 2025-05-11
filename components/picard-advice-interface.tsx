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

const STORAGE_KEY = "captainsLogEntries";

export function PicardAdviceInterface() {
  const [isLoading, setIsLoading] = useState(false);
  const [dilemma, setDilemma] = useState("");
  const [picardResponse, setPicardResponse] = useState("");
  const [savedAdvice, setSavedAdvice] = useState<
    { dilemma: string; advice: string }[]
  >([]);
  const [displayMode, setDisplayMode] = useState<"standard" | "night">(
    "standard"
  );

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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dilemma.trim()) return;

    try {
      setIsLoading(true);
      setPicardResponse("");

      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dilemma }),
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

      let done = false;
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        setIsLoading(false);
        done = doneReading;
        if (value) {
          const text = decoder.decode(value);
          setPicardResponse((prev) => prev + text);
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
      setSavedAdvice([...savedAdvice, { dilemma, advice: picardResponse }]);
    }
  };

  const toggleDisplayMode = () => {
    setDisplayMode(displayMode === "standard" ? "night" : "standard");
  };

  const bgClass =
    displayMode === "standard"
      ? "bg-[#000820] text-white"
      : "bg-black text-[#acb6c4]";

  return (
    <div className={`min-h-screen ${bgClass} transition-colors duration-300 `}>
      <StarfieldBackground displayMode={displayMode} />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-bold text-[#B5435A] flex items-center">
              <span className="mr-2 text-[#E0A458]">&#x2022;</span>
              Captain&apos;s Ready Room
              <span className="ml-2 text-[#E0A458]">&#x2022;</span>
            </h1>
            <div className="flex items-center gap-4">
              <PicardQuote displayMode={displayMode} advice={picardResponse} />
              <Button
                onClick={toggleDisplayMode}
                className="h-10 w-10 text-[#5C88C6] hover:text-[#E0A458] hover:bg-[#00082030]"
              >
                <span className="sr-only">Toggle display mode</span>
                {displayMode === "standard" ? "🌙" : "☀️"}
              </Button>
            </div>
          </div>
          <div className="h-2 bg-[#B5435A] rounded-full mt-2 mb-4 w-full"></div>
        </header>

        <Tabs defaultValue="advice" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8 bg-[#00082060]">
            <TabsTrigger
              value="advice"
              className="data-[state=active]:bg-[#B5435A] data-[state=active]:text-white"
            >
              Seek Advice
            </TabsTrigger>
            <TabsTrigger
              value="log"
              className="data-[state=active]:bg-[#B5435A] data-[state=active]:text-white"
            >
              Captain&apos;s Log
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-[#B5435A] data-[state=active]:text-white"
            >
              Ship&apos;s Computer <Settings className="w-4 h-4 ml-2" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="advice" className="space-y-6">
            <div className="rounded-lg overflow-hidden border border-[#5C88C6] bg-[#00082060]">
              <div className="p-4 bg-[#B5435A] text-white font-bold flex items-center">
                <span className="mr-2 text-[#E0A458]">&#x2022;</span>
                State your dilemma, Number One
                <span className="ml-2 text-[#E0A458]">&#x2022;</span>
              </div>
              <form onSubmit={handleFormSubmit} className="p-6">
                <Textarea
                  value={dilemma}
                  onChange={(e) => setDilemma(e.target.value)}
                  placeholder="Describe your situation requiring the Captain's wisdom..."
                  className="min-h-[150px] bg-[#00082090] border-[#5C88C6] text-white placeholder:text-gray-400 mb-4"
                />
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-[#B5435A] hover:bg-[#943347] text-white"
                    disabled={isLoading || !dilemma.trim()}
                  >
                    {isLoading ? "The Captain is considering..." : "Make it so"}
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
              />
            )}
          </TabsContent>

          <TabsContent value="log">
            <CaptainsLog entries={savedAdvice} displayMode={displayMode} />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsPanel displayMode={displayMode} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
