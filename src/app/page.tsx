import PlantViewer from "@/components/PlantViewer";
import ChapterNav from "@/components/ChapterNav";
import PendingBadge from "@/components/PendingBadge";
import CloneGrowth from "@/components/CloneGrowth";
import Tristyly from "@/components/Tristyly";
import FlowerTimeline from "@/components/FlowerTimeline";
import ProcessingGuide from "@/components/ProcessingGuide";
import { DoubleFertilization, Gametogenesis } from "@/components/ReproVisuals";
import { Icon } from "@/components/ui";
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
import type { ReactNode } from "react";

export default function Home() {
  return (
    <>
      <ChapterNav />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6">
        {/* Hero */}
        <header id="top" className="anim-rise scroll-mt-24 pb-14 pt-16 sm:pt-24">
          <h1 className="text-6xl font-extrabold leading-none tracking-tight text-ink sm:text-8xl">
            {work.name}
          </h1>
          <p className="mt-5 text-3xl font-bold text-teal sm:text-4xl">{work.title}</p>
          <p className="mt-5 max-w-2xl text-xl text-ink">{work.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#guide"
              className="inline-flex min-h-12 items-center rounded-full bg-teal px-6 text-lg font-semibold text-paper transition-colors duration-200 hover:bg-ink"
            >
              เริ่มดูคู่มือ
            </a>
            <a
              href="#identity"
              className="inline-flex min-h-12 items-center rounded-full border border-teal px-6 text-lg font-semibold text-teal transition-colors duration-200 hover:bg-teal-wash"
            >
              รู้จักผักตบชวา
            </a>
          </div>
          <dl className="mt-14 grid gap-6 border-t border-line pt-6 sm:grid-cols-3">
            {quickFacts.map((f) => (
              <div key={f.value}>
                <dt className="text-2xl font-extrabold text-violet">{f.value}</dt>
                <dd className="mt-1 text-base text-ink-soft">{f.text}</dd>
              </div>
            ))}
          </dl>
        </header>

        {/* Identity */}
        <Chapter id="identity" title="รู้จักผักตบชวา" lead="พืชน้ำลอยน้ำ ดอกสวย แต่โตเร็วจนกลายเป็นวัชพืชที่สร้างปัญหาให้แหล่งน้ำทั่วประเทศ">
          <p className="text-base text-ink-soft">ทะเบียนพรรณไม้ {work.school}</p>
          <dl className="mt-4 grid gap-x-10 sm:grid-cols-2">
            {identity.map((row) => (
              <div
                key={row.label}
                className={`border-b border-line py-4 ${row.label === "ลักษณะเด่น" ? "sm:col-span-2" : ""}`}
              >
                <dt className="text-base text-ink-soft">{row.label}</dt>
                <dd className="mt-1 text-xl font-medium text-ink">
                  {row.value ? (
                    <span className={row.italic ? "italic" : ""}>{row.value}</span>
                  ) : (
                    <PendingBadge />
                  )}
                  {row.note && <span className="mt-1 block text-base font-normal text-ink-soft">{row.note}</span>}
                </dd>
              </div>
            ))}
          </dl>
        </Chapter>

        {/* Structure viewer */}
        <Chapter
          id="structure"
          title="โครงสร้างของต้นผักตบชวา"
          lead='กดที่จุดในภาพหรือชื่อส่วนเพื่ออ่านรายละเอียด ใช้ปุ่มซูมเพื่อดูใกล้ ๆ หรือกด "ดูโครงสร้าง" เพื่อแสดงชื่อทุกส่วน'
        >
          <PlantViewer />
        </Chapter>

        {/* Problem */}
        <Chapter id="problem" title={problem.title} lead={problem.intro}>
          <ol className="relative mt-2 space-y-8 border-l-2 border-line pl-8">
            {problem.timeline.map((t) => (
              <li key={t.when} className="relative">
                <span className="absolute -left-[41px] top-1.5 h-4 w-4 rounded-full border-2 border-violet bg-paper" aria-hidden="true" />
                <p className="tabular text-2xl font-extrabold text-violet">{t.when}</p>
                <p className="mt-1 max-w-3xl text-lg text-ink">{t.text}</p>
              </li>
            ))}
          </ol>
        </Chapter>

        {/* Reproduction */}
        <Chapter
          id="reproduction"
          title="ผักตบชวาสืบพันธุ์อย่างไร"
          lead="สืบพันธุ์ได้ทั้งแบบไม่อาศัยเพศและแบบอาศัยเพศ กดเล่นแอนิเมชันในแต่ละหัวข้อเพื่อดูทีละขั้น"
        >
          <Sub title="ไหลและ clone: สาเหตุหลักของการระบาด">
            <p className="max-w-3xl text-lg text-ink">
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
            <p className="max-w-3xl text-lg text-ink">
              ดอกผักตบชวามีกลีบรวม 6 กลีบ เกสรเพศผู้ 6 อันเรียงเป็น 2 ระดับ และรังไข่ 3 ช่อง ต้นหนึ่งจะมีดอกได้เพียง 1 ใน 3 แบบ
              ต่างกันที่ความยาวก้านเกสรเพศเมีย
            </p>
            <div className="mt-6">
              <Tristyly />
            </div>
            <p className="mt-4 max-w-3xl rounded-xl border border-teal/40 bg-teal-wash/60 p-4 text-ink">{tristylyActivity}</p>
          </Sub>

          <Sub title="การสร้างเซลล์สืบพันธุ์">
            <p className="max-w-3xl text-lg text-ink">
              ผักตบชวามีโครโมโซม 2n = 32 เซลล์สืบพันธุ์จึงมี n = 16 เลือกดูฝั่งเพศผู้หรือเพศเมีย แล้วกดถัดไปหรือเล่นอัตโนมัติ
            </p>
            <div className="mt-6">
              <Gametogenesis />
            </div>
          </Sub>

          <Sub title="การปฏิสนธิซ้อน (double fertilization)">
            <p className="max-w-3xl text-lg text-ink">
              ละอองเรณูตกบนยอดเกสรเพศเมีย แล้วงอกหลอดละอองเรณูลงไปถึง ovule sperm 2 เซลล์ผสมกับเซลล์ใน embryo sac
              คนละเซลล์ จึงเรียกว่าการปฏิสนธิซ้อน
            </p>
            <ul className="mt-5 grid gap-3 md:grid-cols-2">
              {fertilizationEquations.map((eq) => (
                <li key={eq.right} className="rounded-xl border border-line bg-paper p-4">
                  <p className="text-lg text-ink">{eq.left}</p>
                  <p className="mt-1 text-xl font-bold text-violet">→ {eq.right}</p>
                  <p className="text-base text-ink-soft">{eq.note}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <DoubleFertilization />
            </div>
          </Sub>

          <Sub title="จากดอกหนึ่งวัน สู่เมล็ดที่รอได้หลายสิบปี">
            <p className="max-w-3xl text-lg text-ink">เลื่อนแถบเวลาเพื่อดูว่าเกิดอะไรขึ้นหลังดอกบาน</p>
            <FactRow facts={seedFacts} />
            <div className="mt-6">
              <FlowerTimeline />
            </div>
          </Sub>

          <Sub title="สรุปจำนวนโครโมโซมในแต่ละระยะ">
            <p className="max-w-3xl text-lg text-ink">{chromosomeNote}</p>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[32rem] border-collapse text-left text-lg">
                <thead>
                  <tr className="border-b-2 border-ink">
                    <th scope="col" className="py-3 pr-4 font-bold">โครงสร้าง</th>
                    <th scope="col" className="py-3 pr-4 font-bold">ระดับ</th>
                    <th scope="col" className="py-3 text-right font-bold">โครโมโซม</th>
                  </tr>
                </thead>
                <tbody>
                  {chromosomeTable.map((r) => (
                    <tr key={r.structure} className="border-b border-line">
                      <td className="py-3 pr-4">{r.structure}</td>
                      <td className="py-3 pr-4 font-bold text-violet">{r.level}</td>
                      <td className="tabular py-3 text-right font-bold">{r.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Sub>

          <ul className="mt-14 grid gap-8 md:grid-cols-3">
            {bioFacts.map((f) => (
              <li key={f.title} className="border-t-2 border-violet pt-4">
                <h3 className="text-xl font-bold text-ink">{f.title}</h3>
                <p className="mt-2 text-ink">{f.text}</p>
              </li>
            ))}
          </ul>
        </Chapter>

        {/* Processing guide */}
        <Chapter
          id="guide"
          title="คู่มือแปรรูป: เลือกวิธีที่อยากลองทำ"
          lead="แต่ละวิธีมีวัสดุ ขั้นตอน และข้อควรระวัง ทำตามได้ทีละข้อ เก็บผักตบชวาขึ้นมาแปรรูป ช่วยให้น้ำไหลสะดวก และได้วัตถุดิบไปทำปุ๋ย งานจักสาน และกระถางเพาะกล้า"
        >
          <ProcessingGuide />
        </Chapter>

        {/* Benefits */}
        <Chapter id="benefits" title={`ประโยชน์แท้แก่มหาชน: ${benefits.title}`} lead={benefits.intro}>
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {benefits.items.map((b) => (
              <li key={b.title} className="flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-wash text-teal">
                  <Icon name={b.icon} size={24} />
                </span>
                <div>
                  <h3 className="text-2xl font-bold">{b.title}</h3>
                  <p className="mt-1 text-lg text-ink">{b.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Chapter>

        {/* Team */}
        <Chapter
          id="credits"
          title="คณะผู้จัดทำ"
          lead={`นักเรียนชั้นมัธยมศึกษาปีที่ 6/3 ${work.course} ${work.unit} ${work.school}`}
        >
          <ul className="divide-y divide-line border-y border-line">
            {members.map((m) => (
              <li key={m.name} className="flex flex-wrap items-baseline justify-between gap-2 py-4">
                <span className="text-xl font-semibold">{m.name}</span>
                <span className="tabular text-lg text-ink-soft">
                  {memberClass} เลขที่ {m.number}
                </span>
              </li>
            ))}
          </ul>

          <h3 className="mt-12 text-2xl font-bold">ที่มาของภาพและข้อมูล</h3>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-base text-ink-soft marker:text-violet">
            {sources.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </Chapter>
      </main>

      <footer className="border-t border-line bg-paper-deep">
        <div className="mx-auto max-w-6xl px-4 py-8 text-base text-ink-soft sm:px-6">
          จัดทำเพื่อการศึกษา · {work.course} · {work.school}
        </div>
      </footer>
    </>
  );
}

function Chapter({ id, title, lead, children }: { id: string; title: string; lead?: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-20 border-t border-line py-16">
      <h2 id={`${id}-title`} className="text-4xl font-extrabold text-ink sm:text-5xl">
        {title}
      </h2>
      {lead && <p className="mt-4 max-w-3xl text-xl text-ink-soft">{lead}</p>}
      <div className="mt-10">{children}</div>
    </section>
  );
}

function Sub({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-16 first:mt-0">
      <h3 className="mb-4 text-3xl font-bold text-ink">{title}</h3>
      {children}
    </div>
  );
}

function FactRow({ facts }: { facts: { value: string; text: string }[] }) {
  return (
    <dl className="mt-6 grid gap-6 sm:grid-cols-3">
      {facts.map((f) => (
        <div key={f.value} className="border-l-0 border-t border-line pt-3">
          <dt className="tabular text-2xl font-extrabold text-violet">{f.value}</dt>
          <dd className="text-base text-ink-soft">{f.text}</dd>
        </div>
      ))}
    </dl>
  );
}
