import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def draw_phone_icon(draw, cx, cy, r, fill_color):
    """Draw a clean, crisp vector smartphone/phone handset icon."""
    w, h = int(r * 1.05), int(r * 1.6)
    x0, y0 = cx - w//2, cy - h//2
    x1, y1 = cx + w//2, cy + h//2
    draw.rounded_rectangle([x0, y0, x1, y1], radius=3, outline=fill_color, width=2)
    # top speaker slit
    draw.line([(cx - 3, y0 + 3), (cx + 3, y0 + 3)], fill=fill_color, width=1)
    # bottom home indicator
    draw.ellipse([cx - 2, y1 - 4, cx + 2, y1], fill=fill_color)

def draw_mail_icon(draw, cx, cy, r, fill_color):
    """Draw a clean vector mail envelope."""
    w, h = int(r * 1.5), int(r * 1.05)
    x0, y0 = cx - w//2, cy - h//2
    x1, y1 = cx + w//2, cy + h//2
    draw.rounded_rectangle([x0, y0, x1, y1], radius=2, outline=fill_color, width=2)
    # envelope fold lines
    draw.line([(x0 + 1, y0 + 1), (cx, cy + 2)], fill=fill_color, width=2)
    draw.line([(cx, cy + 2), (x1 - 1, y0 + 1)], fill=fill_color, width=2)

def draw_globe_icon(draw, cx, cy, r, fill_color):
    """Draw a clean vector globe."""
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=fill_color, width=2)
    # equator
    draw.line([(cx - r, cy), (cx + r, cy)], fill=fill_color, width=1)
    # meridian
    draw.ellipse([cx - int(r * 0.5), cy - r, cx + int(r * 0.5), cy + r], outline=fill_color, width=1)

def draw_pin_icon(draw, cx, cy, r, fill_color):
    """Draw a clean vector location pin."""
    # head circle
    draw.ellipse([cx - r, cy - r - 2, cx + r, cy + r - 2], fill=fill_color)
    # inner dot
    draw.ellipse([cx - 2, cy - 3, cx + 2, cy + 1], fill='#ffffff')
    # point
    points = [(cx - int(r*0.8), cy), (cx + int(r*0.8), cy), (cx, cy + r + 4)]
    draw.polygon(points, fill=fill_color)

