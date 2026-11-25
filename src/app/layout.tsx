import type { Metadata, Viewport } from "next";
import { Noto_Sans_Thai, Noto_Serif_Thai } from "next/font/google";
import "./globals.css";
import ArtDefs from "@/components/art/defs";

// หัวข้อ: Noto Serif Thai (เซอริฟแบบนิตยสาร) · เนื้อความ: Noto Sans Thai (อ่านชัดทุกขนาด)
const serif = Noto_Serif_Thai({
  variable: "--font-display",
  subsets: ["thai", "latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const sans = Noto_Sans_Thai({
  variable: "--font-text",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vegetable · ผักตบชวา: จากวัชพืชสู่ของมีค่า",
  description:
    "ข้อมูลพรรณไม้ผักตบชวา โครงสร้าง ปัญหา การสืบพันธุ์ และคู่มือแปรรูป 4 วิธี รายวิชาชีววิทยา 5 (ว30245) ม.6/3",
};

export const viewport: Viewport = {
  themeColor: "#0e2a21",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" className={`${serif.variable} ${sans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ArtDefs />
        {children}
      </body>
    </html>
  );
}
