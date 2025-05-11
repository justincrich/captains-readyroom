"use client";

import { useRef, useEffect } from "react";
import { useSettings } from "@/hooks/useSettings";

interface StarfieldBackgroundProps {
  displayMode: "standard" | "night";
  borgMode?: boolean;
}

export function StarfieldBackground({
  displayMode,
  borgMode = false,
}: StarfieldBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { settings } = useSettings();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create stars
    const stars: { x: number; y: number; radius: number; speed: number }[] = [];
    const starCount = Math.floor((canvas.width * canvas.height) / 2000);

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        speed: Math.random() * 0.05,
      });
    }

    // For Borg mode, add grid lines
    const borgGridLines: { x1: number; y1: number; x2: number; y2: number }[] =
      [];
    if (borgMode) {
      // Horizontal lines
      const gridSpacing = 100;
      for (let y = 0; y < canvas.height; y += gridSpacing) {
        borgGridLines.push({
          x1: 0,
          y1: y,
          x2: canvas.width,
          y2: y,
        });
      }

      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSpacing) {
        borgGridLines.push({
          x1: x,
          y1: 0,
          x2: x,
          y2: canvas.height,
        });
      }
    }

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set colors based on display mode and borg mode
      const starColor = borgMode
        ? "rgba(0, 255, 0, 0.7)"
        : displayMode === "standard"
        ? "rgba(255, 255, 255, 0.8)"
        : "rgba(172, 182, 196, 0.6)";

      // Draw Borg grid lines
      if (borgMode) {
        ctx.strokeStyle = "rgba(0, 255, 0, 0.15)";
        ctx.lineWidth = 1;

        borgGridLines.forEach((line) => {
          ctx.beginPath();
          ctx.moveTo(line.x1, line.y1);
          ctx.lineTo(line.x2, line.y2);
          ctx.stroke();
        });
      }

      // Calculate speed multiplier based on animation speed setting
      // When animation speed is 0, stars barely move; when 100, they move at full speed
      const speedMultiplier = settings.animationSpeed / 100;

      // Draw stars
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = starColor;
        ctx.fill();

        // Move stars with speed adjusted by the multiplier
        star.y += star.speed * speedMultiplier;

        // Reset stars that go off screen
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [displayMode, settings.animationSpeed, borgMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
}
