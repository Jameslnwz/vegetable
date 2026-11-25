"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  femaleNarration,
  femaleSteps,
  fertilizationScript,
  fertilizationSteps,
  maleNarration,
  maleSteps,
} from "@/content/plant";
import { clipSrc } from "@/lib/say-text";
import { NarrationControls, useNarratedPlayer, type Seg } from "./NarratedPlayer";
import { Icon, PillButton } from "./ui";

// ---------- ชิ้นส่วนวาด ----------
const BG = "var(--paper)";
const MUTED = "var(--ink-soft)";

function C({ x, y, r, fill, stroke, w = 2, op }: { x: number; y: number; r: number; fill: string; stroke?: string; w?: number; op?: number }) {
  return <circle cx={x} cy={y} r={r} fill={fill} stroke={stroke} strokeWidth={stroke ? w : undefined} opacity={op} />;
}

function Pop({ delay = 0, children }: { delay?: number; children: ReactNode }) {
  return (
    <g className="g-pop" style={{ animationDelay: `${delay}s` }}>
      {children}
    </g>
  );
}

function Split({ dx, dy, children }: { dx: number; dy: number; children: ReactNode }) {
  return (
    <g className="g-split" style={{ ["--dx" as string]: `${dx}px`, ["--dy" as string]: `${dy}px` }}>
      {children}
    </g>
  );
}

function Chromo({ x, y, c = "var(--shape-soil-dark)" }: { x: number; y: number; c?: string }) {
  return (
    <g stroke={c} strokeWidth="2.4" strokeLinecap="round">
      {[
        [-7, -5, 20],
        [3, -7, -35],
        [-4, 5, 60],
        [6, 4, 15],
      ].map(([dx, dy, r]) => (
        <path key={r} d={`M${x + dx - 3} ${y + dy}h6`} transform={`rotate(${r} ${x + dx} ${y + dy})`} />
      ))}
    </g>
  );
}

function Label({ x, y, children, anchor }: { x: number; y: number; children: string; anchor?: "end" | "middle" }) {
  return (
    <text x={x} y={y} fontSize="14" fill={MUTED} textAnchor={anchor}>
      {children}
    </text>
  );
}

// ภาคตัดอับเรณู
function AntherBg() {
  return (
    <>
      <rect width="400" height="314" fill={BG} />
      <ellipse cx="200" cy="150" rx="186" ry="138" fill="var(--cell-sac)" stroke="var(--cell-edge)" strokeWidth="3" />
      {[
        [70, 90],
        [64, 200],
        [330, 92],
        [336, 206],
        [200, 30],
        [200, 272],
      ].map(([x, y]) => (
        <C key={`${x}-${y}`} x={x} y={y} r={26} fill="var(--cell-fill)" stroke="var(--cell-edge)" />
      ))}
    </>
  );
}

// ละอองเรณู: ผนังเป็นลายตาข่าย มีตุ่มรอบผิว
function Grain({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <Pop>
      <C x={x} y={y} r={r} fill="var(--cell-pollen)" />
      <circle cx={x} cy={y} r={r} fill="url(#c-exine)" opacity=".55" />
      <C x={x} y={y} r={r * 0.88} fill="var(--cell-sac)" />
      {Array.from({ length: 30 }, (_, i) => {
        const a = (i / 30) * Math.PI * 2;
        return <C key={i} x={+(x + Math.cos(a) * r * 0.95).toFixed(1)} y={+(y + Math.sin(a) * r * 0.95).toFixed(1)} r={r * 0.035} fill="var(--cell-edge)" />;
      })}
    </Pop>
  );
}

function OvuleBg() {
  return (
    <>
      <rect width="400" height="314" fill={BG} />
      <path d="M184 284 C58 276 62 18 200 16 C338 18 342 276 216 284" fill="var(--shape-leaf-wash)" stroke="var(--shape-leaf-deep)" strokeWidth="3" />
      <path d="M190 272 C92 260 98 38 200 36 C302 38 308 260 210 272" fill="var(--shape-leaf-wash-2)" stroke="var(--shape-leaf-deep)" strokeWidth="2.5" />
      <ellipse cx="200" cy="150" rx="80" ry="106" fill="var(--cell-sac)" />
      <Label x={200} y={303} anchor="middle">
        micropyle
      </Label>
    </>
  );
}

