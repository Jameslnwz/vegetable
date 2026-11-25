import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// TH Sarabun New (ฟอนต์แห่งชาติ SIPA) โฮสต์เองใน src/app/fonts ดูสัญญาอนุญาตในโฟลเดอร์นั้น
const thSarabun = localFont({
  variable: "--font-th-sarabun",
  display: "swap",
  src: [
    { path: "./fonts/THSarabunNew-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/THSarabunNew-Bold.woff2", weight: "700", style: "normal" },
  ],
  fallback: ["Sarabun", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Vegetable · ผักตบชวา: จากวัชพืชสู่ของมีค่า",
  description:
    "ข้อมูลพรรณไม้ผักตบชวา โครงสร้าง ปัญหา การสืบพันธุ์ และคู่มือแปรรูป 4 วิธี รายวิชาชีววิทยา 5 (ว30245) ม.6/3",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" className={`${thSarabun.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
