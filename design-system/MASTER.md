# MASTER DESIGN SYSTEM: SUERTA CO.

## Pattern
- **Name:** Bento Grid Showcase (Liquid Glass)
- **Conversion Focus:** Scannable value props, high info density.
- **Color Strategy:** Dark Theme `#0a0a0c`, Gold `#CA8A04` accent, Red `#9A161F` highlight.

## Style: Liquid Glass
- **Keywords:** Flowing glass, morphing, smooth transitions, fluid effects, translucent, animated blur.
- **Effects:** Dynamic blur (backdrop-filter: blur(20px)), morphing elements, 400-600ms transition curves.

## Colors
- `--color-bg`: `#1A1A1D` (Antrasit: Ana Zemin)
- `--color-text`: `#F2EDE4` (Krem: Ana Metinler)
- `--color-accent`: `#9A161F` (Bordo: Ana Vurgular)
- `--color-secondary`: `#5C6370` (Dijital Füme: İkincil Vurgular)
- `--color-gold`: `#FFECAF` (Soft Sarı: Parlama ve Detaylar)
- `--color-glass`: `rgba(242, 237, 228, 0.03)`
- `--color-glass-border`: `rgba(242, 237, 228, 0.05)`

## Typography
- **Heading:** Bodoni Moda (Luxury, premium)
- **Body:** Jost (Clean, modern, legible)
- **CSS Usage:** `font-family: var(--font-heading)` and `var(--font-body)`

## Shared Utilities
- `.glass-panel`: Applies standard liquid glass effect with blur, translucent background, and subtle white border.
- `var(--transition-liquid)`: For morphing and hover states.
