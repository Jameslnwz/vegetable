"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { cloneCaptions } from "@/content/plant";
import { Icon, PillButton } from "./ui";

const END_DAY = 240;
const COLS = 24;
const ROWS = 12;
const CELLS = COLS * ROWS;
const FINAL = 655360;

// แบบจำลอง: เริ่ม 10 ต้น เพิ่มเป็น 2 เท่าทุก 15 วัน (Penfound & Earle, 1948)
const countAt = (day: number) => 10 * 2 ** Math.floor(day / 15);

// ลำดับช่องในบ่อ: แพผักตบโตออกจากจุดเริ่ม 10 จุดแบบเป็นกลุ่ม
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

  const count = countAt(day);
  const filled = Math.max(1, Math.round((CELLS * count) / FINAL));
  const caption = [...cloneCaptions].reverse().find((c) => day >= c.day) ?? cloneCaptions[0];
  const months = Math.floor(day / 30);
  const rest = day % 30;

  const toggle = () => {
    if (day >= END_DAY) setDay(0);
    setPlaying((p) => !p);
  };

  return (
    <div className="rounded-[1.75rem] bg-paper-deep p-4 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <dl className="flex gap-10">
          <div>
            <dt className="text-sm font-medium text-ink-soft">ผ่านไป</dt>
            <dd className="tabular text-3xl font-bold text-ink">
              {day < 30 ? `${day} วัน` : `${months} เดือน${rest ? ` ${rest} วัน` : ""}`}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-ink-soft">จำนวนต้น</dt>
            <dd className="tabular text-3xl font-bold text-green-ink">{count.toLocaleString("th-TH")}</dd>
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

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <figure>
          <svg
            viewBox={`0 0 ${COLS * 20} ${ROWS * 20}`}
            className="block w-full rounded-2xl bg-[var(--shape-water-1)]"
            role="img"
            aria-label={`บ่อจำลอง ผักตบปกคลุม ${Math.round((filled / CELLS) * 100)} เปอร์เซ็นต์ของผิวน้ำ`}
          >
            {ORDER.slice(0, filled).map(({ c, r }, i) => (
              <g key={`${c}-${r}`} className="clone-cell" transform={`translate(${c * 20 + 10} ${r * 20 + 10}) rotate(${(i * 47) % 360})`}>
                <g>
                  <circle cx="-3.5" cy="-1.5" r="5.2" fill={i % 2 ? "var(--shape-leaf)" : "var(--shape-leaf-deep)"} />
                  <circle cx="3.5" cy="-1.5" r="5.2" fill={i % 2 ? "var(--shape-leaf-2)" : "var(--shape-leaf)"} />
                  <circle cx="0" cy="3.5" r="4.6" fill="var(--shape-float)" />
                  {i % 9 === 4 && <circle cx="0" cy="-2" r="2.6" fill="var(--shape-petal-2)" />}
                </g>
              </g>
            ))}
          </svg>
          <figcaption className="mt-2 text-sm text-ink-soft">บ่อจำลอง: ผิวน้ำที่ถูกปกคลุม</figcaption>
        </figure>
        <GrowthChart day={day} />
      </div>

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
          className="w-full"
        />
      </label>

      <p aria-live="polite" className="mt-2 min-h-[3.6em] text-lg text-ink">
        {caption.text}
      </p>
      <p className="mt-2 text-sm text-ink-soft">
        จำลองจากผักตบ 10 ต้น เพิ่มเป็นสองเท่าทุก 15 วัน ครบ 8 เดือนได้ 655,360 ต้น (Penfound &amp; Earle, 1948)
      </p>
    </div>
  );
}

// ---------- กราฟเส้น: จำนวนต้นตามเวลา ----------
const W = 600;
const H = 300;
const M = { l: 58, r: 20, t: 18, b: 40 };
const Y_MAX = 700000;
const xOf = (d: number) => M.l + (d / END_DAY) * (W - M.l - M.r);
const yOf = (v: number) => H - M.b - (v / Y_MAX) * (H - M.t - M.b);
const Y_TICKS = [0, 200000, 400000, 600000];
const yTickLabel = (v: number) => (v === 0 ? "0" : `${v / 100000} แสน`);

function pathTo(lastDay: number) {
  let d = `M${xOf(0)} ${yOf(countAt(0))}`;
  for (let i = 1; i <= lastDay; i++) d += ` L${xOf(i).toFixed(1)} ${yOf(countAt(i)).toFixed(1)}`;
  return d;
}

const FULL_PATH = pathTo(END_DAY);

