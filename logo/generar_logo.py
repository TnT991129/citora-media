"""Logo de Citora: icono (vector) + nombre debajo (letra Inter 800 convertida a trazos)."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
TXT = open(os.path.join(HERE, 'texto.path')).read()
W_UNITS, UPM, CAP = [float(v) for v in open(os.path.join(HERE, 'texto.meta')).read().split()]

def icon(gid):
    # Diseño en 512x512
    return f'''<defs>
  <linearGradient id="{gid}" gradientUnits="userSpaceOnUse" x1="40" y1="120" x2="472" y2="392">
    <stop offset="0" stop-color="#f43f5e"/><stop offset="0.55" stop-color="#fb6a3d"/><stop offset="1" stop-color="#fb9a2a"/>
  </linearGradient>
</defs>
<rect width="512" height="512" rx="132" fill="url(#{gid})"/>
<rect x="112" y="148" width="288" height="262" rx="50" fill="#fff"/>
<rect x="146" y="214" width="220" height="162" rx="24" fill="url(#{gid})"/>
<rect x="166" y="100" width="40" height="92" rx="20" fill="#fff" stroke="url(#{gid})" stroke-width="12"/>
<rect x="306" y="100" width="40" height="92" rx="20" fill="#fff" stroke="url(#{gid})" stroke-width="12"/>
<path d="M204 296l40 38 70-74" fill="none" stroke="#fff" stroke-width="30" stroke-linecap="round" stroke-linejoin="round"/>'''

def logo_svg(bg, text_color, size=1024):
    icon_px = 560
    gap = 64
    text_w = 620
    s = text_w / W_UNITS
    cap = CAP * s
    top = (size - (icon_px + gap + cap)) / 2
    k = icon_px / 512
    ix = (size - icon_px) / 2
    base = top + icon_px + gap + cap
    tx = (size - text_w) / 2
    bgrect = f'<rect width="{size}" height="{size}" fill="{bg}"/>' if bg else ''
    shadow = ('<filter id="sh" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#000" flood-opacity="0.35"/></filter>'
              if bg and bg != '#ffffff' else '<filter id="sh" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="#f43f5e" flood-opacity="0.22"/></filter>')
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{size}" height="{size}" viewBox="0 0 {size} {size}">'
            f'<defs>{shadow}</defs>{bgrect}'
            f'<g filter="url(#sh)" transform="translate({ix} {top}) scale({k})">{icon("g1")}</g>'
            f'<path transform="translate({tx} {base}) scale({s})" d="{TXT}" fill="{text_color}"/></svg>')

def icon_svg(size=1024):
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{size}" height="{size}" viewBox="0 0 512 512">{icon("g1")}</svg>'

variants = {
    'citora-logo-oscuro': ('#0f1629', '#ffffff'),
    'citora-logo-claro': ('#ffffff', '#0f172a'),
    'citora-logo-transparente-texto-negro': (None, '#0f172a'),
    'citora-logo-transparente-texto-blanco': (None, '#ffffff'),
}
for name, (bg, col) in variants.items():
    open(os.path.join(HERE, name + '.svg'), 'w').write(logo_svg(bg, col))
open(os.path.join(HERE, 'citora-icono.svg'), 'w').write(icon_svg())
print('ok')
