"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"

interface PicardResponseProps {
  isLoading: boolean
  response: string
  onSave: () => void
  displayMode: "standard" | "night"
}

export function PicardResponse({ isLoading, response, onSave, displayMode }: PicardResponseProps) {
  const [typedResponse, setTypedResponse] = useState("")
  const [typingIndex, setTypingIndex] = useState(0)

  // Reset typing animation when response changes
  useEffect(() => {
    if (!isLoading && response) {
      setTypingIndex(0)
      setTypedResponse("")
    }
  }, [response, isLoading])

  // Typing animation effect
  useEffect(() => {
    if (isLoading || !response) return

    if (typingIndex < response.length) {
      const timeout = setTimeout(() => {
        setTypedResponse((prev) => prev + response[typingIndex])
        setTypingIndex((prev) => prev + 1)
      }, 30)

      return () => clearTimeout(timeout)
    }
  }, [typingIndex, response, isLoading])

  const bgClass = displayMode === "standard" ? "bg-[#00082090]" : "bg-[#00000090]"

  const borderClass = displayMode === "standard" ? "border-[#5C88C6]" : "border-[#4a6a9e]"

  return (
    <div className={`rounded-lg overflow-hidden border ${borderClass} ${bgClass}`}>
      <div className="p-4 bg-[#5C88C6] text-white font-bold flex items-center">
        <span className="mr-2 text-[#E0A458]">&#x2022;</span>
        Captain Picard&apos;s Counsel
        <span className="ml-2 text-[#E0A458]">&#x2022;</span>
      </div>

      <div className="p-6 min-h-[150px] relative">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-[150px]">
            <div className="w-16 h-16 border-4 border-t-[#B5435A] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-center text-[#acb6c4]">The Captain is considering your dilemma...</p>
          </div>
        ) : (
          <div className="flex">
            <div className="mr-4 flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-[#B5435A] flex items-center justify-center text-white">
                <span className="text-xl">JLP</span>
              </div>
            </div>
            <div className="flex-grow">
              <p className="mb-4">{typedResponse}</p>
              <div className="flex justify-end">
                <Button
                  onClick={onSave}
                  variant="outline"
                  size="sm"
                  className="text-[#5C88C6] border-[#5C88C6] hover:bg-[#5C88C620]"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save to Captain&apos;s Log
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
