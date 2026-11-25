"use client";

import { useEffect, useState } from "react";
import { cloneCaptions } from "@/content/plant";
import { Icon, PillButton } from "./ui";

const END_DAY = 240;
const COLS = 24;
const ROWS = 12;
const CELLS = COLS * ROWS;
const FINAL = 655360;

// ตำแหน่งแบบสุ่มคงที่ ให้แพผักตบโตออกจากจุดเริ่ม 10 จุดแบบเป็นกลุ่ม
function buildOrder() {
  const seeds = [
    [3, 3], [8, 7], [14, 2], [19, 8], [5, 9], [11, 4], [21, 3], [16, 10], [2, 6], [9, 1],
  ];
  const dist = (c: number, r: number) =>
    Math.min(...seeds.map(([sc, sr]) => Math.hypot(c - sc, (r - sr) * 1.6)));
  const cells: { c: number; r: number; d: number }[] = [];
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++) cells.push({ c, r, d: dist(c, r) + ((c * 7 + r * 13) % 5) * 0.15 });
  return cells.sort((a, b) => a.d - b.d);
}

const ORDER = buildOrder();

export default function CloneGrowth() {
  const [day, setDay] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    if (day >= END_DAY) {
      const stop = window.setTimeout(() => setPlaying(false), 0);
      return () => window.clearTimeout(stop);
    }
    const id = window.setTimeout(() => setDay((d) => Math.min(END_DAY, d + 1)), 45);
    return () => window.clearTimeout(id);
  }, [playing, day]);

  // เพิ่มเป็นสองเท่าทุก 15 วัน นับเป็นขั้น
  const count = 10 * 2 ** Math.floor(day / 15);
  const filled = Math.max(1, Math.round((CELLS * count) / FINAL));
  const caption = [...cloneCaptions].reverse().find((c) => day >= c.day) ?? cloneCaptions[0];
  const months = Math.floor(day / 30);
  const rest = day % 30;

  const toggle = () => {
    if (day >= END_DAY) setDay(0);
    setPlaying((p) => !p);
  };

  return (
    <div className="rounded-2xl border border-line bg-paper-deep p-4 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <dl className="flex gap-8">
          <div>
            <dt className="text-base text-ink-soft">ผ่านไป</dt>
            <dd className="tabular text-3xl font-bold text-ink">
              {day < 30 ? `${day} วัน` : `${months} เดือน${rest ? ` ${rest} วัน` : ""}`}
            </dd>
          </div>
          <div>
            <dt className="text-base text-ink-soft">จำนวนต้น</dt>
            <dd className="tabular text-3xl font-bold text-violet">{count.toLocaleString("th-TH")}</dd>
          </div>
        </dl>
        <div className="flex gap-2">
          <PillButton onClick={toggle} tone="solid">
            <Icon name={playing ? "pause" : "play"} />
            {playing ? "หยุด" : day >= END_DAY ? "เล่นอีกครั้ง" : day > 0 ? "เล่นต่อ" : "เล่นพร้อมคำบรรยาย"}
          </PillButton>
          <PillButton
            onClick={() => {
              setPlaying(false);
              setDay(0);
            }}
            disabled={day === 0}
            label="เริ่มใหม่"
          >
            <Icon name="reset" />
          </PillButton>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${COLS * 20} ${ROWS * 20}`}
        className="mt-5 block w-full rounded-xl bg-teal-wash"
        role="img"
        aria-label={`บ่อจำลอง ผักตบปกคลุม ${Math.round((filled / CELLS) * 100)} เปอร์เซ็นต์ของผิวน้ำ`}
      >
        {ORDER.slice(0, filled).map(({ c, r }) => (
          <g key={`${c}-${r}`} className="clone-cell" transform={`translate(${c * 20 + 10} ${r * 20 + 10})`}>
            <ellipse rx="7" ry="4.5" fill="#7f9f6a" transform="rotate(-30)" />
            <ellipse rx="7" ry="4.5" fill="#6d8f59" transform="rotate(40)" />
          </g>
        ))}
      </svg>

      <label className="mt-4 block">
        <span className="sr-only">เลื่อนดูวันที่</span>
        <input
          type="range"
          min={0}
          max={END_DAY}
          value={day}
          onChange={(e) => {
            setPlaying(false);
            setDay(Number(e.target.value));
          }}
          className="w-full accent-[var(--violet)]"
        />
      </label>

      <p aria-live="polite" className="mt-3 min-h-[3.5em] text-lg text-ink">
        {caption.text}
      </p>
      <p className="mt-2 text-base text-ink-soft">
        จำลองจากผักตบ 10 ต้น เพิ่มเป็นสองเท่าทุก 15 วัน ครบ 8 เดือนได้ 655,360 ต้น (Penfound &amp; Earle, 1948)
      </p>
    </div>
  );
}
