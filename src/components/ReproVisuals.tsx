"use client";

import { useState } from "react";
import { femaleSteps, fertilizationSteps, maleSteps } from "@/content/plant";
import Stepper from "./Stepper";
import { PillButton } from "./ui";

const C = {
  cell: "var(--cell-fill)",
  edge: "var(--cell-edge)",
  tube: "var(--cell-tube)",
  gen: "var(--cell-gen)",
  egg: "var(--cell-egg)",
  polar: "var(--cell-polar)",
  anti: "var(--cell-anti)",
  dead: "var(--cell-dead)",
  text: "var(--ink)",
};

function Label({ x, y, children, anchor = "middle" }: { x: number; y: number; children: string; anchor?: "start" | "middle" | "end" }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize="19" fill={C.text} stroke="var(--paper)" strokeWidth="4" paintOrder="stroke">
      {children}
    </text>
  );
}

function Fade({ show, children }: { show: boolean; children: React.ReactNode }) {
  return (
    <g style={{ opacity: show ? 1 : 0, transition: "opacity 500ms cubic-bezier(0.16,1,0.3,1)" }} aria-hidden={!show}>
      {children}
    </g>
  );
}

// ---------- เพศผู้ ----------
function MaleVisual({ step }: { step: number }) {
  return (
    <svg viewBox="0 0 320 260" className="block w-full" role="img" aria-label={`ภาพประกอบเพศผู้ ขั้นที่ ${step + 1}`}>
      <Fade show={step === 0}>
        <circle cx="160" cy="120" r="70" fill={C.cell} stroke={C.edge} strokeWidth="2" />
        <circle cx="160" cy="120" r="26" fill={C.tube} opacity="0.75" />
        <Label x={160} y={230}>microspore mother cell · 2n = 32</Label>
      </Fade>
      <Fade show={step === 1}>
        {[
          [125, 85], [195, 85], [125, 155], [195, 155],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="34" fill={C.cell} stroke={C.edge} strokeWidth="2" />
            <circle cx={x} cy={y} r="11" fill={C.tube} opacity="0.75" />
          </g>
        ))}
        <Label x={160} y={230}>tetrad · microspore 4 เซลล์ · n = 16</Label>
      </Fade>
      <Fade show={step === 2 || step === 3}>
        <circle cx="160" cy="115" r="72" fill="var(--cell-pollen)" stroke={C.edge} strokeWidth="3" strokeDasharray="2 5" />
        <circle cx="140" cy="105" r="22" fill={C.tube} opacity="0.8" />
        <Label x={140} y={150}>tube cell</Label>
      </Fade>
      <Fade show={step === 2}>
        <ellipse cx="192" cy="110" rx="18" ry="11" fill={C.gen} />
        <Label x={200} y={86}>generative cell</Label>
        <Label x={160} y={230}>ละอองเรณู 2 เซลล์ · n = 16</Label>
      </Fade>
      <Fade show={step === 3}>
        <ellipse cx="186" cy="98" rx="11" ry="7" fill={C.gen} />
        <ellipse cx="196" cy="122" rx="11" ry="7" fill={C.gen} />
        <Label x={210} y={76}>sperm 2 เซลล์</Label>
        <Label x={160} y={230}>sperm แต่ละเซลล์ n = 16</Label>
      </Fade>
      <Fade show={step === 4}>
        <rect x="40" y="70" width="240" height="12" rx="6" fill="var(--shape-leaf-wash)" />
        <Label x={160} y={62}>ผิวยอดเกสรเพศเมีย</Label>
        <circle cx="160" cy="58" r="26" fill="var(--cell-pollen)" stroke={C.edge} strokeWidth="2" />
        <path
          d="M160 82 C 158 120, 170 150, 162 210"
          fill="none"
          stroke={C.tube}
          strokeWidth="6"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="1"
          style={{ strokeDashoffset: step === 4 ? 0 : 1, transition: "stroke-dashoffset 1.6s cubic-bezier(0.16,1,0.3,1)" }}
        />
        <ellipse cx="162" cy="196" rx="7" ry="5" fill={C.gen} />
        <ellipse cx="164" cy="208" rx="7" ry="5" fill={C.gen} />
        <Label x={200} y={150} anchor="start">pollen tube</Label>
      </Fade>
    </svg>
  );
}

