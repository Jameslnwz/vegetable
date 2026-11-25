# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS, deployed on Vercel. Chosen by the group at the start.

## Users

Thai Grade 12 (ม.6/3) biology students and their teacher. The site is presented in class on a projector (worksheet step 6) and shared as a link in Google Classroom, so it is also opened on phones and tablets (iPad Safari confirmed).

## Product Purpose

"Vegetable" is the group's major assignment (งานชิ้นสำคัญ) for Biology 5 (ว30245), unit 1 Biodiversity, at Chalermkwansatree School, Phitsanulok. It presents one plant from the school botanical garden, water hyacinth (ผักตบชวา, plant code 7-65000-001-250), and integrates science and technology by being an interactive web app. Success: the teacher finds every worksheet field, the class understands the plant and its reproduction, and viewers leave with practical ways to turn the weed into something useful (ประโยชน์แท้แก่มหาชน).

## Positioning

A water weed reframed as a free community material: botany and reproduction explained interactively, then four hands-on processing methods (compost, weaving, paper and seedling pots, feed and mushroom substrate).

## Operating Context

Classroom presentation on a projector, read from a distance; individual browsing on phones. Thai language only.

## Capabilities and Constraints

- Required worksheet fields: scientific name, common name, local names, plant code, work name, illustration/photos, work description, public benefit, other content, team list.
- Interactive pieces: plant structure viewer (zoom, labels), clone growth simulation, tristyly diagram, gametogenesis and double fertilization steppers, flower-to-seed timeline, processing guide checklists.
- Static site, no backend or login.

## Brand Commitments

- Work name: Vegetable (after the repository).
- Content and section order follow the group's own reference artifact (คู่มือแปรรูปผักตบชวา).
- Font: any clear, highly legible Thai face (the user released the earlier TH Sarabun New requirement).
- Craft bar: professional, Awwwards-level polish (reference for quality, not a specific look).
- Visual direction (chosen by the user, standing preference since the 2026-11 redesign; replaces the earlier editorial nature-magazine look): "สวยๆงาม abstract มีกราฟฟิคสีสันสดใส ตะลึ่ง แต่ยังไม่รก และอ่านง่าย". The look follows the group's reference artifact (claude.ai/artifact/HZZA5XrWsYhtt78qerRtbX): white page, rounded cards, a colour per topic, and a cover whose background is a photo of the plant ("ผมชอบแบบแรกที่พื้นหลังเป็นรูปผัก"). Vivid abstract cut-paper shapes and short cheeky sticker labels sit on top of that base; body text always sits on a plain ground.
- Sticker labels may only restate facts already on the site; they live in `stickers` in src/content/plant.ts.

## Evidence on Hand

- Group photo of the plant-code sign in the school garden (src/assets/photos/group-plant-code.webp, EXIF stripped).
- Seven Wikimedia Commons photos, licences verified (public domain / CC BY-SA), registry in src/content/photos.ts.
- Content facts and sources come from the group's reference artifact; members: นายจิรเมธ ฉิมสุด (25), นายภูตะวัน ยังดี (26), นายสาธิต พวงมาลี (27), นายภัทรพงศ์ ถวิลประภา (28), ม.6/3.
- No herbal-medicine section: it was removed because no sourced content exists.

## Product Principles

1. Every worksheet requirement is findable within seconds.
2. Nothing factual is invented; unknowns show a pending label.
3. Readable from the back of a classroom: large type, strong contrast.
4. Interaction explains biology; it is never decoration alone.

## Accessibility & Inclusion

WCAG AA contrast, keyboard operable interactives, reduced-motion path, touch targets at least 44px.
