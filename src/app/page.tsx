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
import CountUp from "@/components/CountUp";
import ChromosomeChart from "@/components/ChromosomeChart";
import PendingBadge from "@/components/PendingBadge";
import { DoubleFertilization, Gametogenesis } from "@/components/ReproVisuals";
import { Icon, type IconName } from "@/components/ui";
import { photos, type Photo } from "@/content/photos";
import {
  work,
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
  ledeStats,
  localNames,
  members,
  memberClass,
  sources,
} from "@/content/plant";
import type { CSSProperties, ReactNode } from "react";

const idx = (i: number) => ({ ["--i" as string]: i }) as CSSProperties;

const BENEFIT_TONE: Record<string, { bg: string; fg: string }> = {
  water: { bg: "#d4ebe2", fg: "#0f4f3e" },
  coin: { bg: "#f7e7a8", fg: "#5c4406" },
  leaf: { bg: "#d8ecd9", fg: "#24573a" },
  sprout: { bg: "#e4dbf8", fg: "#46309a" },
};

const SUBTOPICS = [
  { id: "clone", label: "ไหลและ clone" },
  { id: "tristyly", label: "ดอกสามแบบ" },
  { id: "gametes", label: "การสร้างเซลล์สืบพันธุ์" },
  { id: "fertilization", label: "การปฏิสนธิซ้อน" },
  { id: "seed", label: "ผลและเมล็ด" },
];