function Sac() {
  return (
    <Pop>
      <ellipse cx="200" cy="150" rx="48" ry="94" fill="var(--cell-sac)" stroke="var(--cell-edge)" strokeWidth="2" />
    </Pop>
  );
}

// นิวเคลียสแบ่ง 1 → 2 → 4 → 8 (เล่นเองเมื่อแสดงขั้นนี้)
const NUC_POS = [
  [[0, -52], [0, -52], [0, -52], [0, -52], [0, 52], [0, 52], [0, 52], [0, 52]],
  [[-15, -52], [-15, -52], [15, -52], [15, -52], [-15, 52], [-15, 52], [15, 52], [15, 52]],
  [[-15, -64], [-15, -40], [15, -64], [15, -40], [-15, 40], [-15, 64], [15, 40], [15, 64]],
];
const NUC_LABEL = ["1 นิวเคลียส", "2 นิวเคลียส", "4 นิวเคลียส", "8 นิวเคลียส"];

function Nuclei({ speed }: { speed: number }) {
  const [k, setK] = useState(-1);
  useEffect(() => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ids = [0, 1, 2].map((i) => window.setTimeout(() => setK(i), still ? 0 : (600 + i * 1600) / speed));
    return () => ids.forEach(clearTimeout);
  }, [speed]);
  return (
    <>
      {Array.from({ length: 8 }, (_, i) => {
        const [dx, dy] = k < 0 ? [0, 0] : NUC_POS[k][i];
        return <circle key={i} className="g-nuc" cx="200" cy="150" r="7.5" fill="var(--cell-polar)" style={{ transform: `translate(${dx}px, ${dy}px)` }} />;
      })}
      <text x="272" y="40" fontSize="16" fontWeight="600" fill="var(--violet)">
        {NUC_LABEL[k + 1]}
      </text>
    </>
  );
}

type Scene = { badge: string; legend: [string, string][]; draw: (speed: number) => ReactNode };

