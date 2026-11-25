"use client";

import { useState } from "react";
import { flowerTimeline } from "@/content/plant";

// เลื่อนแถบเวลาเพื่อดูว่าเกิดอะไรขึ้นหลังดอกบาน
export default function FlowerTimeline() {
  const [i, setI] = useState(0);
  const stage = flowerTimeline[i];
  const last = flowerTimeline.length - 1;

  return (
    <div className="rounded-[1.75rem] bg-paper-deep p-4 sm:p-6">
      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center">
        <div className="rounded-2xl bg-white p-2">
          <StageArt stage={i} />
        </div>
        <div aria-live="polite" key={i} className="anim-rise">
          <p className="text-base font-medium text-violet">{stage.when}</p>
          <h4 className="mt-1 text-2xl font-bold text-ink">{stage.title}</h4>
          <p className="mt-3 text-lg text-ink">{stage.text}</p>
        </div>
      </div>

      <label className="mt-6 block">
        <span className="sr-only">เลื่อนแถบเวลา</span>
        <input
          type="range"
          min={0}
          max={last}
          step={1}
          value={i}
          onChange={(e) => setI(Number(e.target.value))}
          className="w-full accent-[var(--violet)]"
          aria-valuetext={`${stage.when}: ${stage.title}`}
        />
      </label>
      <ol className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-6">
        {flowerTimeline.map((s, idx) => (
          <li key={s.when}>
            <button
              type="button"
              onClick={() => setI(idx)}
              aria-current={idx === i ? "step" : undefined}
              className={`min-h-11 w-full cursor-pointer rounded-lg px-2 text-base transition-colors duration-200 ${
                idx === i ? "bg-violet text-paper" : "text-ink-soft hover:text-violet"
              }`}
            >
              {s.when}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

const T = "all 700ms cubic-bezier(0.16,1,0.3,1)";

function StageArt({ stage }: { stage: number }) {
  const bloom = stage === 1;
  const wilt = stage === 2;
  const bent = stage >= 3 && stage <= 4;
  const seed = stage >= 4;
  const sprout = stage === 5;
  const water = sprout ? 228 : 150;

  return (
    <svg viewBox="0 0 320 260" className="block w-full" role="img" aria-label={flowerTimeline[stage].title}>
      <rect x="0" y={water} width="320" height={260 - water} fill="var(--teal-wash)" style={{ transition: T }} />
      <line x1="0" x2="320" y1={water} y2={water} stroke="var(--teal)" strokeWidth="2" opacity="0.6" style={{ transition: T }} />
      <rect x="0" y="236" width="320" height="24" fill="var(--shape-soil)" opacity="0.5" />

      {!sprout && (
        <g>
          {/* ใบ */}
          <ellipse cx="120" cy="140" rx="40" ry="18" fill="var(--shape-leaf)" transform="rotate(-20 120 140)" />
          <ellipse cx="196" cy="140" rx="40" ry="18" fill="var(--shape-leaf)" transform="rotate(20 196 140)" />
          {/* ก้านช่อดอก */}
          <g
            style={{
              transform: bent ? "rotate(118deg)" : "rotate(0deg)",
              transformOrigin: "160px 140px",
              transition: T,
            }}
          >
            <line x1="160" y1="140" x2="160" y2={stage === 0 ? 70 : 50} stroke="var(--shape-stem)" strokeWidth="4" style={{ transition: T }} />
            {[0, 1, 2, 3].map((k) => {
              const y = 60 + k * 16;
              const r = bloom ? 12 : wilt ? 6 : stage === 0 ? 5 : 0;
              return (
                <circle
                  key={k}
                  cx={160 + (k % 2 ? 10 : -10)}
                  cy={y}
                  r={r}
                  fill={wilt ? "var(--shape-wilt)" : "var(--violet)"}
                  style={{ transition: T }}
                />
              );
            })}
            {bloom && <circle cx="150" cy="60" r="3" fill="var(--sun)" />}
            {bent && <ellipse cx="160" cy="58" rx="9" ry="14" fill="var(--shape-fruit)" />}
          </g>
          {/* ผึ้ง */}
          {bloom && (
            <g className="anim-bob">
              <ellipse cx="214" cy="62" rx="10" ry="7" fill="var(--sun)" stroke="var(--ink)" strokeWidth="1.5" />
              <ellipse cx="210" cy="54" rx="6" ry="4" fill="#ffffff" opacity="0.8" />
            </g>
          )}
        </g>
      )}

      {/* เมล็ดจมลงตะกอน */}
      {seed &&
        [0, 1, 2, 3, 4].map((k) => (
          <circle key={k} cx={120 + k * 22} cy={sprout ? 244 : 240} r="3" fill="var(--shape-soil-dark)" style={{ transition: T }} />
        ))}

      {/* ต้นกล้า */}
      {sprout &&
        [0, 2, 4].map((k) => (
          <g key={k} className="anim-rise" style={{ animationDelay: `${k * 80}ms` }}>
            <line x1={120 + k * 22} y1="240" x2={120 + k * 22} y2="214" stroke="var(--shape-stem)" strokeWidth="2.5" />
            <ellipse cx={120 + k * 22 - 7} cy="212" rx="8" ry="4" fill="var(--shape-leaf)" />
            <ellipse cx={120 + k * 22 + 7} cy="210" rx="8" ry="4" fill="var(--shape-leaf)" />
          </g>
        ))}
    </svg>
  );
}
