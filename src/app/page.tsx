import Image from "next/image";
import PlantViewer from "@/components/PlantViewer";
import ChapterNav from "@/components/ChapterNav";
import PendingBadge from "@/components/PendingBadge";
import CloneGrowth from "@/components/CloneGrowth";
import Tristyly from "@/components/Tristyly";
import FlowerTimeline from "@/components/FlowerTimeline";
import ProcessingGuide from "@/components/ProcessingGuide";
import HeroScene from "@/components/HeroScene";
import MotionRoot from "@/components/MotionRoot";
import PhotoTile from "@/components/PhotoTile";
import Ornament, { type OrnamentName } from "@/components/Ornament";
import { DoubleFertilization, Gametogenesis } from "@/components/ReproVisuals";
import { Icon, type IconName } from "@/components/ui";
import { photos, type Photo } from "@/content/photos";
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
  banner,
  members,
  memberClass,
  sources,
} from "@/content/plant";
import type { CSSProperties, ReactNode } from "react";

// พาสเทลที่ใช้ซ้ำ: การ์ดสถิติ การ์ดประโยชน์ และสมาชิก (สีข้อความผ่าน 4.5:1 บนพื้นของตัวเอง)
const PASTEL = [
  { bg: "#efe9fc", ring: "#ddd0f8", fg: "#4b2fa0" },
  { bg: "#e3f4ea", ring: "#c9e8d5", fg: "#1f6338" },
  { bg: "#fdf4cf", ring: "#f6e3a1", fg: "#6b4e08" },
  { bg: "#e1f2ec", ring: "#c4e4d9", fg: "#0f5a4c" },
];

const BENEFIT_PASTEL: Record<string, number> = { water: 3, coin: 2, leaf: 1, sprout: 0 };

const idx = (i: number) => ({ ["--i" as string]: i }) as CSSProperties;

