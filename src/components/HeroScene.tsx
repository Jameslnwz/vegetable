"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Hyacinth } from "./art/Hyacinth";

// ฉากผิวน้ำในส่วนแรกของหน้า: กอผักตบลอยเข้ามา ดอกบาน แตะน้ำแล้วเกิดวงคลื่น
const SURFACE = 190;

const ROSETTES = [
  { x: 150, s: 0.85, d: 0, flower: true },
  { x: 380, s: 0.62, d: 140, flower: false },
  { x: 590, s: 1.05, d: 280, flower: true },
  { x: 830, s: 0.72, d: 420, flower: false },
  { x: 1050, s: 0.95, d: 560, flower: true },
  { x: 1280, s: 0.7, d: 700, flower: false },
  { x: 1420, s: 0.9, d: 840, flower: true },
];

type Ripple = { id: number; x: number; y: number };

export default function HeroScene() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const nextId = useRef(0);
  const visible = useRef(true);

  const addRipple = (x: number, y: number) => {
    const id = nextId.current++;
    setRipples((r) => [...r.slice(-8), { id, x, y }]);
  };

  // หยดน้ำตกเป็นระยะ หยุดเมื่อฉากพ้นจอหรือผู้ใช้ตั้งค่าลดการเคลื่อนไหว
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting));
    io.observe(el);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = reduce
      ? undefined
      : window.setInterval(() => {
          if (!visible.current || document.hidden) return;
          addRipple(80 + Math.random() * 1280, SURFACE + 20 + Math.random() * 90);
        }, 2400);
    return () => {
      io.disconnect();
      if (id) window.clearInterval(id);
    };
  }, []);

  const onPointerDown = (e: PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    const ctm = svg?.getScreenCTM();
    if (!svg || !ctm) return;
    const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
    addRipple(pt.x, Math.max(SURFACE + 6, pt.y));
  };

  return (
    <div data-loop className="relative -mt-10 select-none">
      <svg
        ref={svgRef}
        viewBox="0 0 1440 340"
        preserveAspectRatio="xMidYMax slice"
        className="block h-[250px] w-full cursor-pointer touch-manipulation sm:h-[340px]"
        onPointerDown={onPointerDown}
        role="img"
        aria-label="ภาพประกอบ กอผักตบชวาลอยอยู่บนผิวน้ำ ออกดอกสีม่วง แตะที่ผิวน้ำเพื่อให้เกิดวงคลื่น"
      >
        <defs>
          <linearGradient id="water" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="var(--water-1)" />
            <stop offset="0.45" stopColor="var(--water-2)" />
            <stop offset="1" stopColor="var(--water-3)" />
          </linearGradient>
        </defs>

        {/* น้ำ */}
        <rect x="0" y={SURFACE} width="1440" height={340 - SURFACE} fill="url(#water)" />
        <g className="anim-wave">
          <path
            d={`M0 ${SURFACE} ${Array.from({ length: 20 }, (_, i) => `Q ${i * 80 + 40} ${SURFACE - 9} ${(i + 1) * 80} ${SURFACE}`).join(" ")} V ${SURFACE + 14} H 0 Z`}
            fill="var(--water-1)"
          />
        </g>

        {/* แสงระยิบบนผิวน้ำ */}
        {[120, 300, 520, 760, 980, 1190, 1360].map((x, i) => (
          <line
            key={x}
            x1={x}
            x2={x + 46}
            y1={SURFACE + 26 + (i % 3) * 22}
            y2={SURFACE + 26 + (i % 3) * 22}
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="shimmer"
            style={{ ["--d" as string]: `${i * 0.6}s` }}
          />
        ))}

        {/* กอผักตบ */}
        {ROSETTES.map((r) => (
          <g
            key={r.x}
            transform={`translate(${r.x} ${SURFACE}) scale(${r.s})`}
          >
            <g className="rosette" style={{ ["--d" as string]: `${r.d}ms` }}>
              <g className="rosette-bob" style={{ ["--bob" as string]: `${(r.d / 1000) * 1.7}s` }}>
                <Rosette flower={r.flower} bloomDelay={r.d + 800} />
              </g>
            </g>
          </g>
        ))}

        {/* วงคลื่น */}
        {ripples.map((rp) => (
          <g key={rp.id} pointerEvents="none">
            <ellipse
              cx={rp.x}
              cy={rp.y}
              rx="46"
              ry="12"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              className="ripple"
              onAnimationEnd={() => setRipples((all) => all.filter((x) => x.id !== rp.id))}
            />
            <ellipse
              cx={rp.x}
              cy={rp.y}
              rx="30"
              ry="8"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.5"
              className="ripple"
              style={{ animationDelay: "180ms" }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

function Rosette({ flower, bloomDelay }: { flower: boolean; bloomDelay: number }) {
  return (
    <Hyacinth
      x={0}
      y={4}
      s={1.15}
      flower={flower}
      spikeClass="spike"
      spikeStyle={{ ["--bob" as string]: `${bloomDelay / 900}s` }}
    />
  );
}
