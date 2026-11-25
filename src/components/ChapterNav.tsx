"use client";

import { useEffect, useState } from "react";

const chapters = [
  { id: "identity", label: "ข้อมูล" },
  { id: "structure", label: "โครงสร้าง" },
  { id: "problem", label: "ปัญหา" },
  { id: "uses", label: "ใช้ประโยชน์" },
  { id: "herbal", label: "สมุนไพร" },
  { id: "credits", label: "ผู้จัดทำ" },
];

export default function ChapterNav() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string>("identity");

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
    <div className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur-sm">
      <nav
        aria-label="หัวข้อในหน้า"
        className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-4 py-3 sm:px-6"
      >
        <a href="#top" className="mr-4 shrink-0 font-serif text-lg font-bold text-ink">
          Vegetable
        </a>
        {chapters.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            aria-current={active === c.id ? "true" : undefined}
            className={`shrink-0 rounded-full px-3 py-1.5 text-base transition-colors duration-200 ${
              active === c.id ? "bg-teal text-paper" : "text-ink-soft hover:text-teal"
            }`}
          >
            {c.label}
          </a>
        ))}
      </nav>
      <div className="h-0.5 bg-transparent">
        <div
          className="h-full origin-left bg-violet"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </div>
  );
}
