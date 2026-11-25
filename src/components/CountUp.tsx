"use client";

import { useEffect, useRef, useState } from "react";

// ตัวเลขนับขึ้นเมื่อเลื่อนมาเห็น (ค่าสุดท้ายแสดงทันทีถ้าตั้งค่าลดการเคลื่อนไหว หรือไม่มี JS)
export default function CountUp({ to, duration = 1600 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already on screen at load
    let raf = 0;
    const reset = requestAnimationFrame(() => setValue(0));
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4);
          setValue(Math.round(to * eased));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => {
      cancelAnimationFrame(reset);
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [to, duration]);

  return (
    <span ref={ref} className="tabular">
      {value.toLocaleString("th-TH")}
    </span>
  );
}
