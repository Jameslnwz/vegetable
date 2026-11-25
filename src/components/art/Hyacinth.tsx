import type { CSSProperties, ReactNode } from "react";

// ต้นผักตบชวามองด้านข้าง วางโคนต้นที่ (x, y) ซึ่งคือระดับผิวน้ำ
// s = ขนาด (1 = กอสูงราว 130 หน่วย), flower = มีช่อดอก, roots = มีราก
export function Hyacinth({
  x,
  y,
  s = 1,
  flower = false,
  roots = true,
  spikeClass,
  spikeStyle,
  children,
}: {
  x: number;
  y: number;
  s?: number;
  flower?: boolean;
  roots?: boolean;
  spikeClass?: string;
  spikeStyle?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {roots && <use href="#hy-roots" x={-30} y={-4} width={60} height={95} />}
      {flower && (
        <g className={spikeClass} style={spikeStyle}>
          <use href="#hy-spike" x={-20} y={-150} width={40} height={120} />
        </g>
      )}
      <use href="#hy-leaves" x={-60} y={-130} width={120} height={140} />
      {children}
    </g>
  );
}
