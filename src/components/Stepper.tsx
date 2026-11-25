"use client";

import { useState, type ReactNode } from "react";
import type { Step } from "@/content/plant";
import { NarrationControls, useNarratedPlayer } from "./NarratedPlayer";
import { Icon, PillButton } from "./ui";

// ตัวเดินทีละขั้น ใช้ร่วมกันระหว่างการสร้างเซลล์สืบพันธุ์และการปฏิสนธิซ้อน
// เล่นอัตโนมัติพร้อมเสียงบรรยาย ปรับความเร็วได้
export default function Stepper({
  steps,
  visual,
}: {
  steps: Step[];
  visual: (step: number) => ReactNode;
}) {
  const [step, setStep] = useState(0);
  const last = steps.length - 1;

  const player = useNarratedPlayer({
    script: steps.map((s, i) => ({ text: `ขั้นที่ ${i + 1} ${s.title} ${s.text}` })),
    onSegment: setStep,
  });

  const go = (i: number) => {
    player.seek(i);
    setStep(i);
  };

  const current = steps[step];

  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center">
      <div className="rounded-xl bg-paper p-2">{visual(step)}</div>
      <div>
        <ol className="flex gap-1.5" aria-label="ขั้นตอน">
          {steps.map((s, i) => (
            <li key={s.title} className="flex-1">
              <button
                type="button"
                onClick={() => go(i)}
                aria-current={i === step ? "step" : undefined}
                aria-label={`ขั้นที่ ${i + 1}: ${s.title}`}
                className="block h-11 w-full cursor-pointer"
              >
                <span
                  className={`block h-1.5 rounded-full transition-colors duration-300 ${
                    i <= step ? "bg-violet" : "bg-line"
                  }`}
                />
              </button>
            </li>
          ))}
        </ol>
        <div key={step} className="anim-rise">
          <p className="tabular text-base text-ink-soft">
            ขั้นที่ {step + 1} จาก {steps.length}
          </p>
          <h4 className="mt-1 text-2xl font-bold text-ink">{current.title}</h4>
          <p className="mt-3 text-lg text-ink">{current.text}</p>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <PillButton onClick={() => go(Math.max(0, step - 1))} disabled={step === 0} label="ขั้นก่อนหน้า">
            <Icon name="prev" />
          </PillButton>
          <PillButton onClick={() => go(Math.min(last, step + 1))} disabled={step === last} label="ขั้นถัดไป">
            ถัดไป
            <Icon name="next" />
          </PillButton>
        </div>
        <div className="mt-4">
          <NarrationControls player={player} idleLabel="เล่นอัตโนมัติ" />
        </div>
      </div>
    </div>
  );
}
