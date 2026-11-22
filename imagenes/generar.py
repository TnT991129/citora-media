"""Genera las 6 imágenes promocionales de Citora (1080x1350, 4:5) como HTML.
Si existe fotos/<nombre>.jpg se usa en el hueco de la foto; si no, el diseño funciona sin ella.
Uso: python3 generar.py && node capturar.js
"""
import os

HERE = os.path.dirname(os.path.abspath(__file__))
FOTOS = os.path.join(HERE, 'fotos')

def foto(nombre):
    for ext in ('jpg', 'jpeg', 'png', 'webp'):
        p = os.path.join(FOTOS, f'{nombre}.{ext}')
        if os.path.exists(p):
            return f'fotos/{nombre}.{ext}'
    return None

FONT_FACES = ''.join(
    f"@font-face{{font-family:Inter;font-weight:{w};src:url(fonts/inter-latin-{w}-normal.woff2) format('woff2');}}"
    f"@font-face{{font-family:Inter;font-weight:{w};src:url(fonts/inter-latin-ext-{w}-normal.woff2) format('woff2');unicode-range:U+0100-024F;}}"
    for w in (500, 600, 700, 800, 900)
)

CSS = FONT_FACES + """
:root{--c1:#f43f5e;--c2:#fb923c;--grad:linear-gradient(135deg,#f43f5e,#fb923c);--ink:#0b0b14;--off:#f7f4f0;}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1350px;overflow:hidden}
body{font-family:Inter,sans-serif;-webkit-font-smoothing:antialiased;position:relative}
.dark{background:var(--ink);color:#fff}
.light{background:var(--off);color:#0b0b14}
.glow{position:absolute;border-radius:50%;filter:blur(90px);pointer-events:none}
.brand{position:absolute;left:72px;top:64px;display:flex;align-items:center;gap:14px;font-weight:800;font-size:34px;letter-spacing:-0.02em;z-index:5}
.footer{position:absolute;left:0;right:0;bottom:44px;text-align:center;font-weight:600;font-size:24px;letter-spacing:0.02em;opacity:.55;z-index:5}
h1{position:absolute;left:72px;right:72px;top:150px;font-weight:900;font-size:104px;line-height:.98;letter-spacing:-0.045em;z-index:5}
.g{background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}
.pill{display:inline-flex;align-items:center;gap:12px;padding:16px 30px;border-radius:999px;font-weight:700;font-size:30px}
.pill.grad{background:var(--grad);color:#fff;box-shadow:0 14px 40px rgba(244,63,94,.35)}
/* Móvil */
.phone{position:absolute;width:420px;height:860px;border-radius:66px;background:#111;padding:14px;box-shadow:0 0 0 2px #2a2a33 inset,0 50px 120px rgba(0,0,0,.45),0 18px 40px rgba(0,0,0,.25);transform-origin:top left}
.phone .scr{width:392px;height:832px;border-radius:53px;overflow:hidden;background:#fff;position:relative;color:#0b0b14}
.phone .island{position:absolute;left:50%;top:12px;width:120px;height:34px;margin-left:-60px;border-radius:20px;background:#000;z-index:3}
.sb{height:54px;display:flex;justify-content:space-between;align-items:flex-end;padding:0 34px 6px;font-weight:700;font-size:17px}
.sb i{font-style:normal;letter-spacing:2px;font-size:14px}
.apphead{padding:14px 22px 10px;display:flex;align-items:center;gap:12px}
.apphead .t{font-weight:800;font-size:22px;letter-spacing:-0.02em}
.apphead .s{font-weight:600;font-size:13px;color:#8a8794}
.av{border-radius:50%;background:var(--grad);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;flex:none;background-size:cover;background-position:center}
.lbl{font-weight:700;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#8a8794}
.card{background:#fff;border-radius:34px;box-shadow:0 24px 60px rgba(20,10,30,.10),0 4px 14px rgba(20,10,30,.05)}
.check{border-radius:50%;background:#22c55e;display:flex;align-items:center;justify-content:center}
.photo{position:absolute;background-size:cover;background-position:center}
"""

