// ขอบคลื่นระหว่างแถบสี: ระบายสีของส่วนที่อยู่ติดกันทับขอบตรงของแถบ
export default function Wave({
  fill,
  position,
}: {
  fill: string;
  position: "top" | "bottom";
}) {
  const d =
    position === "top"
      ? "M0 0 H1440 V22 C 1200 50, 1000 6, 720 26 C 440 46, 240 4, 0 30 Z"
      : "M0 48 H1440 V26 C 1200 0, 1000 44, 720 24 C 440 4, 240 46, 0 20 Z";
  return (
    <svg
      viewBox="0 0 1440 48"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 block h-8 w-full sm:h-12 ${
        position === "top" ? "top-0" : "bottom-0"
      }`}
      aria-hidden="true"
    >
      <path d={d} fill={fill} />
    </svg>
  );
}
