#!/usr/bin/env python3
"""
Thobix Eclou — Favicon Suite Generator
Generates:
- favicon.svg (Vector SVG with Instrument Serif 'T' & editorial catchlight sparkle)
- apple-touch-icon.png (180x180)
- favicon-96x96.png (96x96)
- favicon.ico (Multi-size: 16x16, 32x32, 48x48)
- web-app-manifest-192x192.png (192x192)
- web-app-manifest-512x512.png (512x512)
"""

import os
import subprocess
from PIL import Image

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
PUBLIC_DIR = os.path.join(PROJECT_ROOT, 'public')
TMP_DIR = '/tmp'

# Pure vector path for Instrument Serif glyph 'T'
BBOX = (10, 0, 451, 735)
PATH_D = "M 118 0 Q 103 0 103 11 Q 103 22 116 23 L 161 30 Q 181 33 188 40.5 Q 195 48 195 69 L 195 669 Q 195 683 178 689 L 119 696 Q 106 697 106 708 Q 106 720 120 720 L 341 720 Q 355 720 355 708 Q 355 697 342 696 L 283 689 Q 266 683 266 669 L 266 69 Q 266 48 273 40.5 Q 280 33 300 30 L 345 23 Q 358 22 358 11 Q 358 0 343 0 Z"

xmin, ymin, xmax, ymax = BBOX
gw = xmax - xmin
gh = ymax - ymin
target_h = 330
scale = target_h / gh
tx = 256 - (gw * scale) / 2 - xmin * scale
ty = 256 + (gh * scale) / 2 + ymin * scale

SVG_CONTENT = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Luxury Obsidian & Deep Emerald Background -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#132E29" />
      <stop offset="42%" stop-color="#0C1A17" />
      <stop offset="100%" stop-color="#050908" />
    </linearGradient>
    
    <!-- Emerald Border Glow -->
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#5DB9AB" stop-opacity="0.75" />
      <stop offset="30%" stop-color="#1D5148" stop-opacity="#0.35" />
      <stop offset="70%" stop-color="#1D5148" stop-opacity="#0.2" />
      <stop offset="100%" stop-color="#5DB9AB" stop-opacity="#0.6" />
    </linearGradient>

    <!-- Center Radial Glow -->
    <radialGradient id="centerGlow" cx="50%" cy="46%" r="52%">
      <stop offset="0%" stop-color="#1D5148" stop-opacity="0.7" />
      <stop offset="55%" stop-color="#0E2420" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#0E2420" stop-opacity="0" />
    </radialGradient>

    <!-- Monogram Ivory Gradient -->
    <linearGradient id="ivoryGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="30%" stop-color="#FAF8F3" />
      <stop offset="85%" stop-color="#EBE7DC" />
      <stop offset="100%" stop-color="#DCD7C9" />
    </linearGradient>

    <!-- Emerald Sparkle Star Glow -->
    <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#5DB9AB" stop-opacity="1" />
      <stop offset="40%" stop-color="#1D5148" stop-opacity="0.45" />
      <stop offset="100%" stop-color="#1D5148" stop-opacity="0" />
    </radialGradient>
  </defs>

  <!-- Squircle Base with Rich Bevel Border -->
  <rect x="16" y="16" width="480" height="480" rx="118" ry="118" fill="url(#bgGrad)" />
  <rect x="16" y="16" width="480" height="480" rx="118" ry="118" fill="url(#centerGlow)" />
  <rect x="16" y="16" width="480" height="480" rx="118" ry="118" fill="none" stroke="url(#borderGrad)" stroke-width="5" />

  <!-- Camera Lens Focus Grid Reticle -->
  <circle cx="256" cy="256" r="205" fill="none" stroke="#5DB9AB" stroke-opacity="0.14" stroke-width="1.5" />
  
  <path d="M 82 112 L 82 82 L 112 82" fill="none" stroke="#5DB9AB" stroke-opacity="0.45" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M 430 112 L 430 82 L 400 82" fill="none" stroke="#5DB9AB" stroke-opacity="0.45" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M 82 400 L 82 430 L 112 430" fill="none" stroke="#5DB9AB" stroke-opacity="0.45" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M 430 400 L 430 430 L 400 430" fill="none" stroke="#5DB9AB" stroke-opacity="0.45" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />

  <!-- Pure Vector Path for Serif 'T' -->
  <g transform="translate({tx:g}, {ty:g}) scale({scale:g}, -{scale:g})">
    <path d="{PATH_D}" fill="url(#ivoryGrad)" stroke="url(#ivoryGrad)" stroke-width="15" stroke-linejoin="round" />
  </g>

  <!-- Editorial Photography Catchlight Star (✦) -->
  <g transform="translate(366, 84)">
    <circle cx="0" cy="0" r="52" fill="url(#starGlow)" />
    <path d="
      M 0 -44
      C 0 -15 11 -4 44 0
      C 11 4 0 15 0 44
      C 0 15 -11 4 -44 0
      C -11 -4 0 -15 0 -44
      Z
    " fill="#5DB9AB" />
    <path d="
      M 0 -20
      C 0 -7 5 -2 20 0
      C 5 2 0 7 0 20
      C 0 7 -5 2 -20 0
      C -5 -2 0 -7 0 -20
      Z
    " fill="#5DB9AB" opacity="0.6" transform="rotate(45)" />
    <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
  </g>
</svg>'''

def main():
    svg_file = os.path.join(PUBLIC_DIR, 'favicon.svg')
    with open(svg_file, 'w') as f:
        f.write(SVG_CONTENT)
    print(f"Generated {svg_file}")

    # Render 1024x1024 master PNG
    subprocess.run(['qlmanage', '-t', '-s', '1024', '-o', TMP_DIR, svg_file], check=True)
    master_png = os.path.join(TMP_DIR, 'favicon.svg.png')
    im = Image.open(master_png)

    # 1. 512x512
    im512 = im.resize((512, 512), Image.Resampling.LANCZOS)
    im512.save(os.path.join(PUBLIC_DIR, 'web-app-manifest-512x512.png'), 'PNG', optimize=True)

    # 2. 192x192
    im192 = im.resize((192, 192), Image.Resampling.LANCZOS)
    im192.save(os.path.join(PUBLIC_DIR, 'web-app-manifest-192x192.png'), 'PNG', optimize=True)

    # 3. 180x180 (Apple Touch Icon)
    im180 = im.resize((180, 180), Image.Resampling.LANCZOS)
    im180.save(os.path.join(PUBLIC_DIR, 'apple-touch-icon.png'), 'PNG', optimize=True)

    # 4. 96x96
    im96 = im.resize((96, 96), Image.Resampling.LANCZOS)
    im96.save(os.path.join(PUBLIC_DIR, 'favicon-96x96.png'), 'PNG', optimize=True)

    # 5. Multi-size favicon.ico (16, 32, 48)
    im48 = im.resize((48, 48), Image.Resampling.LANCZOS)
    im48.save(os.path.join(PUBLIC_DIR, 'favicon.ico'), format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])

    print("Favicon suite successfully generated!")

if __name__ == '__main__':
    main()
