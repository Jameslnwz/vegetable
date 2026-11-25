import type { Metadata, Viewport } from "next";
import { Anuphan, Playpen_Sans_Thai } from "next/font/google";
import "./globals.css";
import ArtDefs from "@/components/art/defs";

// หัวข้อและเนื้อความ: Anuphan (ไทยไม่มีหัว อ่านชัดจากระยะไกล) · ป้ายสติกเกอร์: Playpen Sans Thai (ลายมือ)
const text = Anuphan({
  variable: "--font-text",
  subsets: ["thai", "latin"],
  display: "swap",
});

const hand = Playpen_Sans_Thai({
  variable: "--font-hand",
  subsets: ["thai", "latin"],
  weight: ["600"],
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Vegetable · ผักตบชวา: จากวัชพืชสู่ของมีค่า",
  description:
    "ข้อมูลพรรณไม้ผักตบชวา โครงสร้าง ปัญหา การสืบพันธุ์ และคู่มือแปรรูป 4 วิธี รายวิชาชีววิทยา 5 (ว30245) ม.6/3",
};

export const viewport: Viewport = {
  themeColor: "#5b2fd0",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" className={`${text.variable} ${hand.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ArtDefs />
        {children}
      </body>
    </html>
  );
}
