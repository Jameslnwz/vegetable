import PlantViewer from "@/components/PlantViewer";
import ChapterNav from "@/components/ChapterNav";
import PendingBadge from "@/components/PendingBadge";
import CloneGrowth from "@/components/CloneGrowth";
import Tristyly from "@/components/Tristyly";
import FlowerTimeline from "@/components/FlowerTimeline";
import ProcessingGuide from "@/components/ProcessingGuide";
import HeroScene from "@/components/HeroScene";
import MotionRoot from "@/components/MotionRoot";
import Ornament, { type OrnamentName } from "@/components/Ornament";
import Wave from "@/components/Wave";
import { DoubleFertilization, Gametogenesis } from "@/components/ReproVisuals";
import { Icon, type IconName } from "@/components/ui";
import {
  work,
  quickFacts,
  identity,
  problem,
  cloneFacts,
  tristylyActivity,
  fertilizationEquations,
  seedFacts,
  chromosomeTable,
  chromosomeNote,
  bioFacts,
  benefits,
  members,
  memberClass,
  sources,
} from "@/content/plant";
import type { CSSProperties, ReactNode } from "react";

const BENEFIT_TONE: Record<string, { bg: string; fg: string }> = {
  water: { bg: "#a9cfc7", fg: "#123a3f" },
  coin: { bg: "#f2d98f", fg: "#5a420a" },
  leaf: { bg: "#c7dfb6", fg: "#2f4f24" },
  sprout: { bg: "#d9cdee", fg: "#3e2a63" },
};

const idx = (i: number) => ({ ["--i" as string]: i }) as CSSProperties;