const MALE: Scene[] = [
  {
    badge: "2n = 32",
    legend: [["var(--cell-fill)", "microspore mother cell"]],
    draw: () => (
      <>
        <AntherBg />
        <Pop>
          <C x={200} y={150} r={64} fill="var(--cell-fill)" stroke="var(--cell-edge)" />
          <C x={200} y={150} r={24} fill="var(--orange)" />
          <Chromo x={200} y={150} />
        </Pop>
      </>
    ),
  },
  {
    badge: "n = 16",
    legend: [["var(--cell-fill)", "microspore"]],
    draw: () => (
      <>
        <AntherBg />
        {[
          [-42, -42],
          [42, -42],
          [-42, 42],
          [42, 42],
        ].map(([dx, dy]) => (
          <Split key={`${dx}-${dy}`} dx={dx} dy={dy}>
            <C x={200} y={150} r={38} fill="var(--cell-fill)" stroke="var(--cell-edge)" />
            <C x={200} y={150} r={13} fill="var(--orange)" />
          </Split>
        ))}
      </>
    ),
  },
  {
    badge: "n = 16",
    legend: [
      ["var(--cell-tube)", "tube nucleus"],
      ["var(--cell-gen)", "generative cell"],
    ],
    draw: () => (
      <>
        <rect width="400" height="314" fill={BG} />
        <Grain x={200} y={150} r={104} />
        <Pop delay={0.35}>
          <C x={176} y={166} r={24} fill="var(--cell-tube)" />
        </Pop>
        <Pop delay={0.7}>
          <ellipse cx="230" cy="126" rx="32" ry="16" fill="var(--cell-syn)" stroke="var(--cell-gen)" strokeWidth="2" transform="rotate(-25 230 126)" />
          <C x={230} y={126} r={7} fill="var(--cell-gen)" />
        </Pop>
      </>
    ),
  },
  {
    badge: "n = 16",
    legend: [
      ["var(--cell-tube)", "tube nucleus"],
      ["var(--cell-gen)", "sperm 2 เซลล์"],
    ],
    draw: () => (
      <>
        <rect width="400" height="314" fill={BG} />
        <Grain x={200} y={150} r={104} />
        <C x={176} y={166} r={24} fill="var(--cell-tube)" />
        {[
          [-18, -10],
          [18, 10],
        ].map(([dx, dy]) => (
          <Split key={dx} dx={dx} dy={dy}>
            <ellipse cx="230" cy="126" rx="17" ry="9" fill="var(--cell-syn)" stroke="var(--cell-gen)" strokeWidth="2" transform="rotate(-25 230 126)" />
            <C x={230} y={126} r={5} fill="var(--cell-gen)" />
          </Split>
        ))}
      </>
    ),
  },
  {
    badge: "n = 16",
    legend: [
      ["var(--cell-tube)", "tube nucleus"],
      ["var(--cell-gen)", "sperm"],
    ],
    draw: () => (
      <>
        <rect width="400" height="314" fill={BG} />
        <path d="M0 0 H400 V112 C330 124 270 104 200 116 C130 128 60 108 0 118Z" fill="var(--shape-leaf-wash)" />
        <Label x={16} y={30}>
          ผิวยอดเกสรเพศเมีย
        </Label>
        <Grain x={118} y={84} r={48} />
        <path
          className="g-draw"
          pathLength={1}
          d="M136 122 C150 172 196 190 244 208 C292 226 314 252 332 296"
          stroke="var(--cell-pollen)"
          strokeWidth="13"
          fill="none"
          strokeLinecap="round"
        />
        <Pop delay={1.7}>
          <C x={316} y={262} r={7} fill="var(--cell-tube)" />
          <ellipse cx="296" cy="240" rx="8" ry="5" fill="var(--cell-gen)" transform="rotate(40 296 240)" />
          <ellipse cx="305" cy="250" rx="8" ry="5" fill="var(--cell-gen)" transform="rotate(48 305 250)" />
        </Pop>
      </>
    ),
  },
];

