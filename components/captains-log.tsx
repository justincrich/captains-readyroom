"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CaptainsLogProps {
  entries: { dilemma: string; advice: string }[]
  displayMode: "standard" | "night"
}

export function CaptainsLog({ entries, displayMode }: CaptainsLogProps) {
  const bgClass = displayMode === "standard" ? "bg-[#00082090]" : "bg-[#00000090]"

  const borderClass = displayMode === "standard" ? "border-[#5C88C6]" : "border-[#4a6a9e]"

  return (
    <div className={`rounded-lg overflow-hidden border ${borderClass} ${bgClass}`}>
      <div className="p-4 bg-[#5C88C6] text-white font-bold flex items-center">
        <span className="mr-2 text-[#E0A458]">&#x2022;</span>
        Captain&apos;s Personal Log
        <span className="ml-2 text-[#E0A458]">&#x2022;</span>
      </div>

      <ScrollArea className="h-[500px] p-6">
        {entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[200px] text-center">
            <p className="text-[#acb6c4] mb-2">No entries in the Captain&apos;s Log</p>
            <p className="text-[#acb6c4] text-sm">Saved advice will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {entries.map((entry, index) => (
              <Card key={index} className={`${bgClass} border-[#B5435A]`}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-bold text-[#E0A458]">
                    Stardate {new Date().getFullYear()}.{Math.floor(Math.random() * 1000)}
                  </CardTitle>
                  <CardDescription className="text-[#acb6c4]">
                    Regarding: {entry.dilemma.substring(0, 60)}...
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="italic">"{entry.advice}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
