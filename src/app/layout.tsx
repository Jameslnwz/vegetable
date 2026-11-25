import type { Metadata } from "next";
import { Sarabun } from "next/font/google";
import "./globals.css";

const sarabun = Sarabun({
  variable: "--font-sarabun",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vegetable · ผักตบชวา: จากวัชพืชสู่ของมีค่า",
  description:
    "ข้อมูลพรรณไม้ผักตบชวา โครงสร้าง ปัญหา การสืบพันธุ์ และคู่มือแปรรูป 4 วิธี รายวิชาชีววิทยา 5 (ว30245) ม.6/3",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" className={`${sarabun.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
