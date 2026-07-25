"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const STAGES = ["Dados", "Inteligência", "Decisões", "Aprendizado", "Crescimento"];
const RADIUS = 160;
const CENTER = 200;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function GrowthCycle() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((prev) => (prev + 1) % STAGES.length), 1700);
    return () => clearInterval(id);
  }, []);

  const progress = (active + 1) / STAGES.length;

  return (
    <div className="flex flex-col items-center">
      <div className="relative aspect-square w-full max-w-[420px] rounded-full border border-border/10 bg-[radial-gradient(circle_at_50%_50%,rgb(var(--card))_0%,rgb(var(--background))_72%)]">
        <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="cycleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className="[stop-color:rgb(var(--primary))]" />
              <stop offset="100%" className="[stop-color:rgb(var(--primary-bright))]" />
            </linearGradient>
          </defs>
          <circle cx={CENTER} cy={CENTER} r={RADIUS} className="fill-none stroke-border/10" strokeWidth={1} />
          <motion.circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke="url(#cycleGradient)"
            strokeWidth={2}
            strokeLinecap="round"
            style={{ transformOrigin: "50% 50%", rotate: -90 }}
            strokeDasharray={CIRCUMFERENCE}
            animate={{ strokeDashoffset: CIRCUMFERENCE * (1 - progress) }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </svg>

        <div className="absolute left-1/2 top-1/2 w-[150px] -translate-x-1/2 -translate-y-1/2 text-center">
          <motion.span
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="block font-display text-3xl text-primary-bright"
          >
            {String(active + 1).padStart(2, "0")}
          </motion.span>
          <motion.span
            key={`label-${active}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-1.5 block font-mono text-[0.68rem] uppercase tracking-wider text-foreground/40"
          >
            {STAGES[active]}
          </motion.span>
        </div>

        {STAGES.map((label, i) => {
          const angle = (Math.PI * 2 * i) / STAGES.length - Math.PI / 2;
          const x = CENTER + RADIUS * Math.cos(angle);
          const y = CENTER + RADIUS * Math.sin(angle);
          const isActive = i === active;
          return (
            <div
              key={label}
              className="absolute w-24 -translate-x-1/2 -translate-y-1/2 text-center"
              style={{ left: `${(x / 400) * 100}%`, top: `${(y / 400) * 100}%` }}
            >
              <motion.div
                animate={{
                  scale: isActive ? 1.3 : 1,
                  backgroundColor: isActive ? "rgb(var(--primary-bright))" : "rgb(var(--background-soft))",
                  borderColor: isActive ? "rgb(var(--primary-bright))" : "rgba(var(--border),0.3)",
                  boxShadow: isActive ? "0 0 16px 2px rgba(210,173,117,0.6)" : "0 0 0 0 rgba(0,0,0,0)",
                }}
                transition={{ duration: 0.35 }}
                className="mx-auto mb-2 h-[11px] w-[11px] rounded-full border-[1.5px]"
              />
              <span className={`font-mono text-[10.5px] transition-colors duration-300 ${isActive ? "text-primary-bright" : "text-foreground/40"}`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
      <p className="mt-6 font-mono text-[0.72rem] tracking-wide text-foreground/40">
        o ciclo que sustenta toda a arquitetura
      </p>
    </div>
  );
}
