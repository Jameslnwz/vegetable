// ชุด gradient และ symbol ของภาพผักตบชวา ใช้ร่วมกันทุกภาพในหน้า (แสดงครั้งเดียวใน layout)
// ภาพอ้างอิงจากลักษณะจริง: ก้านใบพองเป็นกระเปาะใกล้โคนแล้วคอดเป็นคอ แผ่นใบกลมมัน
// รากฝอยสีม่วงเข้มฟูแบบขนนก ช่อดอกสีม่วงอ่อน กลีบบนมีแต้มม่วงเข้มและจุดเหลือง

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
const BLADE = "M20 51 C9 52 2.2 43 2.6 30 C3 16 11 5.5 20 5.5 C29 5.5 37 16 37.4 30 C37.8 43 31 52 20 51Z";
const VEINS = [
  "M20 49 C19.6 36 19.6 22 20 8",
  "M19.4 49 C12.5 40 9.5 26 12.5 9.5",
  "M20.6 49 C27.5 40 30.5 26 27.5 9.5",
  "M19 49.5 C8.5 41 5 29 6.5 17",
  "M21 49.5 C31.5 41 35 29 33.5 17",
];
const PORES: [number, number, number][] = [
  [16.5, 84, 1.1],
  [21, 88, 1.3],
  [24.5, 81, 1],
  [19, 77, 0.9],
  [14.5, 91, 0.8],
  [25.5, 91, 0.9],
];

