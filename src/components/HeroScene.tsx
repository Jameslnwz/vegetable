"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";

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
          <linearGradient id="leafShade" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#86b06f" />
            <stop offset="1" stopColor="#5b8749" />
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
    <g>
      {/* ราก */}
      <g fill="none" stroke="#2c2238" strokeWidth="1.6" opacity="0.4" strokeLinecap="round">
        <path d="M0 6 C -8 40, -22 60, -18 104" />
        <path d="M0 6 C 2 46, 10 70, 4 120" />
        <path d="M0 6 C 10 36, 24 58, 26 96" />
        <path d="M0 6 C -4 30, -34 50, -40 84" />
      </g>
      {/* ก้านใบพอง */}
      <g fill="#bcd8ae" stroke="#4d6b3c" strokeWidth="2">
        <ellipse cx="-22" cy="-16" rx="9" ry="19" transform="rotate(-22 -22 -16)" />
        <ellipse cx="22" cy="-16" rx="9" ry="19" transform="rotate(22 22 -16)" />
        <ellipse cx="0" cy="-20" rx="10" ry="21" />
      </g>
      {/* ใบ */}
      <g fill="url(#leafShade)" stroke="#3f6131" strokeWidth="2">
        <ellipse cx="-42" cy="-50" rx="32" ry="18" transform="rotate(-32 -42 -50)" />
        <ellipse cx="42" cy="-50" rx="32" ry="18" transform="rotate(32 42 -50)" />
        <ellipse cx="0" cy="-62" rx="34" ry="19" />
      </g>
      <g fill="#ffffff" opacity="0.22">
        <ellipse cx="-8" cy="-68" rx="14" ry="5" />
        <ellipse cx="-48" cy="-56" rx="11" ry="4" transform="rotate(-32 -48 -56)" />
      </g>
      {flower && (
        <g className="spike" style={{ ["--bob" as string]: `${bloomDelay / 900}s` }}>
          <path d="M4 -70 C 8 -100, 14 -126, 12 -156" fill="none" stroke="#3f6131" strokeWidth="4" strokeLinecap="round" />
          {[
            [12, -150, 0],
            [-2, -136, 1],
            [24, -128, 2],
            [6, -116, 3],
            [22, -104, 4],
          ].map(([x, y, k]) => (
            <g key={k} transform={`translate(${x} ${y})`}>
              <g className="bloom" style={{ ["--bd" as string]: `${bloomDelay + k * 110}ms` }}>
                <Blossom />
              </g>
            </g>
          ))}
        </g>
      )}
    </g>
  );
}

function Blossom() {
  return (
    <g>
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <ellipse key={a} cx="0" cy="-7" rx="4.6" ry="8" fill={a === 0 ? "#8e6cc4" : "#7a58b2"} transform={`rotate(${a})`} />
      ))}
      <ellipse cx="0" cy="-7" rx="2" ry="3" fill="var(--sun)" />
      <circle cx="0" cy="0" r="2.4" fill="#4b3478" />
    </g>
  );
}