export default function Home() {
  return (
    <>
      <MotionRoot />
      <ChapterNav />

      <main className="w-full flex-1">
        {/* Hero */}
        <header id="top" className="scroll-mt-24">
          <div className="anim-rise mx-auto max-w-6xl px-4 pb-10 pt-14 sm:px-6 sm:pt-20">
            <h1 className="text-6xl font-bold leading-none tracking-tight text-ink sm:text-8xl">{work.name}</h1>
            <p className="relative mt-5 inline-block text-3xl font-bold text-teal sm:text-5xl">
              {work.title}
              <svg
                viewBox="0 0 300 14"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-3 w-full"
                aria-hidden="true"
              >
                <path
                  d="M2 9 C 60 3, 120 12, 180 6 S 270 4, 298 8"
                  fill="none"
                  stroke="var(--violet)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  pathLength={1}
                  className="hand-underline"
                />
              </svg>
            </p>
            <p className="mt-8 max-w-2xl text-xl text-ink">{work.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#guide"
                className="press inline-flex min-h-12 items-center gap-2 rounded-full bg-teal px-6 text-lg font-bold text-paper shadow-[0_6px_18px_-8px_rgb(31_92_99/0.7)] hover:bg-teal-deep"
              >
                เริ่มดูคู่มือ
                <Icon name="next" />
              </a>
              <a
                href="#identity"
                className="press inline-flex min-h-12 items-center rounded-full border-2 border-teal bg-paper px-6 text-lg font-bold text-teal hover:bg-teal-wash"
              >
                รู้จักผักตบชวา
              </a>
            </div>
          </div>

          <HeroScene />

          <div className="bg-teal-deep">
            <dl className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6">
              {quickFacts.map((f) => (
                <div key={f.value}>
                  <dt className="text-3xl font-bold text-[#f2d98f]">{f.value}</dt>
                  <dd className="mt-1 text-lg text-on-deep-soft">{f.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        {/* Identity */}
        <Chapter
          id="identity"
          ornament="specimen"
          title="รู้จักผักตบชวา"
          lead="พืชน้ำลอยน้ำ ดอกสวย แต่โตเร็วจนกลายเป็นวัชพืชที่สร้างปัญหาให้แหล่งน้ำทั่วประเทศ"
          topWave="var(--teal-deep)"
        >
          <div className="rounded-3xl border border-line bg-paper p-5 shadow-[0_18px_40px_-28px_rgb(30_43_46/0.45)] sm:p-8">
            <p className="text-lg text-ink-soft">ทะเบียนพรรณไม้ {work.school}</p>
            <dl className="mt-2 grid gap-x-10 sm:grid-cols-2" data-stagger>
              {identity.map((row, i) => (
                <div
                  key={row.label}
                  style={idx(i)}
                  className={`border-b border-line py-4 last:border-b-0 ${row.label === "ลักษณะเด่น" ? "sm:col-span-2" : ""}`}
                >
                  <dt className="text-lg font-bold text-teal">{row.label}</dt>
                  <dd className="mt-1 text-xl text-ink">
                    {row.value ? <span className={row.italic ? "italic" : ""}>{row.value}</span> : <PendingBadge />}
                    {row.note && <span className="mt-1 block text-lg text-ink-soft">{row.note}</span>}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Chapter>

        {/* Structure viewer */}
        <Chapter
          id="structure"
          tone="water"
          ornament="lens"
          title="โครงสร้างของต้นผักตบชวา"
          lead='กดที่จุดในภาพหรือชื่อส่วนเพื่ออ่านรายละเอียด ใช้ปุ่มซูมเพื่อดูใกล้ ๆ หรือกด "ดูโครงสร้าง" เพื่อแสดงชื่อทุกส่วน'
        >
          <PlantViewer />
        </Chapter>

        {/* Problem */}
        <Chapter id="problem" ornament="river" title={problem.title} lead={problem.intro}>
          <div className="relative">
            <span className="timeline-line absolute bottom-2 left-[7px] top-2 w-0.5 bg-gradient-to-b from-violet via-teal to-sun" aria-hidden="true" />
            <ol className="space-y-10 pl-12" data-stagger>
              {problem.timeline.map((t, i) => (
                <li key={t.when} className="relative" style={idx(i)}>
                  <span
                    className="absolute -left-12 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-violet ring-4 ring-paper"
                    aria-hidden="true"
                  />
                  <p className="tabular text-3xl font-bold text-violet">{t.when}</p>
                  <p className="mt-1 max-w-3xl text-xl text-ink">{t.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </Chapter>

        {/* Reproduction */}
        <Chapter
          id="reproduction"
          tone="violet"
          ornament="cells"
          title="ผักตบชวาสืบพันธุ์อย่างไร"
          lead="สืบพันธุ์ได้ทั้งแบบไม่อาศัยเพศและแบบอาศัยเพศ กดเล่นแอนิเมชันในแต่ละหัวข้อเพื่อดูทีละขั้น"
        >
          <Sub title="ไหลและ clone: สาเหตุหลักของการระบาด">
            <p className="max-w-3xl text-xl text-ink">
              ตาข้างของต้นแม่เจริญเป็น<strong> ไหล (stolon) </strong>สีม่วงที่ทอดยาวในแนวนอน ปลายไหลเกิด
              <strong> ต้นลูก </strong>ที่มีพันธุกรรมเหมือนต้นแม่ทุกประการ เมื่อไหลขาด ต้นลูกก็ลอยไปเป็นต้นใหม่ได้ทันที
              โดยไม่ต้องรอดอกหรือแมลงผสมเกสร
            </p>
            <FactRow facts={cloneFacts} />
            <div className="mt-6">
              <CloneGrowth />
            </div>
          </Sub>

          <Sub title="ดอกสามแบบ (tristyly)">
            <p className="max-w-3xl text-xl text-ink">
              ดอกผักตบชวามีกลีบรวม 6 กลีบ เกสรเพศผู้ 6 อันเรียงเป็น 2 ระดับ และรังไข่ 3 ช่อง ต้นหนึ่งจะมีดอกได้เพียง 1 ใน 3 แบบ
              ต่างกันที่ความยาวก้านเกสรเพศเมีย
            </p>
            <div className="mt-6">
              <Tristyly />
            </div>
            <p className="mt-4 flex max-w-3xl gap-3 rounded-2xl border border-sun-ink/30 bg-sun-wash p-4 text-lg text-ink">
              <span className="mt-1 shrink-0 text-sun-ink">
                <Icon name="sprout" />
              </span>
              {tristylyActivity}
            </p>
          </Sub>

          <Sub title="การสร้างเซลล์สืบพันธุ์">
            <p className="max-w-3xl text-xl text-ink">
              ผักตบชวามีโครโมโซม 2n = 32 เซลล์สืบพันธุ์จึงมี n = 16 เลือกดูฝั่งเพศผู้หรือเพศเมีย แล้วกดถัดไปหรือเล่นอัตโนมัติ
            </p>
            <div className="mt-6">
              <Gametogenesis />
            </div>
          </Sub>

          <Sub title="การปฏิสนธิซ้อน (double fertilization)">
            <p className="max-w-3xl text-xl text-ink">
              ละอองเรณูตกบนยอดเกสรเพศเมีย แล้วงอกหลอดละอองเรณูลงไปถึง ovule sperm 2 เซลล์ผสมกับเซลล์ใน embryo sac
              คนละเซลล์ จึงเรียกว่าการปฏิสนธิซ้อน
            </p>
            <ul className="mt-5 grid gap-3 md:grid-cols-2">
              {fertilizationEquations.map((eq, i) => (
                <li
                  key={eq.right}
                  className={`rounded-2xl p-5 ${i === 0 ? "bg-[#f6dbe8]" : "bg-[#f8e3c8]"}`}
                >
                  <p className="text-lg text-ink">{eq.left}</p>
                  <p className={`mt-1 text-2xl font-bold ${i === 0 ? "text-[#8f2a5c]" : "text-[#8a4a12]"}`}>→ {eq.right}</p>
                  <p className="text-lg text-ink-soft">{eq.note}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <DoubleFertilization />
            </div>
          </Sub>

          <Sub title="จากดอกหนึ่งวัน สู่เมล็ดที่รอได้หลายสิบปี">
            <p className="max-w-3xl text-xl text-ink">เลื่อนแถบเวลาเพื่อดูว่าเกิดอะไรขึ้นหลังดอกบาน</p>
            <FactRow facts={seedFacts} />
            <div className="mt-6">
              <FlowerTimeline />
            </div>
          </Sub>

          <Sub title="สรุปจำนวนโครโมโซมในแต่ละระยะ">
            <p className="max-w-3xl text-xl text-ink">{chromosomeNote}</p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-line bg-paper">
              <table className="w-full min-w-[32rem] border-collapse text-left text-xl">
                <thead>
                  <tr className="bg-teal text-paper">
                    <th scope="col" className="px-5 py-3 font-bold">โครงสร้าง</th>
                    <th scope="col" className="px-5 py-3 font-bold">ระดับ</th>
                    <th scope="col" className="px-5 py-3 text-right font-bold">โครโมโซม</th>
                  </tr>
                </thead>
                <tbody>
                  {chromosomeTable.map((r) => (
                    <tr key={r.structure} className="border-t border-line even:bg-paper-deep/50">
                      <td className="px-5 py-3">{r.structure}</td>
                      <td className="px-5 py-3">
                        <span
                          className={`inline-block rounded-full px-3 font-bold ${
                            r.level === "n"
                              ? "bg-teal-wash text-teal"
                              : r.level === "2n"
                                ? "bg-violet-wash text-violet"
                                : "bg-sun-wash text-sun-ink"
                          }`}
                        >
                          {r.level}
                        </span>
                      </td>
                      <td className="tabular px-5 py-3 text-right font-bold">{r.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Sub>

          <ul className="mt-16 grid gap-8 md:grid-cols-3" data-stagger>
            {bioFacts.map((f, i) => (
              <li key={f.title} style={idx(i)} className="border-t-4 border-violet pt-4">
                <h3 className="text-2xl font-bold text-ink">{f.title}</h3>
                <p className="mt-2 text-lg text-ink">{f.text}</p>
              </li>
            ))}
          </ul>
        </Chapter>

        {/* Processing guide */}
        <Chapter
          id="guide"
          ornament="basket"
          title="คู่มือแปรรูป: เลือกวิธีที่อยากลองทำ"
          lead="แต่ละวิธีมีวัสดุ ขั้นตอน และข้อควรระวัง ทำตามได้ทีละข้อ เก็บผักตบชวาขึ้นมาแปรรูป ช่วยให้น้ำไหลสะดวก และได้วัตถุดิบไปทำปุ๋ย งานจักสาน และกระถางเพาะกล้า"
        >
          <ProcessingGuide />
        </Chapter>

        {/* Benefits: the one region the deep water colour owns */}
        <Chapter
          id="benefits"
          tone="deep"
          ornament="hands"
          title={`ประโยชน์แท้แก่มหาชน: ${benefits.title}`}
          lead={benefits.intro}
        >
          <ul className="grid gap-x-12 gap-y-10 sm:grid-cols-2" data-stagger>
            {benefits.items.map((b, i) => (
              <li key={b.title} className="flex gap-5" style={idx(i)}>
                <span
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl"
                  style={{ background: BENEFIT_TONE[b.icon].bg, color: BENEFIT_TONE[b.icon].fg }}
                >
                  <Icon name={b.icon as IconName} size={30} />
                </span>
                <div>
                  <h3 className="text-3xl font-bold text-on-deep">{b.title}</h3>
                  <p className="mt-1 text-xl text-on-deep-soft">{b.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Chapter>

        {/* Team */}
        <Chapter
          id="credits"
          ornament="pencil"
          title="คณะผู้จัดทำ"
          lead={`นักเรียนชั้นมัธยมศึกษาปีที่ 6/3 ${work.course} ${work.unit} ${work.school}`}
        >
          <ul className="grid gap-4 sm:grid-cols-2" data-stagger>
            {members.map((m, i) => (
              <li
                key={m.name}
                style={idx(i)}
                className="flex items-center gap-4 rounded-2xl border border-line bg-paper p-4"
              >
                <span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-2xl font-bold"
                  style={{
                    background: ["#a9cfc7", "#d9cdee", "#c7dfb6", "#f2d98f"][i % 4],
                    color: ["#123a3f", "#3e2a63", "#2f4f24", "#5a420a"][i % 4],
                  }}
                  aria-hidden="true"
                >
                  {m.number}
                </span>
                <span>
                  <span className="block text-2xl font-bold">{m.name}</span>
                  <span className="tabular block text-lg text-ink-soft">
                    {memberClass} เลขที่ {m.number}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <h3 className="mt-14 text-2xl font-bold">ที่มาของภาพและข้อมูล</h3>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-lg text-ink-soft marker:text-violet">
            {sources.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </Chapter>
      </main>

      <footer className="relative bg-teal-deep pt-14 text-on-deep-soft">
        <Wave fill="var(--paper)" position="top" />
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-4 px-4 pb-10 sm:px-6">
          <div>
            <p className="text-4xl font-bold text-on-deep">{work.name}</p>
            <p className="mt-1 text-lg">จัดทำเพื่อการศึกษา · {work.course} · {work.school}</p>
          </div>
          <a href="#top" className="press inline-flex min-h-11 items-center gap-2 rounded-full border border-on-deep-soft/50 px-5 text-lg text-on-deep hover:bg-on-deep/10">
            กลับขึ้นด้านบน
          </a>
        </div>
      </footer>
    </>
  );
}

type Tone = "paper" | "water" | "violet" | "deep";

const TONE: Record<Tone, { bg: string; edge: string | null; title: string; lead: string; ornament: string }> = {
  paper: { bg: "", edge: null, title: "text-ink", lead: "text-ink-soft", ornament: "var(--violet)" },
  water: { bg: "bg-teal-wash", edge: "var(--paper)", title: "text-teal-deep", lead: "text-ink-soft", ornament: "var(--teal)" },
  violet: { bg: "bg-violet-band", edge: "var(--paper)", title: "text-ink", lead: "text-ink-soft", ornament: "var(--violet)" },
  deep: { bg: "bg-teal-deep", edge: "var(--paper)", title: "text-on-deep", lead: "text-on-deep-soft", ornament: "#f2d98f" },
};

function Chapter({
  id,
  title,
  lead,
  ornament,
  tone = "paper",
  topWave,
  children,
}: {
  id: string;
  title: string;
  lead?: string;
  ornament: OrnamentName;
  tone?: Tone;
  topWave?: string;
  children: ReactNode;
}) {
  const t = TONE[tone];
  const edge = topWave ?? t.edge;
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      data-reveal
      data-loop
      className={`relative scroll-mt-16 ${t.bg} ${t.edge ? "py-24 sm:py-28" : "py-16 sm:py-20"} ${topWave ? "pt-24 sm:pt-28" : ""}`}
    >
      {edge && <Wave fill={edge} position="top" />}
      {t.edge && <Wave fill="var(--paper)" position="bottom" />}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="reveal-heading flex items-start gap-4">
          <Ornament name={ornament} tone={t.ornament} />
          <div>
            <h2 id={`${id}-title`} className={`text-4xl font-bold sm:text-6xl ${t.title}`}>
              {title}
            </h2>
            {lead && <p className={`mt-3 max-w-3xl text-xl sm:text-2xl ${t.lead}`}>{lead}</p>}
          </div>
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

function Sub({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-20 first:mt-0">
      <h3 className="mb-4 flex items-center gap-3 text-3xl font-bold text-ink sm:text-4xl">
        <span className="h-3 w-3 shrink-0 rounded-full bg-violet" aria-hidden="true" />
        {title}
      </h3>
      {children}
    </div>
  );
}

function FactRow({ facts }: { facts: { value: string; text: string }[] }) {
  return (
    <dl className="mt-6 grid gap-4 sm:grid-cols-3" data-stagger>
      {facts.map((f, i) => (
        <div key={f.value} style={idx(i)} className="rounded-2xl bg-paper p-4">
          <dt className="tabular text-3xl font-bold text-violet">{f.value}</dt>
          <dd className="text-lg text-ink-soft">{f.text}</dd>
        </div>
      ))}
    </dl>
  );
}
