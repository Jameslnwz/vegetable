"use client";

import { useId, useState, type CSSProperties } from "react";

// ชิ้นกระดาษตัดรูปส่วนต่างๆ ของผักตบชวา ใช้ประดับปก หัวบท และการ์ด
// สีเปลี่ยนได้ผ่านตัวแปร --a --b --c --d (ค่าเริ่มต้นอยู่ในแต่ละรูป)

export type PaperKind =
  | "leaf"
  | "float"
  | "float-water"
  | "blossom"
  | "spike"
  | "stolon"
  | "drop"
  | "sun"
  | "sprout"
  | "seeds";

const VIEW: Record<PaperKind, string> = {
  leaf: "0 0 100 100",
  float: "0 0 60 100",
  "float-water": "0 0 60 100",
  blossom: "0 0 100 100",
  spike: "0 0 120 200",
  stolon: "0 0 220 70",
  drop: "0 0 100 100",
  sun: "0 0 100 100",
  sprout: "0 0 100 100",
  seeds: "0 0 100 60",
};

const PETAL = "M50 50 C 33 44 28 16 50 6 C 72 16 67 44 50 50 Z";
const FLOAT = "M30 4 C 45 7 54 31 54 58 C 54 84 44 98 30 98 C 16 98 6 84 6 58 C 6 31 15 7 30 4 Z";

function Blossom({ x = 50, y = 50, s = 1 }: { x?: number; y?: number; s?: number }) {
  return (
    <g transform={`translate(${x - 50 * s} ${y - 50 * s}) scale(${s})`}>
      {[0, 60, 120, 180, 240, 300].map((a, i) => (
        <path key={a} d={PETAL} transform={`rotate(${a} 50 50)`} fill={i % 2 ? "var(--b, var(--shape-petal-2))" : "var(--a, var(--shape-petal))"} />
      ))}
      <ellipse cx="50" cy="27" rx="6.5" ry="10" fill="var(--c, var(--shape-eye))" />
      <circle cx="50" cy="31" r="3" fill="var(--d, var(--shape-heart))" />
      <circle cx="50" cy="50" r="6" fill="var(--d, var(--shape-heart))" />
    </g>
  );
}

