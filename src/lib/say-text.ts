// ที่อยู่ไฟล์เสียงของคำบรรยาย: public/audio/<กลุ่ม>/<ลำดับ 2 หลัก>.mp3 (ใช้ร่วมกับสคริปต์สร้างไฟล์)
export const clipSrc = (group: string, i: number) => `/audio/${group}/${String(i).padStart(2, "0")}.mp3`;

// แปลงข้อความให้เครื่องอ่านภาษาไทยออกเสียงถูก (ใช้ทั้งในแอปและสคริปต์สร้างไฟล์เสียง)
export const sayText = (t: string) =>
  t
    .replace(/(\d)n\s*=\s*(\d+)/g, "$1 เอ็น เท่ากับ $2")
    .replace(/(^|[^A-Za-z0-9])n\s*=\s*(\d+)/g, "$1เอ็น เท่ากับ $2")
    .replace(/(\d)\s*[–-]\s*(\d)/g, "$1 ถึง $2")
    .replace(/→/g, " ได้ ")
    .replace(/~/g, "ประมาณ ")
    .replace(/มม\./g, "มิลลิเมตร")
    .replace(/ซม\./g, "เซนติเมตร")
    .replace(/[()·:]/g, " ");