const FEMALE: Scene[] = [
  {
    badge: "2n = 32",
    legend: [
      ["var(--violet-wash)", "megaspore mother cell"],
      ["var(--cell-sac)", "nucellus"],
      ["var(--shape-leaf-wash)", "เยื่อหุ้ม ovule"],
    ],
    draw: () => (
      <>
        <OvuleBg />
        <Pop>
          <ellipse cx="200" cy="142" rx="34" ry="44" fill="var(--violet-wash)" stroke="var(--cell-tube)" strokeWidth="2" />
          <C x={200} y={142} r={15} fill="var(--cell-tube)" />
          <Chromo x={200} y={142} c="var(--violet)" />
        </Pop>
      </>
    ),
  },
  {
    badge: "n = 16",
    legend: [["var(--violet-wash)", "megaspore"]],
    draw: () => (
      <>
        <OvuleBg />
        {[-54, -18, 18, 54].map((dy) => (
          <Split key={dy} dx={0} dy={dy}>
            <ellipse cx="200" cy="150" rx="27" ry="16" fill="var(--violet-wash)" stroke="var(--cell-tube)" strokeWidth="2" />
            <C x={200} y={150} r={6} fill="var(--cell-tube)" />
          </Split>
        ))}
      </>
    ),
  },
  {
    badge: "n = 16",
    legend: [
      ["var(--violet-wash)", "megaspore ที่เจริญต่อ"],
      ["var(--cell-dead)", "เซลล์ที่สลาย"],
    ],
    draw: () => (
      <>
        <OvuleBg />
        <g className="g-swell">
          <ellipse cx="200" cy="96" rx="27" ry="16" fill="var(--violet-wash)" stroke="var(--cell-tube)" strokeWidth="2" />
          <C x={200} y={96} r={6} fill="var(--cell-tube)" />
        </g>
        {[132, 168, 204].map((y) => (
          <g key={y} className="g-degen">
            <ellipse cx="200" cy={y} rx="27" ry="16" fill="var(--violet-wash)" stroke="var(--cell-tube)" strokeWidth="2" />
          </g>
        ))}
        <Label x={244} y={100}>
          เจริญต่อ
        </Label>
        <Label x={244} y={172}>
          สลายไป 3 เซลล์
        </Label>
      </>
    ),
  },
  {
    badge: "n = 16",
    legend: [
      ["var(--cell-polar)", "นิวเคลียส"],
      ["var(--cell-sac)", "embryo sac ที่กำลังเจริญ"],
    ],
    draw: (speed) => (
      <>
        <OvuleBg />
        <Sac />
        <Nuclei speed={speed} />
      </>
    ),
  },
  {
    badge: "7 เซลล์ · 8 นิวเคลียส",
    legend: [
      ["var(--cell-anti)", "antipodal 3 เซลล์"],
      ["var(--cell-polar)", "polar nucleus 2 นิวเคลียส"],
      ["var(--cell-egg)", "เซลล์ไข่"],
      ["var(--cell-syn)", "synergid 2 เซลล์"],
    ],
    draw: () => (
      <>
        <OvuleBg />
        <Sac />
        <Pop delay={0.3}>
          <C x={188} y={84} r={10} fill="var(--cell-anti)" stroke="var(--cell-anti)" w={1.5} />
          <C x={212} y={84} r={10} fill="var(--cell-anti)" stroke="var(--cell-anti)" w={1.5} />
          <C x={200} y={68} r={10} fill="var(--cell-anti)" stroke="var(--cell-anti)" w={1.5} />
        </Pop>
        <Pop delay={0.6}>
          <C x={192} y={150} r={8} fill="var(--cell-polar)" />
          <C x={208} y={150} r={8} fill="var(--cell-polar)" />
        </Pop>
        <Pop delay={0.9}>
          <ellipse cx="182" cy="222" rx="9" ry="15" fill="var(--cell-syn)" stroke="var(--cell-gen)" strokeWidth="1.5" />
          <ellipse cx="218" cy="222" rx="9" ry="15" fill="var(--cell-syn)" stroke="var(--cell-gen)" strokeWidth="1.5" />
          <path d="M180 236 l2 6 M184 236 l-1 6 M216 236 l2 6 M220 236 l-1 6" stroke="var(--cell-gen)" strokeWidth="1.5" />
        </Pop>
        <Pop delay={1.2}>
          <C x={200} y={208} r={14} fill="var(--cell-egg)" stroke="var(--cell-egg)" w={1.5} />
          <C x={200} y={206} r={5} fill="var(--cell-egg)" />
        </Pop>
      </>
    ),
  },
];

