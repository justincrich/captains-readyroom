"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings } from "lucide-react"
import { PicardQuote } from "@/components/picard-quote"
import { StarfieldBackground } from "@/components/starfield-background"
import { CaptainsLog } from "@/components/captains-log"
import { SettingsPanel } from "@/components/settings-panel"
import { PicardResponse } from "@/components/picard-response"

export function PicardAdviceInterface() {
  const [dilemma, setDilemma] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState("")
  const [savedAdvice, setSavedAdvice] = useState<{ dilemma: string; advice: string }[]>([])
  const [displayMode, setDisplayMode] = useState<"standard" | "night">("standard")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!dilemma.trim()) return

    setIsLoading(true)
    // Simulate response delay
    setTimeout(() => {
      // Mock response - in a real app, this would come from an API
      const picardResponses = [
        "The line must be drawn here! This far, no further! You must stand firm in your convictions and not allow others to dictate your path.",
        "It is possible to commit no mistakes and still lose. That is not weakness, that is life. Learn from this experience and move forward.",
        "There are times when we must face the unknown with courage and determination. This appears to be one of those times.",
        "Things are only impossible until they're not. I suggest you approach this challenge with that perspective.",
        "In my experience, communication is often the most important tool in resolving conflicts. Perhaps a frank discussion would serve you well.",
      ]
      const randomResponse = picardResponses[Math.floor(Math.random() * picardResponses.length)]
      setResponse(randomResponse)
      setIsLoading(false)
    }, 2000)
  }

  const saveToLog = () => {
    if (response) {
      setSavedAdvice([...savedAdvice, { dilemma, advice: response }])
    }
  }

  const toggleDisplayMode = () => {
    setDisplayMode(displayMode === "standard" ? "night" : "standard")
  }

  const bgClass = displayMode === "standard" ? "bg-[#000820] text-white" : "bg-black text-[#acb6c4]"

  return (
    <div className={`min-h-screen ${bgClass} transition-colors duration-300`}>
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
              <PicardQuote displayMode={displayMode} />
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDisplayMode}
                className="text-[#5C88C6] hover:text-[#E0A458] hover:bg-[#00082030]"
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
            <TabsTrigger value="advice" className="data-[state=active]:bg-[#B5435A] data-[state=active]:text-white">
              Seek Advice
            </TabsTrigger>
            <TabsTrigger value="log" className="data-[state=active]:bg-[#B5435A] data-[state=active]:text-white">
              Captain&apos;s Log
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-[#B5435A] data-[state=active]:text-white">
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
              <form onSubmit={handleSubmit} className="p-6">
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

            {(isLoading || response) && (
              <PicardResponse isLoading={isLoading} response={response} onSave={saveToLog} displayMode={displayMode} />
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
  )
}
