"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { photos } from "@/content/photos";
import { stickers, work } from "@/content/plant";
import Paper, { Sticker } from "./paper/Paper";
import { Icon } from "./ui";

const depth = (px: number, d = 0) => ({ ["--depth" as string]: `${px}px`, ["--d" as string]: `${d}ms` }) as CSSProperties;

// ปก: การ์ดรูปผักตบชวาขอบมน ชิ้นกระดาษตัดหลุดออกนอกขอบการ์ด และขยับตามเมาส์เล็กน้อย
export default function Cover({ plantCode }: { plantCode: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--px", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
        el.style.setProperty("--py", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
      });
    };
    const onLeave = () => {
      el.style.setProperty("--px", "0");
      el.style.setProperty("--py", "0");
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const credit = photos.bloomField.credit;

  return (
    <div ref={ref} className="relative">
      <div className="on-dark relative isolate flex min-h-[min(74svh,42rem)] flex-col overflow-hidden rounded-[2rem] bg-forest text-white sm:rounded-[2.5rem]">
        <Image
          src={photos.bloomField.src}
          alt={photos.bloomField.alt}
          fill
          loading="eager"
          fetchPriority="high"
          placeholder="blur"
          sizes="(min-width: 1200px) 1150px, 100vw"
          className="-z-10 object-cover object-[50%_18%]"
        />
        <div
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(12_10_30/0.92)_0%,rgb(12_10_30/0.62)_38%,rgb(12_10_30/0.08)_70%),linear-gradient(to_right,rgb(12_10_30/0.45),transparent_60%)]"
          aria-hidden="true"
        />

        <div className="flex flex-wrap gap-2 p-5 sm:p-8">
          <span className="inline-flex min-h-9 items-center rounded-full bg-white px-4 text-sm font-semibold text-ink sm:text-base">
            {work.name} · ชีววิทยา 5 (ว30245) · ม.6/3
          </span>
          <span className="tabular inline-flex min-h-9 items-center rounded-full bg-sun px-4 text-sm font-semibold text-ink sm:text-base">
            รหัสพรรณไม้ {plantCode}
          </span>
        </div>

        <div className="mt-auto max-w-3xl p-5 pb-8 sm:p-10 sm:pb-12 lg:p-14">
          <h1 className="text-[clamp(3.6rem,10vw,6rem)] leading-[1.25] tracking-[-0.02em]">
            <span className="cover-drop block" style={{ ["--d" as string]: "60ms" }}>ผักตบชวา</span>
            <span className="cover-drop mt-1 block text-[clamp(1.75rem,4.4vw,3rem)] leading-[1.35]" style={{ ["--d" as string]: "180ms" }}>
              จากวัชพืชสู่
              <span className="underline decoration-sun decoration-[0.14em] underline-offset-[0.22em]">ของมีค่า</span>
            </span>
          </h1>
          <p className="cover-drop mt-5 max-w-xl text-lg leading-relaxed text-white/90 sm:text-xl" style={{ ["--d" as string]: "300ms" }}>
            {work.lead}
          </p>
          <div className="cover-drop mt-7 flex flex-wrap gap-3" style={{ ["--d" as string]: "420ms" }}>
            <a href="#guide" className="press inline-flex min-h-12 items-center gap-2 rounded-full bg-sun px-6 text-lg font-bold text-ink hover:bg-white">
              เริ่มดูคู่มือ
              <Icon name="next" />
            </a>
            <a
              href="#identity"
              className="press inline-flex min-h-12 items-center rounded-full border-2 border-white/70 bg-white/10 px-6 text-lg font-bold text-white hover:bg-white hover:text-ink"
            >
              รู้จักผักตบชวา
            </a>
          </div>
          <p className="mt-6 text-xs text-white/75">
            ภาพปก: {credit?.author}, {credit?.license}
          </p>
        </div>
      </div>

      {/* ชิ้นกระดาษตัดที่หลุดออกนอกการ์ด */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="drift absolute -right-2 -top-8 w-[clamp(5.5rem,15vw,12rem)] sm:-right-6 sm:-top-12" style={depth(14)}>
          <div className="cover-drop" style={{ ["--d" as string]: "500ms" }}>
            <div className="bob pointer-events-auto" style={{ ["--bob" as string]: "0.4s" }}>
              <Paper kind="spike" poke rotate={8} />
            </div>
          </div>
        </div>
        <div className="drift absolute -right-10 top-[40%] hidden w-[clamp(6rem,11vw,9.5rem)] md:block" style={depth(8)}>
          <div className="cover-drop" style={{ ["--d" as string]: "620ms" }}>
            <div className="pointer-events-auto">
              <Paper kind="leaf" poke rotate={-24} />
            </div>
          </div>
        </div>
        <div className="drift absolute right-6 top-[9.5rem] w-12 sm:right-16 sm:top-auto sm:bottom-[-2.5rem] sm:w-[clamp(3.5rem,6vw,5rem)]" style={depth(22)}>
          <div className="cover-drop" style={{ ["--d" as string]: "740ms" }}>
            <div className="bob pointer-events-auto" style={{ ["--bob" as string]: "1.3s" }}>
              <Paper kind="float" poke rotate={10} />
            </div>
          </div>
          <Sticker className="absolute right-[115%] top-2 text-sm sm:top-6 sm:text-lg" rotate={-6}>
            {stickers.float}
          </Sticker>
        </div>
        <div className="drift absolute -bottom-7 left-[38%] hidden w-[clamp(9rem,18vw,15rem)] lg:block" style={depth(6)}>
          <div className="cover-drop" style={{ ["--d" as string]: "860ms" }}>
            <Paper kind="stolon" rotate={-3} flat />
          </div>
        </div>
      </div>
    </div>
  );
}