export default function Home() {
  return (
    <>
      <MotionRoot />
      <ChapterNav />

      <main className="w-full flex-1">
        {/* ---------- Hero ---------- */}
        <header id="top" className="scroll-mt-24 mx-auto max-w-6xl px-4 pt-6 sm:px-6 sm:pt-8">
          <div className="relative isolate flex min-h-[560px] overflow-hidden rounded-[2rem] sm:min-h-[640px]">
            <Image
              src={photos.habitus.src}
              alt={photos.habitus.alt}
              fill
              priority
              placeholder="blur"
              sizes="(min-width: 1152px) 1104px, 100vw"
              className="kenburns -z-10 object-cover"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/45 to-black/5" aria-hidden="true" />
            <div className="anim-rise mt-auto max-w-3xl p-6 sm:p-12">
              <h1 className="text-5xl font-bold leading-[1.05] text-white sm:text-7xl">
                ผักตบชวา: จากวัชพืช
                <br />
                สู่<span className="relative inline-block">
                  ของมีค่า
                  <span className="absolute inset-x-0 -bottom-1 h-2 rounded-full bg-sun" aria-hidden="true" />
                </span>
              </h1>
              <p className="mt-5 max-w-2xl text-xl text-white/90 sm:text-2xl">{work.lead}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#guide"
                  className="press inline-flex min-h-12 items-center gap-2 rounded-full bg-sun px-6 text-xl font-bold text-ink hover:bg-[#ffd75e]"
                >
                  เริ่มดูคู่มือ
                  <Icon name="next" />
                </a>
                <a
                  href="#identity"
                  className="press inline-flex min-h-12 items-center rounded-full border border-white/60 bg-black/30 px-6 text-xl font-bold text-white hover:bg-black/50"
                >
                  รู้จักผักตบชวา
                </a>
              </div>
            </div>
          </div>

          <dl className="mt-4 grid gap-4 sm:grid-cols-3" data-stagger>
            {quickFacts.map((f, i) => (
              <div
                key={f.value}
                style={{ ...idx(i), background: PASTEL[[0, 1, 2][i]].bg }}
                className="relative overflow-hidden rounded-3xl p-5 sm:p-6"
              >
                <span
                  className="absolute -right-6 -top-6 h-24 w-24 rounded-full"
                  style={{ background: PASTEL[[0, 1, 2][i]].ring }}
                  aria-hidden="true"
                />
                <dt className="relative text-4xl font-bold" style={{ color: PASTEL[[0, 1, 2][i]].fg }}>
                  {f.value}
                </dt>
                <dd className="relative mt-1 text-lg text-ink-soft">{f.text}</dd>
              </div>
            ))}
          </dl>
        </header>

        {/* ---------- Identity ---------- */}
        <Chapter
          id="identity"
          ornament="specimen"
          title="รู้จักผักตบชวา"
          lead="พืชน้ำลอยน้ำ ดอกสวย แต่โตเร็วจนกลายเป็นวัชพืชที่สร้างปัญหาให้แหล่งน้ำทั่วประเทศ"
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
            <div className="overflow-hidden rounded-3xl border border-line bg-paper shadow-[0_18px_40px_-30px_rgb(16_36_31/0.5)]">
              <div className="flex flex-wrap items-baseline justify-between gap-2 bg-gradient-to-r from-[#0f5a4c] to-[#1d8a70] px-6 py-4 text-white">
                <p className="text-2xl font-bold">ทะเบียนพรรณไม้</p>
                <p className="text-lg text-white/90">{work.school}</p>
              </div>
              <dl className="px-6" data-stagger>
                {identity.map((row, i) => (
                  <div
                    key={row.label}
                    style={idx(i)}
                    className="grid gap-x-3 gap-y-0.5 border-b border-line py-3.5 last:border-b-0 sm:grid-cols-[8.5rem_minmax(0,1fr)]"
                  >
                    <dt className="text-lg text-ink-soft">{row.label}</dt>
                    <dd className="text-xl text-ink">
                      {row.value ? (
                        row.label === "รหัสพรรณไม้" ? (
                          <span className="tabular inline-block whitespace-nowrap rounded-lg bg-violet-wash px-3 py-0.5 text-2xl font-bold tracking-wide text-violet">
                            {row.value}
                          </span>
                        ) : (
                          <span className={row.italic ? "italic" : row.label === "ชื่อผลงาน" ? "font-bold" : ""}>{row.value}</span>
                        )
                      ) : (
                        <PendingBadge />
                      )}
                      {row.note && <span className="mt-1 block text-lg text-ink-soft">{row.note}</span>}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="grid auto-rows-[190px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:grid-cols-3">
              <PhotoTile id="flowerCloseup" className="col-span-2 row-span-2" sizes="(min-width: 1024px) 34vw, 100vw" />
              <PhotoTile id="flowerOnWater" className="row-span-2 max-sm:col-span-2 max-sm:row-span-1" />
              <PhotoTile id="petioleSection" className="row-span-2 max-sm:row-span-1" />
              <PhotoTile id="flowerSpike" className="max-sm:row-span-1" />
              <PhotoTile id="groupPlantCode" className="max-sm:col-span-2 max-sm:row-span-2 sm:row-span-1" />
            </div>
          </div>
        </Chapter>

        {/* ---------- Structure viewer ---------- */}
        <Chapter
          id="structure"
          tone="mint"
          ornament="lens"
          title="โครงสร้างของต้นผักตบชวา"
          lead='กดที่จุดในภาพหรือชื่อส่วนเพื่ออ่านรายละเอียด ใช้ปุ่มซูมเพื่อดูใกล้ ๆ หรือกด "ดูโครงสร้าง" เพื่อแสดงชื่อทุกส่วน'
        >
          <div className="rounded-3xl bg-paper p-4 shadow-[0_18px_40px_-30px_rgb(16_36_31/0.5)] sm:p-8">
            <PlantViewer />
          </div>
        </Chapter>

        {/* ---------- Problem: the deep band ---------- */}
        <section
          id="problem"
          aria-labelledby="problem-title"
          data-reveal
          className="relative scroll-mt-16 overflow-hidden bg-teal-deep py-20 text-on-deep sm:py-28"
        >
          <div
            className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#1d4a3f] opacity-60 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <PhotoTile id="bloomField" className="h-[420px] sm:h-[560px]" sizes="(min-width: 1024px) 45vw, 100vw" />
            <div>
              <div className="reveal-heading">
                <Ornament name="river" tone="#f5c542" />
                <h2 id="problem-title" className="mt-3 text-4xl font-bold sm:text-6xl">
                  {problem.title}
                </h2>
                <p className="mt-4 text-xl text-on-deep-soft sm:text-2xl">{problem.intro}</p>
              </div>
              <ol className="mt-8 border-t border-white/15" data-stagger>
                {problem.timeline.map((t, i) => (
                  <li key={t.when} style={idx(i)} className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-4 border-b border-white/15 py-4">
                    <span className="tabular text-2xl font-bold text-sun">{t.when}</span>
                    <span className="text-xl text-on-deep">{t.text}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ---------- Reproduction ---------- */}
        <Chapter
          id="reproduction"
          tone="lavender"
          ornament="cells"
          title="ผักตบชวาสืบพันธุ์อย่างไร"
          lead="สืบพันธุ์ได้ทั้งแบบไม่อาศัยเพศและแบบอาศัยเพศ กดเล่นแอนิเมชันในแต่ละหัวข้อเพื่อดูทีละขั้น"
        >
          <ol className="mb-10 flex flex-wrap gap-2" aria-label="หัวข้อย่อย">
            {[
              ["clone", "ไหลและ clone", "#1f6338"],
              ["tristyly", "ดอกสามแบบ", "#4b2fa0"],
              ["gametes", "การสร้างเซลล์สืบพันธุ์", "#a3245c"],
              ["fertilization", "การปฏิสนธิซ้อน", "#9a4a0c"],
              ["seed", "ผลและเมล็ด", "#0f5a4c"],
            ].map(([id, label, color], i) => (
              <li key={id}>
                <a href={`#${id}`} className="press flex min-h-11 items-center gap-2 rounded-full bg-paper py-1 pl-1.5 pr-4 text-lg shadow-sm hover:shadow-md">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full text-base font-bold text-white" style={{ background: color }}>
                    {i + 1}
                  </span>
                  {label}
                </a>
              </li>
            ))}
          </ol>

          <Card id="clone" n={1} color="#1f6338" title="ไหลและ clone: สาเหตุหลักของการระบาด">
            <p className="max-w-3xl text-xl text-ink">
              ตาข้างของต้นแม่เจริญเป็น<strong> ไหล (stolon) </strong>สีม่วงที่ทอดยาวในแนวนอน ปลายไหลเกิด
              <strong> ต้นลูก </strong>ที่มีพันธุกรรมเหมือนต้นแม่ทุกประการ เมื่อไหลขาด ต้นลูกก็ลอยไปเป็นต้นใหม่ได้ทันที
              โดยไม่ต้องรอดอกหรือแมลงผสมเกสร
            </p>
            <FactRow facts={cloneFacts} pastel={1} />
            <div className="mt-6">
              <CloneGrowth />
            </div>
          </Card>

          <Card id="tristyly" n={2} color="#4b2fa0" title="ดอกสามแบบ (tristyly)">
            <p className="max-w-3xl text-xl text-ink">
              ดอกผักตบชวามีกลีบรวม 6 กลีบ เกสรเพศผู้ 6 อันเรียงเป็น 2 ระดับ และรังไข่ 3 ช่อง ต้นหนึ่งจะมีดอกได้เพียง 1 ใน 3 แบบ
              ต่างกันที่ความยาวก้านเกสรเพศเมีย
            </p>
            <div className="mt-6">
              <Tristyly />
            </div>
            <p className="mt-4 flex max-w-3xl gap-3 rounded-2xl bg-sun-wash p-4 text-lg text-ink">
              <span className="mt-1 shrink-0 text-sun-ink">
                <Icon name="sprout" />
              </span>
              {tristylyActivity}
            </p>
          </Card>

          <Card id="gametes" n={3} color="#a3245c" title="การสร้างเซลล์สืบพันธุ์">
            <p className="max-w-3xl text-xl text-ink">
              ผักตบชวามีโครโมโซม 2n = 32 เซลล์สืบพันธุ์จึงมี n = 16 เลือกดูฝั่งเพศผู้หรือเพศเมีย แล้วกดถัดไปหรือเล่นอัตโนมัติ
            </p>
            <div className="mt-6">
              <Gametogenesis />
            </div>
          </Card>

          <Card id="fertilization" n={4} color="#9a4a0c" title="การปฏิสนธิซ้อน (double fertilization)">
            <p className="max-w-3xl text-xl text-ink">
              ละอองเรณูตกบนยอดเกสรเพศเมีย แล้วงอกหลอดละอองเรณูลงไปถึง ovule sperm 2 เซลล์ผสมกับเซลล์ใน embryo sac
              คนละเซลล์ จึงเรียกว่าการปฏิสนธิซ้อน
            </p>
            <ul className="mt-5 grid gap-3 md:grid-cols-2">
              {fertilizationEquations.map((eq, i) => (
                <li key={eq.right} className={`rounded-2xl p-5 ${i === 0 ? "bg-[#fbe3ee]" : "bg-[#fdebd6]"}`}>
                  <p className="text-lg text-ink">{eq.left}</p>
                  <p className={`mt-1 text-2xl font-bold ${i === 0 ? "text-[#8f2a5c]" : "text-[#8a4a12]"}`}>→ {eq.right}</p>
                  <p className="text-lg text-ink-soft">{eq.note}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <DoubleFertilization />
            </div>
          </Card>

          <Card id="seed" n={5} color="#0f5a4c" title="จากดอกหนึ่งวัน สู่เมล็ดที่รอได้หลายสิบปี">
            <p className="max-w-3xl text-xl text-ink">เลื่อนแถบเวลาเพื่อดูว่าเกิดอะไรขึ้นหลังดอกบาน</p>
            <FactRow facts={seedFacts} pastel={3} />
            <div className="mt-6">
              <FlowerTimeline />
            </div>
          </Card>

          <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <div className="rounded-3xl bg-paper p-6 shadow-[0_18px_40px_-30px_rgb(16_36_31/0.5)] sm:p-8">
              <h3 className="text-3xl font-bold">สรุปจำนวนโครโมโซมในแต่ละระยะ</h3>
              <p className="mt-2 text-lg text-ink-soft">{chromosomeNote}</p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[26rem] border-collapse text-left text-xl">
                  <thead>
                    <tr className="border-b-2 border-ink/80">
                      <th scope="col" className="py-2 pr-4 font-bold">โครงสร้าง</th>
                      <th scope="col" className="py-2 pr-4 font-bold">ระดับ</th>
                      <th scope="col" className="py-2 text-right font-bold">โครโมโซม</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chromosomeTable.map((r) => (
                      <tr key={r.structure} className="border-b border-line">
                        <td className="py-2.5 pr-4">{r.structure}</td>
                        <td className="py-2.5 pr-4">
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
                        <td className="tabular py-2.5 text-right font-bold text-violet">{r.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <ul className="grid gap-4" data-stagger>
              {bioFacts.map((f, i) => (
                <li key={f.title} style={{ ...idx(i), background: PASTEL[[0, 1, 2][i]].bg }} className="rounded-3xl p-5">
                  <h3 className="text-2xl font-bold" style={{ color: PASTEL[[0, 1, 2][i]].fg }}>
                    {f.title}
                  </h3>
                  <p className="mt-1 text-lg text-ink">{f.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </Chapter>

        {/* ---------- Processing guide ---------- */}
        <Chapter
          id="guide"
          ornament="basket"
          title="คู่มือแปรรูป: เลือกวิธีที่อยากลองทำ"
          lead="แต่ละวิธีมีวัสดุ ขั้นตอน และข้อควรระวัง ทำตามได้ทีละข้อ"
        >
          <ProcessingGuide />
        </Chapter>

        {/* ---------- Photo banner ---------- */}
        <section data-reveal className="relative isolate overflow-hidden" aria-labelledby="banner-title">
          <div className="banner-photo absolute inset-0 -z-10">
            <Image src={photos.inleLake.src} alt={photos.inleLake.alt} fill sizes="100vw" placeholder="blur" className="object-cover" />
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/50 to-black/10" aria-hidden="true" />
          <div className="mx-auto max-w-6xl px-4 py-28 sm:px-6 sm:py-40">
            <div className="reveal-heading max-w-2xl">
              <h2 id="banner-title" className="text-5xl font-bold leading-[1.05] text-white sm:text-7xl">
                {banner.title}
              </h2>
              <p className="mt-5 text-xl text-white/90 sm:text-2xl">{banner.text}</p>
            </div>
          </div>
          <p className="absolute bottom-3 right-4 text-base text-white/80">{photos.inleLake.caption}</p>
        </section>

        {/* ---------- Benefits ---------- */}
        <Chapter id="benefits" ornament="hands" title={`ประโยชน์แท้แก่มหาชน: ${benefits.title}`} lead={benefits.intro}>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
            {benefits.items.map((b, i) => {
              const c = PASTEL[BENEFIT_PASTEL[b.icon]];
              return (
                <li key={b.title} style={{ ...idx(i), background: c.bg }} className="relative overflow-hidden rounded-3xl p-6">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-paper" style={{ color: c.fg }}>
                    <Icon name={b.icon as IconName} size={28} />
                  </span>
                  <h3 className="mt-4 text-3xl font-bold" style={{ color: c.fg }}>
                    {b.title}
                  </h3>
                  <p className="mt-1 text-xl text-ink">{b.text}</p>
                </li>
              );
            })}
          </ul>
        </Chapter>

        {/* ---------- Team ---------- */}
        <Chapter
          id="credits"
          tone="lavender"
          ornament="pencil"
          title="คณะผู้จัดทำ"
          lead={`นักเรียนชั้นมัธยมศึกษาปีที่ 6/3 ${work.course} ${work.unit} ${work.school}`}
        >
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
            {members.map((m, i) => {
              const c = PASTEL[i % 4];
              const first = m.name.replace(/^นาย/, "").charAt(0);
              return (
                <li key={m.name} style={idx(i)} className="flex items-center gap-4 rounded-3xl bg-paper p-4 shadow-[0_14px_30px_-24px_rgb(16_36_31/0.6)]">
                  <span
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-3xl font-bold"
                    style={{ background: c.bg, color: c.fg }}
                    aria-hidden="true"
                  >
                    {first}
                  </span>
                  <span>
                    <span className="block text-xl font-bold leading-tight">{m.name}</span>
                    <span className="tabular block text-lg text-ink-soft">
                      {memberClass} เลขที่ {m.number}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-12 grid gap-8 rounded-3xl bg-paper p-6 sm:p-8 lg:grid-cols-2">
            <div>
              <h3 className="text-2xl font-bold">ที่มาของข้อมูล</h3>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-lg text-ink-soft marker:text-violet">
                {sources.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold">ที่มาของภาพถ่าย</h3>
              <ul className="mt-3 space-y-2 text-lg text-ink-soft">
                {(Object.values(photos) as Photo[]).map((p) => (
                  <li key={p.caption}>
                    <span className="text-ink">{p.caption}</span>
                    {" · "}
                    {p.credit ? (
                      <>
                        {p.credit.author},{" "}
                        <a href={p.credit.fileUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-violet">
                          Wikimedia Commons
                        </a>{" "}
                        ({p.credit.license})
                      </>
                    ) : (
                      "ภาพโดยคณะผู้จัดทำ"
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Chapter>
      </main>

      <footer className="relative bg-teal-deep text-on-deep-soft">
        <div className="bg-paper">
          <HeroScene />
        </div>
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-4 px-4 py-10 sm:px-6">
          <div>
            <p className="text-4xl font-bold text-on-deep">{work.name}</p>
            <p className="mt-1 text-lg">
              {work.title} · จัดทำเพื่อการศึกษา · {work.course} · {work.school}
            </p>
          </div>
          <a
            href="#top"
            className="press inline-flex min-h-11 items-center gap-2 rounded-full border border-on-deep-soft/50 px-5 text-lg text-on-deep hover:bg-white/10"
          >
            กลับขึ้นด้านบน
          </a>
        </div>
      </footer>
    </>
  );
}

type Tone = "white" | "mint" | "lavender";

const TONE: Record<Tone, string> = {
  white: "",
  mint: "bg-gradient-to-b from-paper via-teal-wash/70 to-paper",
  lavender: "bg-gradient-to-b from-paper via-violet-band to-paper",
};

function Chapter({
  id,
  title,
  lead,
  ornament,
  tone = "white",
  children,
}: {
  id: string;
  title: string;
  lead?: string;
  ornament: OrnamentName;
  tone?: Tone;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      data-reveal
      data-loop
      className={`relative scroll-mt-16 py-20 sm:py-24 ${TONE[tone]}`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="reveal-heading flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
          <div className="flex items-center gap-4">
            <Ornament name={ornament} />
            <h2 id={`${id}-title`} className="text-4xl font-bold text-ink sm:text-6xl">
              {title}
            </h2>
          </div>
          {lead && <p className="max-w-xl text-xl text-ink-soft sm:text-2xl lg:text-right">{lead}</p>}
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

function Card({ id, n, color, title, children }: { id: string; n: number; color: string; title: string; children: ReactNode }) {
  return (
    <article
      id={id}
      className="mt-6 scroll-mt-24 rounded-3xl bg-paper p-5 shadow-[0_18px_40px_-30px_rgb(16_36_31/0.5)] first:mt-0 sm:p-8"
    >
      <h3 className="mb-4 flex items-center gap-3 text-3xl font-bold text-ink sm:text-4xl">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-2xl text-white shadow-md"
          style={{ background: color }}
          aria-hidden="true"
        >
          {n}
        </span>
        {title}
      </h3>
      {children}
    </article>
  );
}

function FactRow({ facts, pastel }: { facts: { value: string; text: string }[]; pastel: number }) {
  const c = PASTEL[pastel];
  return (
    <dl className="mt-6 grid gap-3 sm:grid-cols-3" data-stagger>
      {facts.map((f, i) => (
        <div key={f.value} style={{ ...idx(i), background: c.bg }} className="rounded-2xl p-4">
          <dt className="tabular text-3xl font-bold" style={{ color: c.fg }}>
            {f.value}
          </dt>
          <dd className="text-lg text-ink-soft">{f.text}</dd>
        </div>
      ))}
    </dl>
  );
}
