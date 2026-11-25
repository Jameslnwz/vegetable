"use client";

import { useState } from "react";
import { morphs, tristylyScript, type Morph } from "@/content/plant";
import { clipSrc } from "@/lib/say-text";
import { PETAL } from "./art/defs";
import { NarrationControls, useNarratedPlayer, type Seg } from "./NarratedPlayer";
import { PillButton } from "./ui";

type Level = "high" | "mid" | "low";
type Mode = "all" | Morph;

const LV: Record<Level, number> = { high: 112, mid: 184, low: 256 };
const LC: Record<Level, string> = { high: "var(--cell-tube)", mid: "var(--cell-anti)", low: "var(--cell-polar)" };
const LI: Record<Level, string> = { high: "var(--violet)", mid: "var(--green-ink)", low: "var(--orange-ink)" };
const LN: Record<Level, string> = { high: "สูง", mid: "กลาง", low: "ต่ำ" };
const X: Record<Morph, number> = { L: 115, M: 255, S: 395 };
const ORDER: Morph[] = ["L", "M", "S"];
const STALK: Record<Morph, string> = { L: "ก้านยาว", M: "ก้านยาวปานกลาง", S: "ก้านสั้น" };

// เส้นทางละอองเรณู: จากอับเรณูระดับหนึ่งไปยอดเกสรเพศเมียระดับเดียวกันของดอกอีกแบบ
const ARROWS: Record<Level, string[]> = {
  high: ["M237 104 C207 64 152 64 124 98", "M377 104 C328 34 170 34 126 96"],
  mid: ["M133 176 C165 144 221 144 249 172", "M377 176 C345 144 291 144 261 172"],
  low: ["M133 266 C196 336 334 336 389 262", "M273 266 C308 304 360 304 391 264"],
};

function Anther({ x, y, lv, back }: { x: number; y: number; lv: Level; back?: boolean }) {
  const my = (268 + y) / 2;
  return (
    <g>
      <path
        d={`M${(x * 0.45).toFixed(1)} 268 C${(x * 0.55).toFixed(1)} ${my + 14} ${(x * 1.08).toFixed(1)} ${my - 6} ${x} ${y + 8}`}
        stroke="var(--cell-edge)" strokeOpacity={back ? 0.35 : 0.7}
        strokeWidth={back ? 1.5 : 2}
        fill="none"
        strokeLinecap="round"
      />
      <ellipse
        cx={x}
        cy={y}
        rx={back ? 4 : 4.8}
        ry={back ? 7 : 8.2}
        fill={LC[lv]}
        opacity={back ? 0.7 : 1}
      />
      {!back && (
        <g fill="var(--shape-eye)">
          <circle cx={x - 3.5} cy={y - 6} r="1.6" />
          <circle cx={x + 3.8} cy={y - 2} r="1.4" />
          <circle cx={x - 2} cy={y + 5} r="1.3" />
        </g>
      )}
    </g>
  );
}

function Flower({ m, on }: { m: Morph; on: boolean }) {
  const o = morphs[m];
  const sy = LV[o.stigma];
  return (
    <g className={on ? "flw on" : "flw"} transform={`translate(${X[m]} 0)`}>
      {/* กลีบบนมีแต้มม่วงเข้มกับจุดเหลือง */}
      <g transform="translate(0 78) scale(4.5)">
        <path d={PETAL} fill="var(--shape-petal)" />
        <path d="M0 -3.5 C-3.3 -5.6 -3.4 -10 0 -11.8 C3.4 -10 3.3 -5.6 0 -3.5Z" fill="var(--shape-heart)" opacity=".85" />
        <path d="M0 -5.6 L1.9 -8 L0 -10.4 L-1.9 -8Z" fill="var(--shape-eye)" />
      </g>
      <path d={PETAL} transform="translate(-30 88) rotate(-64) scale(3.4)" fill="var(--shape-petal-2)" />
      <path d={PETAL} transform="translate(30 88) rotate(64) scale(3.4)" fill="var(--shape-petal-2)" />
      {/* หลอดกลีบรวม */}
      <path
        d="M-40 82 C-30 112 -21 160 -18 228 C-17 256 -16 270 -15 280 L15 280 C16 270 17 256 18 228 C21 160 30 112 40 82 C20 90 -20 90 -40 82Z"
        fill="var(--violet-wash)"
      />
      <path d="M-30 96 C-22 130 -15 180 -12 240" stroke="#ffffff" strokeOpacity=".7" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* รังไข่ 3 ช่อง */}
      <ellipse cx="0" cy="296" rx="21" ry="19" fill="var(--shape-leaf)" />
      <g fill="var(--shape-leaf-wash)">
        {[
          [-8, 290],
          [-9, 300],
          [8, 290],
          [9, 300],
          [0, 306],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2.6" />
        ))}
      </g>
      {o.anthers.map((lv) => (
        <Anther key={`b-${lv}`} x={0} y={LV[lv]} lv={lv} back />
      ))}
      {/* ก้านและยอดเกสรเพศเมีย */}
      <path d={`M0 278 C1 ${(278 + sy) / 2} -1 ${(278 + sy) / 2} 0 ${sy + 4}`} stroke="var(--shape-stem)" strokeWidth="4" fill="none" strokeLinecap="round" />
      {o.anthers.map((lv) => (
        <g key={`f-${lv}`}>
          <Anther x={-19} y={LV[lv]} lv={lv} />
          <Anther x={19} y={LV[lv]} lv={lv} />
        </g>
      ))}
      <g fill="#ffffff" stroke={LC[o.stigma]} strokeWidth="2.6">
        <circle cx="-5.5" cy={sy - 1} r="5.2" />
        <circle cx="5.5" cy={sy - 1} r="5.2" />
        <circle cx="0" cy={sy - 7} r="5.2" />
      </g>
      <circle cx="0" cy={sy - 3} r="2.4" fill={LC[o.stigma]} />
      <text x="0" y="348" textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--ink)">
        {o.name}
      </text>
      <text x="0" y="369" textAnchor="middle" fontSize="15" fill="var(--ink-soft)">
        {STALK[m]}
      </text>
      <text x="0" y="391" textAnchor="middle" fontSize="14" fontWeight="600" fill={m === "M" ? "var(--violet)" : "var(--ink-soft)"}>
        {o.found}
      </text>
    </g>
  );
}

