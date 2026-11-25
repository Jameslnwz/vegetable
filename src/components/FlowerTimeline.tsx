"use client";

import { useState } from "react";
import { flowerScript, flowerTimeline } from "@/content/plant";
import { NarrationControls, useNarratedPlayer } from "./NarratedPlayer";

// จากดอกหนึ่งวันสู่เมล็ดในตะกอน: ฉากเดียวที่เปลี่ยนตามช่วงเวลา (ท้องฟ้า ดอก ก้านช่อ เมล็ด น้ำ)
const SKY = ["#26385a", "#d3e6f2", "#f1cba4", "#d9eaf2", "#d9eaf2", "#dfedf3"];
const FL = [
  [200, 52],
  [190, 64],
  [210, 66],
  [192, 80],
  [208, 82],
  [200, 94],
];
const SEEDS = Array.from({ length: 14 }, (_, i) => [262 + (i % 5) * 4, 200 + Math.floor(i / 5) * 5, -30 + i * 7.5, 62 + (i % 3) * 8]);

function Scene({ p }: { p: number }) {
  return (
    <svg
      viewBox="0 0 400 300"
      className="ss block w-full rounded-2xl border border-line"
      data-p={p}
      role="img"
      aria-label={`ฉาก${flowerTimeline[p].when}: ${flowerTimeline[p].title}`}
    >
      <rect className="sky" width="400" height="160" style={{ fill: SKY[p] }} />
      <circle className="moon" cx="330" cy="40" r="14" fill="#f5f1d8" />
      <circle className="sun" cx="330" cy="44" r="20" fill="#f2c230" />
      <circle className="dusk" cx="330" cy="128" r="28" fill="#eea36b" />
      <rect y="140" width="400" height="160" fill="#a3b07c" />
      <path d="M0 150 C100 144 220 156 400 148 V300 H0Z" fill="#8d9b66" />
      <g className="wt">
        <rect y="146" width="400" height="160" fill="url(#hy-water)" />
        <path d="M0 146H400" stroke="#fff" strokeOpacity=".75" strokeWidth="2" />
      </g>
      <path d="M0 262 C80 256 160 268 240 260 C310 254 360 264 400 258 V300 H0Z" fill="#7a5a43" />
      <g fill="#5e4433">
        {[
          [40, 278],
          [90, 284],
          [150, 276],
          [210, 288],
          [330, 280],
          [370, 290],
        ].map(([x, y]) => (
          <ellipse key={x} cx={x} cy={y} rx="6" ry="2.5" />
        ))}
      </g>
      {SEEDS.map(([x, y, dx, dy], i) => (
        <ellipse
          key={i}
          className="sd"
          cx={x}
          cy={y}
          rx="2.6"
          ry="1.4"
          fill="#3b2a1e"
          style={{ ["--sx" as string]: `${dx}px`, ["--sy" as string]: `${dy}px` }}
        />
      ))}
      {[
        [118, 264],
        [150, 266],
        [318, 262],
      ].map(([x, y]) => (
        <g key={x} className="sl">
          <path d={`M${x} ${y} v-10`} stroke="#4f8f6e" strokeWidth="2" />
          <ellipse cx={x - 5} cy={y - 12} rx="5" ry="3" fill="#5fae80" transform={`rotate(-30 ${x - 5} ${y - 12})`} />
          <ellipse cx={x + 5} cy={y - 13} rx="5" ry="3" fill="#5fae80" transform={`rotate(30 ${x + 5} ${y - 13})`} />
        </g>
      ))}
      <g className="flo">
        <use href="#hy-roots" x="176" y="150" width="48" height="72" />
        <g className="spk">
          <path d="M200 146 C201 120 199 86 200 48" stroke="url(#hy-stem)" strokeWidth="3.5" fill="none" />
          {FL.map(([x, y]) => (
            <g key={`f${x}-${y}`} className="fw">
              <use href="#hy-fl" x={x - 9} y={y - 9} width="18" height="18" />
            </g>
          ))}
          {FL.map(([x, y]) => (
            <ellipse key={`c${x}-${y}`} className="cp" cx={x} cy={y} rx="4" ry="7" fill="#6aa77f" stroke="#3f7a5c" strokeWidth="1" />
          ))}
        </g>
        <use href="#hy-leaves" x="152" y="40" width="96" height="112" />
      </g>
      <g className="bee">
        <g>
          <ellipse cx="262" cy="74" rx="8" ry="5" fill="#f2c230" />
          <path d="M259 70v8M264 70v8" stroke="#3a2a10" strokeWidth="2" />
          <ellipse cx="260" cy="67" rx="5" ry="3.5" fill="#fff" opacity=".85" />
          <ellipse cx="266" cy="67" rx="5" ry="3.5" fill="#fff" opacity=".85" />
        </g>
      </g>
    </svg>
  );
}

export default function FlowerTimeline() {
  const [p, setP] = useState(0);
  const stage = flowerTimeline[p];
  const last = flowerTimeline.length - 1;
  const player = useNarratedPlayer({
    script: flowerScript.map((s) => ({ text: s.text, on: s.p != null ? () => setP(s.p!) : undefined })),
  });
  const go = (n: number) => {
    player.seek(flowerScript.findIndex((s) => s.p === n));
    setP(n);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
      <div aria-live="polite" key={p} className="anim-rise-sm">
        <span className="inline-block rounded-lg bg-teal-wash px-3 py-1 text-lg font-semibold text-teal">{stage.when}</span>
        <h4 className="mt-3 text-2xl font-bold text-ink">{stage.title}</h4>
        <p className="mt-2 text-lg text-ink-soft">{stage.text}</p>
      </div>

      <div>
        <Scene p={p} />
        <div className="mt-4">
          <NarrationControls player={player} idleText={stage.text} />
        </div>
        <label className="block">
          <span className="sr-only">เลื่อนแถบเวลา</span>
          <input
            type="range"
            min={0}
            max={last}
            step={1}
            value={p}
            onChange={(e) => go(Number(e.target.value))}
            className="w-full accent-[var(--violet)]"
            aria-valuetext={`${stage.when}: ${stage.title}`}
          />
        </label>
        <ol className="mt-1 grid grid-cols-3 gap-1 sm:grid-cols-6">
          {flowerTimeline.map((s, i) => (
            <li key={s.when}>
              <button
                type="button"
                onClick={() => go(i)}
                aria-current={i === p ? "step" : undefined}
                className={`min-h-11 w-full cursor-pointer rounded-lg px-1 text-base transition-colors duration-200 ${
                  i === p ? "font-semibold text-violet" : "text-ink-soft hover:text-violet"
                }`}
              >
                {s.when}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
