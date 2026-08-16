#!/usr/bin/env python3
"""
Generates the branded placeholder artwork used wherever a real photograph has
not been supplied yet. Re-run with:  python3 scripts/make-placeholders.py

Delete a file and drop in a real .jpg with the same base name to replace it
(remember to update the `src` in the page or data file).
"""

import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
NAVY = "#0F1E52"
NAVY_DEEP = "#091335"
NAVY_MID = "#152A6F"
RED = "#C22E35"

OWL = (
    "M24 41C10.7 41 2.5 31.6 2.5 19.9c0-6.4 1.9-12 5.2-16.6a1 1 0 0 1 1.6-.06L15 10.2A21 21 0 0 1 "
    "24 8.2c3.3 0 6.4.7 9 2l5.7-6.96a1 1 0 0 1 1.6.06c3.3 4.6 5.2 10.2 5.2 16.6C45.5 31.6 37.3 41 24 41Z"
)


def artwork(width: int, height: int, index: str, title: str, kicker: str) -> str:
    owl_scale = min(width, height) / 48 * 1.55
    owl_x = width - owl_scale * 48 * 0.62
    owl_y = height - owl_scale * 42 * 0.72
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" preserveAspectRatio="xMidYMid slice" role="img">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="{NAVY_MID}"/>
      <stop offset="0.55" stop-color="{NAVY}"/>
      <stop offset="1" stop-color="{NAVY_DEEP}"/>
    </linearGradient>
    <pattern id="grid" width="72" height="72" patternUnits="userSpaceOnUse">
      <path d="M72 0H0v72" fill="none" stroke="#ffffff" stroke-opacity="0.055" stroke-width="1"/>
    </pattern>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
    <radialGradient id="glow" cx="0.18" cy="0.12" r="0.9">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.10"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="{width}" height="{height}" fill="url(#g)"/>
  <rect width="{width}" height="{height}" fill="url(#grid)"/>
  <rect width="{width}" height="{height}" fill="url(#glow)"/>
  <rect width="{width}" height="{height}" filter="url(#grain)" opacity="0.16"/>

  <g transform="translate({owl_x:.0f} {owl_y:.0f}) scale({owl_scale:.3f})" opacity="0.09">
    <path d="{OWL}" fill="#ffffff"/>
  </g>

  <g transform="translate(56 56)">
    <rect width="72" height="4" fill="#ffffff"/>
    <rect y="7" width="72" height="4" fill="{RED}"/>
  </g>

  <text x="56" y="{height - 116}" fill="#ffffff" fill-opacity="0.5"
        font-family="Inter, 'Helvetica Neue', Arial, sans-serif" font-size="20"
        font-weight="600" letter-spacing="4.4">{index} &#183; {kicker}</text>
  <text x="54" y="{height - 56}" fill="#ffffff"
        font-family="Literata, Georgia, 'Times New Roman', serif" font-size="52"
        font-weight="600" letter-spacing="-0.6">{title}</text>
</svg>
"""


FILES = [
    ("public/facilities/classroom.svg", 1600, 1067, "01", "Main teaching room", "PHOTO PLACEHOLDER"),
    ("public/facilities/computer-lab.svg", 1600, 1067, "02", "Computer lab", "PHOTO PLACEHOLDER"),
    ("public/facilities/library.svg", 1600, 1067, "03", "Library", "PHOTO PLACEHOLDER"),
    ("public/facilities/reception.svg", 1600, 1067, "04", "Reception &#38; study lounge", "PHOTO PLACEHOLDER"),
    ("public/hero.svg", 1200, 1500, "", "The centre", "PHOTO PLACEHOLDER"),
    ("public/simulation.svg", 1400, 933, "", "Exam simulation room", "PHOTO PLACEHOLDER"),
]


def main() -> None:
    for rel, w, h, index, title, kicker in FILES:
        path = ROOT / rel
        path.parent.mkdir(parents=True, exist_ok=True)
        label = f"{index} &#183; {kicker}" if index else kicker
        svg = artwork(w, h, index, title, kicker)
        if not index:
            svg = svg.replace(f" &#183; {kicker}</text>", f"{kicker}</text>")
        path.write_text(svg, encoding="utf-8")
        print(f"wrote {rel}  ({w}x{h})  [{label}]")


if __name__ == "__main__":
    main()
