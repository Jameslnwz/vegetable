// ไอคอนลายเส้นแบบสมุดบันทึกภาคสนาม ทุกเส้นมี pathLength=1 เพื่อให้ "วาดตัวเอง" ตอนเลื่อนถึง
export type OrnamentName =
  | "specimen"
  | "lens"
  | "river"
  | "cells"
  | "basket"
  | "hands"
  | "pencil";

export default function Ornament({ name, tone = "var(--violet)" }: { name: OrnamentName; tone?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width="64"
      height="64"
      fill="none"
      stroke={tone}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="ornament shrink-0"
      aria-hidden="true"
    >
      {shapes[name]}
    </svg>
  );
}

const shapes: Record<OrnamentName, React.ReactNode> = {
  // ป้ายตัวอย่างพรรณไม้ผูกกับใบ
  specimen: (
    <>
      <path pathLength={1} d="M14 50 C 14 30, 26 14, 48 12 C 48 34, 36 50, 14 50 Z" />
      <path pathLength={1} d="M14 50 L 40 22" />
      <path pathLength={1} d="M24 40 L 22 32 M 30 34 L 29 26 M 34 30 L 40 29" />
      <path pathLength={1} d="M44 40 h12 v14 h-12 z" />
      <path pathLength={1} d="M40 22 C 44 28, 46 34, 48 40" />
    </>
  ),
  // แว่นขยายส่องดอก
  lens: (
    <>
      <circle pathLength={1} cx="26" cy="26" r="15" />
      <path pathLength={1} d="M37 37 L 54 54" />
      <path pathLength={1} d="M26 19 C 22 19, 20 23, 23 26 C 20 29, 22 33, 26 33 C 30 33, 32 29, 29 26 C 32 23, 30 19, 26 19 Z" />
      <circle pathLength={1} cx="26" cy="26" r="2" />
    </>
  ),
  // แม่น้ำกับแพผักตบ
  river: (
    <>
      <path pathLength={1} d="M6 40 Q 14 34 22 40 T 38 40 T 54 40 T 62 38" />
      <path pathLength={1} d="M6 50 Q 14 44 22 50 T 38 50 T 54 50" />
      <path pathLength={1} d="M18 36 C 18 26, 26 22, 30 22 C 30 30, 26 36, 18 36 Z" />
      <path pathLength={1} d="M30 36 C 32 28, 40 24, 46 26 C 44 32, 38 36, 30 36 Z" />
      <path pathLength={1} d="M30 22 L 32 10 M 30 14 C 26 12, 26 8, 30 8 C 34 8, 34 12, 30 14" />
    </>
  ),
  // เซลล์กำลังแบ่งตัว
  cells: (
    <>
      <path pathLength={1} d="M32 10 C 46 10, 56 20, 56 32 C 56 44, 46 54, 32 54 C 18 54, 8 44, 8 32 C 8 20, 18 10, 32 10 Z" />
      <path pathLength={1} d="M32 12 C 28 24, 28 40, 32 52" />
      <circle pathLength={1} cx="20" cy="30" r="5" />
      <circle pathLength={1} cx="44" cy="34" r="5" />
      <path pathLength={1} d="M18 30 h4 M42 34 h4" />
    </>
  ),
  // ตะกร้าสาน
  basket: (
    <>
      <path pathLength={1} d="M10 26 H 54 L 48 54 H 16 Z" />
      <path pathLength={1} d="M20 26 C 20 12, 44 12, 44 26" />
      <path pathLength={1} d="M12 34 H 52 M 14 42 H 50 M 15 49 H 49" />
      <path pathLength={1} d="M24 26 L 22 54 M 32 26 V 54 M 40 26 L 42 54" />
    </>
  ),
  // มือประคองต้นกล้า
  hands: (
    <>
      <path pathLength={1} d="M6 44 C 14 40, 22 42, 28 46 C 32 48, 36 48, 40 46" />
      <path pathLength={1} d="M58 44 C 50 40, 42 42, 36 46" />
      <path pathLength={1} d="M6 52 C 18 56, 46 56, 58 52" />
      <path pathLength={1} d="M32 44 V 22" />
      <path pathLength={1} d="M32 30 C 32 20, 24 14, 16 14 C 16 22, 22 30, 32 30 Z" />
      <path pathLength={1} d="M32 26 C 32 18, 40 12, 48 12 C 48 20, 42 26, 32 26 Z" />
    </>
  ),
  // ดินสอกับสมุด
  pencil: (
    <>
      <path pathLength={1} d="M10 12 H 40 V 54 H 10 Z" />
      <path pathLength={1} d="M16 22 H 34 M 16 30 H 34 M 16 38 H 28" />
      <path pathLength={1} d="M50 12 L 56 18 L 34 44 L 26 46 L 28 38 Z" />
      <path pathLength={1} d="M46 16 L 52 22" />
    </>
  ),
};
