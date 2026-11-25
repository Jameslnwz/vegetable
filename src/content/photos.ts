// ทะเบียนรูปถ่ายทั้งหมดของเว็บ ทุกรูปต้องมีเครดิต รายการ "ที่มาของภาพ" ท้ายเว็บสร้างจากไฟล์นี้อัตโนมัติ
// ถ้าได้รูปจริงของกลุ่มเพิ่ม: วางไฟล์ใน src/assets/photos แล้วเพิ่ม/แก้รายการที่นี่ (source: "group")
import type { StaticImageData } from "next/image";
import bloomField from "@/assets/photos/bloom-field.webp";
import flowerOnWater from "@/assets/photos/flower-on-water.webp";
import petioleSection from "@/assets/photos/petiole-section.webp";
import habitus from "@/assets/photos/habitus-costa-rica.webp";
import flowerCloseup from "@/assets/photos/flower-closeup.webp";
import flowerSpike from "@/assets/photos/flower-spike.webp";
import inleLake from "@/assets/photos/inle-lake.webp";
import groupPlantCode from "@/assets/photos/group-plant-code.webp";

export type Photo = {
  src: StaticImageData;
  alt: string;
  caption: string;
  source: "commons" | "group";
  credit?: { author: string; license: string; licenseUrl?: string; fileUrl: string; title: string };
};

export const photos = {
  habitus: {
    src: habitus,
    alt: "แพผักตบชวาออกดอกสีม่วงเต็มผิวน้ำ",
    caption: "แพผักตบชวาออกดอกเต็มผิวน้ำ",
    source: "commons",
    credit: {
      title: "Eichhornia crassipes (habitus) 1.jpg",
      author: "Hans Hillewaert",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      fileUrl: "https://commons.wikimedia.org/wiki/File:Eichhornia_crassipes_(habitus)_1.jpg",
    },
  },
  flowerCloseup: {
    src: flowerCloseup,
    alt: "ดอกผักตบชวาสีม่วงอ่อน กลีบบนมีแต้มสีเหลือง",
    caption: "ช่อดอกสีม่วงอ่อน กลีบบนมีแต้มเหลือง",
    source: "commons",
    credit: {
      title: "Eichhornia crassipes (water hyacinth) flower.JPG",
      author: "Bamyers99",
      license: "สาธารณสมบัติ",
      fileUrl: "https://commons.wikimedia.org/wiki/File:Eichhornia_crassipes_(water_hyacinth)_flower.JPG",
    },
  },
  flowerOnWater: {
    src: flowerOnWater,
    alt: "ช่อดอกผักตบชวาบานอยู่เหนือใบบนผิวน้ำ",
    caption: "ช่อดอกบานเต็มที่เหนือใบ",
    source: "commons",
    credit: {
      title: "Common Water Hyacinth (405615687).jpg",
      author: "Dinesh Valke",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      fileUrl: "https://commons.wikimedia.org/wiki/File:Common_Water_Hyacinth_(405615687).jpg",
    },
  },
  bloomField: {
    src: bloomField,
    alt: "ผักตบชวาจำนวนมากออกดอกพร้อมกัน ใบเรียงแน่นเป็นแพ",
    caption: "ใบเรียงแน่นเป็นแพ ออกดอกพร้อมกัน",
    source: "commons",
    credit: {
      title: "Aquatic invasive plant water hyacinth eichhornia crassipes in full bloom.jpg",
      author: "Ramey V, U.S. Fish and Wildlife Service",
      license: "สาธารณสมบัติ",
      fileUrl:
        "https://commons.wikimedia.org/wiki/File:Aquatic_invasive_plant_water_hyacinth_eichhornia_crassipes_in_full_bloom.jpg",
    },
  },
  petioleSection: {
    src: petioleSection,
    alt: "ก้านใบพองของผักตบชวาผ่าตามขวาง เห็นเนื้อเยื่อมีช่องอากาศเป็นรูพรุน",
    caption: "ก้านใบพองผ่าตัดขวาง เห็นช่องอากาศ (aerenchyma)",
    source: "commons",
    credit: {
      title: "Eichhornia Crassipes.jpg",
      author: "Jacopo Prisco",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      fileUrl: "https://commons.wikimedia.org/wiki/File:Eichhornia_Crassipes.jpg",
    },
  },
  flowerSpike: {
    src: flowerSpike,
    alt: "ช่อดอกผักตบชวาโผล่เหนือกอใบบนผิวน้ำ",
    caption: "ช่อดอกโผล่พ้นกอใบ",
    source: "commons",
    credit: {
      title: "Water hyacinth.jpg",
      author: "Ted Center",
      license: "สาธารณสมบัติ",
      fileUrl: "https://commons.wikimedia.org/wiki/File:Water_hyacinth.jpg",
    },
  },
  inleLake: {
    src: inleLake,
    alt: "ชาวบ้านพายเรือผ่านแพผักตบชวาที่ขึ้นหนาแน่นริมทะเลสาบ",
    caption: "แพผักตบชวาหนาแน่นริมทะเลสาบอินเล ประเทศเมียนมา",
    source: "commons",
    credit: {
      title: "Water hyacinth Inle Lake.JPG",
      author: "Wagaung",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      fileUrl: "https://commons.wikimedia.org/wiki/File:Water_hyacinth_Inle_Lake.JPG",
    },
  },
  groupPlantCode: {
    src: groupPlantCode,
    alt: "ป้ายเขียนด้วยมือ รหัสพรรณไม้ ผักตบชวา 7-65000-001-250 ติดไว้เหนือกอผักตบชวาในสวนพฤกษศาสตร์โรงเรียน",
    caption: "ป้ายรหัสพรรณไม้ในสวนพฤกษศาสตร์โรงเรียน",
    source: "group",
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
