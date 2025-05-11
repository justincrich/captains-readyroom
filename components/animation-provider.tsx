"use client";

import { ReactNode, useEffect } from "react";
import { useSettings } from "@/hooks/useSettings";

interface AnimationProviderProps {
  children: ReactNode;
}

export function AnimationProvider({ children }: AnimationProviderProps) {
  const { settings } = useSettings();

  useEffect(() => {
    // Convert the animation speed (0-100) to a duration (faster = shorter duration)
    // Using an inverse scale where 100 speed = 0.1s and 1 speed = 1s
    const duration = 1.1 - settings.animationSpeed / 100;

    // Set the CSS variable
    document.documentElement.style.setProperty(
      "--animation-duration",
      `${duration}s`
    );
  }, [settings.animationSpeed]);

  return <>{children}</>;
}
