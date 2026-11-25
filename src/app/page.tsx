import Image from "next/image";
import PlantViewer from "@/components/PlantViewer";
import ChapterNav from "@/components/ChapterNav";
import CloneGrowth from "@/components/CloneGrowth";
import Tristyly from "@/components/Tristyly";
import FlowerTimeline from "@/components/FlowerTimeline";
import ProcessingGuide from "@/components/ProcessingGuide";
import HeroScene from "@/components/HeroScene";
import MotionRoot from "@/components/MotionRoot";
import PhotoTile from "@/components/PhotoTile";
import ChromosomeChart from "@/components/ChromosomeChart";
import PendingBadge from "@/components/PendingBadge";
import Cover from "@/components/Cover";
import Paper, { Sticker, type PaperKind } from "@/components/paper/Paper";
import { DoubleFertilization, Gametogenesis } from "@/components/ReproVisuals";
import { photos, type Photo } from "@/content/photos";
import {
  work,
  identity,
  problem,
  quickFacts,
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
  stickers,
} from "@/content/plant";
import type { CSSProperties, ReactNode } from "react";

const idx = (i: number) => ({ ["--i" as string]: i }) as CSSProperties;

// สีประจำหัวข้อ: fill = พื้นสด, wash = พื้นอ่อน, ink = สีตัวหนังสือบนพื้นขาว
type Topic = "green" | "violet" | "pink" | "orange" | "teal" | "sun";
const TOPIC: Record<Topic, { fill: string; wash: string; ink: string }> = {
  green: { fill: "bg-lime text-ink", wash: "bg-lime-wash", ink: "text-green-ink" },
  violet: { fill: "bg-violet text-white", wash: "bg-violet-wash", ink: "text-violet" },
  pink: { fill: "bg-pink text-ink", wash: "bg-pink-wash", ink: "text-pink-ink" },
  orange: { fill: "bg-orange text-ink", wash: "bg-orange-wash", ink: "text-orange-ink" },
  teal: { fill: "bg-teal text-white", wash: "bg-teal-wash", ink: "text-teal-ink" },
  sun: { fill: "bg-sun text-ink", wash: "bg-sun-wash", ink: "text-sun-ink" },
};

const SUBTOPICS: { id: string; label: string; topic: Topic }[] = [
  { id: "clone", label: "ไหลและ clone", topic: "green" },
  { id: "tristyly", label: "ดอกสามแบบ", topic: "violet" },
  { id: "gametes", label: "การสร้างเซลล์สืบพันธุ์", topic: "pink" },
  { id: "fertilization", label: "การปฏิสนธิซ้อน", topic: "orange" },
  { id: "seed", label: "ผลและเมล็ด", topic: "teal" },
];

const QUICK: { topic: Topic; shape: PaperKind; rotate: number }[] = [
  { topic: "violet", shape: "blossom", rotate: 12 },
  { topic: "green", shape: "float-water", rotate: 8 },
  { topic: "sun", shape: "sprout", rotate: -8 },
];

const BENEFIT: Record<string, { wash: string; shape: PaperKind }> = {
  water: { wash: "bg-teal-wash", shape: "drop" },
  coin: { wash: "bg-sun-wash", shape: "sun" },
  leaf: { wash: "bg-lime-wash", shape: "leaf" },
  sprout: { wash: "bg-violet-wash", shape: "sprout" },
};

const BIO_TONE: Topic[] = ["violet", "pink", "teal"];