LOGO = '''<svg width="{s}" height="{s}" viewBox="0 0 64 64"><defs><linearGradient id="lg{u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f43f5e"/><stop offset="1" stop-color="#fb923c"/></linearGradient></defs><rect width="64" height="64" rx="16" fill="url(#lg{u})"/><rect x="15" y="16" width="34" height="34" rx="7" fill="#fff"/><path d="M15 23a7 7 0 0 1 7-7h20a7 7 0 0 1 7 7v3H15z" fill="#e8491f"/><rect x="22" y="11" width="4" height="10" rx="2" fill="#fff"/><rect x="38" y="11" width="4" height="10" rx="2" fill="#fff"/><path d="M23 39l7 7 13-15" fill="none" stroke="#f0532e" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'''
_u = [0]
def logo(s=56):
    _u[0] += 1
    return LOGO.format(s=s, u=_u[0])

CHECK = '<svg width="{s}" height="{s}" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'

def phone(screen, left, top, scale=1.0, rot=0, extra=''):
    return (f'<div class="phone" style="left:{left}px;top:{top}px;transform:scale({scale}) rotate({rot}deg);{extra}">'
            f'<div class="island"></div><div class="scr">{screen}</div></div>')

def status(dark=False):
    col = '#fff' if dark else '#0b0b14'
    return f'<div class="sb" style="color:{col}"><span>9:41</span><i>●●● ▮</i></div>'

def page(body, cls='dark', title='Citora'):
    return f'<!doctype html><html lang="es"><head><meta charset="utf-8"><title>{title}</title><style>{CSS}</style></head><body class="{cls}">{body}</body></html>'

def brand(dark=True):
    return f'<div class="brand" style="color:{"#fff" if dark else "#0b0b14"}">{logo(56)}Citora</div>'

def footer():
    return '<div class="footer">citora-app.com</div>'

# ───────────── Pantallas de la app ─────────────
AGENDA = [
    ('9:00', 'Daniela', 'Uñas acrílicas', '#f43f5e', 84),
    ('10:30', 'Yaima', 'Pedicure spa', '#fb923c', 70),
    ('12:00', 'Lisandra', 'Manicure + diseño', '#a855f7', 84),
    ('14:00', 'Yanelis', 'Uñas en gel', '#14b8a6', 70),
    ('15:30', 'Mileidys', 'Retoque', '#f43f5e', 62),
    ('17:00', 'Arianna', 'Uñas acrílicas', '#fb923c', 84),
]

def screen_agenda(name='Daniela Nails', items=AGENDA, sub='Jueves 27 · 6 citas'):
    rows = ''.join(
        f'<div style="display:flex;gap:12px;align-items:stretch;margin-bottom:10px">'
        f'<div style="width:46px;font-weight:700;font-size:14px;color:#8a8794;padding-top:10px">{h}</div>'
        f'<div style="flex:1;height:{hh}px;border-radius:16px;background:{c}1f;border-left:5px solid {c};padding:10px 14px">'
        f'<div style="font-weight:800;font-size:16px">{n}</div><div style="font-weight:600;font-size:13px;color:#6b6876">{s}</div></div></div>'
        for h, n, s, c, hh in items)
    days = ''.join(
        f'<div style="flex:1;text-align:center;padding:8px 0;border-radius:14px;{"background:var(--grad);color:#fff" if d=="27" else ""}">'
        f'<div style="font-size:11px;font-weight:700;opacity:.7">{w}</div><div style="font-size:17px;font-weight:800">{d}</div></div>'
        for w, d in [('L', '24'), ('M', '25'), ('X', '26'), ('J', '27'), ('V', '28'), ('S', '29')])
    return (status() + f'<div class="apphead"><div class="av" style="width:44px;height:44px;font-size:18px">{name[0]}</div>'
            f'<div><div class="t">Agenda</div><div class="s">{sub}</div></div></div>'
            f'<div style="display:flex;gap:6px;padding:4px 18px 14px">{days}</div>'
            f'<div style="padding:0 18px">{rows}</div>')