def create_og_image():
    target_w = 1200
    target_h = 630
    
    # 1. Base Studio Background Setup
    studio_path = "/Users/shalomtalesman/.gemini/antigravity-ide/brain/73d3cb87-6a09-4a1f-947f-6935bae75cd9/thobix_og_studio_1789314772295.jpg"
    if not os.path.exists(studio_path):
        # Fallback to local image if moved
        studio_path = "public/images/thobix_og_studio.jpg"
    
    raw_bg = Image.open(studio_path).convert("RGB")
    
    # Resize background to height = 630, then shift right
    # to position the chair & camera comfortably with ample breathing room
    bg_h = 630
    bg_w = int(raw_bg.width * (bg_h / raw_bg.height))
    resized_bg = raw_bg.resize((bg_w, bg_h), Image.Resampling.LANCZOS)
    
    canvas = Image.new("RGB", (target_w, target_h), resized_bg.getpixel((0, 300)))
    draw = ImageDraw.Draw(canvas)
    
    # Paste resized studio visual shifted right by +65px
    offset_x = (target_w - bg_w) + 65
    canvas.paste(resized_bg, (offset_x, 0))
    
    # Smooth left-edge blend across the expanded left area
    left_col = [resized_bg.getpixel((0, y)) for y in range(bg_h)]
    for x in range(offset_x):
        for y in range(bg_h):
            canvas.putpixel((x, y), left_col[y])
    
    # 2. Setup Fonts
    futura_ttc = "/System/Library/Fonts/Supplemental/Futura.ttc"
    helvetica_ttc = "/System/Library/Fonts/Helvetica.ttc"
    
    try:
        font_eyebrow = ImageFont.truetype(futura_ttc, 13, index=0) # Medium
        font_title1 = ImageFont.truetype(futura_ttc, 74, index=2)  # Bold
        font_title2 = ImageFont.truetype(futura_ttc, 92, index=2)  # Bold
        font_subtitle = ImageFont.truetype(futura_ttc, 15, index=2) # Bold
        font_geo = ImageFont.truetype(futura_ttc, 13, index=0)     # Medium
        font_badge_lbl = ImageFont.truetype(futura_ttc, 10, index=2) # Bold
        font_badge_val = ImageFont.truetype(helvetica_ttc, 13, index=1) # Bold
        font_url = ImageFont.truetype(futura_ttc, 15, index=2)     # Bold
        font_brand = ImageFont.truetype(futura_ttc, 11, index=2)   # Bold
    except Exception as e:
        print("Font fallback:", e)
        font_eyebrow = ImageFont.load_default()
        font_title1 = font_title2 = font_subtitle = font_geo = font_badge_lbl = font_badge_val = font_url = font_brand = font_eyebrow

    # 3. Left Layout Content
    lx = 75
    
    # --- Top Eyebrow Tag ---
    eyebrow_y = 52
    draw.rounded_rectangle([lx, eyebrow_y, lx + 215, eyebrow_y + 28], radius=6, fill="#ebe6dd", outline="#d5cec1", width=1)
    # Petrol dot
    draw.ellipse([lx + 12, eyebrow_y + 9, lx + 22, eyebrow_y + 19], fill="#004e4f")
    draw.text((lx + 30, eyebrow_y + 6), "PORTFOLIO OFFICIEL", font=font_eyebrow, fill="#1c2c2f")
    
    # --- Main Punchy Headline (matching reference COMING SOON style) ---
    title_y = 96
    draw.text((lx, title_y), "THOBIX", font=font_title1, fill="#152024")
    
    title2_y = title_y + 74
    draw.text((lx, title2_y), "ECLOU", font=font_title2, fill="#004e4f")
    
    # --- Segmented Progress Bar (Direct reference feature) ---
    bar_y = title2_y + 104
    num_segs = 16
    seg_w = 20
    seg_h = 9
    seg_gap = 6
    
    for i in range(num_segs):
        sx = lx + i * (seg_w + seg_gap)
        if i < 5:
            col = (0, 78, 79, 255) # solid brand color #004e4f
        elif i < 9:
            alpha = int(255 * (1 - (i - 4) * 0.22))
            col = (0, 78, 79, alpha)
        else:
            col = (195, 188, 178, 200)
            
        seg_img = Image.new("RGBA", (seg_w, seg_h), (0,0,0,0))
        seg_draw = ImageDraw.Draw(seg_img)
        seg_draw.rounded_rectangle([0, 0, seg_w, seg_h], radius=2, fill=col)
        canvas.paste(seg_img, (sx, bar_y), seg_img)
        
    # --- Subtitle: PHOTOGRAPHE PROFESSIONNEL & DIRECTEUR ARTISTIQUE ---
    sub_y = bar_y + 22
    draw.text((lx, sub_y), "PHOTOGRAPHE PROFESSIONNEL & DIRECTEUR ARTISTIQUE", font=font_subtitle, fill="#1e3236")
    
    # --- Geographic Territory ---
    geo_y = sub_y + 26
    draw_pin_icon(draw, lx + 6, geo_y + 6, 5, "#004e4f")
    draw.text((lx + 18, geo_y), "BÉNIN  •  GUINÉE  •  AFRIQUE DE L'OUEST", font=font_geo, fill="#50676b")
    
    # --- Subtle Separator Rule ---
    sep_y = geo_y + 32
    draw.line([(lx, sep_y), (lx + 550, sep_y)], fill="#d8d1c4", width=1)
    
    # --- Bottom Section: Logo & Official Contacts ---
    bot_y = sep_y + 18
    
    # 1. Thobix Signature Logo
    sig_path = "public/images/signature.png"
    if os.path.exists(sig_path):
        sig = Image.open(sig_path).convert("RGBA")
        bbox = sig.getbbox()
        if bbox:
            sig = sig.crop(bbox)
            
        sw, sh = sig.size
        target_sw = 120
        target_sh = int(sh * (target_sw / sw))
        sig_resized = sig.resize((target_sw, target_sh), Image.Resampling.LANCZOS)
        
        # Colorize signature to #004e4f
        sig_pixels = sig_resized.load()
        for py in range(target_sh):
            for px in range(target_sw):
                r, g, b, a = sig_pixels[px, py]
                if a > 15:
                    sig_pixels[px, py] = (0, 78, 79, a)
                    
        canvas.paste(sig_resized, (lx, bot_y + 2), sig_resized)
        
        # Text label under signature
        draw.text((lx + 8, bot_y + target_sh + 8), "THOBIX ECLOU", font=font_brand, fill="#004e4f")
        draw.text((lx + 8, bot_y + target_sh + 22), "STUDIO CRÉATIF", font=font_eyebrow, fill="#627a7e")
        
    # 2. Contact Cards on the right of the signature
    cx = lx + 148
    
    # Card 1: WhatsApp & Tél
    card1_w = 182
    card_h = 44
    draw.rounded_rectangle([cx, bot_y, cx + card1_w, bot_y + card_h], radius=8, fill="#ffffff", outline="#cfc7b9", width=1)
    # Circle icon badge
    draw.ellipse([cx + 9, bot_y + 11, cx + 31, bot_y + 33], fill="#004e4f")
    draw_phone_icon(draw, cx + 20, bot_y + 22, 6, "#ffffff")
    draw.text((cx + 38, bot_y + 7), "WHATSAPP & TÉL", font=font_badge_lbl, fill="#5a7377")
    draw.text((cx + 38, bot_y + 21), "+229 01 64 43 41 15", font=font_badge_val, fill="#101d20")
    
    # Card 2: Email Officiel
    cx2 = cx + card1_w + 10
    card2_w = 208
    draw.rounded_rectangle([cx2, bot_y, cx2 + card2_w, bot_y + card_h], radius=8, fill="#ffffff", outline="#cfc7b9", width=1)
    draw.ellipse([cx2 + 9, bot_y + 11, cx2 + 31, bot_y + 33], fill="#004e4f")
    draw_mail_icon(draw, cx2 + 20, bot_y + 22, 7, "#ffffff")
    draw.text((cx2 + 38, bot_y + 7), "EMAIL OFFICIEL", font=font_badge_lbl, fill="#5a7377")
    draw.text((cx2 + 38, bot_y + 21), "thobiseclou@gmail.com", font=font_badge_val, fill="#101d20")
    
    # Card 3: Full Website Banner Pill (Centered, high luxury)
    web_y = bot_y + card_h + 9
    web_w = card1_w + 10 + card2_w
    draw.rounded_rectangle([cx, web_y, cx + web_w, web_y + 34], radius=6, fill="#004e4f")
    # Centered globe + URL
    content_start_x = cx + (web_w - 240) // 2
    draw_globe_icon(draw, content_start_x + 8, web_y + 17, 7, "#ffffff")
    draw.text((content_start_x + 24, web_y + 9), "WWW.THOBIXECLOU.COM", font=font_url, fill="#ffffff")
    
    # --- Fine Studio Outer Frame ---
    draw.rectangle([12, 12, target_w - 12, target_h - 12], outline="#ded8cb", width=1)
    
    # 4. Save Final Outputs
    out_jpg = "public/og-image.jpg"
    canvas.save(out_jpg, "JPEG", quality=94, progressive=True, optimize=True)
    
    out_png = "public/og-image.png"
    canvas.save(out_png, "PNG", optimize=True)
    
    # Also save to artifacts for easy previewing
    art_path = "/Users/shalomtalesman/.gemini/antigravity-ide/brain/73d3cb87-6a09-4a1f-947f-6935bae75cd9/og_preview_final.jpg"
    canvas.save(art_path, "JPEG", quality=94)
    
    size_kb = os.path.getsize(out_jpg) / 1024
    print(f"Successfully generated {out_jpg} ({target_w}x{target_h}px, {size_kb:.1f} KB)")

if __name__ == "__main__":
    create_og_image()
