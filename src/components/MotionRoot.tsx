"use client";

import { useEffect } from "react";

// ควบคุมแอนิเมชันตอนเลื่อนหน้า
// - [data-reveal]: ซ่อนเฉพาะส่วนที่ยังอยู่ใต้จอตอนโหลด แล้วเผยเมื่อเลื่อนถึง (เนื้อหาแสดงครบถ้าไม่มี JS)
// - [data-loop]: หยุดแอนิเมชันวนซ้ำเมื่อพ้นจอ
export default function MotionRoot() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const revealEls = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!reduce) {
      revealEls.forEach((el) => {
        if (el.getBoundingClientRect().top > window.innerHeight * 0.92) el.classList.add("reveal-pending");
      });
    }
    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.remove("reveal-pending");
          reveal.unobserve(e.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    revealEls.forEach((el) => reveal.observe(el));

    const loops = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.target.classList.toggle("loop-paused", !e.isIntersecting));
    });
    document.querySelectorAll("[data-loop]").forEach((el) => loops.observe(el));

    const onVisibility = () => root.classList.toggle("page-hidden", document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      reveal.disconnect();
      loops.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return null;
}
