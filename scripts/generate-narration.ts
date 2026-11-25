// สร้างไฟล์เสียงบรรยายด้วย ElevenLabs ครั้งเดียว แล้วเก็บไว้ที่ public/audio/<กลุ่ม>/<ลำดับ>.mp3
// รันซ้ำได้: ไฟล์ที่มีอยู่แล้วจะถูกข้าม ไม่เรียก API ซ้ำ
//   node scripts/generate-narration.ts            (สร้างจริง)
//   node scripts/generate-narration.ts --dry-run  (แสดงรายการโดยไม่เรียก API)
// คีย์: ใช้ ELEVENLABS_API_KEY ถ้ามี ไม่มีก็ส่งคำขอโดยไม่ใส่คีย์ (proxy ของ sandbox จะใส่ให้)
// ถ้าเครื่องต้องใช้ proxy ให้รันด้วย NODE_USE_ENV_PROXY=1 (fetch ของ Node ไม่อ่าน HTTPS_PROXY เอง)

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  cloneScript,
  femaleNarration,
  fertilizationScript,
  flowerScript,
  maleNarration,
  tristylyScript,
} from "../src/content/plant.ts";
import { clipSrc, sayText } from "../src/lib/say-text.ts";

const VOICE_ID = "JBFqnCBsd6RMkjVDRZzb"; // George (เสียงผู้ชาย อบอุ่น) เปลี่ยนได้ที่นี่
const MODEL_ID = "eleven_v4"; // รองรับภาษาไทย (eleven_multilingual_v2 ไม่รองรับไทย)
const OUTPUT_FORMAT = "mp3_44100_128";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

// กลุ่มเสียงทั้งหมด เรียงตามลำดับที่แอปใช้ (ลำดับ = index ในอาร์เรย์)
const groups: Record<string, string[]> = {
  flower: flowerScript.map((s) => s.text),
  clone: cloneScript.map((s) => s.text),
  tristyly: tristylyScript.map((s) => s.text),
  fertilization: fertilizationScript.map((s) => s.text),
  male: maleNarration.flat(),
  female: femaleNarration.flat(),
};

const apiKey = process.env.ELEVENLABS_API_KEY || "proxy-injected";
const dryRun = process.argv.includes("--dry-run");

async function synth(text: string): Promise<Buffer> {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=${OUTPUT_FORMAT}`;
  for (let attempt = 1; attempt <= 4; attempt++) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "xi-api-key": apiKey },
      body: JSON.stringify({ text, model_id: MODEL_ID }),
    });
    if (res.ok) return Buffer.from(await res.arrayBuffer());
    const body = await res.text();
    const retryable = res.status === 429 || res.status >= 500;
    if (!retryable || attempt === 4) throw new Error(`HTTP ${res.status}: ${body.slice(0, 300)}`);
    await new Promise((r) => setTimeout(r, 2000 * attempt));
  }
  throw new Error("unreachable");
}

async function main() {
  let total = 0;
  let made = 0;
  let skipped = 0;
  for (const [group, texts] of Object.entries(groups)) {
    if (!dryRun) mkdirSync(join(ROOT, "public", "audio", group), { recursive: true });
    for (let i = 0; i < texts.length; i++) {
      total++;
      const file = join(ROOT, "public", clipSrc(group, i));
      if (existsSync(file)) {
        skipped++;
        continue;
      }
      if (dryRun) {
        console.log(`[dry] ${file.replace(ROOT + "/", "")}  ${sayText(texts[i]).slice(0, 40)}…`);
        continue;
      }
      process.stdout.write(`สร้าง ${group}/${i} … `);
      const audio = await synth(sayText(texts[i]));
      writeFileSync(file, audio);
      made++;
      console.log(`ok (${audio.length} bytes)`);
    }
  }
  console.log(`\nรวม ${total} คลิป: สร้างใหม่ ${made}, ข้ามที่มีอยู่แล้ว ${skipped}${dryRun ? " (dry-run)" : ""}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
