"use client";

import Image from "next/image";
import { useRef } from "react";
import { photos, type Photo, type PhotoKey } from "@/content/photos";

// รูปถ่ายขอบมน: กดเพื่อดูรูปใหญ่พร้อมเครดิต
// caption="below" วางคำบรรยายใต้รูป (ค่าเริ่มต้น), "overlay" วางบนรูป
export default function PhotoTile({
  id,
  className = "",
  frameClassName = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 30vw, 100vw",
  caption = "below",
  tone = "paper",
}: {
  id: PhotoKey;
  className?: string;
  frameClassName?: string;
  sizes?: string;
  caption?: "below" | "overlay" | "none";
  tone?: "paper" | "forest";
}) {
  const photo: Photo = photos[id];
  const dialogRef = useRef<HTMLDialogElement>(null);
  const credit = photo.credit ? `ภาพ: ${photo.credit.author} (${photo.credit.license})` : "ภาพ: คณะผู้จัดทำ";

  return (
    <figure className={`h-full ${className}`}>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className={`photo-frame group relative block w-full cursor-zoom-in overflow-hidden rounded-[1.5rem] bg-paper-deep text-left ${frameClassName}`}
        aria-label={`ดูรูปขนาดใหญ่: ${photo.caption}`}
      >
        <Image src={photo.src} alt={photo.alt} fill sizes={sizes} placeholder="blur" className="object-cover" />
        {caption === "overlay" && (
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgb(12_10_30/0.85)] via-[rgb(12_10_30/0.45)] to-transparent px-4 pb-3 pt-12 text-sm leading-snug text-white sm:text-base">
            {photo.caption}
          </span>
        )}
        <span
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
          aria-hidden="true"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </span>
      </button>
      {caption === "below" && (
        <figcaption className={`mt-2.5 text-sm leading-relaxed ${tone === "forest" ? "text-on-forest-soft" : "text-ink-soft"}`}>
          <span className={tone === "forest" ? "text-on-forest" : "text-ink"}>{photo.caption}</span>
          <span className="mx-1.5" aria-hidden="true">·</span>
          {credit}
        </figcaption>
      )}

      <dialog
        ref={dialogRef}
        className="lightbox m-auto w-[min(92vw,1100px)] overflow-hidden rounded-[2rem] bg-white p-0 text-ink"
        aria-label={photo.caption}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        <div className="relative bg-ink">
          <Image src={photo.src} alt={photo.alt} sizes="92vw" placeholder="blur" className="max-h-[75vh] w-full object-contain" />
          <form method="dialog">
            <button
              type="submit"
              className="absolute right-3 top-3 flex min-h-11 items-center rounded-full bg-sun px-5 text-base font-bold text-ink shadow-[var(--shadow-sticker)] hover:bg-white"
            >
              ปิด
            </button>
          </form>
        </div>
        <div className="p-5">
          <p className="text-xl font-bold">{photo.caption}</p>
          <p className="mt-1 text-base text-ink-soft">
            {photo.credit ? (
              <>
                ภาพ: {photo.credit.author} ·{" "}
                {photo.credit.licenseUrl ? (
                  <a href={photo.credit.licenseUrl} className="underline decoration-violet/40 hover:text-violet" target="_blank" rel="noreferrer">
                    {photo.credit.license}
                  </a>
                ) : (
                  photo.credit.license
                )}{" "}
                ·{" "}
                <a href={photo.credit.fileUrl} className="underline decoration-violet/40 hover:text-violet" target="_blank" rel="noreferrer">
                  Wikimedia Commons
                </a>
              </>
            ) : (
              "ภาพโดยคณะผู้จัดทำ"
            )}
          </p>
        </div>
      </dialog>
    </figure>
  );
}
