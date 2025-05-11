"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CupSodaIcon as Cup } from "lucide-react"

interface PicardQuoteProps {
  displayMode: "standard" | "night"
}

export function PicardQuote({ displayMode }: PicardQuoteProps) {
  const [quote, setQuote] = useState("")

  const picardQuotes = [
    "Tea. Earl Grey. Hot.",
    "Make it so.",
    "Engage!",
    "There are four lights!",
    "Things are only impossible until they're not.",
    "It is possible to commit no mistakes and still lose. That is not weakness, that is life.",
    "The line must be drawn here! This far, no further!",
    "I rather believe that time is a companion who goes with us on the journey and reminds us to cherish every moment.",
    "Someone once told me that time was a predator that stalked us all our lives. I rather believe that time is a companion who goes with us on the journey.",
    "With the first link, the chain is forged. The first speech censured, the first thought forbidden, the first freedom denied, chains us all irrevocably.",
  ]

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * picardQuotes.length)
    setQuote(picardQuotes[randomIndex])
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={getRandomQuote}
          className={`text-[#E0A458] hover:text-[#f0b468] hover:bg-[#00082030] ${displayMode === "night" ? "opacity-80" : ""}`}
        >
          <Cup className="h-5 w-5" />
          <span className="sr-only">Earl Grey Tea - Random Picard Quote</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={`w-80 p-4 border-[#5C88C6] ${displayMode === "standard" ? "bg-[#000820] text-white" : "bg-black text-[#acb6c4]"}`}
      >
        <div className="text-center">
          <h3 className="font-bold text-[#E0A458] mb-2">Captain Picard says:</h3>
          <p className="italic">"{quote || "Tea. Earl Grey. Hot."}"</p>
        </div>
      </PopoverContent>
    </Popover>
  )
}
