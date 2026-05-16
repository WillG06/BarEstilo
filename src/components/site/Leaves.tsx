import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Decorative sage-green line-art leaves.
 * Pure SVG (no three.js / WebGL) so it works on the worker SSR runtime.
 */
export function Leaves({
  className = "",
  variant = "sprig",
}: {
  className?: string;
  variant?: "sprig" | "branch" | "fern";
}) {
  const paths: Record<string, ReactNode> = {
    sprig: (
      <>
        <path d="M100 10 C 100 80, 100 160, 100 230" />
        <path d="M100 50 C 60 40, 35 55, 25 80 C 60 85, 90 75, 100 60" />
        <path d="M100 95 C 140 85, 165 100, 175 125 C 140 130, 110 120, 100 105" />
        <path d="M100 145 C 65 138, 45 152, 38 175 C 70 178, 95 168, 100 155" />
        <path d="M100 195 C 135 188, 158 200, 165 220 C 135 224, 110 215, 100 205" />
      </>
    ),
    branch: (
      <>
        <path d="M10 200 C 80 180, 150 150, 220 120" />
        <path d="M50 188 C 50 168, 38 150, 18 148" />
        <path d="M95 173 C 100 153, 92 132, 70 128" />
        <path d="M140 158 C 148 138, 142 116, 120 110" />
        <path d="M185 138 C 195 118, 192 96, 170 88" />
      </>
    ),
    fern: (
      <>
        <path d="M120 240 C 120 180, 130 110, 140 30" />
        <path d="M132 200 C 100 196, 80 180, 70 158" />
        <path d="M134 175 C 162 172, 180 158, 188 138" />
        <path d="M136 145 C 108 141, 92 127, 86 108" />
        <path d="M138 115 C 162 113, 178 100, 184 82" />
        <path d="M139 85 C 118 82, 106 70, 102 54" />
      </>
    ),
  };
  return (
    <motion.svg
      viewBox="0 0 240 260"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4 }}
      aria-hidden
    >
      <g className="animate-leafdrift">{paths[variant]}</g>
    </motion.svg>
  );
}