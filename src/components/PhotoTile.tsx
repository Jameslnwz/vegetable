"use client";

import Image from "next/image";
import { useRef } from "react";
import { photos, type Photo, type PhotoKey } from "@/content/photos";

// รูปถ่ายพร้อมคำบรรยาย กดเพื่อดูรูปใหญ่และเครดิต
export default function PhotoTile({
  id,
  className = "",
  sizes = "(min-width: 1024px) 30vw, 50vw",
  priority = false,
}: {
  id: PhotoKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const photo: Photo = photos[id];
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className={`photo-frame group relative block cursor-zoom-in overflow-hidden rounded-3xl bg-paper-deep text-left shadow-[0_14px_30px_-18px_rgb(16_36_31/0.55)] ${className}`}
        aria-label={`ดูรูปขนาดใหญ่: ${photo.caption}`}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          placeholder="blur"
          priority={priority}
          className="object-cover"
        />
        <span
          className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent px-4 pb-3 pt-12 text-lg leading-snug text-white"
        >
          {photo.caption}
        </span>
        <span
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl bg-black/45 text-white opacity-90 transition-opacity duration-200 group-hover:opacity-100"
          aria-hidden="true"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </span>
      </button>

      <dialog
        ref={dialogRef}
        className="lightbox m-auto w-[min(92vw,1100px)] rounded-3xl bg-paper p-0 text-ink backdrop:cursor-zoom-out"
        aria-label={photo.caption}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        <div className="relative">
          <Image
            src={photo.src}
            alt={photo.alt}
            sizes="92vw"
            placeholder="blur"
            className="max-h-[75vh] w-full object-contain bg-black"
          />
          <form method="dialog">
            <button
              type="submit"
              className="absolute right-3 top-3 flex min-h-11 items-center gap-1 rounded-full bg-black/60 px-4 text-lg text-white hover:bg-black/80"
            >
              ปิด
            </button>
          </form>
        </div>
        <div className="p-5">
          <p className="text-xl font-bold">{photo.caption}</p>
          <p className="mt-1 text-lg text-ink-soft">
            {photo.credit ? (
              <>
                ภาพ: {photo.credit.author} ·{" "}
                {photo.credit.licenseUrl ? (
                  <a href={photo.credit.licenseUrl} className="underline underline-offset-4" target="_blank" rel="noreferrer">
                    {photo.credit.license}
                  </a>
                ) : (
                  photo.credit.license
                )}{" "}
                ·{" "}
                <a href={photo.credit.fileUrl} className="underline underline-offset-4" target="_blank" rel="noreferrer">
                  Wikimedia Commons
                </a>
              </>
            ) : (
              "ภาพโดยคณะผู้จัดทำ"
            )}
          </p>
        </div>
      </dialog>
    </>
  );
}