// ---------- เพศเมีย ----------
function FemaleVisual({ step }: { step: number }) {
  const sac = step >= 3;
  return (
    <svg viewBox="0 0 320 260" className="block w-full" role="img" aria-label={`ภาพประกอบเพศเมีย ขั้นที่ ${step + 1}`}>
      {/* ovule และเยื่อหุ้ม 2 ชั้น */}
      <ellipse cx="160" cy="118" rx="96" ry="104" fill="var(--shape-leaf-wash)" stroke="var(--shape-stem)" strokeWidth="2" />
      <ellipse cx="160" cy="118" rx="82" ry="90" fill="var(--shape-leaf-wash-2)" stroke="var(--shape-stem)" strokeWidth="1.5" />
      <path d="M150 222 L160 206 L170 222" fill="var(--paper)" stroke="var(--shape-stem)" strokeWidth="1.5" />
      <Label x={160} y={252}>micropyle</Label>
      <Label x={160} y={24}>chalaza</Label>

      <Fade show={step === 0}>
        <circle cx="160" cy="118" r="34" fill={C.cell} stroke={C.edge} strokeWidth="2" />
        <circle cx="160" cy="118" r="13" fill={C.egg} opacity="0.7" />
        <Label x={160} y={176}>2n = 32</Label>
      </Fade>
      <Fade show={step === 1 || step === 2}>
        {[0, 1, 2, 3].map((i) => {
          const y = 62 + i * 38;
          const dead = step === 2 && i > 0;
          return (
            <g key={i} style={{ opacity: dead ? 0.3 : 1, transition: "opacity 700ms ease" }}>
              <rect x="128" y={y} width="64" height="34" rx="10" fill={dead ? C.dead : C.cell} stroke={C.edge} strokeWidth="1.5" />
              <circle cx="160" cy={y + 17} r="7" fill={C.egg} opacity="0.7" />
            </g>
          );
        })}
        <Label x={250} y={86} anchor="middle">{step === 2 ? "เจริญต่อ" : "n = 16"}</Label>
        {step === 2 && <Label x={250} y={170}>สลายไป 3 เซลล์</Label>}
      </Fade>

      <Fade show={sac}>
        <ellipse cx="160" cy="118" rx="52" ry="74" fill="var(--cell-sac)" stroke={C.edge} strokeWidth="2" />
      </Fade>
      <Fade show={step === 3}>
        {[
          [146, 64], [174, 64], [160, 88], [146, 108], [174, 128], [160, 150], [146, 172], [174, 172],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="7" fill={C.tube} opacity="0.8" />
        ))}
        <Label x={160} y={206}>1 → 2 → 4 → 8 นิวเคลียส</Label>
      </Fade>
      <Fade show={step === 4}>
        {/* antipodal 3 เซลล์ */}
        {[140, 160, 180].map((x) => (
          <circle key={x} cx={x} cy={62} r="10" fill={C.anti} opacity="0.85" />
        ))}
        {/* polar nucleus 2 */}
        <circle cx="150" cy="116" r="9" fill={C.polar} />
        <circle cx="170" cy="116" r="9" fill={C.polar} />
        {/* synergid 2 + egg */}
        <ellipse cx="142" cy="170" rx="10" ry="15" fill="var(--cell-syn)" />
        <ellipse cx="178" cy="170" rx="10" ry="15" fill="var(--cell-syn)" />
        <circle cx="160" cy="160" r="13" fill={C.egg} />
        <Label x={268} y={66}>antipodal</Label>
        <Label x={268} y={120}>polar nucleus</Label>
        <Label x={270} y={176}>เซลล์ไข่ + synergid</Label>
      </Fade>
    </svg>
  );
}

export function Gametogenesis() {
  const [side, setSide] = useState<"male" | "female">("male");
  return (
    <div className="rounded-[1.75rem] bg-paper-deep p-4 sm:p-6">
      <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="เลือกฝั่ง">
        <PillButton pressed={side === "male"} onClick={() => setSide("male")}>
          เพศผู้ · ในอับเรณู
        </PillButton>
        <PillButton pressed={side === "female"} onClick={() => setSide("female")}>
          เพศเมีย · ใน ovule
        </PillButton>
      </div>
      {side === "male" ? (
        <Stepper key="male" steps={maleSteps} visual={(s) => <MaleVisual step={s} />} />
      ) : (
        <Stepper key="female" steps={femaleSteps} visual={(s) => <FemaleVisual step={s} />} />
      )}
    </div>
  );
}

