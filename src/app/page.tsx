import PlantViewer from "@/components/PlantViewer";
import ChapterNav from "@/components/ChapterNav";
import PendingBadge from "@/components/PendingBadge";
import {
  work,
  identity,
  members,
  memberClass,
  problem,
  uses,
  herbal,
} from "@/content/plant";

export default function Home() {
  return (
    <>
      <ChapterNav />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6">
        {/* Hero */}
        <header id="top" className="anim-rise scroll-mt-24 pb-16 pt-20 sm:pt-28">
          <h1 className="font-serif text-6xl font-bold leading-none text-ink sm:text-8xl">
            {work.name}
          </h1>
          <p className="mt-4 font-serif text-3xl text-teal sm:text-4xl">{work.subtitle}</p>
          <p className="mt-6 max-w-2xl text-lg text-ink-soft">{work.unit}</p>
          <p className="text-lg text-ink-soft">{work.course}</p>
        </header>

        {/* Identity */}
        <section id="identity" className="scroll-mt-24 border-t border-line py-14">
          <h2 className="font-serif text-3xl font-bold sm:text-4xl">ข้อมูลพรรณไม้</h2>
          <dl className="mt-8 grid gap-x-10 divide-y divide-line sm:grid-cols-2 sm:divide-y-0">
            {identity.map((row) => (
              <div key={row.label} className="flex flex-col py-4 sm:border-b sm:border-line">
                <dt className="text-base text-ink-soft">{row.label}</dt>
                <dd className="mt-1 text-xl font-medium text-ink">
                  {row.value ?? <PendingBadge />}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Structure viewer */}
        <section id="structure" className="scroll-mt-24 border-t border-line py-14">
          <h2 className="font-serif text-3xl font-bold sm:text-4xl">โครงสร้างของต้นผักตบ</h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            กดที่ส่วนต่างๆ ในภาพเพื่ออ่านรายละเอียด หรือกด &quot;ดูโครงสร้าง&quot; เพื่อแสดงชื่อส่วนทั้งหมด
          </p>
          <div className="mt-8">
            <PlantViewer />
          </div>
        </section>

        {/* Problem */}
        <section id="problem" className="scroll-mt-24 border-t border-line py-14">
          <h2 className="font-serif text-3xl font-bold sm:text-4xl">ปัญหาวัชพืชน้ำ</h2>
          <p className="mt-5 max-w-3xl text-lg text-ink">{problem.intro}</p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {problem.points.map((p) => (
              <li
                key={p}
                className="rounded-xl border border-line bg-paper-deep p-5 text-ink"
              >
                {p}
              </li>
            ))}
          </ul>
          <h3 className="mt-10 font-serif text-2xl font-bold">{problem.managementTitle}</h3>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-ink marker:text-violet">
            {problem.management.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </section>

        {/* Uses */}
        <section id="uses" className="scroll-mt-24 border-t border-line py-14">
          <h2 className="font-serif text-3xl font-bold sm:text-4xl">การแปรรูปและใช้ประโยชน์</h2>
          <p className="mt-5 max-w-3xl text-lg text-ink">{uses.intro}</p>
          <ul className="mt-8 grid gap-6 sm:grid-cols-3">
            {uses.items.map((item) => (
              <li key={item.title} className="border-t-2 border-teal pt-4">
                <h3 className="font-serif text-2xl font-bold">{item.title}</h3>
                <p className="mt-2 text-ink">{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Herbal */}
        <section id="herbal" className="scroll-mt-24 border-t border-line py-14">
          <h2 className="font-serif text-3xl font-bold sm:text-4xl">สมุนไพรพื้นบ้าน</h2>
          <p className="mt-5 max-w-3xl text-lg text-ink">{herbal.intro}</p>
          <p
            role="note"
            className="mt-6 max-w-3xl rounded-xl border border-danger/40 bg-paper-deep p-5 text-ink"
          >
            <span className="font-bold text-danger">คำเตือน </span>
            {herbal.warning}
          </p>
        </section>

        {/* About + public benefit */}
        <section id="about" className="scroll-mt-24 border-t border-line py-14">
          <h2 className="font-serif text-3xl font-bold sm:text-4xl">เกี่ยวกับผลงานนี้</h2>
          <p className="mt-5 max-w-3xl text-lg text-ink">
            เว็บนี้จัดทำขึ้นเพื่อให้ความรู้เรื่องผักตบ วัชพืชน้ำที่พบได้ทั่วไป ให้ผู้อ่านเข้าใจลักษณะทางพฤกษศาสตร์
            ปัญหาที่เกิดขึ้นกับแหล่งน้ำ และวิธีนำผักตบมาใช้ประโยชน์
          </p>
        </section>

        {/* Team */}
        <section id="credits" className="scroll-mt-24 border-t border-line py-14">
          <h2 className="font-serif text-3xl font-bold sm:text-4xl">คณะผู้จัดทำ</h2>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {members.map((m) => (
              <li key={m.name} className="flex flex-wrap items-baseline justify-between gap-2 py-4">
                <span className="text-xl font-medium">{m.name}</span>
                <span className="text-ink-soft">
                  {memberClass} เลขที่ {m.number}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="border-t border-line bg-paper-deep">
        <div className="mx-auto max-w-6xl px-4 py-8 text-base text-ink-soft sm:px-6">
          {work.name} · {work.subtitle} · {work.course}
        </div>
      </footer>
    </>
  );
}