def screen_services():
    sv = [('Uñas acrílicas', '1 h 30 min', '1.000'), ('Uñas en gel', '1 h', '800'), ('Manicure + diseño', '1 h', '600'), ('Pedicure spa', '1 h', '700'), ('Retoque', '45 min', '500')]
    rows = ''.join(
        f'<div style="display:flex;align-items:center;padding:16px 18px;border-radius:18px;margin-bottom:10px;'
        f'{"background:#fff1f2;border:2px solid #f43f5e" if i == 0 else "background:#f6f5f8;border:2px solid transparent"}">'
        f'<div style="flex:1"><div style="font-weight:800;font-size:17px">{n}</div><div style="font-weight:600;font-size:13px;color:#8a8794">{d}</div></div>'
        f'<div style="font-weight:800;font-size:17px;color:{"#f43f5e" if i == 0 else "#0b0b14"}">{p} CUP</div></div>'
        for i, (n, d, p) in enumerate(sv))
    return (status() + '<div class="apphead"><div class="av" style="width:44px;height:44px;font-size:18px">D</div>'
            '<div><div class="t">Daniela Nails</div><div class="s">Elige tu servicio</div></div></div>'
            f'<div style="padding:8px 18px">{rows}</div>')

def screen_calendar():
    hours = [('9:00', 0), ('9:30', 0), ('10:30', 1), ('11:00', 1), ('12:00', 0), ('14:00', 2), ('15:30', 1), ('16:00', 1), ('17:00', 0)]
    cells = ''.join(
        f'<div style="height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:16px;'
        + ('background:#f1f0f4;color:#c2bfcb;text-decoration:line-through' if s == 0 else
           'background:var(--grad);color:#fff;box-shadow:0 8px 20px rgba(244,63,94,.35)' if s == 2 else
           'background:#dcfce7;color:#15803d;border:2px solid #22c55e')
        + f'">{h}</div>' for h, s in hours)
    days = ''.join(
        f'<div style="width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:15px;'
        f'{"background:#0b0b14;color:#fff" if d == 28 else "color:#c2bfcb" if d < 27 else ""}">{d}</div>'
        for d in range(24, 31))
    return (status() + '<div class="apphead"><div><div class="t">Elige tu hora</div><div class="s">Uñas acrílicas · 1.000 CUP</div></div></div>'
            '<div style="padding:6px 22px 0" class="lbl">Noviembre</div>'
            f'<div style="display:flex;justify-content:space-between;padding:12px 18px 18px">{days}</div>'
            '<div style="padding:0 22px 10px;display:flex;align-items:center;gap:8px;font-weight:700;font-size:13px;color:#15803d">'
            '<span style="width:12px;height:12px;border-radius:4px;background:#22c55e;display:inline-block"></span>Horas libres · viernes 28</div>'
            f'<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;padding:0 18px">{cells}</div>'
            '<div style="margin:22px 18px 0;height:58px;border-radius:18px;background:var(--grad);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:18px">Reservar a las 14:00</div>')

def screen_confirm():
    return (status() + '<div style="display:flex;flex-direction:column;align-items:center;padding:110px 28px 0;text-align:center">'
            f'<div class="check" style="width:130px;height:130px;box-shadow:0 20px 50px rgba(34,197,94,.4)">{CHECK.format(s=74)}</div>'
            '<div style="font-weight:900;font-size:32px;letter-spacing:-0.03em;margin-top:34px">¡Cita confirmada!</div>'
            '<div style="font-weight:600;font-size:16px;color:#8a8794;margin-top:10px">Te esperamos en Daniela Nails</div>'
            '<div style="margin-top:34px;width:100%;border-radius:22px;background:#f6f5f8;padding:20px;text-align:left">'
            '<div class="lbl">Tu cita</div><div style="font-weight:800;font-size:19px;margin-top:8px">Uñas acrílicas</div>'
            '<div style="font-weight:600;font-size:15px;color:#6b6876;margin-top:4px">Viernes 28 · 14:00 · 1.000 CUP</div></div>'
            '<div style="margin-top:16px;width:100%;height:54px;border-radius:18px;border:2px solid #e7e5ec;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px">Añadir al calendario</div></div>')

