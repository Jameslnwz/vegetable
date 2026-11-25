"use client";

import { useState } from "react";
import { morphs, tristylyNote, type Morph } from "@/content/plant";
import { PillButton } from "./ui";

type Level = "high" | "mid" | "low";
const LEVEL_Y: Record<Level, number> = { high: 60, mid: 130, low: 200 };
const LEVEL_COLOR: Record<Level, string> = { high: "#6b4c9a", mid: "#3f7a4a", low: "#b8642a" };
const LEVEL_NAME: Record<Level, string> = { high: "ระดับสูง", mid: "ระดับกลาง", low: "ระดับต่ำ" };
const ORDER: Morph[] = ["L", "M", "S"];

type View = "all" | Morph;

export default function Tristyly() {
  const [view, setView] = useState<View>("all");
  const shown = view === "all" ? ORDER : [view];

  return (
    <div className="rounded-2xl border border-line bg-paper-deep p-4 sm:p-6">
      <div className="flex flex-wrap gap-2" role="group" aria-label="เลือกแบบดอก">
        <PillButton pressed={view === "all"} onClick={() => setView("all")}>
          ทั้ง 3 แบบ
        </PillButton>
        {ORDER.map((m) => (
          <PillButton key={m} pressed={view === m} onClick={() => setView(m)}>
            {morphs[m].name}
          </PillButton>
        ))}
      </div>

      <svg
        viewBox="0 0 600 290"
        className="mt-5 block w-full"
        role="img"
        aria-label="แผนภาพเปรียบเทียบตำแหน่งยอดเกสรเพศเมียและอับเรณูของดอกแต่ละแบบ"
      >
        {(Object.keys(LEVEL_Y) as Level[]).map((lv) => (
          <g key={lv}>
            <line x1="70" x2="590" y1={LEVEL_Y[lv]} y2={LEVEL_Y[lv]} stroke={LEVEL_COLOR[lv]} strokeDasharray="3 6" opacity="0.45" />
            <text x="0" y={LEVEL_Y[lv] + 6} fontSize="21" fill={LEVEL_COLOR[lv]} fontWeight="600">
              {LEVEL_NAME[lv].replace("ระดับ", "")}
            </text>
          </g>
        ))}

        {/* เส้นทางละอองเรณูเมื่อดูทั้ง 3 แบบ */}
        {view === "all" &&
          ORDER.flatMap((from, i) =>
            morphs[from].anthers.map((lv) => {
              const to = ORDER.findIndex((m) => morphs[m].stigma === lv);
              const x1 = colX(i, 3) + 18;
              const x2 = colX(to, 3);
              const y = LEVEL_Y[lv];
              return (
                <path
                  key={`${from}-${lv}`}
                  d={`M${x1} ${y} C ${(x1 + x2) / 2} ${y - 34}, ${(x1 + x2) / 2} ${y - 34}, ${x2} ${y - 8}`}
                  fill="none"
                  stroke={LEVEL_COLOR[lv]}
                  strokeWidth="2"
                  className="pollen-path"
                  markerEnd={`url(#arrow-${lv})`}
                />
              );
            }),
          )}

        <defs>
          {(Object.keys(LEVEL_Y) as Level[]).map((lv) => (
            <marker key={lv} id={`arrow-${lv}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 10 5 0 10z" fill={LEVEL_COLOR[lv]} />
            </marker>
          ))}
        </defs>

        {shown.map((m, i) => (
          <Flower key={m} morph={m} x={colX(i, shown.length)} />
        ))}
      </svg>

      <div aria-live="polite" className="mt-4 space-y-3">
        {view === "all" ? (
          <p className="text-lg text-ink">{tristylyNote}</p>
        ) : (
          <>
            <p className="text-lg">
              <strong className="text-ink">
                {morphs[view].name}: {morphs[view].sub}
              </strong>{" "}
              <span className="ml-1 rounded-full bg-violet-wash px-3 py-0.5 text-base text-violet">{morphs[view].found}</span>
            </p>
            <p className="text-lg text-ink">{morphs[view].text}</p>
          </>
        )}
      </div>
    </div>
  );
}

function colX(i: number, n: number) {
  if (n === 1) return 330;
  return 170 + i * 160;
}

function Flower({ morph, x }: { morph: Morph; x: number }) {
  const m = morphs[morph];
  const sy = LEVEL_Y[m.stigma];
  return (
    <g className="flower-col">
      {/* รังไข่ */}
      <ellipse cx={x} cy="250" rx="22" ry="16" fill="#cfe0c4" stroke="#4d6b3c" strokeWidth="2" />
      {/* ก้านเกสรเพศเมีย */}
      <line x1={x} x2={x} y1="236" y2={sy + 8} stroke="#4d6b3c" strokeWidth="3" />
      {/* ยอดเกสรเพศเมีย */}
      <circle cx={x} cy={sy} r="9" fill="#fff" stroke={LEVEL_COLOR[m.stigma]} strokeWidth="4" />
      {/* อับเรณู 2 ชุด */}
      {m.anthers.map((lv) => (
        <g key={lv}>
          <line x1={x + 4} x2={x + 18} y1="236" y2={LEVEL_Y[lv] + 6} stroke="#8a7a5a" strokeWidth="1.5" />
          <ellipse cx={x + 18} cy={LEVEL_Y[lv]} rx="6" ry="9" fill={LEVEL_COLOR[lv]} />
        </g>
      ))}
      <text x={x} y="284" textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--ink)">
        {m.name}
      </text>
    </g>
  );
}
