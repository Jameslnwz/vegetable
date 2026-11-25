"use client";

import { useRef, useState, type PointerEvent } from "react";
import { cloneCaptions, cloneScript } from "@/content/plant";
import { seeded } from "./art/defs";
import { Hyacinth } from "./art/Hyacinth";
import { NarrationControls, useNarratedPlayer } from "./NarratedPlayer";

const END_DAY = 240;
const FINAL = 655360;

// แบบจำลอง: เริ่ม 10 ต้น เพิ่มเป็น 2 เท่าทุก 15 วัน (Penfound & Earle, 1948)
const countAt = (day: number) => 10 * 2 ** Math.floor(day / 15);

// ---------- บ่อจำลอง: กอผักตบ 620 กอ แผ่ออกจากจุดตั้งต้น 3 จุด ----------
const POND = "M60 58 C110 18 230 30 300 24 C362 20 394 70 386 120 C380 168 398 214 342 232 C282 252 200 236 140 245 C80 254 22 226 20 172 C18 122 22 88 60 58Z";
const rnd = seeded(42);
const BLADES = Array.from({ length: 160 }, () => {
  const x = rnd() * 400;
  const y = rnd() * 260;
  return `M${x.toFixed(0)} ${y.toFixed(0)}l${(rnd() * 4 - 2).toFixed(1)} -6`;
}).join("");
const ORIGINS = [
  [96, 84],
  [300, 186],
  [214, 64],
];
const ROSETTES: { x: number; y: number; s: number; r: number }[] = (() => {
  const pts: { x: number; y: number; d: number; s: number; r: number }[] = [];
  while (pts.length < 620) {
    const x = 24 + rnd() * 352;
    const y = 22 + rnd() * 220;
    const nx = (x - 200) / 168;
    const ny = (y - 132) / 106;
    if (nx * nx + ny * ny > 1) continue;
    const d = Math.min(...ORIGINS.map(([ox, oy]) => Math.hypot(ox - x, oy - y))) + rnd() * 46;
    pts.push({ x, y, d, s: 13 + rnd() * 9, r: rnd() * 72 });
  }
  return pts.sort((a, b) => a.d - b.d);
})();

function Pond({ day }: { day: number }) {
  const n = 10 * 2 ** (day / 15);
  const k = Math.max(3, Math.round((ROSETTES.length * n) / FINAL));
  return (
    <svg
      viewBox="0 0 400 260"
      className="pond block w-full rounded-2xl"
      role="img"
      aria-label={`บ่อจำลอง ผักตบปกคลุม ${Math.round((k / ROSETTES.length) * 100)} เปอร์เซ็นต์ของผิวน้ำ`}
    >
      <rect width="400" height="260" fill="#8db271" />
      <path d={BLADES} stroke="#6e9a58" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
      <path d={POND} fill="#577f45" transform="translate(0 5)" />
      <path d={POND} fill="url(#hy-pond)" />
      <g fill="none" stroke="#fff" strokeOpacity="0.3" strokeWidth="1.5">
        <ellipse cx="150" cy="150" rx="40" ry="14" />
        <ellipse cx="150" cy="150" rx="70" ry="24" />
        <ellipse cx="290" cy="90" rx="30" ry="10" />
      </g>
      <g stroke="#4c7a3f" strokeWidth="2" strokeLinecap="round">
        {[
          [24, 70],
          [30, 64],
          [378, 160],
          [372, 170],
          [60, 236],
          [340, 30],
        ].map(([x, y]) => (
          <path key={`${x}-${y}`} d={`M${x} ${y} l-3 -22 M${x + 4} ${y} l2 -26 M${x + 8} ${y} l5 -20`} />
        ))}
      </g>
      {ROSETTES.map((p, i) => (
        <g key={i} className={i < k ? "r on" : "r"}>
          <use
            href="#hy-top"
            x={(p.x - p.s / 2).toFixed(1)}
            y={(p.y - p.s / 2).toFixed(1)}
            width={p.s.toFixed(1)}
            height={p.s.toFixed(1)}
            transform={`rotate(${p.r.toFixed(0)} ${p.x.toFixed(1)} ${p.y.toFixed(1)})`}
          />
        </g>
      ))}
    </svg>
  );
}

// ---------- ภาพประกอบ: ต้นแม่ → ไหล → ต้นลูก ----------
export function StolonFigure() {
  return (
    <figure className="rounded-2xl border border-line bg-paper p-3">
      <svg viewBox="0 0 400 170" className="block w-full" role="img" aria-label="ต้นแม่แตกไหลออกไปด้านข้าง ปลายไหลเกิดต้นลูก">
        <rect y="96" width="400" height="74" fill="url(#hy-water)" rx="10" />
        <path d="M0 96 H400" stroke="#fff" strokeOpacity="0.8" strokeWidth="2" />
        <Hyacinth x={84} y={98} s={0.62} />
        <path
          className="g-draw"
          pathLength={1}
          d="M98 102 C150 128 250 128 306 102"
          fill="none"
          stroke="#7a4fb0"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <g className="g-pop" style={{ animationDelay: "1.6s" }}>
          <Hyacinth x={316} y={98} s={0.45} />
        </g>
      </svg>
      <figcaption className="flex justify-between px-2 pt-1 text-base text-ink-soft">
        <span>ต้นแม่</span>
        <span className="text-violet">ไหล (stolon)</span>
        <span>ต้นลูก (clone)</span>
      </figcaption>
    </figure>
  );
}

export default function CloneGrowth() {
  const [day, setDay] = useState(0);
  const player = useNarratedPlayer({
    script: cloneScript,
    onValue: (v) => setDay(Math.round(v)),
  });

  const count = countAt(day);
  const caption = [...cloneCaptions].reverse().find((c) => day >= c.day) ?? cloneCaptions[0];
  const months = Math.floor(day / 30);
  const rest = day % 30;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
      <div className="order-2 space-y-5 lg:order-1">
        <StolonFigure />
        <div className="rounded-2xl border border-line bg-paper p-4">
          <GrowthChart day={day} />
        </div>
      </div>

      <div className="order-1 lg:order-2">
        <Pond day={day} />
        <div className="mt-4">
          <NarrationControls
            player={player}
            idleText={day === 0 ? "กดเล่นเพื่อดูการเพิ่มจำนวนพร้อมคำบรรยาย" : caption.text}
          />
        </div>
        <dl className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-line bg-paper p-4">
            <dt className="text-base text-ink-soft">ผ่านไป</dt>
            <dd className="tabular font-serif text-3xl font-bold text-ink">
              {day < 30 ? `${day} วัน` : `${months} เดือน${rest ? ` ${rest} วัน` : ""}`}
            </dd>
          </div>
          <div className="rounded-2xl border border-line bg-paper p-4">
            <dt className="text-base text-ink-soft">จำนวนต้น</dt>
            <dd className="tabular font-serif text-3xl font-bold text-violet">{count.toLocaleString("th-TH")}</dd>
          </div>
        </dl>
        <label className="mt-4 block">
          <span className="sr-only">เลื่อนดูวันที่</span>
          <input
            type="range"
            min={0}
            max={END_DAY}
            value={day}
            onChange={(e) => {
              player.seek(0);
              setDay(Number(e.target.value));
            }}
            className="w-full accent-[var(--violet)]"
          />
        </label>
        <p className="mt-2 text-sm text-ink-soft">
          จำลองจากผักตบ 10 ต้น เพิ่มเป็นสองเท่าทุก 15 วัน ครบ 8 เดือนได้ 655,360 ต้น (Penfound &amp; Earle, 1948)
        </p>
      </div>
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
