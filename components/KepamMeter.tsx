"use client";

import { useMotionValueEvent, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const R = 80;
const CX = 100;
const CY = 100;
const ARC = Math.PI * R;
const ARC_PATH = `M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`;

export default function KepamMeter({ score }: { score: number }) {
  const spring = useSpring(0, { stiffness: 80, damping: 14, mass: 0.8 });
  const [v, setV] = useState(0);
  useMotionValueEvent(spring, "change", setV);
  useEffect(() => {
    spring.set(score);
  }, [score, spring]);

  const label = score > 80 ? "MAXIMUM KEPAM" : score > 50 ? "getting kepam…" : "kepam level";

  return (
    <div className="mx-auto w-full max-w-xs" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={score} aria-label="Kepam score">
      <svg viewBox="0 0 200 108" className="w-full overflow-visible">
        <defs>
          <linearGradient id="kepam-grad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        <path d={ARC_PATH} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="14" strokeLinecap="round" />
        <path
          d={ARC_PATH}
          fill="none"
          stroke="url(#kepam-grad)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={ARC}
          strokeDashoffset={ARC * (1 - v / 100)}
        />
        <g transform={`rotate(${-90 + v * 1.8} ${CX} ${CY})`}>
          <line x1={CX} y1={CY} x2={CX} y2={CY - R + 18} stroke="white" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx={CX} cy={CY} r="6" fill="white" />
        </g>
      </svg>
      <div className="-mt-2 flex flex-col items-center leading-none">
        <span className="text-5xl font-black tabular-nums tracking-tight">{Math.round(v)}%</span>
        <span className={`mt-1 text-xs uppercase tracking-[0.25em] ${score > 80 ? "animate-pulse text-red-400" : "text-white/60"}`}>
          {label}
        </span>
      </div>
    </div>
  );
}
