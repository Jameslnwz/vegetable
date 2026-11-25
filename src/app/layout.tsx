import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai, Noto_Serif_Thai } from "next/font/google";
import "./globals.css";

const bodyFont = IBM_Plex_Sans_Thai({
  variable: "--font-body",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const displayFont = Noto_Serif_Thai({
  variable: "--font-display",
  subsets: ["thai", "latin"],
  weight: ["500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vegetable · ผักตบ",
  description:
    "ข้อมูลพรรณไม้ผักตบ ชีววิทยา 5 (ว30245) ม.6.3 โครงสร้าง ปัญหา การใช้ประโยชน์ และสมุนไพรพื้นบ้าน",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="th"
      className={`${bodyFont.variable} ${displayFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
