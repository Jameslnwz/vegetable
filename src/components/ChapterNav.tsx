"use client";

import { useEffect, useState } from "react";

const chapters = [
  { id: "identity", label: "พรรณไม้" },
  { id: "structure", label: "โครงสร้าง" },
  { id: "problem", label: "ปัญหา" },
  { id: "reproduction", label: "การสืบพันธุ์" },
  { id: "guide", label: "คู่มือแปรรูป" },
  { id: "benefits", label: "ประโยชน์" },
  { id: "credits", label: "ผู้จัดทำ" },
];

export default function ChapterNav() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

  return (
    <div className="sticky top-0 z-30 border-b border-line bg-paper/95">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-2 sm:px-6">
        <a href="#top" className="flex shrink-0 items-center gap-2.5 text-xl font-bold text-ink">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet text-paper" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <ellipse cx="12" cy="7" rx="3" ry="4.5" />
              <ellipse cx="7" cy="11" rx="3" ry="4.5" transform="rotate(-60 7 11)" />
              <ellipse cx="17" cy="11" rx="3" ry="4.5" transform="rotate(60 17 11)" />
              <rect x="11" y="12" width="2" height="9" rx="1" />
            </svg>
          </span>
          Vegetable
        </a>
        <nav aria-label="หัวข้อในหน้า" className="ml-auto flex items-center gap-1 overflow-x-auto">
          {chapters.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              aria-current={active === c.id ? "true" : undefined}
              className={`flex min-h-11 shrink-0 items-center rounded-full px-3 text-lg transition-colors duration-200 ${
                active === c.id ? "bg-violet-wash font-bold text-violet" : "text-ink-soft hover:text-violet"
              }`}
            >
              {c.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="h-0.5">
        <div className="h-full origin-left bg-violet" style={{ transform: `scaleX(${progress})` }} />
      </div>
    </div>
  );
}
