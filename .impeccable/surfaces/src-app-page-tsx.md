---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: []
---

## Scope

The single page `/` (src/app/page.tsx and its components). Visitor mode: Read. The class and teacher must understand the plant, find every worksheet field fast, and leave with the four processing methods.

## Audience and constraints

Thai Grade 12 biology class watching a projector in a lit classroom, plus phones and iPad from Google Classroom. Thai only. All facts, names, members, sources and photo credits stay exactly as in src/content. Interactives keep their logic, keyboard and ARIA. Anchors (#identity, #structure, #problem, #reproduction, #guide, #benefits, #credits) stay.

## Direction contract

THESIS: A field guide you want to poke. The group's reference layout (white page, rounded cards, one colour per topic) made vivid: big flat cut-paper shapes of the plant's own parts pop out of cards and wobble when touched, and short cheeky stickers restate the facts. It refuses both the dim nature-magazine and the kiddy cartoon.

OWN-WORLD: White ground and plain white cards; ink #14112a. Topic colours at full saturation as fields and badges: violet (identity, nav), teal (structure), deep lagoon green with sun yellow (problem), lime, violet, pink, orange, teal for the five reproduction topics, orange (guide), multi (benefits). Shapes: leaf discs (lime), inflated floats (aqua), six-petal blossoms with a yellow eye (lilac), pink stolon ribbons, ink roots; flat fills, no outlines. Type: Anuphan for headings and text, Playpen Sans Thai only for stickers. Radius 28px on cards, pills for chips.

STORY: The visitor sees the plant, learns what it is (registry card), how it is built (viewer), why it is a problem, how it multiplies (clone growth takes over the pond), then picks a processing method and ticks it off, and ends on who made it.

FIRST VIEWPORT: White sticky bar, violet logo chip, pill nav. Below, a large rounded card filled with the bloom-field photo, darkened at the bottom-left; headline "ผักตบชวา" huge in white with "จากวัชพืชสู่ของมีค่า" under it on a yellow marker, the lead, yellow primary "เริ่มดูคู่มือ" and outline "รู้จักผักตบชวา". Cut-paper blossom, leaf disc and float shapes break out of the card's right edge, one carrying the sticker "ลอยได้เพราะในก้านมีอากาศ!". Under the card, three vivid stat cards (2444, 90%, 4 วิธี).

FORM: The user's reference artifact, pinned by the user; cut-paper shapes and stickers added from the approved plan. seed: none (pinned) "https://claude.ai/artifact/HZZA5XrWsYhtt78qerRtbX ลองดูตามนี้ แล้วก็ผมชอบแบบแรกที่พื้นหลังเป็นรูปผักนะ"

Signature interaction: shapes squash and wobble on hover or tap (spring ease), and in the clone simulation the paper plants multiply until they fill the pond. Motion grammar: one spring ease for arrivals, a slow bob for floats; nothing moves under reduced motion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

None blocking. Sticker wording is the draft from the approved plan; the user can edit it in src/content/plant.ts.
