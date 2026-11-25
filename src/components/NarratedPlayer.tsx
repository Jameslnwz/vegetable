"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SPEEDS, hush, speak, useNarrationSettings } from "@/lib/narration";
import { Icon, PillButton } from "./ui";

// สคริปต์บรรยาย: แต่ละช่วงมีข้อความ และอาจเลื่อนค่า (เช่น วันที่) จาก p0 ไป p1 ระหว่างช่วง
export type Seg = { text: string; ms?: number; p0?: number; p1?: number; on?: () => void };
export type Status = "idle" | "playing" | "paused" | "ended";

const readMs = (t: string) => Math.max(3600, t.length * 78);
const clamp = (x: number) => Math.max(0, Math.min(1, x));
const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

type Options = {
  script: Seg[];
  onSegment?: (i: number) => void;
  onValue?: (v: number) => void;
  onEnd?: () => void;
};

export function useNarratedPlayer(opts: Options) {
  const av = useNarrationSettings();
  const [status, setStatus] = useState<Status>("idle");
  const [index, setIndex] = useState(0);
  const [segMs, setSegMs] = useState(0);

  const optsRef = useRef(opts);
  const avRef = useRef(av);
  const statusRef = useRef<Status>("idle");
  const indexRef = useRef(0);
  const token = useRef(0);
  const raf = useRef(0);
  const startRef = useRef<(i: number) => void>(() => {});

  useEffect(() => {
    optsRef.current = opts;
    avRef.current = av;
  });

  const set = (s: Status) => {
    statusRef.current = s;
    setStatus(s);
  };

  const halt = useCallback(() => {
    token.current++;
    cancelAnimationFrame(raf.current);
    hush();
  }, []);

  const start = useCallback(
    (i: number) => {
      halt();
      const id = token.current;
      const { script, onSegment, onValue, onEnd } = optsRef.current;
      if (i >= script.length) {
        set("ended");
        onEnd?.();
        return;
      }
      const { speed, voice } = avRef.current;
      const seg = script[i];
      const ms = Math.round((seg.ms ?? readMs(seg.text)) / speed);
      indexRef.current = i;
      setIndex(i);
      setSegMs(ms);
      set("playing");
      onSegment?.(i);
      seg.on?.();

      const next = () => {
        if (id === token.current) startRef.current(i + 1);
      };
      const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let animDone = false;
      let voiced = !voice;
      if (voice) {
        speak(seg.text, speed, (failed) => {
          if (id !== token.current) return;
          if (failed) avRef.current.fail();
          voiced = true;
          if (animDone) next();
        });
      }
      const t0 = performance.now();
      const frame = (now: number) => {
        if (id !== token.current) return;
        const e = clamp((now - t0) / ms);
        if (seg.p0 != null && seg.p1 != null) {
          const k = still ? 1 : clamp(e / 0.8);
          onValue?.(seg.p0 + (seg.p1 - seg.p0) * ease(k));
        }
        if (e < 1) raf.current = requestAnimationFrame(frame);
        else {
          animDone = true;
          if (voiced) next();
        }
      };
      raf.current = requestAnimationFrame(frame);
    },
    [halt],
  );

  useEffect(() => {
    startRef.current = start;
  }, [start]);

  const play = useCallback(
    (from?: number) => {
      const s = statusRef.current;
      if (from != null) return start(from);
      if (s === "ended" || s === "idle") return start(s === "idle" ? indexRef.current : 0);
      start(indexRef.current);
    },
    [start],
  );

  const pause = useCallback(() => {
    halt();
    set("paused");
  }, [halt]);

  // หยุดและกลับเป็นสถานะเริ่มต้น (ใช้เมื่อผู้ใช้กดเลือกขั้นเอง)
  const stop = useCallback(() => {
    halt();
    set("idle");
  }, [halt]);

  // เลื่อนไปช่วงที่ต้องการโดยไม่เล่น (กดเล่นแล้วจะเริ่มจากช่วงนี้)
  const seek = useCallback(
    (i: number) => {
      halt();
      indexRef.current = i;
      setIndex(i);
      set("idle");
    },
    [halt],
  );

  const toggle = useCallback(() => {
    if (statusRef.current === "playing") pause();
    else play();
  }, [pause, play]);

  // เปลี่ยนความเร็วหรือเปิด/ปิดเสียงระหว่างเล่น: เริ่มช่วงปัจจุบันใหม่ด้วยค่าใหม่
  useEffect(() => {
    if (statusRef.current === "playing") start(indexRef.current);
  }, [av.speed, av.voice, start]);

  useEffect(() => halt, [halt]);

  return { status, index, segMs, total: opts.script.length, text: opts.script[index]?.text ?? "", play, pause, stop, seek, toggle, av };
}

export type Player = ReturnType<typeof useNarratedPlayer>;

// กล่องคำบรรยาย (มีแถบความคืบหน้า) และแถวปุ่ม: เล่น · ความเร็ว (กดวน) · เสียงบรรยาย
export function NarrationControls({
  player,
  idleLabel = "เล่นพร้อมคำบรรยาย",
  idleText,
  children,
}: {
  player: Player;
  idleLabel?: string;
  idleText?: string;
  children?: React.ReactNode;
}) {
  const { status, index, segMs, total, av } = player;
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    if (status === "playing") {
      el.style.transition = "none";
      el.style.width = "0";
      void el.offsetWidth;
      el.style.transition = `width ${segMs}ms linear`;
      el.style.width = "100%";
    } else if (status === "paused") {
      el.style.width = getComputedStyle(el).width;
      el.style.transition = "none";
    } else {
      el.style.transition = "none";
      el.style.width = "0";
    }
  }, [status, index, segMs]);

  const label =
    status === "playing" ? "หยุด" : status === "paused" ? "เล่นต่อ" : status === "ended" ? "เล่นอีกครั้ง" : idleLabel;
  const live = status === "playing" || status === "paused";
  const text = live || status === "ended" ? player.text : idleText;
  const nextSpeed = SPEEDS[(SPEEDS.indexOf(av.speed) + 1) % SPEEDS.length];

  return (
    <div className="narration">
      {text && (
        <div className={`subtitle ${live ? "is-live" : ""}`}>
          {live && (
            <span className="tabular subtitle-count" aria-hidden="true">
              {index + 1}/{total}
            </span>
          )}
          <p key={live ? index : -1} className={live ? "anim-rise-sm" : ""} aria-live="polite">
            {text}
          </p>
          <span className="sbar-track" aria-hidden="true">
            <span ref={bar} className="sbar-fill" />
          </span>
        </div>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {children}
        <PillButton tone="solid" onClick={player.toggle}>
          <Icon name={status === "playing" ? "pause" : "play"} />
          {label}
        </PillButton>
        <PillButton onClick={() => av.setSpeed(nextSpeed)} label={`ความเร็ว ${av.speed} เท่า กดเพื่อเปลี่ยนเป็น ${nextSpeed} เท่า`}>
          <Icon name="fast" />
          <span className="tabular min-w-[3.2ch] font-semibold">{av.speed}x</span>
        </PillButton>
        <PillButton pressed={av.voice} onClick={() => av.setVoice(!av.voice)}>
          <Icon name={av.voice ? "speaker" : "mute"} />
          เสียงบรรยาย: {av.voice ? "เปิด" : "ปิด"}
        </PillButton>
      </div>
      <p role="status" className="mt-2 min-h-6 text-base text-ink-soft">
        {av.notice}
      </p>
    </div>
  );
}