def notif(big=False):
    k = 1.55 if big else 1
    return (f'<div style="background:rgba(255,255,255,.92);border-radius:{int(26*k)}px;padding:{int(16*k)}px {int(18*k)}px;display:flex;gap:{int(14*k)}px;align-items:center;'
            f'box-shadow:0 20px 50px rgba(0,0,0,.35);color:#0b0b14">'
            f'{logo(int(46*k))}<div style="flex:1;min-width:0">'
            f'<div style="display:flex;justify-content:space-between;font-weight:700;font-size:{int(13*k)}px;color:#6b6876;letter-spacing:.04em"><span>CITORA</span><span>ahora</span></div>'
            f'<div style="font-weight:800;font-size:{int(17*k)}px;margin-top:{int(3*k)}px">Nueva cita: Carlos</div>'
            f'<div style="font-weight:600;font-size:{int(15*k)}px;color:#3b3946">Corte + Barba · mañana 10:00</div></div></div>')

def mini_notif(t, d):
    return ('<div style="background:rgba(255,255,255,.18);border-radius:22px;padding:14px 16px;display:flex;gap:12px;align-items:center;color:#fff">'
            f'{logo(36)}<div><div style="font-weight:800;font-size:15px">{t}</div><div style="font-weight:600;font-size:13px;opacity:.85">{d}</div></div></div>')

def screen_lock(photo):
    bg = f"background:url('{photo}') center/cover" if photo else 'background:radial-gradient(120% 70% at 30% 20%,#3a1d2e,#120a14 60%,#07060b)'
    return (f'<div style="position:absolute;inset:0;{bg}"></div><div style="position:absolute;inset:0;background:rgba(0,0,0,.25)"></div>'
            f'<div style="position:relative">{status(True)}'
            '<div style="text-align:center;color:#fff;margin-top:30px"><div style="font-weight:600;font-size:19px;opacity:.85">miércoles 26 de noviembre</div>'
            '<div style="font-weight:800;font-size:96px;letter-spacing:-0.04em;line-height:1.05">9:41</div></div>'
            '<div style="padding:150px 14px 0;display:flex;flex-direction:column;gap:10px;opacity:.9">'
            f'{mini_notif("Recordatorios", "Mañana tienes 6 citas")}{mini_notif("Nueva opinión", "★★★★★ «El mejor corte de Matanzas»")}</div></div>')

def screen_who():
    pros = [('Yanet', 'Peluquera', 'yanet'), ('Carlos', 'Barbero', 'carlos'), ('Daniela', 'Manicurista', 'daniela')]
    rows = ''
    for i, (n, r, f) in enumerate(pros):
        ph = foto(f)
        av = f'<div class="av" style="width:58px;height:58px;font-size:22px;{f"background-image:url({ph})" if ph else ""}">{"" if ph else n[0]}</div>'
        sel = i == 1
        rows += (f'<div style="display:flex;align-items:center;gap:14px;padding:14px 16px;border-radius:20px;margin-bottom:10px;'
                 f'{"background:#fff1f2;border:2px solid #f43f5e" if sel else "background:#f6f5f8;border:2px solid transparent"}">{av}'
                 f'<div style="flex:1"><div style="font-weight:800;font-size:18px">{n}</div><div style="font-weight:600;font-size:13px;color:#8a8794">{r}</div></div>'
                 + (f'<div class="check" style="width:30px;height:30px;background:#f43f5e">{CHECK.format(s=18)}</div>' if sel else '') + '</div>')
    rows += ('<div style="display:flex;align-items:center;gap:14px;padding:14px 16px;border-radius:20px;background:#f6f5f8">'
             '<div class="av" style="width:58px;height:58px;font-size:24px;background:#e7e5ec;color:#6b6876">✦</div>'
             '<div style="font-weight:800;font-size:18px">Cualquiera</div></div>')
    return (status() + '<div class="apphead"><div><div class="s">Salón Luz · Corte + Barba</div></div></div>'
            '<div style="padding:4px 22px 18px;font-weight:900;font-size:27px;letter-spacing:-0.03em;line-height:1.1">¿Con quién quieres reservar?</div>'
            f'<div style="padding:0 18px">{rows}</div>')