export default function Home() {
  const plantCode = identity.find((r) => r.label === "รหัสพรรณไม้")?.value;

  return (
    <>
      <MotionRoot />
      <ChapterNav />

      <main className="w-full flex-1">
        {/* ================= Cover ================= */}
        <header id="top" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-forest text-white">
          <Image
            src={photos.habitus.src}
            alt={photos.habitus.alt}
            fill
            priority
            placeholder="blur"
            sizes="100vw"
            className="kenburns -z-10 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/35 to-black/25" aria-hidden="true" />

          <div className="mx-auto mt-auto w-full max-w-7xl px-4 pb-10 pt-28 sm:px-8 sm:pb-12">
            <h1 className="font-serif text-[clamp(3rem,8vw,7.25rem)] font-bold leading-[1.08] tracking-tight">
              <span className="line-in" style={{ ["--l" as string]: 0 }}>ผักตบชวา</span>
              <span className="line-in" style={{ ["--l" as string]: 1 }}>จากวัชพืช</span>
              <span className="line-in" style={{ ["--l" as string]: 2 }}>
                สู่<span className="relative isolate inline-block">
                  ของมีค่า
                  <span className="absolute inset-x-0 bottom-[0.12em] -z-10 h-[0.2em] bg-sun" aria-hidden="true" />
                </span>
              </span>
            </h1>
            <div className="line-in mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end" style={{ ["--l" as string]: 3 }}>
              <div>
                <p className="max-w-2xl text-xl leading-relaxed text-white/90 sm:text-2xl">{work.lead}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href="#guide"
                    className="press inline-flex min-h-12 items-center gap-2 rounded-full bg-sun px-6 text-lg font-semibold text-ink hover:bg-white"
                  >
                    เริ่มดูคู่มือ
                    <Icon name="next" />
                  </a>
                  <a
                    href="#identity"
                    className="press inline-flex min-h-12 items-center rounded-full border border-white/60 px-6 text-lg font-semibold text-white hover:bg-white hover:text-ink"
                  >
                    รู้จักผักตบชวา
                  </a>
                </div>
              </div>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-white/30 pt-4 text-base">
                <div>
                  <dt className="text-white/70">ผลงาน</dt>
                  <dd className="font-semibold">{work.name}</dd>
                </div>
                <div>
                  <dt className="text-white/70">รหัสพรรณไม้</dt>
                  <dd className="tabular font-semibold">{plantCode}</dd>
                </div>
                <div>
                  <dt className="text-white/70">รายวิชา</dt>
                  <dd className="font-semibold">ชีววิทยา 5 (ว30245)</dd>
                </div>
                <div>
                  <dt className="text-white/70">ผู้จัดทำ</dt>
                  <dd className="font-semibold">{memberClass} · {work.school.replace(" จังหวัดพิษณุโลก", "")}</dd>
                </div>
              </dl>
            </div>
          </div>
          <p className="absolute bottom-2 right-4 text-xs text-white/70">
            ภาพปก: {photos.habitus.credit?.author}, {photos.habitus.credit?.license}
          </p>
        </header>

        {/* ================= Marquee of names ================= */}
        <div data-loop className="overflow-hidden border-y border-forest-2 bg-forest py-4 text-on-forest" aria-label={`ชื่อเรียกของผักตบชวา: ${localNames.join(", ")}`}>
          <div className="marquee-track flex w-max items-center" aria-hidden="true">
            {[0, 1].map((k) => (
              <div key={k} className="flex items-center">
                {localNames.map((n) => (
                  <span key={`${k}-${n}`} className="flex items-center font-serif text-2xl font-semibold sm:text-3xl">
                    <span className="px-6">{n}</span>
                    <span className="h-2 w-2 rounded-full bg-sun" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ================= Lede ================= */}
        <section data-reveal className="mx-auto max-w-7xl px-4 py-24 sm:px-8 sm:py-32" aria-label="บทนำ">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
            <p className="reveal-heading font-serif text-3xl font-medium leading-[1.5] text-ink sm:text-[2.6rem]">
              พืชน้ำลอยน้ำที่มี<span className="text-violet">ดอกสีม่วงสวย</span> เข้ามาในไทยเพราะความงาม
              แต่โตเร็วจนกลายเป็นวัชพืชที่ขวางลำน้ำทั่วประเทศ งานนี้ชวนดูว่ามันเติบโตอย่างไร และเปลี่ยนมันให้เป็น
              <span className="bg-[linear-gradient(transparent_62%,var(--sun)_62%)]">ของที่ใช้ได้จริง</span>
            </p>
            <dl className="grid content-start gap-0" data-stagger>
              {ledeStats.map((s, i) => (
                <div key={s.label} style={idx(i)} className="grid grid-cols-[minmax(0,1fr)] border-t border-line py-5 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-6">
                  <dt className="font-serif text-4xl font-bold text-forest">
                    {s.prefix && <span className="text-2xl">{s.prefix}</span>}
                    {s.value !== undefined ? <CountUp to={s.value} /> : s.text}
                    {s.suffix && <span className="text-2xl">{s.suffix}</span>}
                  </dt>
                  <dd className="mt-1 text-lg text-ink-soft sm:mt-2">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ================= Identity ================= */}
        <Chapter id="identity" title="รู้จักผักตบชวา" lead="พืชน้ำลอยน้ำ ดอกสวย แต่โตเร็วจนกลายเป็นวัชพืชที่สร้างปัญหาให้แหล่งน้ำทั่วประเทศ">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <PhotoTile id="flowerCloseup" frameClassName="aspect-[4/5]" sizes="(min-width: 1024px) 45vw, 100vw" parallax />
            <div>
              <div className="rounded-3xl bg-paper-deep p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-ink pb-3">
                  <h3 className="text-2xl font-bold">ทะเบียนพรรณไม้</h3>
                  <p className="text-base text-ink-soft">{work.school}</p>
                </div>
                <dl data-stagger>
                  {identity.map((row, i) => (
                    <div
                      key={row.label}
                      style={idx(i)}
                      className="grid gap-x-4 gap-y-0.5 border-b border-line py-3 last:border-b-0 sm:grid-cols-[8rem_minmax(0,1fr)]"
                    >
                      <dt className="text-base font-medium text-ink-soft">{row.label}</dt>
                      <dd className="text-lg text-ink">
                        {row.value ? (
                          row.label === "รหัสพรรณไม้" ? (
                            <span className="tabular inline-block whitespace-nowrap rounded-md bg-sun px-2.5 font-serif text-2xl font-bold text-ink">
                              {row.value}
                            </span>
                          ) : (
                            <span className={row.italic ? "font-serif text-xl italic" : row.label === "ชื่อผลงาน" ? "font-serif text-xl font-bold" : ""}>
                              {row.value}
                            </span>
                          )
                        ) : (
                          <PendingBadge />
                        )}
                        {row.note && <span className="mt-0.5 block text-base text-ink-soft">{row.note}</span>}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <PhotoTile id="flowerOnWater" frameClassName="aspect-square" />
            <PhotoTile id="flowerSpike" frameClassName="aspect-square" />
            <PhotoTile id="petioleSection" frameClassName="aspect-square" />
            <PhotoTile id="groupPlantCode" frameClassName="aspect-square" />
          </div>
        </Chapter>

        {/* ================= Structure ================= */}
        <Chapter
          id="structure"
          tone="deep"
          title="โครงสร้างของต้นผักตบชวา"
          lead='กดที่จุดในภาพหรือชื่อส่วนเพื่ออ่านรายละเอียด ใช้ปุ่มซูมเพื่อดูใกล้ ๆ หรือกด "ดูโครงสร้าง" เพื่อแสดงชื่อทุกส่วน'
        >
          <div className="rounded-3xl bg-paper p-4 shadow-[0_30px_60px_-40px_rgb(18_24_21/0.45)] sm:p-8">
            <PlantViewer />
          </div>
        </Chapter>

        {/* ================= Problem: feature spread ================= */}
        <section
          id="problem"
          aria-labelledby="problem-title"
          data-reveal
          className="relative scroll-mt-16 overflow-hidden bg-forest py-24 text-on-forest sm:py-32"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-8">
            <div className="rule-draw h-px w-full bg-on-forest/30" aria-hidden="true" />
            <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
              <PhotoTile
                id="bloomField"
                frameClassName="aspect-[3/4]"
                sizes="(min-width: 1024px) 42vw, 100vw"
                tone="forest"
                parallax
                className="lg:sticky lg:top-24"
              />
              <div>
                <div className="reveal-heading">
                  <h2 id="problem-title" className="text-[clamp(2.6rem,6vw,5rem)] font-bold leading-[1.1]">
                    {problem.title}
                  </h2>
                  <p className="mt-6 max-w-2xl text-xl leading-relaxed text-on-forest-soft sm:text-2xl">{problem.intro}</p>
                </div>
                <ol className="mt-12" data-stagger>
                  {problem.timeline.map((t, i) => (
                    <li key={t.when} style={idx(i)} className="grid gap-x-6 border-t border-on-forest/20 py-6 sm:grid-cols-[9rem_minmax(0,1fr)]">
                      <span className="tabular font-serif text-4xl font-bold text-sun">{t.when}</span>
                      <span className="mt-1 text-xl leading-relaxed">{t.text}</span>
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
          tone="violet"
          title="ผักตบชวาสืบพันธุ์อย่างไร"
          lead="สืบพันธุ์ได้ทั้งแบบไม่อาศัยเพศและแบบอาศัยเพศ กดเล่นแอนิเมชันในแต่ละหัวข้อเพื่อดูทีละขั้น"
        >
          <nav aria-label="หัวข้อย่อยการสืบพันธุ์" className="mb-12">
            <ol className="flex flex-wrap gap-2">
              {SUBTOPICS.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="press flex min-h-11 items-center gap-3 rounded-full border border-ink/15 bg-paper py-1 pl-1.5 pr-5 text-base font-medium hover:border-violet hover:text-violet">
                    <span className="tabular flex h-8 w-8 items-center justify-center rounded-full bg-ink font-serif text-sm font-bold text-paper">{i + 1}</span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <Article id="clone" n={1} title="ไหลและ clone: สาเหตุหลักของการระบาด">
            <p className="max-w-3xl text-xl leading-relaxed">
              ตาข้างของต้นแม่เจริญเป็น<strong> ไหล (stolon) </strong>สีม่วงที่ทอดยาวในแนวนอน ปลายไหลเกิด
              <strong> ต้นลูก </strong>ที่มีพันธุกรรมเหมือนต้นแม่ทุกประการ เมื่อไหลขาด ต้นลูกก็ลอยไปเป็นต้นใหม่ได้ทันที
              โดยไม่ต้องรอดอกหรือแมลงผสมเกสร
            </p>
            <FactRow facts={cloneFacts} />
            <div className="mt-8">
              <CloneGrowth />
            </div>
          </Article>

          <Article id="tristyly" n={2} title="ดอกสามแบบ (tristyly)">
            <p className="max-w-3xl text-xl leading-relaxed">
              ดอกผักตบชวามีกลีบรวม 6 กลีบ เกสรเพศผู้ 6 อันเรียงเป็น 2 ระดับ และรังไข่ 3 ช่อง ต้นหนึ่งจะมีดอกได้เพียง 1 ใน 3 แบบ
              ต่างกันที่ความยาวก้านเกสรเพศเมีย
            </p>
            <div className="mt-8">
              <Tristyly />
            </div>
            <p className="mt-5 flex max-w-3xl gap-3 rounded-2xl bg-sun-wash p-5 text-lg">
              <span className="mt-1 shrink-0 text-sun-ink">
                <Icon name="sprout" />
              </span>
              {tristylyActivity}
            </p>
          </Article>

          <Article id="gametes" n={3} title="การสร้างเซลล์สืบพันธุ์">
            <p className="max-w-3xl text-xl leading-relaxed">
              ผักตบชวามีโครโมโซม 2n = 32 เซลล์สืบพันธุ์จึงมี n = 16 เลือกดูฝั่งเพศผู้หรือเพศเมีย แล้วกดถัดไปหรือเล่นอัตโนมัติ
            </p>
            <div className="mt-8">
              <Gametogenesis />
            </div>
          </Article>

          <Article id="fertilization" n={4} title="การปฏิสนธิซ้อน (double fertilization)">
            <p className="max-w-3xl text-xl leading-relaxed">
              ละอองเรณูตกบนยอดเกสรเพศเมีย แล้วงอกหลอดละอองเรณูลงไปถึง ovule sperm 2 เซลล์ผสมกับเซลล์ใน embryo sac
              คนละเซลล์ จึงเรียกว่าการปฏิสนธิซ้อน
            </p>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {fertilizationEquations.map((eq) => (
                <li key={eq.right} className="border-t-2 border-ink pt-4">
                  <p className="text-lg">{eq.left}</p>
                  <p className="mt-1 font-serif text-3xl font-bold text-violet">→ {eq.right}</p>
                  <p className="text-base text-ink-soft">{eq.note}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <DoubleFertilization />
            </div>
          </Article>

          <Article id="seed" n={5} title="จากดอกหนึ่งวัน สู่เมล็ดที่รอได้หลายสิบปี">
            <p className="max-w-3xl text-xl leading-relaxed">เลื่อนแถบเวลาเพื่อดูว่าเกิดอะไรขึ้นหลังดอกบาน</p>
            <FactRow facts={seedFacts} />
            <div className="mt-8">
              <FlowerTimeline />
            </div>
          </Article>

          <div className="mt-16 grid grid-cols-[minmax(0,1fr)] gap-10 rounded-3xl bg-paper p-6 sm:p-10 lg:grid-cols-2">
            <div>
              <h3 className="text-3xl font-bold">สรุปจำนวนโครโมโซม</h3>
              <p className="mt-2 text-lg text-ink-soft">{chromosomeNote}</p>
              <div className="mt-6">
                <ChromosomeChart />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[24rem] border-collapse text-left text-lg">
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
                      <td className="py-3 pr-4 font-serif font-bold">{r.level}</td>
                      <td className="tabular py-3 text-right font-semibold">{r.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <ul className="mt-12 grid gap-8 md:grid-cols-3" data-stagger>
            {bioFacts.map((f, i) => (
              <li key={f.title} style={idx(i)} className="border-t-2 border-violet pt-5">
                <h3 className="text-2xl font-bold">{f.title}</h3>
                <p className="mt-2 text-lg leading-relaxed text-ink-soft">{f.text}</p>
              </li>
            ))}
          </ul>
        </Chapter>

        {/* ================= Processing guide ================= */}
        <Chapter id="guide" title="คู่มือแปรรูป: เลือกวิธีที่อยากลองทำ" lead="แต่ละวิธีมีวัสดุ ขั้นตอน และข้อควรระวัง ทำตามได้ทีละข้อ">
          <ProcessingGuide />
        </Chapter>

        {/* ================= Banner ================= */}
        <section data-reveal className="relative isolate overflow-hidden bg-forest" aria-labelledby="banner-title">
          <div className="banner-photo parallax absolute inset-0 -z-10">
            <Image src={photos.inleLake.src} alt={photos.inleLake.alt} fill sizes="100vw" placeholder="blur" className="object-cover" />
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/55 to-black/10" aria-hidden="true" />
          <div className="mx-auto max-w-7xl px-4 py-32 sm:px-8 sm:py-48">
            <div className="reveal-heading max-w-3xl">
              <h2 id="banner-title" className="text-[clamp(2.6rem,6.5vw,5.6rem)] font-bold leading-[1.12] text-white">
                {banner.title}
              </h2>
              <p className="mt-6 max-w-xl text-xl leading-relaxed text-white/90 sm:text-2xl">{banner.text}</p>
            </div>
          </div>
          <p className="absolute bottom-3 right-4 text-xs text-white/75">
            {photos.inleLake.caption} · ภาพ: {photos.inleLake.credit?.author}, {photos.inleLake.credit?.license}
          </p>
        </section>

        {/* ================= Benefits ================= */}
        <Chapter id="benefits" title={`ประโยชน์แท้แก่มหาชน`} lead={`${benefits.title} ${benefits.intro}`}>
          <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
            {benefits.items.map((b, i) => {
              const c = BENEFIT_TONE[b.icon];
              return (
                <li key={b.title} style={idx(i)} className="border-t-2 border-ink pt-6">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full" style={{ background: c.bg, color: c.fg }}>
                    <Icon name={b.icon as IconName} size={26} />
                  </span>
                  <h3 className="mt-5 text-3xl font-bold">{b.title}</h3>
                  <p className="mt-2 text-lg leading-relaxed text-ink-soft">{b.text}</p>
                </li>
              );
            })}
          </ul>
        </Chapter>

        {/* ================= Credits ================= */}
        <Chapter
          id="credits"
          tone="sand"
          title="คณะผู้จัดทำ"
          lead={`นักเรียนชั้นมัธยมศึกษาปีที่ 6/3 ${work.course} ${work.unit} ${work.school}`}
        >
          <ul className="grid gap-x-10 sm:grid-cols-2" data-stagger>
            {members.map((m, i) => (
              <li key={m.name} style={idx(i)} className="flex items-baseline justify-between gap-4 border-t border-ink/20 py-5">
                <span className="font-serif text-2xl font-bold sm:text-3xl">{m.name}</span>
                <span className="tabular shrink-0 text-lg text-ink-soft">
                  {memberClass} เลขที่ {m.number}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-16 grid gap-10 text-base lg:grid-cols-2">
            <div>
              <h3 className="text-xl font-bold">ที่มาของข้อมูล</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-ink-soft marker:text-violet">
                {sources.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold">ที่มาของภาพถ่าย</h3>
              <ul className="mt-3 space-y-2 leading-relaxed text-ink-soft">
                {(Object.values(photos) as Photo[]).map((p) => (
                  <li key={p.caption}>
                    <span className="text-ink">{p.caption}</span>
                    {" · "}
                    {p.credit ? (
                      <>
                        {p.credit.author},{" "}
                        <a href={p.credit.fileUrl} target="_blank" rel="noreferrer" className="underline hover:text-violet">
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
      <footer className="relative bg-forest text-on-forest-soft">
        <div className="bg-[#efeadd]">
          <HeroScene />
        </div>
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-8">
          <p className="font-serif text-[clamp(4rem,17vw,15rem)] font-bold leading-[0.95] tracking-tight text-on-forest" aria-hidden="true">
            Vegetable
          </p>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-6 border-t border-on-forest/20 pt-6">
            <p className="max-w-2xl text-base leading-relaxed">
              <span className="font-semibold text-on-forest">{work.name}</span> · {work.title} · จัดทำเพื่อการศึกษา ·{" "}
              {work.course} · {work.school}
            </p>
            <a
              href="#top"
              className="press inline-flex min-h-11 items-center gap-2 rounded-full bg-sun px-5 text-base font-semibold text-ink hover:bg-white"
            >
              กลับขึ้นด้านบน
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

type Tone = "paper" | "deep" | "violet" | "sand";

const TONE: Record<Tone, string> = {
  paper: "",
  deep: "bg-paper-deep",
  violet: "bg-violet-band",
  sand: "bg-[#efeadd]",
};

function Chapter({
  id,
  title,
  lead,
  tone = "paper",
  children,
}: {
  id: string;
  title: string;
  lead?: string;
  tone?: Tone;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} data-reveal data-loop className={`relative scroll-mt-16 py-24 sm:py-32 ${TONE[tone]}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="rule-draw h-px w-full bg-ink/25" aria-hidden="true" />
        <div className="reveal-heading mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end">
          <h2 id={`${id}-title`} className="text-[clamp(2.5rem,5.5vw,4.6rem)] font-bold leading-[1.12] text-ink">
            {title}
          </h2>
          {lead && <p className="max-w-xl text-xl leading-relaxed text-ink-soft">{lead}</p>}
        </div>
        <div className="mt-14">{children}</div>
      </div>
    </section>
  );
}

function Article({ id, n, title, children }: { id: string; n: number; title: string; children: ReactNode }) {
  return (
    <article id={id} className="mt-8 scroll-mt-24 rounded-3xl bg-paper p-5 first:mt-0 sm:p-10">
      <div className="mb-6 flex items-start gap-5">
        <span className="tabular font-serif text-5xl font-bold leading-none text-violet sm:text-6xl" aria-hidden="true">
          {n}
        </span>
        <h3 className="pt-1 text-3xl font-bold leading-tight sm:text-4xl">{title}</h3>
      </div>
      {children}
    </article>
  );
}

function FactRow({ facts }: { facts: { value: string; text: string }[] }) {
  return (
    <dl className="mt-8 grid gap-6 sm:grid-cols-3" data-stagger>
      {facts.map((f, i) => (
        <div key={f.value} style={idx(i)} className="border-t-2 border-ink pt-3">
          <dt className="tabular font-serif text-3xl font-bold text-violet">{f.value}</dt>
          <dd className="mt-1 text-base text-ink-soft">{f.text}</dd>
        </div>
      ))}
    </dl>
  );
}
