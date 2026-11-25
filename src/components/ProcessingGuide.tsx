"use client";

import { useState, type KeyboardEvent } from "react";
import { methods } from "@/content/plant";
import { Icon, PillButton } from "./ui";

type Progress = Record<string, { materials: boolean[]; steps: boolean[] }>;

const initial = (): Progress =>
  Object.fromEntries(
    methods.map((m) => [
      m.id,
      { materials: m.materials.map(() => false), steps: m.steps.map(() => false) },
    ]),
  );

export default function ProcessingGuide() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState<Progress>(initial);
  const method = methods[active];
  const state = progress[method.id];
  const done = state.steps.filter(Boolean).length;

  const toggle = (kind: "materials" | "steps", idx: number) =>
    setProgress((p) => {
      const next = { ...p[method.id], [kind]: [...p[method.id][kind]] };
      next[kind][idx] = !next[kind][idx];
      return { ...p, [method.id]: next };
    });

  const reset = () =>
    setProgress((p) => ({
      ...p,
      [method.id]: { materials: method.materials.map(() => false), steps: method.steps.map(() => false) },
    }));

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (active + delta + methods.length) % methods.length;
    setActive(next);
    document.getElementById(`tab-${methods[next].id}`)?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="วิธีแปรรูป" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {methods.map((m, i) => {
          const selected = i === active;
          return (
            <button
              key={m.id}
              id={`tab-${m.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`panel-${m.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={onTabKey}
              className={`min-h-11 cursor-pointer rounded-2xl border-2 p-4 text-left transition-colors duration-200 ${
                selected
                  ? "border-orange bg-orange text-ink"
                  : "border-line bg-white hover:border-orange"
              }`}
            >
              <span className="block text-lg font-bold">{m.tab}</span>
              <span className={`block text-base ${selected ? "text-ink/80" : "text-ink-soft"}`}>{m.tabSub}</span>
            </button>
          );
        })}
      </div>

      <div
        id={`panel-${method.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${method.id}`}
        key={method.id}
        className="anim-rise mt-5 rounded-[2rem] bg-paper-deep p-4 sm:p-8"
      >
        <h3 className="text-3xl font-bold text-ink">{method.title}</h3>
        <p className="mt-3 max-w-3xl text-lg text-ink">{method.intro}</p>
        <ul className="mt-4 flex flex-wrap gap-2 text-base">
          <li className="rounded-full bg-orange px-3 py-1 font-semibold text-ink">ระดับ: {method.level}</li>
          {method.durations.map((d) => (
            <li key={d} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-ink">
              <Icon name="clock" size={16} />
              {d}
            </li>
          ))}
        </ul>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <section aria-labelledby={`mat-${method.id}`}>
            <h4 id={`mat-${method.id}`} className="text-xl font-bold">
              วัสดุและอุปกรณ์
            </h4>
            <p className="text-base text-ink-soft">แตะเพื่อเช็กว่าเตรียมแล้ว</p>
            <ul className="mt-3 space-y-2">
              {method.materials.map((mat, i) => (
                <li key={mat}>
                  <CheckRow checked={state.materials[i]} onToggle={() => toggle("materials", i)}>
                    {mat}
                  </CheckRow>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby={`steps-${method.id}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h4 id={`steps-${method.id}`} className="text-xl font-bold">
                ขั้นตอน
              </h4>
              <p className="tabular text-base text-ink-soft" aria-live="polite">
                ทำแล้ว {done}/{method.steps.length} ขั้น
              </p>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white">
              <div
                className="h-full origin-left rounded-full bg-orange transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                style={{ transform: `scaleX(${done / method.steps.length})` }}
              />
            </div>
            <ol className="mt-4 space-y-2">
              {method.steps.map((s, i) => (
                <li key={s.title}>
                  <CheckRow checked={state.steps[i]} onToggle={() => toggle("steps", i)} index={i + 1}>
                    <span className="block font-bold">{s.title}</span>
                    <span className="block text-ink-soft">{s.text}</span>
                  </CheckRow>
                </li>
              ))}
            </ol>
            <div className="mt-4">
              <PillButton onClick={reset} disabled={done === 0 && !state.materials.some(Boolean)}>
                <Icon name="reset" />
                เริ่มใหม่
              </PillButton>
            </div>
          </section>
        </div>

        <p role="note" className="mt-8 flex gap-3 rounded-2xl bg-danger-wash p-5 text-ink">
          <span className="mt-1 shrink-0 text-danger">
            <Icon name="alert" />
          </span>
          <span>
            <strong className="text-danger">ข้อควรระวัง </strong>
            {method.warning}
          </span>
        </p>
      </div>
    </div>
  );
}

function CheckRow({
  checked,
  onToggle,
  children,
  index,
}: {
  checked: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  index?: number;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onToggle}
      className={`flex min-h-11 w-full cursor-pointer items-start gap-3 rounded-2xl border-2 p-3 text-left text-lg transition-colors duration-200 ${
        checked ? "border-orange bg-orange-wash" : "border-transparent bg-white hover:border-orange"
      }`}
    >
      <span
        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-base font-bold transition-colors duration-200 ${
          checked ? "border-orange bg-orange text-ink" : "border-orange-ink text-orange-ink"
        }`}
        aria-hidden="true"
      >
        {checked ? <Icon name="check" size={16} /> : index ?? ""}
      </span>
      <span className={checked ? "text-ink" : ""}>{children}</span>
    </button>
  );
}
