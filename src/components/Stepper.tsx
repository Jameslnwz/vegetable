"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { Step } from "@/content/plant";
import { Icon, PillButton } from "./ui";

// ตัวเดินทีละขั้น ใช้ร่วมกันระหว่างการสร้างเซลล์สืบพันธุ์และการปฏิสนธิซ้อน
export default function Stepper({
  steps,
  visual,
  intervalMs = 3200,
}: {
  steps: Step[];
  visual: (step: number) => ReactNode;
  intervalMs?: number;
}) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const last = steps.length - 1;

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => {
      if (step >= last) setPlaying(false);
      else setStep(step + 1);
    }, intervalMs);
    return () => window.clearTimeout(id);
  }, [playing, step, last, intervalMs]);

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
                onClick={() => {
                  setPlaying(false);
                  setStep(i);
                }}
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
        <div aria-live="polite" key={step} className="anim-rise">
          <p className="tabular text-base text-ink-soft">
            ขั้นที่ {step + 1} จาก {steps.length}
          </p>
          <h4 className="mt-1 text-2xl font-bold text-ink">{current.title}</h4>
          <p className="mt-3 text-lg text-ink">{current.text}</p>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <PillButton
            onClick={() => {
              setPlaying(false);
              setStep((s) => Math.max(0, s - 1));
            }}
            disabled={step === 0}
            label="ขั้นก่อนหน้า"
          >
            <Icon name="prev" />
          </PillButton>
          <PillButton
            tone="solid"
            onClick={() => {
              if (playing) return setPlaying(false);
              if (step >= last) setStep(0);
              setPlaying(true);
            }}
          >
            <Icon name={playing ? "pause" : "play"} />
            {playing ? "หยุด" : step >= last ? "เล่นอีกครั้ง" : "เล่นอัตโนมัติ"}
          </PillButton>
          <PillButton
            onClick={() => {
              setPlaying(false);
              setStep((s) => Math.min(last, s + 1));
            }}
            disabled={step === last}
            label="ขั้นถัดไป"
          >
            ถัดไป
            <Icon name="next" />
          </PillButton>
        </div>
      </div>
    </div>
  );
}