# ───────────── Imágenes ─────────────
def img1():
    ph = foto('duena-unas')
    if ph:
        visual = (f'<div class="photo" style="left:0;top:0;right:0;bottom:0;background-image:url({ph});background-position:center 30%"></div>'
                  '<div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(11,11,20,.92) 0%,rgba(11,11,20,.55) 32%,rgba(11,11,20,.05) 55%,rgba(11,11,20,.75) 100%)"></div>'
                  + phone(screen_agenda(), 600, 560, 0.82, 6))
    else:
        visual = (phone(screen_agenda(), 340, 480, 0.9, -4)
                  + '<div class="card" style="position:absolute;left:70px;top:820px;width:330px;padding:22px 24px;display:flex;gap:14px;align-items:center;transform:rotate(-3deg);z-index:4">'
                  f'<div class="check" style="width:48px;height:48px;flex:none">{CHECK.format(s=26)}</div>'
                  '<div><div style="font-weight:800;font-size:20px;color:#0b0b14">Nueva reserva</div><div style="font-weight:600;font-size:16px;color:#6b6876">Arianna · 17:00</div></div></div>'
                  '<div class="card" style="position:absolute;left:760px;top:640px;width:250px;padding:22px 24px;transform:rotate(4deg);z-index:4">'
                  '<div class="lbl">Hoy</div><div style="font-weight:900;font-size:54px;letter-spacing:-0.04em;color:#0b0b14;line-height:1.1">6 <span style="font-size:24px;font-weight:700;color:#6b6876">citas</span></div>'
                  '<div style="font-weight:700;font-size:15px;color:#16a34a">Agenda llena ✓</div></div>')
    body = (f'<div class="glow" style="left:-160px;top:420px;width:760px;height:760px;background:#f43f5e;opacity:.42"></div>'
            f'<div class="glow" style="left:520px;top:700px;width:700px;height:700px;background:#fb923c;opacity:.38"></div>'
            + visual + brand() +
            '<h1>Tu agenda<br><span class="g">se llena sola</span></h1>'
            '<div style="position:absolute;left:72px;top:385px;z-index:5"><div class="pill grad">Pruébala 5 días gratis</div></div>' + footer())
    return page(body, 'dark')

