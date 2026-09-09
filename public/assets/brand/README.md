# YILUN LAB Brand Assets

YILUN LAB uses a monochrome identity system. This directory holds the
production brand kit — Figma-exported SVG/PDF, plus rendered PNG/JPG variants
for handoff to external use. See the [logo export guide](logos/README.md).

## Logo system

- **Mark** — symbol only, square
- **Lockup, horizontal** — symbol + YILUN LAB, side by side (primary lockup)
- **Lockup, stacked** — symbol + YILUN LAB, stacked (secondary)

Use the **black** version on light or cream backgrounds, the **white**
version on black or dark backgrounds.

## File types

| Format | When to use                                                       |
| ------ | ----------------------------------------------------------------- |
| SVG    | Web, digital layouts, anything that needs to scale                |
| PDF    | Vector handoff for layout and print preparation (Figma RGB)       |
| PNG    | Transparent raster — slide decks, documents, thumbnails           |
| JPG    | Fixed-background previews — social, embedded, "show me the logo" |

The design master is [Figma · Official Logo V2](https://www.figma.com/design/aCdzGGtkA3zFmZVYdFAQnV/Yilun-Lab-Logo?node-id=48-6).
Edit in Figma, export SVG/PDF, verify in Illustrator, then update this directory.
PNG and JPG are rendered from those SVG exports. The six original masked SVGs
were replaced with outlined vectors on 2026-09-09; see the [validation and alignment notes](logos/README.md).

## Naming convention

```
{brand}-{asset}-{layout?}-{color}-{background?}-{size?}.{ext}
```

- **brand** — always `yilun-lab`
- **asset** — `mark` | `lockup`
- **layout** — `horizontal` | `stacked` (only on lockup)
- **color** — `black` | `white`
- **background** — `transparent` | `on-cream` | `on-black` | `on-dark`
  (omitted for SVG; required for raster)
- **size** — pixel width with `w` suffix, or square edge length
  (omitted for SVG; required for raster)

Examples:

```
yilun-lab-mark-black.svg
yilun-lab-lockup-horizontal-white.svg
yilun-lab-mark-black-transparent-1024.png
yilun-lab-lockup-horizontal-white-on-black-2400w.jpg
```

## Website usage

The website itself only references a small subset of the brand kit. The
rest is for Yilun's external use (decks, PR, partners).

| Where                       | File                                                       |
| --------------------------- | ---------------------------------------------------------- |
| Navbar (desktop + mobile)   | `logos/svg/yilun-lab-mark-white.svg`                        |
| Connect card                | `logos/svg/yilun-lab-lockup-stacked-white.svg`             |
| Favicon                     | `/favicon.svg` (separate stylized variant)                 |
| Social share preview        | `/og-image.jpg`                                            |

## Favicons & app icons

Stored in `/public/` (root of the served domain):

| File                  | Size    | Purpose                                |
| --------------------- | ------- | -------------------------------------- |
| `favicon.svg`         | vector  | Modern browsers (preferred)            |
| `favicon-48.png`      | 48×48   | Legacy fallback                        |
| `apple-touch-icon.png`| 180×180 | iOS home screen                        |
| `icon-192.png`        | 192×192 | PWA / Android                          |
| `icon-512.png`        | 512×512 | PWA / Android (high-res)               |

The `favicon.svg` is a stylized variant of the mark (gold strokes,
cream orb on near-black) — the PNG icons are rasterized from it for
visual continuity across platforms.

## Open Graph image

`/og-image.jpg` is **not** a logo master — it's a 1200×630 social
share preview composed of the white horizontal lockup over a dark
background with a warm halo and the studio tagline. Per Meta/Facebook
guidance: at least 1200×630, under 8 MB.

## Don't

- Don't stretch the logo
- Don't add color effects
- Don't place the black logo on dark backgrounds
- Don't place the white logo on light backgrounds
- Don't use JPG as the master logo
- Don't use AI-generated raster output as final brand art