function GrowthChart({ day }: { day: number }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hover, setHover] = useState<number | null>(null);

  const onMove = (e: PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    const ctm = svg?.getScreenCTM();
    if (!svg || !ctm) return;
    const x = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse()).x;
    const d = Math.round(((x - M.l) / (W - M.l - M.r)) * END_DAY);
    setHover(Math.max(0, Math.min(END_DAY, d)));
  };

  const hx = hover !== null ? xOf(hover) : 0;
  const hv = hover !== null ? countAt(hover) : 0;

  return (
    <figure className="relative">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="block w-full touch-none"
        role="img"
        aria-label={`กราฟเส้นจำนวนต้นผักตบตามเวลา จาก 10 ต้นที่วันแรก เป็น 655,360 ต้นในวันที่ 240 ตอนนี้วันที่ ${day} มี ${countAt(day).toLocaleString("th-TH")} ต้น`}
        onPointerMove={onMove}
        onPointerDown={onMove}
        onPointerLeave={() => setHover(null)}
      >
        {/* เส้นกริดและแกน: เส้นบาง สีจาง */}
        {Y_TICKS.map((t) => (
          <g key={t}>
            <line x1={M.l} x2={W - M.r} y1={yOf(t)} y2={yOf(t)} stroke="var(--line)" strokeWidth="1" />
            <text x={M.l - 8} y={yOf(t) + 4} textAnchor="end" fontSize="12" fill="var(--ink-soft)" className="tabular">
              {yTickLabel(t)}
            </text>
          </g>
        ))}
        {Array.from({ length: 9 }, (_, m) => (
          <text key={m} x={xOf(m * 30)} y={H - M.b + 20} textAnchor="middle" fontSize="12" fill="var(--ink-soft)">
            {m === 0 ? "เริ่ม" : `${m} ด.`}
          </text>
        ))}

        {/* ทั้งเส้น (อนาคต) จางไว้ เส้นที่ผ่านมาแล้วเข้ม */}
        <path d={FULL_PATH} fill="none" stroke="var(--violet)" strokeOpacity="0.22" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" pathLength={1} className="chart-line" />
        <path d={`${pathTo(day)} L${xOf(day)} ${yOf(0)} L${xOf(0)} ${yOf(0)} Z`} fill="var(--violet)" fillOpacity="0.1" />
        <path d={pathTo(day)} fill="none" stroke="var(--violet)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx={xOf(day)} cy={yOf(countAt(day))} r="5" fill="var(--violet)" stroke="var(--paper)" strokeWidth="2" />

        {/* ป้ายค่าปลายเส้น */}
        <text x={W - M.r} y={yOf(FINAL) - 10} textAnchor="end" fontSize="13" fontWeight="600" fill="var(--ink)" className="tabular">
          655,360 ต้น
        </text>

        {/* เส้นตามเมาส์ */}
        {hover !== null && (
          <g pointerEvents="none">
            <line x1={hx} x2={hx} y1={M.t} y2={H - M.b} stroke="var(--ink)" strokeOpacity="0.35" strokeWidth="1" />
            <circle cx={hx} cy={yOf(hv)} r="5" fill="var(--violet)" stroke="var(--paper)" strokeWidth="2" />
          </g>
        )}
      </svg>
      {hover !== null && (
        <div
          className="pointer-events-none absolute top-2 rounded-xl bg-ink px-3 py-2 text-sm text-paper shadow-lg"
          style={{
            left: `${(hx / W) * 100}%`,
            transform: `translateX(${hx > W * 0.6 ? "calc(-100% - 12px)" : "12px"})`,
          }}
          role="status"
        >
          <span className="block">วันที่ {hover}</span>
          <span className="tabular block font-semibold">{hv.toLocaleString("th-TH")} ต้น</span>
        </div>
      )}
      <figcaption className="mt-2 text-sm text-ink-soft">
        กราฟ: จำนวนต้นตามเวลา (แบบจำลอง) ช่วงแรกแทบไม่เพิ่ม แต่เดือนท้าย ๆ พุ่งขึ้นอย่างรวดเร็ว
      </figcaption>
      <details className="mt-2 text-sm">
        <summary className="min-h-11 cursor-pointer py-2 font-medium text-violet">ดูเป็นตาราง</summary>
        <table className="tabular mt-1 w-full max-w-sm text-left">
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="py-1 font-semibold">เวลา</th>
              <th scope="col" className="py-1 text-right font-semibold">จำนวนต้น</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 9 }, (_, m) => (
              <tr key={m} className="border-b border-line/60">
                <td className="py-1">{m === 0 ? "เริ่มต้น" : `${m} เดือน`}</td>
                <td className="py-1 text-right">{countAt(m * 30).toLocaleString("th-TH")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}
