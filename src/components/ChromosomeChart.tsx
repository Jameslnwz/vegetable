"use client";

import { useState } from "react";

// กราฟแท่งแนวนอน: จำนวนโครโมโซมของแต่ละระดับ (ตารางด้านข้างคือมุมมองตาราง)
const ROWS = [
  { level: "n", count: 16, who: "เซลล์สืบพันธุ์ เช่น sperm และเซลล์ไข่" },
  { level: "2n", count: 32, who: "ต้นผักตบชวา และ zygote" },
  { level: "3n", count: 48, who: "endosperm อาหารสะสมในเมล็ด" },
];

const W = 520;
const ROW_H = 64;
const M = { l: 56, r: 64, t: 8, b: 30 };
const H = M.t + ROWS.length * ROW_H + M.b;
const MAX = 48;
const BAR = 22;
const xOf = (v: number) => M.l + (v / MAX) * (W - M.l - M.r);

export default function ChromosomeChart() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <figure>
      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full" role="img" aria-label="กราฟแท่งจำนวนโครโมโซม n เท่ากับ 16, 2n เท่ากับ 32, 3n เท่ากับ 48">
        {[0, 16, 32, 48].map((t) => (
          <g key={t}>
            <line x1={xOf(t)} x2={xOf(t)} y1={M.t} y2={H - M.b} stroke="var(--line)" strokeWidth="1" />
            <text x={xOf(t)} y={H - M.b + 20} textAnchor="middle" fontSize="13" fill="var(--ink-soft)" className="tabular">
              {t}
            </text>
          </g>
        ))}
        {ROWS.map((r, i) => {
          const y = M.t + i * ROW_H + (ROW_H - BAR) / 2;
          const x1 = xOf(0);
          const x2 = xOf(r.count);
          const on = hover === i;
          return (
            <g
              key={r.level}
              onPointerEnter={() => setHover(i)}
              onPointerLeave={() => setHover(null)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              tabIndex={0}
              role="img"
              aria-label={`${r.level} มี ${r.count} โครโมโซม: ${r.who}`}
              className="outline-none"
            >
              {/* พื้นที่สำหรับ hover ใหญ่กว่าแท่ง */}
              <rect x={0} y={M.t + i * ROW_H} width={W} height={ROW_H} fill="transparent" />
              <text x={M.l - 12} y={y + BAR / 2 + 6} textAnchor="end" fontSize="17" fontWeight="700" fill="var(--ink)">
                {r.level}
              </text>
              {/* ปลายแท่งมนด้านข้อมูล ฐานเหลี่ยม */}
              <path
                d={`M${x1} ${y} H${x2 - 4} Q${x2} ${y} ${x2} ${y + 4} V${y + BAR - 4} Q${x2} ${y + BAR} ${x2 - 4} ${y + BAR} H${x1} Z`}
                fill="var(--violet)"
                fillOpacity={hover === null || on ? 1 : 0.35}
                className="chart-bar"
                style={{ ["--i" as string]: i }}
              />
              <text x={x2 + 8} y={y + BAR / 2 + 5} fontSize="15" fontWeight="700" fill="var(--ink)" className="tabular">
                {r.count}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-1 min-h-[3em] text-base text-ink-soft" aria-live="polite">
        {hover === null ? "ชี้หรือแตะที่แท่งเพื่อดูว่าเป็นเซลล์อะไร" : `${ROWS[hover].level} = ${ROWS[hover].count}: ${ROWS[hover].who}`}
      </figcaption>
    </figure>
  );
}