export default function Home() {
  const plantCode = identity.find((r) => r.label === "รหัสพรรณไม้")?.value ?? "";
  const MAIN_FIELDS = ["ชื่อผลงาน", "รหัสพรรณไม้", "ชื่อวิทยาศาสตร์", "ชื่อสามัญ", "ชื่อพื้นเมือง"];

  return (
    <>
      <MotionRoot />
      <ChapterNav />

      <main className="w-full flex-1 overflow-x-clip">
        {/* ================= Cover ================= */}
        <header id="top" className="mx-auto max-w-6xl px-4 pb-16 pt-24 sm:px-6">
          <Cover plantCode={plantCode} />

          <dl className="mt-10 grid gap-4 sm:mt-14 md:grid-cols-3">
            {quickFacts.map((f, i) => {
              const q = QUICK[i];
              const on = q.topic === "violet" ? "text-white/90" : "text-ink/80";
              return (
                <div key={f.value} className={`relative isolate overflow-hidden rounded-[1.75rem] p-6 pr-24 ${TOPIC[q.topic].fill}`}>
                  <dt className="tabular text-[2rem] font-bold leading-tight">{f.value}</dt>
                  <dd className={`mt-1 text-base leading-relaxed ${on}`}>{f.text}</dd>
                  <div className="absolute right-2 top-4 -z-10 w-20">
                    <Paper kind={q.shape} rotate={q.rotate} poke flat />
                  </div>
                </div>
              );
            })}
          </dl>
        </header>

        {/* ================= Identity ================= */}
        <Chapter
          id="identity"
          title="รู้จักผักตบชวา"
          lead="พืชน้ำลอยน้ำ ดอกสวย แต่โตเร็วจนกลายเป็นวัชพืชที่สร้างปัญหาให้แหล่งน้ำทั่วประเทศ"
          deco={[{ kind: "leaf", className: "-right-16 top-10 w-44 lg:w-56", rotate: -30 }]}
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
            <div className="relative">
              <div className="overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-[var(--shadow-lift)]">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 bg-violet px-6 py-4 text-white">
                  <h3 className="text-xl">ทะเบียนพรรณไม้</h3>
                  <p className="text-sm text-white/85">{work.school}</p>
                </div>
                <dl className="px-6 pb-4" data-stagger>
                  {identity.map((row, i) => {
                    const main = MAIN_FIELDS.includes(row.label);
                    return (
                      <div
                        key={row.label}
                        style={idx(i)}
                        className="grid gap-x-4 gap-y-0.5 border-b border-line py-3 last:border-b-0 sm:grid-cols-[8.5rem_minmax(0,1fr)]"
                      >
                        <dt className="text-base text-ink-soft">{row.label}</dt>
                        <dd className={main ? "text-lg font-semibold text-ink" : "text-base text-ink"}>
                          {row.value ? (
                            row.label === "รหัสพรรณไม้" ? (
                              <span className="tabular inline-block whitespace-nowrap rounded-lg bg-sun px-2.5 text-xl font-bold text-ink">{row.value}</span>
                            ) : (
                              <span className={row.italic ? "italic" : ""}>{row.value}</span>
                            )
                          ) : (
                            <PendingBadge />
                          )}
                          {row.note && <span className="mt-0.5 block text-sm font-normal text-ink-soft">{row.note}</span>}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
              <Sticker tone="lime" rotate={5} className="absolute -bottom-4 right-5 text-base">
                {stickers.home}
              </Sticker>
            </div>

            <div className="grid auto-rows-[9.5rem] grid-cols-2 gap-3 sm:auto-rows-[11rem] sm:grid-cols-3">
              <PhotoTile id="flowerCloseup" className="col-span-2 row-span-2" frameClassName="h-full" caption="overlay" sizes="(min-width: 1024px) 32vw, 100vw" />
              <PhotoTile id="groupPlantCode" className="row-span-2" frameClassName="h-full ring-4 ring-sun" caption="overlay" sizes="(min-width: 1024px) 16vw, 50vw" />
              <PhotoTile id="flowerOnWater" frameClassName="h-full" caption="overlay" sizes="(min-width: 1024px) 16vw, 50vw" />
              <PhotoTile id="flowerSpike" frameClassName="h-full" caption="overlay" sizes="(min-width: 1024px) 16vw, 50vw" />
              <PhotoTile id="petioleSection" className="col-span-2 sm:col-span-1" frameClassName="h-full" caption="overlay" sizes="(min-width: 1024px) 16vw, 100vw" />
            </div>
          </div>
        </Chapter>

        {/* ================= Structure ================= */}
        <Chapter
          id="structure"
          tone="teal"
          title="โครงสร้างของต้นผักตบชวา"
          lead='กดที่จุดในภาพหรือชื่อส่วนเพื่ออ่านรายละเอียด ใช้ปุ่มซูมเพื่อดูใกล้ ๆ หรือกด "ดูโครงสร้าง" เพื่อแสดงชื่อทุกส่วน'
          deco={[
            { kind: "float", className: "-left-6 top-24 w-16 lg:w-20", rotate: -12 },
            { kind: "blossom", className: "-right-10 bottom-10 w-28 lg:w-36", rotate: 18 },
          ]}
        >
          <div className="rounded-[2rem] bg-white p-4 shadow-[var(--shadow-lift)] sm:p-8">
            <PlantViewer />
          </div>
        </Chapter>

        {/* ================= Problem ================= */}
        <section
          id="problem"
          aria-labelledby="problem-title"
          data-reveal
          className="on-dark relative scroll-mt-16 overflow-hidden bg-forest py-20 text-on-forest sm:py-28"
        >
          <Deco items={[{ kind: "stolon", className: "-right-10 top-14 w-64 lg:w-80", rotate: 8 }, { kind: "leaf", className: "-left-10 bottom-8 w-32", rotate: 20 }]} />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
              <PhotoTile id="habitus" frameClassName="aspect-[4/3]" sizes="(min-width: 1024px) 46vw, 100vw" tone="forest" caption="overlay" />
              <div>
                <div className="reveal-heading">
                  <h2 id="problem-title" className="text-[clamp(2.25rem,5vw,3.5rem)] text-white">
                    {problem.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-lg leading-relaxed text-on-forest-soft sm:text-xl">{problem.intro}</p>
                </div>
                <ol className="mt-8" data-stagger>
                  {problem.timeline.map((t, i) => (
                    <li key={t.when} style={idx(i)} className="grid gap-x-6 border-t border-white/15 py-4 sm:grid-cols-[7rem_minmax(0,1fr)]">
                      <span className="tabular text-2xl font-bold text-sun">{t.when}</span>
                      <span className="text-lg leading-relaxed">{t.text}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* ================= Reproduction ================= */}
        <Chapter
          id="reproduction"
          tone="lilac"
          title="ผักตบชวาสืบพันธุ์อย่างไร"
          lead="สืบพันธุ์ได้ทั้งแบบไม่อาศัยเพศและแบบอาศัยเพศ กดเล่นแอนิเมชันในแต่ละหัวข้อเพื่อดูทีละขั้น"
          deco={[{ kind: "sprout", className: "-right-8 top-16 w-28 lg:w-36", rotate: 10 }]}
        >
          <nav aria-label="หัวข้อย่อยการสืบพันธุ์" className="mb-10">
            <ol className="flex flex-wrap gap-2">
              {SUBTOPICS.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="press flex min-h-11 items-center gap-3 rounded-full bg-white py-1 pl-1.5 pr-5 text-base font-semibold shadow-[0_6px_16px_-12px_rgb(20_17_42/0.5)] hover:text-violet"
                  >
                    <span className={`tabular flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${TOPIC[s.topic].fill}`}>{i + 1}</span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <Article id="clone" n={1} topic="green" title="ไหลและ clone: สาเหตุหลักของการระบาด" sticker={stickers.stolon}>
            <p className="max-w-3xl text-lg leading-relaxed sm:text-xl">
              ตาข้างของต้นแม่เจริญเป็น<strong> ไหล (stolon) </strong>สีม่วงที่ทอดยาวในแนวนอน ปลายไหลเกิด
              <strong> ต้นลูก </strong>ที่มีพันธุกรรมเหมือนต้นแม่ทุกประการ เมื่อไหลขาด ต้นลูกก็ลอยไปเป็นต้นใหม่ได้ทันที
              โดยไม่ต้องรอดอกหรือแมลงผสมเกสร
            </p>
            <FactRow facts={cloneFacts} topic="green" />
            <div className="relative mt-8">
              <CloneGrowth />
              <Sticker tone="sun" rotate={3} className="absolute -top-4 right-4 hidden text-base sm:inline-block">
                {stickers.clone}
              </Sticker>
            </div>
          </Article>

          <Article id="tristyly" n={2} topic="violet" title="ดอกสามแบบ (tristyly)" sticker={stickers.flower}>
            <p className="max-w-3xl text-lg leading-relaxed sm:text-xl">
              ดอกผักตบชวามีกลีบรวม 6 กลีบ เกสรเพศผู้ 6 อันเรียงเป็น 2 ระดับ และรังไข่ 3 ช่อง ต้นหนึ่งจะมีดอกได้เพียง 1 ใน 3 แบบ
              ต่างกันที่ความยาวก้านเกสรเพศเมีย
            </p>
            <div className="mt-8">
              <Tristyly />
            </div>
            <p className="mt-5 flex max-w-3xl gap-3 rounded-2xl bg-sun-wash p-5 text-lg">
              <span className="mt-0.5 w-7 shrink-0">
                <Paper kind="sprout" flat />
              </span>
              {tristylyActivity}
            </p>
          </Article>

          <Article id="gametes" n={3} topic="pink" title="การสร้างเซลล์สืบพันธุ์">
            <p className="max-w-3xl text-lg leading-relaxed sm:text-xl">
              ผักตบชวามีโครโมโซม 2n = 32 เซลล์สืบพันธุ์จึงมี n = 16 เลือกดูฝั่งเพศผู้หรือเพศเมีย แล้วกดถัดไปหรือเล่นอัตโนมัติ
            </p>
            <div className="mt-8">
              <Gametogenesis />
            </div>
          </Article>

          <Article id="fertilization" n={4} topic="orange" title="การปฏิสนธิซ้อน (double fertilization)">
            <p className="max-w-3xl text-lg leading-relaxed sm:text-xl">
              ละอองเรณูตกบนยอดเกสรเพศเมีย แล้วงอกหลอดละอองเรณูลงไปถึง ovule sperm 2 เซลล์ผสมกับเซลล์ใน embryo sac
              คนละเซลล์ จึงเรียกว่าการปฏิสนธิซ้อน
            </p>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {fertilizationEquations.map((eq) => (
                <li key={eq.right} className="rounded-2xl bg-orange-wash p-5">
                  <p className="text-lg">{eq.left}</p>
                  <p className="mt-1 text-2xl font-bold text-orange-ink">→ {eq.right}</p>
                  <p className="text-base text-ink-soft">{eq.note}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <DoubleFertilization />
            </div>
          </Article>

          <Article id="seed" n={5} topic="teal" title="จากดอกหนึ่งวัน สู่เมล็ดที่รอได้หลายสิบปี" sticker={stickers.seed}>
            <p className="max-w-3xl text-lg leading-relaxed sm:text-xl">เลื่อนแถบเวลาเพื่อดูว่าเกิดอะไรขึ้นหลังดอกบาน</p>
            <FactRow facts={seedFacts} topic="teal" />
            <div className="mt-8">
              <FlowerTimeline />
            </div>
          </Article>

          <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-10 rounded-[2rem] bg-white p-6 sm:p-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
            <div>
              <h3 className="text-2xl sm:text-3xl">สรุปจำนวนโครโมโซม</h3>
              <p className="mt-2 text-base text-ink-soft sm:text-lg">{chromosomeNote}</p>
              <div className="mt-6">
                <ChromosomeChart />
              </div>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[22rem] border-collapse text-left text-base sm:text-lg">
                  <caption className="sr-only">ตารางจำนวนโครโมโซมในแต่ละโครงสร้าง</caption>
                  <thead>
                    <tr className="border-b-2 border-ink">
                      <th scope="col" className="py-2 pr-4 font-semibold">โครงสร้าง</th>
                      <th scope="col" className="py-2 pr-4 font-semibold">ระดับ</th>
                      <th scope="col" className="py-2 text-right font-semibold">โครโมโซม</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chromosomeTable.map((r) => (
                      <tr key={r.structure} className="border-b border-line">
                        <td className="py-3 pr-4">{r.structure}</td>
                        <td className="py-3 pr-4 font-semibold">{r.level}</td>
                        <td className="tabular py-3 text-right font-bold text-violet">{r.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <ul className="grid content-start gap-4" data-stagger>
              {bioFacts.map((f, i) => (
                <li key={f.title} style={idx(i)} className={`rounded-2xl p-5 ${TOPIC[BIO_TONE[i % BIO_TONE.length]].wash}`}>
                  <h3 className={`text-xl ${TOPIC[BIO_TONE[i % BIO_TONE.length]].ink}`}>{f.title}</h3>
                  <p className="mt-1.5 text-base leading-relaxed text-ink">{f.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </Chapter>

        {/* ================= Processing guide ================= */}
        <Chapter
          id="guide"
          title="คู่มือแปรรูป: เลือกวิธีที่อยากลองทำ"
          lead="แต่ละวิธีมีวัสดุ ขั้นตอน และข้อควรระวัง ทำตามได้ทีละข้อ"
          sticker={stickers.water}
          deco={[{ kind: "drop", className: "-left-8 top-20 w-20", rotate: -14 }]}
        >
          <ProcessingGuide />
        </Chapter>

        {/* ================= Banner ================= */}
        <section data-reveal className="mx-auto max-w-6xl px-4 pb-8 sm:px-6" aria-labelledby="banner-title">
          <div className="relative">
            <div className="on-dark relative isolate overflow-hidden rounded-[2rem] bg-forest sm:rounded-[2.5rem]">
              <Image src={photos.inleLake.src} alt={photos.inleLake.alt} fill sizes="(min-width: 1200px) 1150px, 100vw" placeholder="blur" className="-z-10 object-cover" />
              <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(12_10_30/0.88),rgb(12_10_30/0.55)_55%,rgb(12_10_30/0.1))]" aria-hidden="true" />
              <div className="reveal-heading max-w-2xl px-6 py-20 sm:px-12 sm:py-28">
                <h2 id="banner-title" className="text-[clamp(2.1rem,5vw,3.5rem)] text-white">
                  {banner.title}
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/90 sm:text-xl">{banner.text}</p>
                <Sticker tone="sun" rotate={-5} className="mt-7 text-lg">
                  {stickers.free}
                </Sticker>
              </div>
              <p className="absolute bottom-3 right-4 max-w-[70%] rounded-full bg-black/45 px-3 py-0.5 text-right text-xs text-white/90">
                {photos.inleLake.caption} · ภาพ: {photos.inleLake.credit?.author}, {photos.inleLake.credit?.license}
              </p>
            </div>
            <div className="pointer-events-none absolute -right-3 -top-10 w-24 sm:-right-8 sm:w-32" aria-hidden="true">
              <div className="drop-in pointer-events-auto">
                <Paper kind="sprout" rotate={14} poke />
              </div>
            </div>
          </div>
        </section>

        {/* ================= Benefits ================= */}
        <Chapter id="benefits" title="ประโยชน์แท้แก่มหาชน" lead={`${benefits.title} ${benefits.intro}`}>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
            {benefits.items.map((b, i) => {
              const t = BENEFIT[b.icon];
              return (
                <li key={b.title} style={idx(i)} className={`relative rounded-[1.75rem] p-6 pt-24 ${t.wash}`}>
                  <div className="absolute left-5 top-5 w-16">
                    <Paper kind={t.shape} rotate={i % 2 ? 8 : -8} poke />
                  </div>
                  <h3 className="text-2xl">{b.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-ink-soft">{b.text}</p>
                </li>
              );
            })}
          </ul>
        </Chapter>

        {/* ================= Credits ================= */}
        <Chapter
          id="credits"
          tone="lilac"
          title="คณะผู้จัดทำ"
          lead={`นักเรียนชั้นมัธยมศึกษาปีที่ 6/3 ${work.course} ${work.unit} ${work.school}`}
        >
          <ul className="grid gap-3 sm:grid-cols-2" data-stagger>
            {members.map((m, i) => (
              <li key={m.name} style={idx(i)} className="flex items-center justify-between gap-4 rounded-2xl bg-white px-5 py-4">
                <span className="text-xl font-bold sm:text-2xl">{m.name}</span>
                <span className="tabular shrink-0 rounded-full bg-violet-wash px-3 py-0.5 text-base font-semibold text-violet">
                  {memberClass} เลขที่ {m.number}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-14 grid gap-10 text-base lg:grid-cols-2">
            <div>
              <h3 className="text-xl">ที่มาของข้อมูล</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-ink-soft marker:text-violet">
                {sources.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl">ที่มาของภาพถ่าย</h3>
              <ul className="mt-3 space-y-2 leading-relaxed text-ink-soft">
                {(Object.values(photos) as Photo[]).map((p) => (
                  <li key={p.caption}>
                    <span className="text-ink">{p.caption}</span>
                    {" · "}
                    {p.credit ? (
                      <>
                        {p.credit.author},{" "}
                        <a href={p.credit.fileUrl} target="_blank" rel="noreferrer" className="underline decoration-violet/40 hover:text-violet">
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

      {/* ================= Footer ================= */}
      <footer className="relative">
        <div className="bg-lilac">
          <HeroScene />
        </div>
        <div className="on-dark bg-violet text-white">
          <div className="mx-auto max-w-6xl px-4 pb-10 pt-10 sm:px-6">
            <p className="text-[clamp(3.5rem,14vw,6rem)] font-bold leading-[1.1] tracking-[-0.03em]" aria-hidden="true">
              Vegetable
            </p>
            <div className="mt-6 flex flex-wrap items-end justify-between gap-6 border-t border-white/25 pt-6">
              <p className="max-w-2xl text-base leading-relaxed text-white/90">
                <span className="font-semibold text-white">{work.name}</span> · {work.title} · จัดทำเพื่อการศึกษา · {work.course} · {work.school}
              </p>
              <a href="#top" className="press inline-flex min-h-11 items-center gap-2 rounded-full bg-sun px-5 text-base font-bold text-ink hover:bg-white">
                กลับขึ้นด้านบน
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

type Tone = "paper" | "teal" | "lilac";

const TONE: Record<Tone, string> = {
  paper: "bg-white",
  teal: "bg-teal-wash",
  lilac: "bg-lilac",
};

type DecoItem = { kind: PaperKind; className: string; rotate?: number };

// ชิ้นกระดาษตัดชิ้นใหญ่ที่โผล่จากขอบส่วน อยู่ในขอบว่างเท่านั้น ไม่ทับเนื้อความ
function Deco({ items }: { items: DecoItem[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block" aria-hidden="true">
      {items.map((d, i) => (
        <div key={i} className={`absolute ${d.className}`}>
          <div className="drop-in pointer-events-auto" style={{ ["--d" as string]: `${200 + i * 150}ms` }}>
            <Paper kind={d.kind} rotate={d.rotate} poke />
          </div>
        </div>
      ))}
    </div>
  );
}

function Chapter({
  id,
  title,
  lead,
  tone = "paper",
  sticker,
  deco,
  children,
}: {
  id: string;
  title: string;
  lead?: string;
  tone?: Tone;
  sticker?: string;
  deco?: DecoItem[];
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} data-reveal data-loop className={`relative scroll-mt-16 py-20 sm:py-28 ${TONE[tone]}`}>
      {deco && <Deco items={deco} />}
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="reveal-heading grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end lg:gap-10">
          <div>
            <h2 id={`${id}-title`} className="text-[clamp(2.25rem,5vw,3.5rem)] text-ink">
              {title}
            </h2>
            {sticker && (
              <Sticker tone="pink" rotate={-3} className="mt-3 text-base sm:text-lg">
                {sticker}
              </Sticker>
            )}
          </div>
          {lead && <p className="max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">{lead}</p>}
        </div>
        <div className="mt-10 sm:mt-14">{children}</div>
      </div>
    </section>
  );
}

function Article({
  id,
  n,
  topic,
  title,
  sticker,
  children,
}: {
  id: string;
  n: number;
  topic: Topic;
  title: string;
  sticker?: string;
  children: ReactNode;
}) {
  return (
    <article id={id} className="mt-6 scroll-mt-24 rounded-[2rem] bg-white p-5 first:mt-0 sm:p-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <div className="flex items-center gap-4">
          <span className={`tabular flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl font-bold ${TOPIC[topic].fill}`} aria-hidden="true">
            {n}
          </span>
          <h3 className="text-2xl leading-snug sm:text-3xl">{title}</h3>
        </div>
        {sticker && (
          <Sticker tone={topic === "violet" ? "violet" : topic === "pink" ? "pink" : topic === "teal" ? "lime" : "sun"} rotate={3} className="text-base">
            {sticker}
          </Sticker>
        )}
      </div>
      {children}
    </article>
  );
}

function FactRow({ facts, topic }: { facts: { value: string; text: string }[]; topic: Topic }) {
  return (
    <dl className="mt-8 grid gap-3 sm:grid-cols-3" data-stagger>
      {facts.map((f, i) => (
        <div key={f.value} style={idx(i)} className={`rounded-2xl p-5 ${TOPIC[topic].wash}`}>
          <dt className={`tabular text-2xl font-bold ${TOPIC[topic].ink}`}>{f.value}</dt>
          <dd className="mt-1 text-base leading-snug text-ink">{f.text}</dd>
        </div>
      ))}
    </dl>
  );
}