const LEVELS = Object.keys(LV) as Level[];

export default function Tristyly() {
  const [mode, setMode] = useState<Mode>("all");
  const [arrows, setArrows] = useState<Level[] | null>(null);
  const shown = arrows ?? (mode === "all" ? LEVELS : [morphs[mode].stigma]);

  const script: Seg[] = tristylyScript.map((s, i) => ({
    text: s.text,
    src: clipSrc("tristyly", i),
    on: () => {
      setMode(s.mode);
      setArrows(s.arrows ?? null);
    },
  }));
  const player = useNarratedPlayer({ script });

  const pick = (m: Mode) => {
    player.seek(0);
    setMode(m);
    setArrows(null);
  };

  return (
    <div className="grid gap-6 rounded-[1.75rem] bg-paper-deep p-4 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
      <div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="เลือกแบบดอก">
          <PillButton pressed={mode === "all"} onClick={() => pick("all")}>
            ทั้ง 3 แบบ
          </PillButton>
          {ORDER.map((m) => (
            <PillButton key={m} pressed={mode === m} onClick={() => pick(m)}>
              {morphs[m].name}
            </PillButton>
          ))}
        </div>
        <div aria-live="polite" key={mode} className="anim-rise-sm mt-5">
          {mode === "all" ? (
            <>
              <h4 className="text-2xl font-bold text-ink">เปรียบเทียบทั้ง 3 แบบ</h4>
              <p className="mt-2 text-lg text-ink-soft">
                สีบอกระดับความสูง วงสีรอบยอดเกสรเพศเมียบอกว่ายอดเกสรอยู่ระดับไหน
                ลูกศรแสดงว่าละอองเรณูจากอับเรณูแต่ละระดับถูกพาไปที่ยอดเกสรเพศเมียระดับเดียวกันของดอกอีกแบบ
              </p>
            </>
          ) : (
            <>
              <h4 className="text-2xl font-bold text-ink">
                {morphs[mode].name}: {morphs[mode].sub}
                <span className="ml-2 inline-block rounded-full bg-violet-wash px-3 py-0.5 align-middle text-base font-medium text-violet">
                  {morphs[mode].found}
                </span>
              </h4>
              <p className="mt-2 text-lg text-ink-soft">{morphs[mode].text}</p>
            </>
          )}
        </div>
        <ul className="mt-5 flex flex-wrap gap-4 text-base text-ink-soft">
          {LEVELS.map((lv) => (
            <li key={lv} className="flex items-center gap-2">
              <span className="h-3.5 w-3.5 rounded-full" style={{ background: LC[lv] }} />
              ระดับ{LN[lv]}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <svg
          viewBox="0 0 480 400"
          className={`tri block w-full rounded-2xl bg-white ${mode === "all" ? "" : "focus"}`}
          role="img"
          aria-label="ภาพตัดตามยาวของดอกผักตบชวา 3 แบบ เทียบระดับยอดเกสรเพศเมียกับอับเรณู"
        >
          <defs>
            {LEVELS.map((lv) => (
              <marker key={lv} id={`tri-ah-${lv}`} viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0 0 L10 5 L0 10z" fill={LC[lv]} />
              </marker>
            ))}
          </defs>
          <rect width="480" height="400" fill="#ffffff" />
          {LEVELS.map((lv) => (
            <g key={lv}>
              <rect x="44" y={LV[lv] - 15} width="436" height="30" fill={LC[lv]} opacity=".08" />
              <path d={`M44 ${LV[lv]} H480`} stroke={LC[lv]} strokeOpacity=".45" strokeDasharray="3 5" />
              <text x="6" y={LV[lv] + 6} fontSize="17" fontWeight="700" fill={LI[lv]}>
                {LN[lv]}
              </text>
            </g>
          ))}
          {ORDER.map((m) => (
            <Flower key={m} m={m} on={mode === m} />
          ))}
          {LEVELS.map((lv) => (
            <g key={lv} className={shown.includes(lv) ? "arw on" : "arw"}>
              {ARROWS[lv].map((d) => (
                <g key={d}>
                  <path d={d} stroke={LC[lv]} strokeWidth="2.4" strokeDasharray="6 5" fill="none" markerEnd={`url(#tri-ah-${lv})`} />
                  {[0, 0.8, 1.6].map((b) => (
                    <circle key={b} r="3.4" fill="var(--shape-eye)" stroke={LC[lv]} strokeWidth="1.2">
                      <animateMotion dur="2.4s" begin={`${b}s`} repeatCount="indefinite" path={d} />
                    </circle>
                  ))}
                </g>
              ))}
            </g>
          ))}
        </svg>
        <div className="mt-4">
          <NarrationControls player={player} idleText="กดเล่นเพื่อดูว่าดอกทั้ง 3 แบบต่างกันอย่างไร และละอองเรณูถูกพาไปที่ไหน" />
        </div>
      </div>
    </div>
  );
}
