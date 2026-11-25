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

// หัวนิตยสาร: โปร่งใสบนรูปปก แล้วเป็นแถบทึบเมื่อเลื่อนพ้นปก
export default function ChapterNav() {
  const [progress, setProgress] = useState(0);
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      setSolid(window.scrollY > window.innerHeight * 0.8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
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

  return (
    <div
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,color,box-shadow] duration-500 ${
        solid ? "bg-paper/95 text-ink shadow-[0_1px_0_var(--line)]" : "bg-gradient-to-b from-black/55 to-transparent text-white"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-2 sm:px-8">
        <a href="#top" className="shrink-0 font-serif text-2xl font-bold tracking-tight">
          Vegetable
        </a>
        <nav aria-label="หัวข้อในหน้า" className="ml-auto flex items-center gap-0.5 overflow-x-auto">
          {chapters.map((c) => {
            const on = active === c.id;
            return (
              <a
                key={c.id}
                href={`#${c.id}`}
                aria-current={on ? "true" : undefined}
                className={`relative flex min-h-11 shrink-0 items-center px-3 text-base font-medium transition-opacity duration-200 ${
                  on ? "opacity-100" : "opacity-75 hover:opacity-100"
                }`}
              >
                {c.label}
                <span
                  className={`absolute inset-x-3 bottom-1.5 h-0.5 origin-left rounded-full bg-current transition-transform duration-300 ${
                    on ? "scale-x-100" : "scale-x-0"
                  }`}
                  aria-hidden="true"
                />
              </a>
            );
          })}
        </nav>
      </div>
      <div className="h-[3px]">
        <div className="h-full origin-left bg-sun" style={{ transform: `scaleX(${progress})` }} />
      </div>
    </div>
  );
}
