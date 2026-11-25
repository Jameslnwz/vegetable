"use client";

import { useEffect, useRef, useState } from "react";

const chapters = [
  { id: "identity", label: "พรรณไม้" },
  { id: "structure", label: "โครงสร้าง" },
  { id: "problem", label: "ปัญหา" },
  { id: "reproduction", label: "การสืบพันธุ์" },
  { id: "guide", label: "คู่มือแปรรูป" },
  { id: "benefits", label: "ประโยชน์" },
  { id: "credits", label: "ผู้จัดทำ" },
];

// แถบเมนูขาว: ปุ่มบทที่กำลังอ่านเป็นสีม่วง เส้นไหลสีชมพูด้านล่างบอกว่าอ่านไปถึงไหนแล้ว
export default function ChapterNav() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    chapters.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // บนจอแคบ เลื่อนปุ่มบทที่กำลังอ่านให้อยู่ในสายตา
  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!list || !link || list.scrollWidth <= list.clientWidth) return;
    const left = link.offsetLeft - list.clientWidth / 2 + link.offsetWidth / 2;
    list.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  return (
    <div className="fixed inset-x-0 top-0 z-40 border-b border-line bg-white">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2 sm:px-6">
        <a href="#top" className="flex shrink-0 items-center gap-2 rounded-xl py-1 pr-1 text-xl font-bold tracking-tight text-ink">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet" aria-hidden="true">
            <svg viewBox="0 0 100 100" className="h-6 w-6">
              {[0, 60, 120, 180, 240, 300].map((a, i) => (
                <path key={a} d="M50 50 C 33 44 28 16 50 6 C 72 16 67 44 50 50 Z" transform={`rotate(${a} 50 50)`} fill={i % 2 ? "#c3a9ff" : "#ffffff"} />
              ))}
              <circle cx="50" cy="50" r="8" fill="var(--sun)" />
            </svg>
          </span>
          <span className="hidden sm:inline">Vegetable</span>
        </a>
        <nav aria-label="หัวข้อในหน้า" className="min-w-0 flex-1">
          <div ref={listRef} className="nav-fade flex items-center gap-1 overflow-x-auto sm:justify-end">
            {chapters.map((c) => {
              const on = active === c.id;
              return (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  data-id={c.id}
                  aria-current={on ? "true" : undefined}
                  className={`press flex min-h-11 shrink-0 items-center rounded-full px-3.5 text-base font-semibold transition-colors duration-200 ${
                    on ? "bg-violet text-white" : "text-ink-soft hover:bg-violet-wash hover:text-violet"
                  }`}
                >
                  {c.label}
                </a>
              );
            })}
            <span className="w-6 shrink-0 sm:hidden" aria-hidden="true" />
          </div>
        </nav>
      </div>
      <div className="relative h-[3px]" aria-hidden="true">
        <div className="h-full origin-left rounded-full bg-[var(--shape-stolon)]" style={{ transform: `scaleX(${progress})` }} />
        <span
          className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime ring-2 ring-white"
          style={{ left: `${progress * 100}%`, opacity: progress > 0.002 ? 1 : 0 }}
        />
      </div>
    </div>
  );
}
