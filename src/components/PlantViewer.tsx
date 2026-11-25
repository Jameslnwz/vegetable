"use client";

import { useEffect, useRef, useState } from "react";
import { parts, type PartId } from "@/content/plant";

const MIN_ZOOM = 1;
const MAX_ZOOM = 2.5;
const STEP = 0.25;

// รูปแบบต้นผักตบ วาดเป็นเส้นแบบภาพประกอบพฤกษศาสตร์ (viewBox 720 x 520)
export default function PlantViewer() {
  const [selected, setSelected] = useState<PartId>("flower");
  const [zoom, setZoom] = useState(1);
  const [showLabels, setShowLabels] = useState(false);

  const current = parts.find((p) => p.id === selected) ?? parts[0];
  const frameRef = useRef<HTMLDivElement>(null);

  // เมื่อซูมหรือเลือกส่วนใหม่ เลื่อนภาพให้ส่วนที่เลือกอยู่กลางกรอบ
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const id = requestAnimationFrame(() => {
      const left = (current.anchor.x / 720) * frame.scrollWidth - frame.clientWidth / 2;
      const top = (current.anchor.y / 520) * frame.scrollHeight - frame.clientHeight / 2;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      frame.scrollTo({ left, top, behavior: reduce ? "auto" : "smooth" });
    });
    return () => cancelAnimationFrame(id);
  }, [zoom, current]);

  const zoomIn = () => setZoom((z) => Math.min(MAX_ZOOM, +(z + STEP).toFixed(2)));
  const zoomOut = () => setZoom((z) => Math.max(MIN_ZOOM, +(z - STEP).toFixed(2)));
  const reset = () => setZoom(1);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start">
      <div>
        <div className="flex flex-wrap items-center gap-2 pb-4">
          <ToolButton onClick={zoomIn} disabled={zoom >= MAX_ZOOM} label="ซูมเข้า">
            <PlusIcon />
            ซูมเข้า
          </ToolButton>
          <ToolButton onClick={zoomOut} disabled={zoom <= MIN_ZOOM} label="ซูมออก">
            <MinusIcon />
            ซูมออก
          </ToolButton>
          <ToolButton onClick={reset} disabled={zoom === 1} label="รีเซ็ตการซูม">
            <ResetIcon />
            รีเซ็ต
          </ToolButton>
          <button
            type="button"
            aria-pressed={showLabels}
            onClick={() => setShowLabels((v) => !v)}
            className={`ml-auto inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-base font-medium transition-colors duration-200 ${
              showLabels
                ? "bg-teal text-paper"
                : "border border-teal text-teal hover:bg-teal-wash"
            }`}
          >
            <TagIcon />
            {showLabels ? "ซ่อนชื่อส่วน" : "ดูโครงสร้าง"}
          </button>
        </div>

        <div
          ref={frameRef}
          className="relative max-h-[70vh] overflow-auto overscroll-contain rounded-2xl border border-line bg-paper-deep"
        >
          <div
            className="transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ width: `${zoom * 100}%` }}
          >
            <svg
              viewBox="0 0 720 520"
              role="group"
              aria-label="แผนภาพโครงสร้างต้นผักตบ กดที่ส่วนต่างๆ เพื่อดูคำอธิบาย"
              className="block h-auto w-full"
            >
              <Water />

              {/* ไหลและต้นลูก */}
              <g fill="none" stroke="var(--violet)" strokeWidth="6" strokeLinecap="round">
                <path d="M300 306 C 340 300, 380 318, 430 326 S 500 330, 540 320" />
              </g>
              <Plantlet cx={556} cy={318} />

              {/* ราก */}
              <g fill="none" stroke="#3d2f4a" strokeWidth="2" strokeLinecap="round" opacity="0.85">
                <path d="M300 304 C 290 340, 272 370, 282 420" />
                <path d="M300 304 C 300 350, 310 390, 298 440" />
                <path d="M300 304 C 312 340, 330 380, 322 430" />
                <path d="M300 304 C 280 330, 252 350, 246 400" />
                <path d="M300 304 C 320 330, 346 360, 352 410" />
                <path d="M300 304 C 306 330, 318 360, 314 470" />
                <path d="M300 304 C 286 340, 276 380, 268 462" />
              </g>

              {/* ก้านใบพอง (ทุ่น) */}
              <g fill="var(--teal-wash)" stroke="var(--teal)" strokeWidth="2.5" className="anim-bob">
                <ellipse cx="230" cy="262" rx="12" ry="34" transform="rotate(-18 230 262)" />
                <ellipse cx="300" cy="256" rx="13" ry="38" />
                <ellipse cx="368" cy="262" rx="12" ry="34" transform="rotate(18 368 262)" />
              </g>

              {/* แผ่นใบ */}
              <g fill="#7f9f6a" stroke="#4d6b3c" strokeWidth="2">
                <ellipse cx="200" cy="198" rx="62" ry="30" transform="rotate(-28 200 198)" />
                <ellipse cx="420" cy="198" rx="62" ry="30" transform="rotate(28 420 198)" />
                <ellipse cx="310" cy="172" rx="70" ry="32" />
              </g>
              <g fill="none" stroke="#4d6b3c" strokeWidth="1.5" strokeLinecap="round" opacity="0.6">
                <path d="M310 172 L310 206" />
                <path d="M200 198 L240 186" />
                <path d="M420 198 L380 186" />
              </g>

              {/* ช่อดอก */}
              <path d="M310 172 C 318 130, 330 100, 360 74" fill="none" stroke="#4d6b3c" strokeWidth="4" strokeLinecap="round" />
              <g className="anim-bob" fill="var(--violet)" stroke="var(--violet)" strokeWidth="1.5">
                <circle cx="342" cy="104" r="11" />
                <circle cx="372" cy="90" r="11" />
                <circle cx="356" cy="70" r="10" />
                <circle cx="330" cy="130" r="9" fill="#8d6cba" />
              </g>
              <circle cx="356" cy="76" r="3.5" fill="var(--sun)" />

              {/* ผลแคปซูล */}
              <path d="M330 206 Q 430 190 500 228" fill="none" stroke="#4d6b3c" strokeWidth="3" strokeLinecap="round" />
              <ellipse cx="548" cy="234" rx="14" ry="22" transform="rotate(-30 548 234)" fill="#8a6a3f" stroke="#5a4325" strokeWidth="2" />

              {/* จุดกด (hotspot) */}
              {parts.map((p) => (
                <Hotspot
                  key={p.id}
                  part={p}
                  active={p.id === selected}
                  onSelect={() => setSelected(p.id)}
                />
              ))}

              {/* ป้ายชื่อ */}
              {showLabels &&
                parts.map((p) => (
                  <g key={`label-${p.id}`} pointerEvents="none">
                    <line
                      x1={p.label.x + (p.label.anchorSide === "start" ? -6 : 6)}
                      y1={p.label.y - 6}
                      x2={p.anchor.x}
                      y2={p.anchor.y}
                      stroke="var(--ink)"
                      strokeWidth="1.25"
                      strokeDasharray="4 4"
                      opacity="0.7"
                    />
                    <text
                      x={p.label.x}
                      y={p.label.y}
                      textAnchor={p.label.anchorSide === "start" ? "start" : "end"}
                      fontSize="20"
                      fontFamily="var(--font-body)"
                      fill="var(--ink)"
                      stroke="var(--paper-deep)"
                      strokeWidth="5"
                      paintOrder="stroke"
                    >
                      {p.name}
                    </text>
                  </g>
                ))}
            </svg>
          </div>
        </div>

        <p className="pt-3 text-base text-ink-soft">
          กดที่จุดในภาพหรือเลือกจากรายการด้านขวาเพื่ออ่านคำอธิบาย ใช้ปุ่มซูมเพื่อดูรายละเอียด
        </p>
      </div>

      <aside aria-live="polite" className="space-y-6">
        <nav aria-label="ส่วนของต้นผักตบ">
          <ul className="flex flex-wrap gap-2">
            {parts.map((p) => {
              const active = p.id === selected;
              return (
                <li key={p.id}>
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelected(p.id)}
                    className={`min-h-11 rounded-full px-4 text-base transition-colors duration-200 ${
                      active
                        ? "bg-violet text-paper"
                        : "border border-line bg-paper hover:border-violet hover:text-violet"
                    }`}
                  >
                    {p.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div
          key={current.id}
          className="anim-rise rounded-2xl border border-violet/30 bg-violet-wash/60 p-6"
        >
          <h3 className="text-2xl font-bold text-ink">{current.name}</h3>
          <p className="mt-2 font-medium text-violet">{current.summary}</p>
          <p className="mt-4 text-ink">{current.detail}</p>
        </div>
      </aside>
    </div>
  );
}

function Water() {
  return (
    <g>
      <rect x="0" y="302" width="720" height="218" fill="var(--teal-wash)" />
      <g className="anim-wave">
        <path
          d="M0 302 Q 40 290 80 302 T 160 302 T 240 302 T 320 302 T 400 302 T 480 302 T 560 302 T 640 302 T 720 302 T 800 302 T 880 302 V 330 H 0 Z"
          fill="var(--teal)"
          opacity="0.35"
        />
      </g>
      <path
        d="M0 302 Q 60 296 120 302 T 240 302 T 360 302 T 480 302 T 600 302 T 720 302"
        fill="none"
        stroke="var(--teal)"
        strokeWidth="2"
        opacity="0.6"
      />
    </g>
  );
}

function Plantlet({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g className="anim-rise" fill="#7f9f6a" stroke="#4d6b3c" strokeWidth="2">
      <ellipse cx={cx - 14} cy={cy - 10} rx="18" ry="9" transform={`rotate(-30 ${cx - 14} ${cy - 10})`} />
      <ellipse cx={cx + 12} cy={cy - 12} rx="18" ry="9" transform={`rotate(30 ${cx + 12} ${cy - 12})`} />
      <ellipse cx={cx} cy={cy - 2} rx="20" ry="10" />
    </g>
  );
}

function Hotspot({
  part,
  active,
  onSelect,
}: {
  part: (typeof parts)[number];
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <g
      role="button"
      tabIndex={0}
      aria-pressed={active}
      aria-label={`${part.name}: ${part.summary}`}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className="cursor-pointer outline-none"
    >
      <circle cx={part.anchor.x} cy={part.anchor.y} r="30" fill="transparent" />
      {active && (
        <circle
          cx={part.anchor.x}
          cy={part.anchor.y}
          r="22"
          fill="none"
          stroke="var(--violet)"
          strokeWidth="2.5"
          className="anim-pulse"
        />
      )}
      <circle
        cx={part.anchor.x}
        cy={part.anchor.y}
        r={active ? 9 : 7}
        fill={active ? "var(--violet)" : "var(--paper)"}
        stroke="var(--violet)"
        strokeWidth="2.5"
        style={{ transition: "r 200ms ease, fill 200ms ease" }}
      />
    </g>
  );
}

function ToolButton({
  children,
  onClick,
  disabled,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-paper px-4 text-base font-medium transition-colors duration-200 hover:border-teal hover:text-teal disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function IconBase({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const PlusIcon = () => (
  <IconBase>
    <path d="M12 5v14M5 12h14" />
  </IconBase>
);
const MinusIcon = () => (
  <IconBase>
    <path d="M5 12h14" />
  </IconBase>
);
const ResetIcon = () => (
  <IconBase>
    <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
    <path d="M3 3v5h5" />
  </IconBase>
);
const TagIcon = () => (
  <IconBase>
    <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z" />
    <circle cx="7.5" cy="7.5" r="1.5" />
  </IconBase>
);
