// ปุ่มและไอคอนที่ใช้ร่วมกันทั้งเว็บ
import type { ReactNode } from "react";

export function PillButton({
  children,
  onClick,
  disabled,
  pressed,
  label,
  tone = "outline",
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  pressed?: boolean;
  label?: string;
  tone?: "outline" | "solid";
}) {
  const active = pressed || tone === "solid";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={pressed}
      aria-label={label}
      className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-4 text-base font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40 ${
        active
          ? "bg-violet text-white hover:bg-ink"
          : "border-2 border-line bg-white text-ink hover:border-violet hover:text-violet"
      }`}
    >
      {children}
    </button>
  );
}

export function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}

export type IconName =
  | "play"
  | "pause"
  | "reset"
  | "next"
  | "prev"
  | "check"
  | "alert"
  | "water"
  | "coin"
  | "leaf"
  | "sprout"
  | "clock";

const icons: Record<IconName, ReactNode> = {
  play: <path d="M7 4v16l13-8z" />,
  pause: (
    <>
      <path d="M8 5v14" />
      <path d="M16 5v14" />
    </>
  ),
  reset: (
    <>
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
      <path d="M3 3v5h5" />
    </>
  ),
  next: <path d="m9 6 6 6-6 6" />,
  prev: <path d="m15 6-6 6 6 6" />,
  check: <path d="m5 12 5 5 9-10" />,
  alert: (
    <>
      <path d="M12 3 2 20h20z" />
      <path d="M12 10v4" />
      <path d="M12 17h.01" />
    </>
  ),
  water: <path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z" />,
  coin: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9.5c-.5-1-1.6-1.5-3-1.5-1.7 0-3 .9-3 2s1.3 1.7 3 2 3 .9 3 2-1.3 2-3 2c-1.4 0-2.5-.5-3-1.5" />
      <path d="M12 6v2M12 16v2" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-9 5-14 15-14 0 10-5 15-14 15" />
      <path d="M5 19 13 11" />
    </>
  ),
  sprout: (
    <>
      <path d="M12 21v-9" />
      <path d="M12 12c0-4-3-6-7-6 0 4 3 6 7 6z" />
      <path d="M12 14c0-3 2.5-5 6-5 0 3-2.5 5-6 5z" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
};