// ---------- การสร้างเซลล์สืบพันธุ์ ----------
export function Gametogenesis() {
  const [sex, setSex] = useState<"m" | "f">("m");
  const [step, setStep] = useState(0);
  const scenes = sex === "m" ? MALE : FEMALE;
  const steps = sex === "m" ? maleSteps : femaleSteps;
  const lines = sex === "m" ? maleNarration : femaleNarration;
  const last = scenes.length - 1;

  const clipGroup = sex === "m" ? "male" : "female";
  const firstLine = (k: number) => lines.slice(0, k).reduce((a, l) => a + l.length, 0);
  const script: Seg[] = lines.flatMap((group, k) =>
    group.map((text, j) => ({ text, src: clipSrc(clipGroup, firstLine(k) + j), on: j === 0 ? () => setStep(k) : undefined })),
  );
  const player = useNarratedPlayer({ script });

  const go = (k: number) => {
    player.seek(firstLine(k));
    setStep(k);
  };
  const pickSex = (x: "m" | "f") => {
    player.seek(0);
    setSex(x);
    setStep(0);
  };

  const scene = scenes[step];
  const info = steps[step];

  return (
    <div className="grid gap-6 rounded-[1.75rem] bg-paper-deep p-4 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
      <div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="เลือกฝั่ง">
          <PillButton pressed={sex === "m"} onClick={() => pickSex("m")}>
            เพศผู้ · ในอับเรณู
          </PillButton>
          <PillButton pressed={sex === "f"} onClick={() => pickSex("f")}>
            เพศเมีย · ใน ovule
          </PillButton>
        </div>
        <div key={`${sex}-${step}`} className="anim-rise-sm mt-6" aria-live="polite">
          <span className="tabular inline-block rounded-lg bg-violet-wash px-3 py-1 text-lg font-semibold text-violet">{scene.badge}</span>
          <h4 className="mt-3 text-2xl font-bold text-ink">
            ขั้นที่ {step + 1}: {info.title}
          </h4>
          <p className="mt-2 text-lg text-ink-soft">{info.text}</p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-base text-ink-soft">
            {scene.legend.map(([c, t]) => (
              <li key={t} className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded-full border border-ink/10" style={{ background: c }} />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <svg
          key={`${sex}-${step}`}
          viewBox="0 0 400 314"
          className="block w-full rounded-2xl bg-white"
          role="img"
          aria-label={`ภาพประกอบ${sex === "m" ? "เพศผู้" : "เพศเมีย"} ขั้นที่ ${step + 1}: ${info.title}`}
        >
          {scene.draw(player.av.speed)}
        </svg>
        <div className="mt-4">
          <NarrationControls player={player} idleLabel="เล่นอัตโนมัติ" idleText={lines[step].join(" ")}>
            <StepNav count={scenes.length} step={step} onGo={go} last={last} />
          </NarrationControls>
        </div>
      </div>
    </div>
  );
}

function StepNav({ count, step, last, onGo }: { count: number; step: number; last: number; onGo: (k: number) => void }) {
  return (
    <div className="flex items-center gap-1">
      <PillButton onClick={() => onGo(step - 1)} disabled={step === 0} label="ขั้นก่อนหน้า">
        <Icon name="prev" />
      </PillButton>
      <ol className="flex items-center" aria-label="ขั้นตอน">
        {Array.from({ length: count }, (_, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => onGo(i)}
              aria-label={`ขั้นที่ ${i + 1}`}
              aria-current={i === step ? "step" : undefined}
              className="flex h-11 w-5 cursor-pointer items-center justify-center"
            >
              <span
                className={`block h-2 rounded-full transition-all duration-300 ${i === step ? "w-5 bg-violet" : "w-2 bg-line"}`}
              />
            </button>
          </li>
        ))}
      </ol>
      <PillButton onClick={() => onGo(step + 1)} disabled={step === last} label="ขั้นถัดไป">
        <Icon name="next" />
      </PillButton>
    </div>
  );
}

// ---------- การปฏิสนธิซ้อน ----------
const clamp = (x: number) => Math.max(0, Math.min(1, x));
const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const seg = (t: number, a: number, b: number) => ease(clamp((t - a) / (b - a)));
const lerp = (a: number, b: number, e: number) => a + (b - a) * e;

// เส้นหลอดละอองเรณู: คำนวณจุดตามความยาวไว้ล่วงหน้า (ไม่ต้องอ่านจาก DOM)
const TUBE = "M200 40 C199 100 196 180 199 250 C201 266 200 280 200 294";
const TUBE_PTS = (() => {
  const segs: [number, number][][] = [
    [
      [200, 40],
      [199, 100],
      [196, 180],
      [199, 250],
    ],
    [
      [199, 250],
      [201, 266],
      [200, 280],
      [200, 294],
    ],
  ];
  const pts: { x: number; y: number; l: number }[] = [];
  let l = 0;
  for (const [p0, p1, p2, p3] of segs) {
    for (let i = 0; i <= 60; i++) {
      const t = i / 60;
      const m = 1 - t;
      const x = m * m * m * p0[0] + 3 * m * m * t * p1[0] + 3 * m * t * t * p2[0] + t * t * t * p3[0];
      const y = m * m * m * p0[1] + 3 * m * m * t * p1[1] + 3 * m * t * t * p2[1] + t * t * t * p3[1];
      const prev = pts[pts.length - 1];
      if (prev) l += Math.hypot(x - prev.x, y - prev.y);
      pts.push({ x, y, l });
    }
  }
  return pts;
})();
const TUBE_LEN = TUBE_PTS[TUBE_PTS.length - 1].l;
const at = (d: number) => {
  const target = Math.max(0, Math.min(TUBE_LEN, d));
  return TUBE_PTS.find((p) => p.l >= target) ?? TUBE_PTS[TUBE_PTS.length - 1];
};

function phaseOf(t: number) {
  return t < 800 ? 0 : t < 4200 ? 1 : t < 5000 ? 2 : t < 6000 ? 3 : 4;
}

function FertilizationScene({ t }: { t: number }) {
  const e0 = seg(t, 0, 800);
  const e1 = seg(t, 800, 4200);
  const e2 = seg(t, 4200, 5000);
  const e3 = seg(t, 5000, 6000);
  const e4 = seg(t, 6000, 7000);
  const end = at(TUBE_LEN);
  const a = at(TUBE_LEN * e1 - 12);
  const b = at(TUBE_LEN * e1 - 26);
  let [x1, y1, x2, y2] = [a.x, a.y, b.x, b.y];
  if (e2 > 0) {
    x1 = lerp(end.x, 200, e2);
    y1 = lerp(end.y, 312, e2);
    x2 = lerp(end.x, 200, e2);
    y2 = lerp(end.y - 6, 340, e2);
  }
  const vis = t > 820 ? 1 - e3 : 0;
  const greenAnti = (
    <g opacity={1 - 0.8 * e4}>
      <C x={192} y={370} r={6} fill="var(--cell-anti)" stroke="var(--cell-anti)" w={1.5} />
      <C x={208} y={370} r={6} fill="var(--cell-anti)" stroke="var(--cell-anti)" w={1.5} />
      <C x={200} y={379} r={6} fill="var(--cell-anti)" stroke="var(--cell-anti)" w={1.5} />
    </g>
  );

  return (
    <svg viewBox="0 0 400 420" className="block w-full rounded-2xl bg-white" role="img" aria-label="ภาพเกสรเพศเมียตามยาว แสดงหลอดละอองเรณูงอกลงไปจนเกิดการปฏิสนธิซ้อน">
      <rect width="400" height="420" fill={BG} />
      {/* ก้านเกสรเพศเมีย ยอดเกสร รังไข่ */}
      <path d="M188 58 C188 120 184 200 176 252 L224 252 C216 200 212 120 212 58Z" fill="var(--shape-leaf-wash)" stroke="var(--shape-leaf-deep)" strokeWidth="2.5" />
      <C x={184} y={46} r={17} fill="var(--shape-petal)" />
      <C x={216} y={46} r={17} fill="var(--shape-petal)" />
      <C x={200} y={34} r={17} fill="var(--shape-petal)" />
      <ellipse cx="200" cy="332" rx="124" ry="78" fill="var(--shape-leaf-wash)" stroke="var(--shape-leaf-deep)" strokeWidth="3" />
      <ellipse cx="116" cy="334" rx="24" ry="32" fill="var(--shape-leaf-wash-2)" stroke="var(--shape-leaf-deep)" strokeWidth="2" />
      <ellipse cx="284" cy="334" rx="24" ry="32" fill="var(--shape-leaf-wash-2)" stroke="var(--shape-leaf-deep)" strokeWidth="2" />
      <path d="M191 280 C146 284 148 394 200 394 C252 394 254 284 209 280" fill="var(--shape-leaf-wash-2)" stroke="var(--shape-leaf-deep)" strokeWidth="2.5" />
      <ellipse cx="200" cy="338" rx="27" ry="48" fill="var(--cell-sac)" stroke="var(--cell-edge)" strokeWidth="2" />
      {greenAnti}
      <ellipse cx="190" cy="300" rx="6" ry="10" fill="var(--cell-syn)" stroke="var(--cell-gen)" strokeWidth="1.5" opacity={1 - 0.8 * e2} />
      <ellipse cx="210" cy="300" rx="6" ry="10" fill="var(--cell-syn)" stroke="var(--cell-gen)" strokeWidth="1.5" opacity={1 - 0.8 * e4} />
      <circle cx="200" cy="312" r={9 + 4 * e3} fill={e3 > 0.5 ? "var(--cell-egg)" : "var(--cell-egg)"} stroke="var(--cell-egg)" strokeWidth="1.5" />
      <circle cx={195 + 5 * e3} cy="340" r={6 + 3 * e3} fill={e3 > 0.5 ? "var(--orange)" : "var(--cell-polar)"} />
      <circle cx={205 - 5 * e3} cy="340" r="6" fill="var(--cell-polar)" opacity={1 - e3} />
      {/* หลอดละอองเรณู */}
      <path d={TUBE} stroke="var(--cell-pollen)" strokeWidth="7" fill="none" strokeLinecap="round" strokeDasharray={TUBE_LEN} strokeDashoffset={TUBE_LEN * (1 - e1)} />
      <g transform={`translate(0 ${-60 * (1 - e0)})`} opacity={e0}>
        <C x={200} y={22} r={15} fill="var(--cell-pollen)" />
        <C x={200} y={22} r={12} fill="var(--cell-sac)" />
        <C x={200} y={22} r={4} fill="var(--cell-tube)" />
      </g>
      <circle cx={x1} cy={y1} r="5" fill="var(--cell-gen)" opacity={vis} />
      <circle cx={x2} cy={y2} r="5" fill="var(--cell-gen)" opacity={vis} />
      <g fontSize="15" fontWeight="600" opacity={e4}>
        <path d="M212 312 H250" stroke="var(--cell-egg)" strokeWidth="1.5" />
        <text x="254" y="317" fill="var(--cell-egg)">
          zygote 2n = 32
        </text>
        <path d="M190 340 H150" stroke="var(--orange-ink)" strokeWidth="1.5" />
        <text x="146" y="345" textAnchor="end" fill="var(--orange-ink)">
          endosperm 3n = 48
        </text>
      </g>
      <g fontSize="14" fill={MUTED}>
        <text x="236" y="40">ยอดเกสรเพศเมีย</text>
        <text x="236" y="150">ก้านเกสรเพศเมีย</text>
        <text x="20" y="262">รังไข่</text>
        <text x="20" y="410">ovule ที่มี embryo sac</text>
      </g>
    </svg>
  );
}

export function DoubleFertilization() {
  const [t, setT] = useState(0);
  const player = useNarratedPlayer({
    script: fertilizationScript.map((s, i) => ({ ...s, src: clipSrc("fertilization", i) })),
    onValue: (v) => setT(v),
  });
  const started = player.status !== "idle" || t > 0;
  const cap = fertilizationSteps[phaseOf(t)];

  return (
    <div className="grid gap-6 rounded-[1.75rem] bg-paper-deep p-4 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
      <div aria-live="polite" key={started ? phaseOf(t) : -1} className="anim-rise-sm lg:pt-2">
        <h4 className="text-2xl font-bold text-ink">{started ? cap.title : "กดเล่นเพื่อเริ่ม"}</h4>
        <p className="mt-2 text-lg text-ink-soft">{started ? cap.text : "ดูละอองเรณูงอกหลอดลงไปจนเกิดการปฏิสนธิ"}</p>
      </div>
      <div>
        <FertilizationScene t={t} />
        <div className="mt-4">
          <NarrationControls player={player} idleText="กดเล่นเพื่อดูการปฏิสนธิซ้อนพร้อมคำบรรยาย" />
        </div>
      </div>
    </div>
  );
}
