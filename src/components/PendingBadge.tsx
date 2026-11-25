// ป้ายสำหรับข้อมูลที่ยังไม่มี ใช้แบบเดียวกันทั้งเว็บ
export default function PendingBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-ink-soft px-3 py-0.5 text-base text-ink-soft">
      รอข้อมูล
    </span>
  );
}
