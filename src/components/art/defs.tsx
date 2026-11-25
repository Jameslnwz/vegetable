// ชุด symbol ของภาพผักตบชวา (กระดาษตัดแบบแบน) ใช้ร่วมกันทุกภาพในหน้า แสดงครั้งเดียวใน layout
// รูปทรงอ้างอิงจากต้นจริง: ก้านใบพองเป็นกระเปาะใกล้โคนแล้วคอดเป็นคอ แผ่นใบกลม
// รากฝอยสีม่วงเข้มฟูแบบขนนก ช่อดอกสีม่วงอ่อน กลีบบนมีแต้มม่วงเข้มและจุดเหลือง
// สีทั้งหมดมาจากตัวแปร --shape-* ของเว็บ ปรับโทนได้ที่เดียวใน globals.css

// ตัวสุ่มที่กำหนดผลได้ (ให้ภาพฝั่งเซิร์ฟเวอร์กับเบราว์เซอร์ตรงกัน)
export function seeded(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const f1 = (n: number) => n.toFixed(1);

// รากฝอย: เส้นรากหลักโค้งลง แต่ละเส้นมีขนรากสั้นแตกสองข้างตลอดความยาว
const ROOT_MAIN: [number, number, number, number, number, number][] = [
  [26, 30, 18, 58, 12, 90],
  [30, 35, 31, 62, 29, 92],
  [34, 30, 42, 58, 48, 88],
  [22, 18, 12, 34, 3, 52],
  [38, 18, 48, 32, 57, 50],
  [27, 25, 22, 50, 20, 80],
  [33, 26, 38, 50, 40, 82],
];

function rootHairs() {
  const rnd = seeded(7);
  let d = "";
  for (const [c1x, c1y, c2x, c2y, ex, ey] of ROOT_MAIN) {
    for (let k = 3; k <= 17; k++) {
      const t = k / 19;
      const mt = 1 - t;
      const x = mt * mt * mt * 30 + 3 * mt * mt * t * c1x + 3 * mt * t * t * c2x + t * t * t * ex;
      const y = 3 * mt * mt * t * c1y + 3 * mt * t * t * c2y + t * t * t * ey;
      const a = 2 + rnd() * 3;
      const b = 2 + rnd() * 3;
      d += `M${f1(x)} ${f1(y)}l${f1(-a)} ${f1(a * 0.65)}M${f1(x)} ${f1(y)}l${f1(b)} ${f1(b * 0.65)}`;
    }
  }
  return d;
}
const ROOT_HAIRS = rootHairs();

// ใบด้านข้าง (viewBox 0 0 40 100): กระเปาะ คอ แผ่นใบ
const BULB =
  "M20 99 C11 97 8.5 86 10.5 78 C12.5 70 16.8 65 18.3 57 L18.7 49 L21.3 49 L21.7 57 C23.2 65 27.5 70 29.5 78 C31.5 86 29 97 20 99Z";
const BULB_LIGHT = "M20 49 L21.3 49 L21.7 57 C23.2 65 27.5 70 29.5 78 C31.5 86 29 97 20 99 C22 84 21 66 20 49Z";
const BLADE = "M20 51 C9 52 2.2 43 2.6 30 C3 16 11 5.5 20 5.5 C29 5.5 37 16 37.4 30 C37.8 43 31 52 20 51Z";
const BLADE_LIGHT = "M20 5.5 C29 5.5 37 16 37.4 30 C37.8 43 31 52 20 51 C21.6 36 21.4 18 20 5.5Z";

function Leaf({ id, dark }: { id: string; dark?: boolean }) {
  return (
    <symbol id={id} viewBox="0 0 40 100" overflow="visible">
      <path d={BULB} fill="var(--shape-float)" />
      <path d={BULB_LIGHT} fill="var(--shape-float-2)" />
      <path d={BLADE} fill={dark ? "var(--shape-leaf-deep)" : "var(--shape-leaf)"} />
      <path d={BLADE_LIGHT} fill={dark ? "var(--shape-leaf)" : "var(--shape-leaf-2)"} />
      <path d="M20 49 C19.6 36 19.6 22 20 8" stroke="var(--shape-leaf-deep)" strokeWidth="1.1" fill="none" strokeLinecap="round" opacity="0.55" />
    </symbol>
  );
}

// กลีบดอก 1 กลีบ (ชี้ขึ้นจากจุดกลาง)
export const PETAL = "M0 0 C-5 -3 -6.2 -9.6 -3.1 -12.6 C-1.4 -13.7 1.4 -13.7 3.1 -12.6 C6.2 -9.6 5 -3 0 0Z";

// ใบกอเรียงรอบโคน (viewBox 0 0 120 140, โคนอยู่ที่ 60,130)
const ROSETTE: [string, number, number, number][] = [
  ["hy-lf-b", -58, 34, 86],
  ["hy-lf-b", 56, 34, 86],
  ["hy-lf-b", -36, 36, 92],
  ["hy-lf-b", 34, 35.6, 90],
  ["hy-lf", -17, 34.4, 88],
  ["hy-lf", 18, 33.6, 86],
  ["hy-lf", 1, 32, 80],
];

// ช่อดอก (viewBox 0 0 40 120)
const SPIKE_FLOWERS: [number, number, number, number][] = [
  [11, 52, 15, -20],
  [29, 54, 15, 18],
  [19, 46, 17, 3],
  [13, 33, 18, -8],
  [27, 35, 18, 10],
  [9, 19, 16, -15],
  [30, 21, 16, 12],
  [20, 9, 17, 0],
];

export default function ArtDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <pattern id="c-exine" width="7" height="6" patternUnits="userSpaceOnUse">
          <path d="M0 3 L1.75 0 H5.25 L7 3 L5.25 6 H1.75Z" fill="none" stroke="var(--cell-edge)" strokeWidth=".8" />
        </pattern>
        <Leaf id="hy-lf" />
        <Leaf id="hy-lf-b" dark />

        {/* กอมองด้านข้าง */}
        <symbol id="hy-leaves" viewBox="0 0 120 140" overflow="visible">
          {ROSETTE.map(([lf, rot, w, h], i) => (
            <use key={i} href={`#${lf}`} x={60 - w / 2} y={130 - h} width={w} height={h} transform={`rotate(${rot} 60 130)`} />
          ))}
        </symbol>

        {/* ดอกเดี่ยวมองด้านหน้า: กลีบบนมีแต้มม่วงเข้มกับจุดเหลือง */}
        <symbol id="hy-fl" viewBox="-14 -14 28 28" overflow="visible">
          {[60, 180, 300].map((a) => (
            <path key={a} d={PETAL} transform={`rotate(${a}) scale(0.92)`} fill="var(--shape-petal-2)" />
          ))}
          {[0, 120, 240].map((a) => (
            <path key={a} d={PETAL} transform={`rotate(${a})`} fill="var(--shape-petal)" />
          ))}
          <path d="M0 -3.5 C-3.3 -5.6 -3.4 -10 0 -11.8 C3.4 -10 3.3 -5.6 0 -3.5Z" fill="var(--shape-heart)" opacity=".85" />
          <path d="M0 -5.6 L1.9 -8 L0 -10.4 L-1.9 -8Z" fill="var(--shape-eye)" />
          <circle r="1.9" fill="#ffffff" />
        </symbol>

        {/* ช่อดอก */}
        <symbol id="hy-spike" viewBox="0 0 40 120" overflow="visible">
          <path d="M20 120 C21.5 96 18.5 70 20 20" stroke="var(--shape-stem)" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M20 72 C14 68 13 62 15 58 C17 62 19 66 20 68Z" fill="var(--shape-leaf-deep)" />
          <ellipse cx="20" cy="2.5" rx="2.2" ry="4" fill="var(--shape-petal-2)" />
          {SPIKE_FLOWERS.map(([x, y, s, r]) => (
            <use key={`${x}-${y}`} href="#hy-fl" x={x - s / 2} y={y - s / 2} width={s} height={s} transform={`rotate(${r} ${x} ${y})`} />
          ))}
        </symbol>

        {/* รากฝอย (viewBox 0 0 60 95, โคนที่ 30,0) */}
        <symbol id="hy-roots" viewBox="0 0 60 95" overflow="visible">
          <g stroke="var(--shape-root)" fill="none" strokeLinecap="round">
            <g strokeWidth="1.5" opacity="0.8">
              {ROOT_MAIN.map(([a, b, c, d, e, f]) => (
                <path key={`${e}-${f}`} d={`M30 0 C${a} ${b} ${c} ${d} ${e} ${f}`} />
              ))}
            </g>
            <path strokeWidth=".6" opacity="0.5" d={ROOT_HAIRS} />
          </g>
        </symbol>

        {/* กอมองจากด้านบน (ใช้ในบ่อจำลอง): แผ่นใบกลมเรียงรอบ กระเปาะอยู่ด้านใน */}
        <symbol id="hy-top" viewBox="-26 -26 52 52" overflow="visible">
          <ellipse cx="2" cy="3" rx="21" ry="20" fill="var(--shape-water-3)" opacity=".28" />
          {[0, 52, 104, 156, 208, 260, 312].map((a, i) => (
            <g key={a} transform={`rotate(${a})`}>
              <path d="M0 -4 L0 -10" stroke="var(--shape-float)" strokeWidth="1.8" />
              <path
                d="M0 -9 C-7.5 -9 -10.5 -14 -9.5 -18.5 C-8.5 -22.5 -4.5 -24 0 -24 C4.5 -24 8.5 -22.5 9.5 -18.5 C10.5 -14 7.5 -9 0 -9Z"
                fill={i % 2 ? "var(--shape-leaf-deep)" : "var(--shape-leaf)"}
              />
              <path d="M0 -9 C4.5 -9 8.5 -12 9.5 -18.5 C8.5 -22.5 4.5 -24 0 -24 C1.2 -18 1.2 -13 0 -9Z" fill={i % 2 ? "var(--shape-leaf)" : "var(--shape-leaf-2)"} />
            </g>
          ))}
          <g fill="var(--shape-float)">
            {[26, 130, 234, 338].map((a) => (
              <ellipse key={a} cx="0" cy="-4.5" rx="2.8" ry="4.2" transform={`rotate(${a})`} />
            ))}
          </g>
          <circle r="2.2" fill="var(--shape-float-2)" />
        </symbol>
      </defs>
    </svg>
  );
}