function Leaf({ id, blade }: { id: string; blade: string }) {
  return (
    <symbol id={id} viewBox="0 0 40 100" overflow="visible">
      <path d={BULB} fill="url(#hy-pet)" stroke="#2f6b4c" strokeOpacity="0.35" strokeWidth="0.5" />
      <g fill="#f1fbe9" opacity="0.55">
        {PORES.map(([x, y, r]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />
        ))}
      </g>
      <path d="M14.5 76 C13.6 84 15 92 18.5 96" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d={BLADE} fill={blade} stroke="#1e5640" strokeOpacity="0.45" strokeWidth="0.6" />
      <g stroke="#174a36" strokeOpacity="0.28" strokeWidth="0.55" fill="none">
        {VEINS.map((v) => (
          <path key={v} d={v} />
        ))}
      </g>
      <path d="M8.5 18 C10.5 10 15.5 7 20 7 C14 10.5 11.2 16.5 10.8 25 C10.4 31.5 8 26 8.5 18Z" fill="url(#hy-gloss)" />
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
        <radialGradient id="hy-leaf" cx=".35" cy=".28" r=".9">
          <stop offset="0" stopColor="#b6e6b8" />
          <stop offset=".42" stopColor="#5fa96c" />
          <stop offset="1" stopColor="#245a3a" />
        </radialGradient>
        <radialGradient id="hy-leaf-b" cx=".35" cy=".28" r=".9">
          <stop offset="0" stopColor="#8cc794" />
          <stop offset=".5" stopColor="#3f8556" />
          <stop offset="1" stopColor="#1b4a31" />
        </radialGradient>
        <linearGradient id="hy-pet" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5f9a5a" />
          <stop offset=".38" stopColor="#d9f0bf" />
          <stop offset=".62" stopColor="#b2dc98" />
          <stop offset="1" stopColor="#4c8a4f" />
        </linearGradient>
        <linearGradient id="hy-gloss" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".8" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="hy-petal" cx=".5" cy=".95" r="1.05">
          <stop offset="0" stopColor="#fbf9ff" />
          <stop offset=".32" stopColor="#ddd0fb" />
          <stop offset=".72" stopColor="#ad94ee" />
          <stop offset="1" stopColor="#7f62d6" />
        </radialGradient>
        <linearGradient id="hy-stem" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3e7d55" />
          <stop offset=".5" stopColor="#7dbb8a" />
          <stop offset="1" stopColor="#3e7d55" />
        </linearGradient>
        <linearGradient id="hy-root" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a2b52" stopOpacity=".95" />
          <stop offset="1" stopColor="#3a2b52" stopOpacity=".2" />
        </linearGradient>
        <linearGradient id="hy-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cfe2dc" />
          <stop offset=".18" stopColor="#9cc6b8" />
          <stop offset="1" stopColor="#2a5a4c" />
        </linearGradient>
        <radialGradient id="hy-pond" cx=".45" cy=".4" r=".75">
          <stop offset="0" stopColor="#c4e2d6" />
          <stop offset=".6" stopColor="#7aa99a" />
          <stop offset="1" stopColor="#3b6b5d" />
        </radialGradient>

        {/* เซลล์ (การสร้างเซลล์สืบพันธุ์ · ปฏิสนธิซ้อน) */}
        {(
          [
            ["c-cream", "#fffcec", "#efd27c"],
            ["c-nuc-y", "#ffd37a", "#b97810"],
            ["c-violet", "#b9a6fa", "#4f33b8"],
            ["c-pink", "#ffb0c5", "#c2335e"],
            ["c-lilac", "#faf8ff", "#c6b5f6"],
            ["c-orange", "#ffd27a", "#cf7a08"],
            ["c-green", "#d2f2dc", "#5fb07b"],
            ["c-egg", "#ffc4d4", "#d9466f"],
            ["c-syn", "#ffe3ec", "#eea0b8"],
            ["c-pollen", "#ffeaa6", "#d9a92c"],
            ["c-zyg", "#ff8fb0", "#a3164a"],
            ["c-endo", "#ffc061", "#c86400"],
          ] as const
        ).map(([id, a, b]) => (
          <radialGradient key={id} id={id} cx="0.35" cy="0.3" r="0.75">
            <stop offset="0" stopColor={a} />
            <stop offset="1" stopColor={b} />
          </radialGradient>
        ))}
        <radialGradient id="c-sac" cx="0.5" cy="0.45" r="0.7">
          <stop offset="0" stopColor="#fffdf0" />
          <stop offset="1" stopColor="#f8e3a0" />
        </radialGradient>
        <radialGradient id="c-grain" cx="0.5" cy="0.45" r="0.7">
          <stop offset="0" stopColor="#fffaf0" />
          <stop offset="1" stopColor="#f4e8cf" />
        </radialGradient>
        <pattern id="c-exine" width="7" height="6" patternUnits="userSpaceOnUse">
          <path d="M0 3 L1.75 0 H5.25 L7 3 L5.25 6 H1.75Z" fill="none" stroke="#c99a26" strokeWidth=".8" />
        </pattern>

        <Leaf id="hy-lf" blade="url(#hy-leaf)" />
        <Leaf id="hy-lf-b" blade="url(#hy-leaf-b)" />

        {/* กอมองด้านข้าง */}
        <symbol id="hy-leaves" viewBox="0 0 120 140" overflow="visible">
          {ROSETTE.map(([lf, rot, w, h], i) => (
            <use key={i} href={`#${lf}`} x={60 - w / 2} y={130 - h} width={w} height={h} transform={`rotate(${rot} 60 130)`} />
          ))}
        </symbol>

        {/* ดอกเดี่ยวมองด้านหน้า */}
        <symbol id="hy-fl" viewBox="-14 -14 28 28" overflow="visible">
          <g fill="url(#hy-petal)" stroke="#6646c4" strokeOpacity=".35" strokeWidth=".35">
            {[60, 180, 300].map((a) => (
              <path key={a} d={PETAL} transform={`rotate(${a}) scale(0.92)`} />
            ))}
            {[0, 120, 240].map((a) => (
              <path key={a} d={PETAL} transform={`rotate(${a})`} />
            ))}
          </g>
          <g stroke="#5b3fc4" strokeOpacity=".3" strokeWidth=".35" fill="none">
            {[60, 120, 180, 240, 300].map((a) => (
              <path key={a} d="M0 -2.5 L0 -11.5" transform={`rotate(${a})`} />
            ))}
          </g>
          <path d="M0 -3.5 C-3.3 -5.6 -3.4 -10 0 -11.8 C3.4 -10 3.3 -5.6 0 -3.5Z" fill="#4c34c2" opacity=".7" />
          <path d="M0 -5.6 L1.9 -8 L0 -10.4 L-1.9 -8Z" fill="#f2c230" />
          <circle r="1.7" fill="#f6f2ff" />
          <g fill="#cdb8ff">
            <circle cx="-3.2" cy="-3.4" r=".55" />
            <circle cx="3.2" cy="-3.4" r=".55" />
            <circle cx="0" cy="-4" r=".55" />
          </g>
        </symbol>

        {/* ช่อดอก */}
        <symbol id="hy-spike" viewBox="0 0 40 120" overflow="visible">
          <path d="M20 120 C21.5 96 18.5 70 20 20" stroke="url(#hy-stem)" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M20 72 C14 68 13 62 15 58 C17 62 19 66 20 68Z" fill="#5fae80" />
          <ellipse cx="20" cy="2.5" rx="2.2" ry="4" fill="#9a86e0" />
          {SPIKE_FLOWERS.map(([x, y, s, r]) => (
            <use key={`${x}-${y}`} href="#hy-fl" x={x - s / 2} y={y - s / 2} width={s} height={s} transform={`rotate(${r} ${x} ${y})`} />
          ))}
        </symbol>

        {/* รากฝอย (viewBox 0 0 60 95, โคนที่ 30,0) */}
        <symbol id="hy-roots" viewBox="0 0 60 95" overflow="visible">
          <g stroke="url(#hy-root)" fill="none" strokeLinecap="round">
            <g strokeWidth="1.5">
              {ROOT_MAIN.map(([a, b, c, d, e, f]) => (
                <path key={`${e}-${f}`} d={`M30 0 C${a} ${b} ${c} ${d} ${e} ${f}`} />
              ))}
            </g>
            <path strokeWidth=".6" strokeOpacity=".8" d={ROOT_HAIRS} />
          </g>
        </symbol>

        {/* กอมองจากด้านบน (ใช้ในบ่อจำลอง): แผ่นใบกลมเรียงรอบ กระเปาะอยู่ด้านใน */}
        <symbol id="hy-top" viewBox="-26 -26 52 52" overflow="visible">
          <ellipse cx="2" cy="3" rx="21" ry="20" fill="#0e2c25" opacity=".2" />
          {[0, 52, 104, 156, 208, 260, 312].map((a, i) => (
            <g key={a} transform={`rotate(${a})`}>
              <path d="M0 -4 L0 -10" stroke="#9fcf8d" strokeWidth="1.6" />
              <path
                d="M0 -9 C-7.5 -9 -10.5 -14 -9.5 -18.5 C-8.5 -22.5 -4.5 -24 0 -24 C4.5 -24 8.5 -22.5 9.5 -18.5 C10.5 -14 7.5 -9 0 -9Z"
                fill={i % 2 ? "url(#hy-leaf-b)" : "url(#hy-leaf)"}
                stroke="#1e5640"
                strokeOpacity=".4"
                strokeWidth=".5"
              />
              <path d="M-5.5 -19 C-4 -21.6 -1 -22.4 1.5 -22.2 C-1.5 -20.8 -3.5 -19 -4 -16Z" fill="url(#hy-gloss)" />
            </g>
          ))}
          <g fill="url(#hy-pet)">
            {[26, 130, 234, 338].map((a) => (
              <ellipse key={a} cx="0" cy="-4.5" rx="2.8" ry="4.2" transform={`rotate(${a})`} />
            ))}
          </g>
          <circle r="2.2" fill="#8fc58c" />
        </symbol>
      </defs>
    </svg>
  );
}