def img2():
    W = 0.6
    pw, phh = int(420 * W), int(860 * W)
    xs = [60, 414, 768]
    top = 520
    phones = ''.join(phone(s, x, top, W) for s, x in zip([screen_services(), screen_calendar(), screen_confirm()], xs))
    badges = ''.join(
        f'<div style="position:absolute;left:{x + pw // 2 - 34}px;top:{top - 34}px;width:68px;height:68px;border-radius:50%;background:var(--grad);color:#fff;'
        f'display:flex;align-items:center;justify-content:center;font-weight:900;font-size:34px;box-shadow:0 10px 26px rgba(244,63,94,.4);border:5px solid var(--off);z-index:4">{i + 1}</div>'
        for i, x in enumerate(xs))
    arrows = ''.join(
        f'<svg style="position:absolute;left:{x + pw + 8}px;top:{top + phh // 2 - 30}px;z-index:4" width="86" height="60" viewBox="0 0 86 60">'
        '<defs><linearGradient id="ag" x1="0" x2="1"><stop offset="0" stop-color="#f43f5e"/><stop offset="1" stop-color="#fb923c"/></linearGradient></defs>'
        '<path d="M8 30h62M52 12l18 18-18 18" fill="none" stroke="url(#ag)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        for x in xs[:2])
    caps = ''.join(
        f'<div style="position:absolute;left:{x - 20}px;width:{pw + 40}px;top:{top + phh + 34}px;text-align:center;font-weight:800;font-size:28px;letter-spacing:-0.02em">{c}</div>'
        for x, c in zip(xs, ['Elige el servicio', 'Elige la hora', '¡Lista tu cita!']))
    body = (brand(False) + '<h1>Reservar en<br><span class="g">3 toques</span></h1>'
            '<div style="position:absolute;left:72px;top:385px;font-weight:600;font-size:30px;color:#6b6876;z-index:5">Tus clientas reservan solas, sin escribirte.</div>'
            + phones + badges + arrows + caps + footer())
    return page(body, 'light')

def img3():
    ph = foto('barberia')
    if ph:
        bg = (f'<div class="photo" style="inset:0;background-image:url({ph});filter:blur(14px) saturate(1.1);transform:scale(1.08)"></div>'
              '<div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(11,11,20,.9) 0%,rgba(11,11,20,.45) 40%,rgba(11,11,20,.65) 100%)"></div>')
    else:
        bokeh = ''.join(
            f'<div class="glow" style="left:{x}px;top:{y}px;width:{s}px;height:{s}px;background:{c};opacity:{o};filter:blur({b}px)"></div>'
            for x, y, s, c, o, b in [(-80, 300, 420, '#fb923c', .35, 60), (760, 260, 360, '#fde68a', .25, 50), (820, 760, 300, '#f43f5e', .3, 55),
                                     (40, 900, 260, '#fde68a', .22, 45), (420, 180, 220, '#fb923c', .2, 50), (600, 1050, 380, '#fb923c', .25, 70)])
        bg = ('<div style="position:absolute;inset:0;background:radial-gradient(100% 70% at 50% 40%,#2a1a17,#120c10 60%,#08070b)"></div>' + bokeh
              + '<div style="position:absolute;left:0;right:0;top:1090px;bottom:0;background:linear-gradient(180deg,#3b2a20,#1c130f);opacity:.9"></div>')
    body = (bg + brand() + '<h1>Te avisa<br><span class="g">cada reserva</span></h1>'
            + phone(screen_lock(None), 330, 470, 0.98, 0, 'z-index:2')
            + f'<div style="position:absolute;left:60px;right:60px;top:700px;z-index:4;transform:rotate(-2deg)">{notif(True)}</div>'
            + footer())
    return page(body, 'dark')

ICONS = {
    'Reservas 24/7': '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    'Recordatorios': '<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
    'Clientes': '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14a5 5 0 0 1 5.5 5"/>',
    'Ganancias': '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    'Cupones': '<path d="M3 8a2 2 0 0 0 0 4 2 2 0 0 1 0 4v2h18v-2a2 2 0 0 1 0-4 2 2 0 0 0 0-4V6H3z"/><path d="M14 6v12" stroke-dasharray="2 2"/>',
    'Galería': '<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/>',
    'Opiniones': '<path d="M12 3l2.7 5.6 6.1.8-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1L3.2 9.4l6.1-.8z"/>',
    'Tu marca': '<circle cx="12" cy="12" r="9"/><circle cx="8" cy="10" r="1.3"/><circle cx="12" cy="7.5" r="1.3"/><circle cx="16" cy="10" r="1.3"/><path d="M12 21a3 3 0 0 1 0-6h2.5"/>',
}
SUBS = {
    'Reservas 24/7': 'Reservan aunque duermas', 'Recordatorios': 'Por WhatsApp, con un toque', 'Clientes': 'Historial y notas',
    'Ganancias': 'Lo que ganas cada mes', 'Cupones': 'Descuentos para atraer', 'Galería': 'Enseña tus trabajos',
    'Opiniones': 'Estrellas de tus clientas', 'Tu marca': 'Tu nombre, logo y color',
}

def img4():
    cards = ''
    for i, (k, path) in enumerate(ICONS.items()):
        col, row = i % 2, i // 2
        x, y = 72 + col * 478, 470 + row * 186
        cards += (f'<div class="card" style="position:absolute;left:{x}px;top:{y}px;width:458px;height:166px;border-radius:30px;display:flex;align-items:center;gap:24px;padding:0 28px">'
                  '<div style="width:92px;height:92px;border-radius:26px;background:var(--grad);display:flex;align-items:center;justify-content:center;flex:none;box-shadow:0 12px 28px rgba(244,63,94,.3)">'
                  f'<svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">{path}</svg></div>'
                  f'<div><div style="font-weight:800;font-size:31px;letter-spacing:-0.02em">{k}</div>'
                  f'<div style="font-weight:600;font-size:20px;color:#8a8794;margin-top:4px">{SUBS[k]}</div></div></div>')
    body = (brand(False) + '<h1>Todo en<br><span class="g">una sola app</span></h1>' + cards + footer())
    return page(body, 'light')

def img5():
    pros = [('Yanet', 'Peluquera', 'yanet', [('9:00', 'Lianet', 'Corte y peinado', '#f43f5e', 60), ('11:00', 'Rosa', 'Tinte', '#fb923c', 60), ('15:00', 'Mabel', 'Alisado', '#a855f7', 60)]),
            ('Carlos', 'Barbero', 'carlos', [('10:00', 'Andy', 'Corte + Barba', '#14b8a6', 60), ('11:30', 'Yoel', 'Degradado', '#f43f5e', 60), ('16:00', 'Raúl', 'Barba', '#fb923c', 60)]),
            ('Daniela', 'Manicurista', 'daniela', [('9:30', 'Yaima', 'Uñas en gel', '#fb923c', 60), ('12:00', 'Lisandra', 'Acrílico', '#f43f5e', 60), ('14:30', 'Arianna', 'Pedicure', '#a855f7', 60)])]
    W = 0.44
    minis = ''
    for i, (n, r, f, items) in enumerate(pros):
        x = 560 + (i % 2) * 250 if i < 2 else 685
        y = 470 if i < 2 else 860
        ph = foto(f)
        minis += phone(screen_agenda(n, items, f'{r} · 3 citas hoy'), x, y, W, [-4, 4, 0][i])
        minis += (f'<div style="position:absolute;left:{x + 40}px;top:{y - 30}px;display:flex;align-items:center;gap:10px;z-index:4;background:#fff;border-radius:999px;padding:6px 16px 6px 6px;box-shadow:0 10px 30px rgba(0,0,0,.3)">'
                  f'<div class="av" style="width:44px;height:44px;font-size:18px;{f"background-image:url({ph})" if ph else ""}">{"" if ph else n[0]}</div>'
                  f'<div style="color:#0b0b14"><div style="font-weight:800;font-size:17px;line-height:1.1">{n}</div><div style="font-weight:600;font-size:12px;color:#8a8794">{r}</div></div></div>')
    ph = foto('equipo')
    bg = (f'<div class="photo" style="inset:0;background-image:url({ph});filter:blur(10px)"></div><div style="position:absolute;inset:0;background:rgba(11,11,20,.75)"></div>' if ph else '')
    body = (bg + '<div class="glow" style="left:-200px;top:500px;width:800px;height:800px;background:#f43f5e;opacity:.35"></div>'
            '<div class="glow" style="left:500px;top:400px;width:700px;height:700px;background:#fb923c;opacity:.28"></div>'
            + brand() + '<h1>Cada uno con<br><span class="g">su agenda</span></h1>'
            + minis + phone(screen_who(), 70, 470, 0.86, 0, 'z-index:3')
            + '<div style="position:absolute;left:72px;top:1230px;z-index:5"><div class="pill" style="background:rgba(255,255,255,.1);border:1.5px solid rgba(255,255,255,.2);font-size:24px;padding:12px 24px">Plan Equipo</div></div>'
            + footer())
    return page(body, 'dark')

def img6():
    feat_solo = ['Para quien trabaja sola', 'Reservas, recordatorios y más', 'Tu propia app con tu marca']
    feat_eq = ['Todo lo del plan Solo', 'Varios profesionales', 'Cada uno con su agenda']
    def lst(items, col):
        return ''.join(f'<div style="display:flex;gap:12px;align-items:center;margin-top:16px;font-weight:600;font-size:23px;color:{col}">'
                       f'<div class="check" style="width:30px;height:30px;flex:none;background:#22c55e">{CHECK.format(s=18)}</div>{t}</div>' for t in items)
    solo = ('<div class="card" style="position:absolute;left:72px;top:540px;width:458px;height:440px;padding:40px 36px">'
            '<div class="lbl" style="font-size:18px">Solo</div>'
            '<div style="font-weight:900;font-size:76px;letter-spacing:-0.045em;margin-top:14px;line-height:1">1.500</div>'
            '<div style="font-weight:700;font-size:24px;color:#6b6876;margin-top:6px">CUP / mes</div>'
            f'<div style="margin-top:22px">{lst(feat_solo, "#3b3946")}</div></div>')
    equipo = ('<div style="position:absolute;left:550px;top:520px;width:458px;height:480px;padding:4px;border-radius:38px;background:var(--grad);box-shadow:0 30px 70px rgba(244,63,94,.35)">'
              '<div style="width:100%;height:100%;border-radius:34px;background:#fff;padding:40px 36px;position:relative">'
              '<div style="position:absolute;right:26px;top:-22px;background:var(--grad);color:#fff;font-weight:800;font-size:18px;padding:10px 18px;border-radius:999px">Más completo</div>'
              '<div class="lbl" style="font-size:18px;color:#f43f5e">Equipo</div>'
              '<div style="font-weight:900;font-size:76px;letter-spacing:-0.045em;margin-top:14px;line-height:1">3.000</div>'
              '<div style="font-weight:700;font-size:24px;color:#6b6876;margin-top:6px">CUP / mes</div>'
              f'<div style="margin-top:22px">{lst(feat_eq, "#3b3946")}</div></div></div>')
    body = (brand(False) + '<h1 style="font-size:132px"><span class="g">5 días</span><br>gratis</h1>'
            '<div style="position:absolute;left:600px;top:200px;width:410px;font-weight:600;font-size:28px;color:#6b6876;line-height:1.3;z-index:5">Prueba todas las funciones antes de pagar nada.</div>'
            + solo + equipo +
            '<div style="position:absolute;left:0;right:0;top:1050px;text-align:center;font-weight:700;font-size:28px;color:#3b3946">Sin permanencia · Pagas por Transfermóvil</div>'
            '<div style="position:absolute;left:190px;right:190px;top:1120px;height:104px;border-radius:999px;background:var(--grad);color:#fff;display:flex;align-items:center;justify-content:center;'
            'font-weight:900;font-size:44px;letter-spacing:-0.02em;box-shadow:0 20px 50px rgba(244,63,94,.4)">citora-app.com</div>')
    return page(body, 'light')

if __name__ == '__main__':
    for i, fn in enumerate([img1, img2, img3, img4, img5, img6], 1):
        with open(os.path.join(HERE, f'citora-{i}.html'), 'w') as f:
            f.write(fn())
    print('ok')