function Leaf({ x = 0, y = 0, s = 1, rot = 0 }: { x?: number; y?: number; s?: number; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot} ${50 * s} ${50 * s}) scale(${s})`}>
      <path d="M50 8 C 76 8 94 28 93 52 C 92 77 72 94 49 93 C 25 92 7 74 8 50 C 9 26 25 8 50 8 Z" fill="var(--a, var(--shape-leaf))" />
      <path d="M50 8 C 76 8 94 28 93 52 C 92 77 72 94 49 93 C 55 70 57 31 50 8 Z" fill="var(--b, var(--shape-leaf-2))" />
    </g>
  );
}

function Shape({ kind, uid }: { kind: PaperKind; uid: string }) {
  switch (kind) {
    case "leaf":
      return <Leaf />;
    case "float":
      return (
        <g>
          <path d={FLOAT} fill="var(--a, var(--shape-float))" />
          <path d="M30 4 C 45 7 54 31 54 58 C 54 84 44 98 30 98 C 36 80 38 32 30 4 Z" fill="var(--b, var(--shape-float-2))" />
          {[
            [22, 40, 4],
            [30, 56, 5],
            [20, 66, 3.5],
            [36, 74, 3],
          ].map(([cx, cy, r]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="#fff" opacity="0.55" />
          ))}
        </g>
      );
    case "float-water":
      return (
        <g>
          <defs>
            <clipPath id={`clip-${uid}`}>
              <path d={FLOAT} />
            </clipPath>
          </defs>
          <path d={FLOAT} fill="var(--b, #ffffff)" />
          <g clipPath={`url(#clip-${uid})`}>
            <rect x="0" y="13.4" width="60" height="90" fill="var(--a, var(--shape-water-2))" />
            <path d="M0 13.4 Q 8 9 15 13.4 T 30 13.4 T 45 13.4 T 60 13.4 V 18 H 0 Z" fill="var(--c, var(--shape-water-1))" />
          </g>
          <path d={FLOAT} fill="none" stroke="var(--d, var(--ink))" strokeWidth="3" />
        </g>
      );
    case "blossom":
      return <Blossom />;
    case "spike":
      return (
        <g>
          <path d="M62 196 C 66 150 58 110 62 66" fill="none" stroke="var(--e, var(--shape-stem))" strokeWidth="8" strokeLinecap="round" />
          <Blossom x={60} y={38} s={0.62} />
          <Blossom x={86} y={78} s={0.52} />
          <Blossom x={36} y={92} s={0.5} />
          <Blossom x={74} y={122} s={0.42} />
        </g>
      );
    case "stolon":
      return (
        <g>
          <path d="M8 46 C 50 14 92 60 136 34 S 186 20 196 28" fill="none" stroke="var(--a, var(--shape-stolon))" strokeWidth="13" strokeLinecap="round" />
          <Leaf x={176} y={2} s={0.36} rot={-20} />
        </g>
      );
    case "drop":
      return (
        <g>
          <path d="M50 6 C 50 6 86 46 86 64 A 36 36 0 0 1 14 64 C 14 46 50 6 50 6 Z" fill="var(--a, var(--aqua))" />
          <path d="M50 6 C 50 6 86 46 86 64 A 36 36 0 0 1 50 100 C 58 80 62 40 50 6 Z" fill="var(--b, var(--shape-float-2))" />
        </g>
      );
    case "sun": {
      const pts = Array.from({ length: 24 }, (_, i) => {
        const a = (i / 24) * Math.PI * 2;
        const r = i % 2 ? 40 : 46;
        return `${(50 + Math.cos(a) * r).toFixed(1)} ${(50 + Math.sin(a) * r).toFixed(1)}`;
      });
      return (
        <g>
          <path d={`M${pts.join(" L")} Z`} fill="var(--a, var(--sun))" strokeLinejoin="round" />
          <circle cx="50" cy="50" r="24" fill="var(--b, #ffe680)" />
        </g>
      );
    }
    case "sprout":
      return (
        <g>
          <path d="M50 96 C 50 76 50 62 50 48" stroke="var(--e, var(--shape-stem))" strokeWidth="7" strokeLinecap="round" fill="none" />
          <path d="M50 56 C 46 30 24 22 8 26 C 10 46 30 60 50 56 Z" fill="var(--a, var(--shape-leaf))" />
          <path d="M50 48 C 56 22 78 12 94 16 C 92 38 72 52 50 48 Z" fill="var(--b, var(--shape-leaf-2))" />
        </g>
      );
    case "seeds":
      return (
        <g fill="var(--a, var(--shape-fruit))">
          {[
            [14, 34, -20],
            [34, 22, 10],
            [52, 38, 30],
            [70, 20, -10],
            [86, 36, 15],
          ].map(([x, y, r]) => (
            <ellipse key={`${x}`} cx={x} cy={y} rx="6" ry="11" transform={`rotate(${r} ${x} ${y})`} />
          ))}
        </g>
      );
  }
}

export default function Paper({
  kind,
  className = "",
  style,
  rotate = 0,
  poke = false,
  flat = false,
}: {
  kind: PaperKind;
  className?: string;
  style?: CSSProperties;
  rotate?: number;
  poke?: boolean;
  flat?: boolean;
}) {
  const [boing, setBoing] = useState(false);
  const uid = useId().replace(/:/g, "");
  return (
    <span
      aria-hidden="true"
      className={`paper ${poke ? "poke" : ""} ${flat ? "flat" : ""} ${boing ? "boing" : ""} ${className}`}
      style={{ ["--r" as string]: `${rotate}deg`, ...style }}
      onPointerDown={poke ? () => setBoing(true) : undefined}
      onAnimationEnd={() => setBoing(false)}
    >
      <svg viewBox={VIEW[kind]} className="block h-auto w-full overflow-visible">
        <Shape kind={kind} uid={uid} />
      </svg>
    </span>
  );
}

export function Sticker({
  children,
  tone = "white",
  rotate = -4,
  className = "",
}: {
  children: string;
  tone?: "white" | "sun" | "pink" | "lime" | "violet";
  rotate?: number;
  className?: string;
}) {
  const TONE = {
    white: "bg-white text-ink",
    sun: "bg-sun text-ink",
    pink: "bg-pink text-ink",
    lime: "bg-lime text-ink",
    violet: "bg-violet text-white",
  } as const;
  return (
    <span aria-hidden="true" className={`sticker ${TONE[tone]} ${className}`} style={{ ["--r" as string]: `${rotate}deg` }}>
      {children}
    </span>
  );
}
