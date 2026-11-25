"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { sayText } from "./say-text";

// ตั้งค่าเสียงบรรยายและความเร็ว ใช้ร่วมกันทุกกราฟิกที่เล่นเองได้
export const SPEEDS = [1, 1.25, 1.5, 1.75, 2] as const;
export type Speed = (typeof SPEEDS)[number];

type Settings = { speed: Speed; voice: boolean };
const KEY = "veg-av";

let settings: Settings = { speed: 1, voice: true };
let loaded = false;
let notice = "";
let noticeTimer: ReturnType<typeof setTimeout> | undefined;
function say(msg: string) {
  notice = msg;
  clearTimeout(noticeTimer);
  noticeTimer = setTimeout(() => {
    notice = "";
    emit();
  }, 4000);
}
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
};

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(settings));
  } catch {
    /* ไม่มี storage ก็ใช้งานต่อได้ */
  }
}

function load() {
  if (loaded) return;
  loaded = true;
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? "{}");
    const next = { ...settings };
    if ((SPEEDS as readonly number[]).includes(v.speed)) next.speed = v.speed;
    if (typeof v.voice === "boolean") next.voice = v.voice;
    if (next.speed !== settings.speed || next.voice !== settings.voice) {
      settings = next;
      emit();
    }
  } catch {
    /* ใช้ค่าเริ่มต้น */
  }
}

// ---------- เสียงอ่านของเบราว์เซอร์ ----------
const synth = (): SpeechSynthesis | null =>
  typeof window !== "undefined" && "speechSynthesis" in window ? window.speechSynthesis : null;

let thVoice: SpeechSynthesisVoice | null = null;
let voiceCount = 0;
let voiceBound = false;

function pickVoice() {
  const s = synth();
  if (!s) return;
  try {
    const all = s.getVoices();
    voiceCount = all.length;
    thVoice = all.find((v) => /^th([-_]|$)/i.test(v.lang)) ?? null;
  } catch {
    /* ข้าม */
  }
}

function bindVoices() {
  const s = synth();
  if (!s || voiceBound) return;
  voiceBound = true;
  pickVoice();
  try {
    s.addEventListener("voiceschanged", pickVoice);
  } catch {
    s.onvoiceschanged = pickVoice;
  }
}

let sayId = 0;
let clip: HTMLAudioElement | null = null;

// เล่นไฟล์เสียงที่สร้างไว้ล่วงหน้า ถ้าเล่นไม่ได้ (ไม่มีไฟล์/ถูกบล็อก) จะเรียก fallback
function playClip(src: string, speed: number, my: number, end: (failed: boolean) => void, fallback: () => void) {
  if (typeof Audio === "undefined") return fallback();
  const a = new Audio(src);
  clip = a;
  a.playbackRate = Math.min(2, speed);
  let settled = false;
  const settle = () => {
    settled = true;
    if (clip === a) clip = null;
  };
  a.onended = () => {
    if (settled) return;
    settle();
    end(false);
  };
  const failed = () => {
    if (settled) return;
    settle();
    if (my === sayId) fallback();
  };
  a.onerror = failed;
  a.play().catch(failed);
  // กันค้าง: ถ้าไฟล์โหลดแล้วแต่ไม่จบตามเวลา ให้ไปข้อถัดไป
  a.addEventListener("loadedmetadata", () => {
    setTimeout(() => {
      if (settled) return;
      settle();
      end(false);
    }, ((a.duration || 0) / a.playbackRate + 3) * 1000);
  });
}

// อ่านด้วยเสียงของเบราว์เซอร์ (ใช้เมื่อไม่มีไฟล์เสียง)
function speakByVoice(text: string, speed: number, end: (failed: boolean) => void) {
  const s = synth();
  if (!s) {
    setTimeout(() => end(true), 0);
    return;
  }
  try {
    s.cancel();
    const u = new SpeechSynthesisUtterance(sayText(text));
    u.lang = "th-TH";
    if (thVoice) u.voice = thVoice;
    u.rate = Math.min(2, speed);
    u.onend = () => end(false);
    u.onerror = (ev) => end(!/interrupt|cancel/.test(ev.error ?? ""));
    s.speak(u);
  } catch {
    setTimeout(() => end(true), 0);
    return;
  }
  // กันเสียงค้าง: บางเบราว์เซอร์ไม่ส่ง onend
  setTimeout(() => end(false), Math.max(4000, (text.length * 170) / speed + 3000));
}

// อ่านออกเสียง จบแล้วเรียก done(failed) ถ้ามี src จะเล่นไฟล์ก่อน
export function speak(text: string, speed: number, done: (failed: boolean) => void, src?: string) {
  const my = ++sayId;
  let fin = false;
  const end = (failed: boolean) => {
    if (fin || my !== sayId) return;
    fin = true;
    done(failed);
  };
  if (src) playClip(src, speed, my, end, () => speakByVoice(text, speed, end));
  else speakByVoice(text, speed, end);
}

export function hush() {
  sayId++;
  try {
    clip?.pause();
  } catch {
    /* ข้าม */
  }
  clip = null;
  try {
    synth()?.cancel();
  } catch {
    /* ข้าม */
  }
}

export function useNarrationSettings() {
  const snap = useSyncExternalStore(
    subscribe,
    () => settings,
    () => settings,
  );
  const msg = useSyncExternalStore(
    subscribe,
    () => notice,
    () => "",
  );

  useEffect(() => {
    load();
    bindVoices();
  }, []);

  const setSpeed = useCallback((s: Speed) => {
    settings = { ...settings, speed: s };
    say(`เล่นเร็ว ${s} เท่า`);
    persist();
    emit();
  }, []);

  const setVoice = useCallback((on: boolean) => {
    if (!on) {
      hush();
      settings = { ...settings, voice: false };
      say("ปิดเสียงบรรยายแล้ว");
    } else if (!synth()) {
      settings = { ...settings, voice: false };
      say("เบราว์เซอร์นี้อ่านออกเสียงไม่ได้ ลองเปิดด้วย Chrome หรือ Safari");
    } else {
      bindVoices();
      pickVoice();
      settings = { ...settings, voice: true };
      say(
        voiceCount && !thVoice
          ? "เครื่องนี้ไม่มีเสียงภาษาไทย อาจอ่านไม่ชัด ลองเปิดบนมือถือ"
          : "เปิดเสียงบรรยายแล้ว กดเล่นเพื่อฟัง",
      );
    }
    persist();
    emit();
  }, []);

  const fail = useCallback(() => {
    settings = { ...settings, voice: false };
    say("เครื่องนี้อ่านออกเสียงภาษาไทยไม่ได้ จึงแสดงเป็นคำบรรยายอย่างเดียว");
    emit();
  }, []);

  return { ...snap, notice: msg, setSpeed, setVoice, fail };
}