// ---------- การปฏิสนธิซ้อน ----------
function FertilizationVisual({ step }: { step: number }) {
  const tube = step === 0 ? 0 : step === 1 ? 0.55 : 1;
  const fused = step >= 3;
  return (
    <svg viewBox="0 0 320 300" className="block w-full" role="img" aria-label={`ภาพประกอบการปฏิสนธิซ้อน ขั้นที่ ${step + 1}`}>
      {/* เกสรเพศเมีย */}
      <path d="M120 30 Q160 10 200 30 L170 46 L166 190 L154 190 L150 46 Z" fill="var(--shape-leaf-wash)" stroke="var(--shape-stem)" strokeWidth="2" />
      <ellipse cx="160" cy="236" rx="78" ry="54" fill="var(--shape-leaf-wash)" stroke="var(--shape-stem)" strokeWidth="2" />
      <ellipse cx="160" cy="240" rx="40" ry="34" fill="var(--cell-sac)" stroke={C.edge} strokeWidth="1.5" />
      <Label x={250} y={30} anchor="start">ยอดเกสร</Label>
      <Label x={250} y={120} anchor="start">ก้านเกสร</Label>
      <Label x={250} y={236} anchor="start">ovule</Label>

      {/* ละอองเรณู */}
      <circle cx="160" cy="22" r="11" fill="var(--cell-pollen)" stroke={C.edge} strokeWidth="2" className={step === 0 ? "anim-bob" : ""} />

      {/* หลอดละอองเรณู */}
      <path
        d="M160 32 L160 190 Q 160 212 160 226"
        fill="none"
        stroke={C.tube}
        strokeWidth="4"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray="1"
        style={{ strokeDashoffset: 1 - tube, transition: "stroke-dashoffset 1.6s cubic-bezier(0.16,1,0.3,1)" }}
      />

      {/* sperm 2 เซลล์ เคลื่อนตามปลายหลอด */}
      {!fused &&
        [0, 1].map((i) => (
          <ellipse
            key={i}
            cx={160 + (i ? 6 : -6)}
            cy={0}
            rx="5"
            ry="4"
            fill={C.gen}
            style={{
              transform: `translateY(${step === 0 ? 24 : step === 1 ? 120 : 222 + i * 8}px)`,
              transition: "transform 1.6s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        ))}

      {/* เซลล์ใน embryo sac */}
      <circle cx="160" cy="258" r={fused ? 12 : 9} fill={C.egg} style={{ transition: "r 400ms ease" }} />
      <circle cx="152" cy="236" r="6" fill={C.polar} />
      <circle cx="168" cy="236" r="6" fill={C.polar} />
      <Fade show={step < 2}>
        <ellipse cx="146" cy="264" rx="6" ry="9" fill="var(--cell-syn)" />
      </Fade>
      <ellipse cx="174" cy="264" rx="6" ry="9" fill="var(--cell-syn)" opacity={step >= 2 ? 0.25 : 1} />

      <Fade show={fused}>
        <circle cx="160" cy="236" r="16" fill="none" stroke={C.polar} strokeWidth="3" className="anim-pulse-soft" />
        <circle cx="160" cy="258" r="18" fill="none" stroke={C.egg} strokeWidth="3" className="anim-pulse-soft" />
      </Fade>
      <Fade show={step === 4}>
        <Label x={60} y={262} anchor="middle">zygote 2n</Label>
        <Label x={60} y={226} anchor="middle">endosperm 3n</Label>
      </Fade>
    </svg>
  );
}

export function DoubleFertilization() {
  return (
    <div className="rounded-[1.75rem] bg-paper-deep p-4 sm:p-6">
      <Stepper steps={fertilizationSteps} visual={(s) => <FertilizationVisual step={s} />} intervalMs={3600} />
    </div>
  );
}
