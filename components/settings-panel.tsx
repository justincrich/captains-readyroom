"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SettingsPanelProps {
  displayMode: "standard" | "night"
}

export function SettingsPanel({ displayMode }: SettingsPanelProps) {
  const bgClass = displayMode === "standard" ? "bg-[#00082090]" : "bg-[#00000090]"

  const borderClass = displayMode === "standard" ? "border-[#5C88C6]" : "border-[#4a6a9e]"

  return (
    <div className={`rounded-lg overflow-hidden border ${borderClass} ${bgClass}`}>
      <div className="p-4 bg-[#5C88C6] text-white font-bold flex items-center">
        <span className="mr-2 text-[#E0A458]">&#x2022;</span>
        Ship&apos;s Computer Settings
        <span className="ml-2 text-[#E0A458]">&#x2022;</span>
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-[#E0A458]">Interface Settings</h3>

          <div className="flex items-center justify-between">
            <Label htmlFor="notifications" className="flex flex-col space-y-1">
              <span>Notifications</span>
              <span className="font-normal text-sm text-[#acb6c4]">Enable bridge notifications</span>
            </Label>
            <Switch id="notifications" />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="sounds" className="flex flex-col space-y-1">
              <span>LCARS Sounds</span>
              <span className="font-normal text-sm text-[#acb6c4]">Enable interface sound effects</span>
            </Label>
            <Switch id="sounds" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="animation-speed" className="flex flex-col space-y-1">
              <span>Animation Speed</span>
              <span className="font-normal text-sm text-[#acb6c4]">Adjust interface animation speed</span>
            </Label>
            <Slider id="animation-speed" defaultValue={[50]} max={100} step={1} className="w-full" />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-[#E0A458]">Advice Settings</h3>

          <div className="space-y-2">
            <Label htmlFor="advice-style" className="flex flex-col space-y-1">
              <span>Captain&apos;s Style</span>
              <span className="font-normal text-sm text-[#acb6c4]">Select the Captain&apos;s advice style</span>
            </Label>
            <Select defaultValue="diplomatic">
              <SelectTrigger id="advice-style" className={`w-full ${bgClass} border-[#5C88C6]`}>
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent className={`${bgClass} border-[#5C88C6]`}>
                <SelectItem value="diplomatic">Diplomatic</SelectItem>
                <SelectItem value="philosophical">Philosophical</SelectItem>
                <SelectItem value="direct">Direct</SelectItem>
                <SelectItem value="inspirational">Inspirational</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="shakespeare" className="flex flex-col space-y-1">
              <span>Shakespeare Mode</span>
              <span className="font-normal text-sm text-[#acb6c4]">Occasionally quote Shakespeare</span>
            </Label>
            <Switch id="shakespeare" defaultChecked />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-[#E0A458]">Security Settings</h3>

          <div className="flex items-center justify-between">
            <Label htmlFor="encryption" className="flex flex-col space-y-1">
              <span>Encryption</span>
              <span className="font-normal text-sm text-[#acb6c4]">Enable Starfleet-grade encryption</span>
            </Label>
            <Switch id="encryption" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="data-retention" className="flex flex-col space-y-1">
              <span>Data Retention</span>
              <span className="font-normal text-sm text-[#acb6c4]">Store advice in ship&apos;s computer</span>
            </Label>
            <Switch id="data-retention" />
          </div>
        </div>
      </div>
    </div>
  )
}
