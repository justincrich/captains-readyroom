"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSettings } from "@/hooks/useSettings";

interface SettingsPanelProps {
  displayMode: "standard" | "night";
}

export function SettingsPanel({ displayMode }: SettingsPanelProps) {
  const { settings, updateSettings } = useSettings();
  const bgClass =
    displayMode === "standard" ? "bg-[#00082090]" : "bg-[#00000090]";
  const borderClass =
    displayMode === "standard" ? "border-[#5C88C6]" : "border-[#4a6a9e]";

  // Apply Borg-themed styling when Locutus mode is enabled
  const borgTheme = settings.locutusMode;
  const headerBgClass = borgTheme ? "bg-[#1a3a1a]" : "bg-[#5C88C6]";
  const accentColor = borgTheme ? "text-[#00FF00]" : "text-[#E0A458]";
  const contentBgClass = borgTheme
    ? displayMode === "standard"
      ? "bg-[#0a1a0a90]"
      : "bg-[#0a150a90]"
    : bgClass;
  const contentBorderClass = borgTheme ? "border-[#00FF00]" : borderClass;

  return (
    <div
      className={`rounded-lg overflow-hidden border ${contentBorderClass} ${contentBgClass}`}
    >
      <div
        className={`p-4 ${headerBgClass} text-white font-bold flex items-center`}
      >
        <span className={`mr-2 ${accentColor}`}>&#x2022;</span>
        {borgTheme ? "Borg Collective Interface" : "Ship's Computer Settings"}
        <span className={`ml-2 ${accentColor}`}>&#x2022;</span>
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <h3 className={`text-lg font-bold ${accentColor}`}>
            Interface Settings
          </h3>

          <div className="space-y-2">
            <Label
              htmlFor="animation-speed"
              className="flex flex-col space-y-1"
            >
              <span>Animation Speed</span>
              <span className="font-normal text-sm text-[#acb6c4]">
                Adjust interface animation speed
              </span>
            </Label>
            <Slider
              id="animation-speed"
              defaultValue={[settings.animationSpeed]}
              value={[settings.animationSpeed]}
              onValueChange={(value) =>
                updateSettings({ animationSpeed: value[0] })
              }
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className={`text-lg font-bold ${accentColor}`}>
            Advice Settings
          </h3>

          <div className="space-y-2">
            <Label htmlFor="advice-style" className="flex flex-col space-y-1">
              <span>Captain&apos;s Style</span>
              <span className="font-normal text-sm text-[#acb6c4]">
                Select the Captain&apos;s advice style
              </span>
            </Label>
            <Select
              value={settings.adviceStyle}
              onValueChange={(value) =>
                updateSettings({
                  adviceStyle: value as
                    | "diplomatic"
                    | "philosophical"
                    | "direct"
                    | "inspirational",
                })
              }
              disabled={settings.locutusMode}
            >
              <SelectTrigger
                id="advice-style"
                className={`w-full ${contentBgClass} ${
                  borgTheme ? "border-[#00FF00]" : "border-[#5C88C6]"
                } ${
                  settings.locutusMode ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent
                className={`${contentBgClass} ${
                  borgTheme ? "border-[#00FF00]" : "border-[#5C88C6]"
                } text-white`}
              >
                <SelectItem
                  value="diplomatic"
                  className="focus:bg-opacity-70 focus:text-black cursor-pointer"
                >
                  Diplomatic
                </SelectItem>
                <SelectItem
                  value="philosophical"
                  className="focus:bg-opacity-70 focus:text-black cursor-pointer"
                >
                  Philosophical
                </SelectItem>
                <SelectItem
                  value="direct"
                  className="focus:bg-opacity-70 focus:text-black cursor-pointer"
                >
                  Direct
                </SelectItem>
                <SelectItem
                  value="inspirational"
                  className="focus:bg-opacity-70 focus:text-black cursor-pointer"
                >
                  Inspirational
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="shakespeare" className="flex flex-col space-y-1">
              <span>Shakespeare Mode</span>
              <span className="font-normal text-sm text-[#acb6c4]">
                Occasionally quote Shakespeare
              </span>
            </Label>
            <Switch
              id="shakespeare"
              checked={settings.shakespeareMode && !settings.locutusMode}
              onCheckedChange={(checked) =>
                updateSettings({ shakespeareMode: checked })
              }
              disabled={settings.locutusMode}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="locutus" className="flex flex-col space-y-1">
              <span className={borgTheme ? "text-[#00FF00] font-bold" : ""}>
                Locutus Mode
              </span>
              <span className="font-normal text-sm text-[#acb6c4]">
                Respond as Locutus of Borg
              </span>
            </Label>
            <Switch
              id="locutus"
              checked={settings.locutusMode}
              onCheckedChange={(checked) =>
                updateSettings({
                  locutusMode: checked,
                  // Disable all other advice settings when Locutus mode is enabled
                  shakespeareMode: false,
                })
              }
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className={`text-lg font-bold ${accentColor}`}>
            Security Settings
          </h3>

          <div className="flex items-center justify-between">
            <Label htmlFor="encryption" className="flex flex-col space-y-1">
              <span>Encryption</span>
              <span className="font-normal text-sm text-[#acb6c4]">
                Enable Starfleet-grade encryption
              </span>
            </Label>
            <Switch
              id="encryption"
              checked={settings.encryption}
              onCheckedChange={(checked) =>
                updateSettings({ encryption: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="data-retention" className="flex flex-col space-y-1">
              <span>Data Retention</span>
              <span className="font-normal text-sm text-[#acb6c4]">
                Store advice in ship&apos;s computer
              </span>
            </Label>
            <Switch
              id="data-retention"
              checked={settings.dataRetention}
              onCheckedChange={(checked) =>
                updateSettings({ dataRetention: checked })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
