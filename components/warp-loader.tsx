"use client";

import React from "react";

interface WarpLoaderProps {
  borgMode?: boolean;
}

export function WarpLoader({ borgMode = false }: WarpLoaderProps) {
  if (borgMode) {
    return <BorgLoader />;
  }
  return <StarfleetLoader />;
}

function StarfleetLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-6">
      {/* Commbadge with signal waves */}
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Radiating signal waves */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border-2 border-[#E0A458]"
            style={{
              width: '100%',
              height: '100%',
              animation: `signalWave 2s ease-out ${i * 0.6}s infinite`,
              opacity: 0,
            }}
          />
        ))}

        {/* Commbadge shape - Starfleet delta */}
        <div className="relative z-10">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            className="drop-shadow-lg"
            style={{ animation: 'commbadgePulse 1.5s ease-in-out infinite' }}
          >
            {/* Outer chevron/arrowhead */}
            <path
              d="M24 4 L44 38 L24 32 L4 38 Z"
              fill="none"
              stroke="#E0A458"
              strokeWidth="2"
              className="opacity-80"
            />
            {/* Inner star shape */}
            <path
              d="M24 10 L36 34 L24 28 L12 34 Z"
              fill="#E0A458"
              className="opacity-60"
              style={{ animation: 'innerGlow 1s ease-in-out infinite alternate' }}
            />
            {/* Central pip */}
            <circle
              cx="24"
              cy="22"
              r="3"
              fill="#E0A458"
              style={{ animation: 'pipBlink 0.8s ease-in-out infinite' }}
            />
          </svg>
        </div>
      </div>

      {/* Channel status display */}
      <div className="w-64 space-y-3">
        {/* Hailing text */}
        <div className="text-center">
          <span
            className="text-[#E0A458] text-sm font-mono tracking-widest"
            style={{ animation: 'textFade 2s ease-in-out infinite' }}
          >
            HAILING CAPTAIN PICARD
          </span>
        </div>

        {/* Subspace channel indicator */}
        <div className="flex items-center justify-center space-x-2">
          <div className="text-[#5C88C6] text-xs font-mono opacity-70">SUBSPACE CHANNEL</div>
          <div className="flex space-x-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-1.5 h-3 bg-[#5C88C6] rounded-sm"
                style={{
                  animation: `channelBar 1s ease-in-out ${i * 0.15}s infinite`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Signal strength bar */}
        <div className="relative h-1.5 bg-[#000820] rounded-full overflow-hidden border border-[#5C88C6]/30">
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#5C88C6] via-[#E0A458] to-[#5C88C6]"
            style={{
              animation: 'signalSweep 1.5s ease-in-out infinite',
              backgroundSize: '200% 100%',
            }}
          />
        </div>
      </div>

      {/* Status indicator */}
      <div className="flex items-center space-x-2">
        <div
          className="w-2 h-2 rounded-full bg-[#E0A458]"
          style={{ animation: 'statusBlink 1s ease-in-out infinite' }}
        />
        <span className="text-[#acb6c4] text-xs font-mono tracking-wide">
          ESTABLISHING SECURE CHANNEL
        </span>
      </div>

      <style jsx>{`
        @keyframes signalWave {
          0% { transform: scale(0.5); opacity: 0.8; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes commbadgePulse {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.05); filter: brightness(1.2); }
        }
        @keyframes innerGlow {
          0% { opacity: 0.4; }
          100% { opacity: 0.8; }
        }
        @keyframes pipBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes textFade {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes channelBar {
          0%, 100% { transform: scaleY(0.5); opacity: 0.4; }
          50% { transform: scaleY(1); opacity: 1; }
        }
        @keyframes signalSweep {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes statusBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}

function BorgLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-6">
      {/* Neural transceiver with hive connection */}
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Hexagonal connection nodes radiating outward */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="absolute w-3 h-3 border border-[#00FF00] bg-[#00FF00]/20"
            style={{
              transform: `rotate(${i * 60}deg) translateY(-40px)`,
              animation: `nodeActivate 1.5s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}

        {/* Central Borg implant */}
        <div className="relative z-10">
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            className="drop-shadow-lg"
          >
            {/* Outer hexagon */}
            <polygon
              points="28,4 50,16 50,40 28,52 6,40 6,16"
              fill="none"
              stroke="#00FF00"
              strokeWidth="2"
              style={{ animation: 'hexPulse 2s ease-in-out infinite' }}
            />
            {/* Inner hexagon */}
            <polygon
              points="28,12 42,20 42,36 28,44 14,36 14,20"
              fill="#00FF00"
              fillOpacity="0.2"
              stroke="#00FF00"
              strokeWidth="1"
              style={{ animation: 'hexPulse 2s ease-in-out 0.5s infinite' }}
            />
            {/* Central eye/sensor */}
            <circle
              cx="28"
              cy="28"
              r="8"
              fill="#001a00"
              stroke="#00FF00"
              strokeWidth="2"
            />
            <circle
              cx="28"
              cy="28"
              r="4"
              fill="#00FF00"
              style={{ animation: 'eyeScan 1s ease-in-out infinite' }}
            />
            {/* Scanning beam */}
            <line
              x1="28"
              y1="28"
              x2="28"
              y2="4"
              stroke="#00FF00"
              strokeWidth="1"
              strokeOpacity="0.5"
              style={{
                transformOrigin: '28px 28px',
                animation: 'beamRotate 2s linear infinite'
              }}
            />
          </svg>
        </div>

        {/* Connection lines to nodes */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 128 128">
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle = (i * 60 - 90) * (Math.PI / 180);
            const x2 = 64 + Math.cos(angle) * 40;
            const y2 = 64 + Math.sin(angle) * 40;
            return (
              <line
                key={i}
                x1="64"
                y1="64"
                x2={x2}
                y2={y2}
                stroke="#00FF00"
                strokeWidth="1"
                strokeOpacity="0.3"
                style={{ animation: `linePulse 1.5s ease-in-out ${i * 0.2}s infinite` }}
              />
            );
          })}
        </svg>
      </div>

      {/* Link status */}
      <div className="w-64 space-y-3">
        {/* Hailing text - Borg style */}
        <div className="text-center relative">
          <span
            className="text-[#00FF00] text-sm font-mono tracking-widest"
            style={{ animation: 'textGlitch 3s ease-in-out infinite' }}
          >
            ESTABLISHING LINK WITH LOCUTUS
          </span>
          <span
            className="absolute inset-0 text-[#00FF00]/20 text-sm font-mono tracking-widest"
            style={{
              animation: 'textGlitch 3s ease-in-out 0.1s infinite',
              transform: 'translateX(1px)',
            }}
          >
            ESTABLISHING LINK WITH LOCUTUS
          </span>
        </div>

        {/* Collective sync indicator */}
        <div className="flex items-center justify-center space-x-2">
          <div className="text-[#00FF00]/70 text-xs font-mono">COLLECTIVE SYNC</div>
          <div className="flex space-x-0.5">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                className="w-1 h-3 bg-[#00FF00]"
                style={{
                  animation: `syncBar 0.8s ease-in-out ${i * 0.1}s infinite alternate`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Neural link progress */}
        <div className="relative h-1.5 bg-[#001a00] overflow-hidden border border-[#00FF00]/30">
          <div
            className="absolute inset-0 bg-[#00FF00]"
            style={{
              animation: 'borgProgress 2s steps(20) infinite',
            }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00FF00] to-transparent opacity-50"
            style={{
              animation: 'borgSweep 1s linear infinite',
            }}
          />
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center space-x-2">
        <div
          className="w-2 h-2 bg-[#00FF00]"
          style={{ animation: 'borgBlink 0.5s ease-in-out infinite alternate' }}
        />
        <span className="text-[#00FF00]/70 text-xs font-mono tracking-wide">
          RESISTANCE IS... PROCESSING
        </span>
      </div>

      <style jsx>{`
        @keyframes nodeActivate {
          0%, 100% { opacity: 0.3; transform: rotate(var(--rotation)) translateY(-40px) scale(1); }
          50% { opacity: 1; transform: rotate(var(--rotation)) translateY(-40px) scale(1.3); }
        }
        @keyframes hexPulse {
          0%, 100% { opacity: 1; stroke-width: 2; }
          50% { opacity: 0.6; stroke-width: 1; }
        }
        @keyframes eyeScan {
          0%, 100% { r: 4; opacity: 1; }
          50% { r: 6; opacity: 0.5; }
        }
        @keyframes beamRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes linePulse {
          0%, 100% { stroke-opacity: 0.2; }
          50% { stroke-opacity: 0.8; }
        }
        @keyframes textGlitch {
          0%, 95%, 100% { opacity: 1; transform: translateX(0); }
          96% { opacity: 0.8; transform: translateX(-2px); }
          97% { opacity: 0.6; transform: translateX(2px); }
          98% { opacity: 0.9; transform: translateX(-1px); }
        }
        @keyframes syncBar {
          0% { opacity: 0.2; height: 6px; }
          100% { opacity: 1; height: 12px; }
        }
        @keyframes borgProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes borgSweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes borgBlink {
          0% { opacity: 0.3; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
