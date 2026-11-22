"""Guía visual de Citora para promotoras: 15 páginas 1080x1350 (HTML -> PNG -> PDF).
Uso: python3 guia.py && node capturar_guia.js
"""
import os
from generar import (CSS, CHECK, logo, phone, page, status, screen_hoy, screen_agenda_dia, screen_services,
                     screen_calendar, screen_confirm, screen_who, owner_shell, public_shell, step_title, ic, notif,
                     BR, BR_SOFT, TX, MU, LN, BG, I_HOME, I_CAL, I_USERS, I_STORE, I_GRID, I_SPARK)

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, 'guia')
os.makedirs(OUT, exist_ok=True)
N = 15

GCSS = """
.gh{position:absolute;left:64px;right:64px;top:52px;display:flex;justify-content:space-between;align-items:center;font-weight:800;font-size:24px;z-index:6}
.gh .l{display:flex;align-items:center;gap:12px}
.gh .n{font-weight:700;font-size:20px;padding:8px 16px;border-radius:999px}
.gt{position:absolute;left:64px;right:64px;top:128px;font-weight:900;font-size:74px;line-height:1;letter-spacing:-0.04em;z-index:5}
.gs{position:absolute;left:64px;right:64px;font-weight:500;font-size:29px;line-height:1.35;z-index:5}
.num{width:46px;height:46px;border-radius:50%;background:var(--grad);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:23px;flex:none;box-shadow:0 6px 16px rgba(244,63,94,.35)}
.pt{display:flex;gap:18px;align-items:flex-start;margin-bottom:22px}
.pt b{display:block;font-weight:800;font-size:28px;letter-spacing:-0.01em;line-height:1.2}
.pt span{display:block;font-weight:500;font-size:22px;line-height:1.35;margin-top:4px}
.tile{position:absolute;background:#fff;border-radius:26px;box-shadow:0 18px 44px rgba(20,10,30,.08),0 3px 10px rgba(20,10,30,.04);padding:24px}
.ico{width:66px;height:66px;border-radius:20px;background:var(--grad);display:flex;align-items:center;justify-content:center;flex:none;box-shadow:0 10px 22px rgba(244,63,94,.28)}
.tip{position:absolute;left:64px;right:64px;bottom:96px;border-radius:24px;padding:20px 26px;font-weight:600;font-size:23px;line-height:1.35;display:flex;gap:14px;align-items:flex-start;z-index:5}
"""

def guide_page(n, title, body, dark=False, sub=None, sub_top=None):
    col = '#fff' if dark else TX
    head = (f'<div class="gh" style="color:{col}"><div class="l">{logo(44)}Guía de Citora</div>'
            f'<div class="n" style="background:{"rgba(255,255,255,.12)" if dark else "#fff"};color:{col};{"" if dark else "box-shadow:0 2px 8px rgba(0,0,0,.06)"}">{n} / {N}</div></div>')
    t = f'<div class="gt" style="color:{col}">{title}</div>'
    s = (f'<div class="gs" style="top:{sub_top or 300}px;color:{"rgba(255,255,255,.75)" if dark else MU}">{sub}</div>') if sub else ''
    foot = f'<div class="footer" style="color:{col}">citora-app.com</div>'
    html = page(head + t + s + body + foot, 'dark' if dark else 'light', f'Guía Citora {n}')
    return html.replace('</style>', GCSS + '</style>', 1)

def pts(items, left, top, width, col=TX, mut=MU, start=1, numbered=True):
    rows = ''
    for i, (b, s) in enumerate(items):
        badge = f'<div class="num">{i + start}</div>' if numbered else f'<div class="check" style="width:40px;height:40px;flex:none;margin-top:2px">{CHECK.format(s=22)}</div>'
        rows += f'<div class="pt">{badge}<div><b style="color:{col}">{b}</b>' + (f'<span style="color:{mut}">{s}</span>' if s else '') + '</div></div>'
    return f'<div style="position:absolute;left:{left}px;top:{top}px;width:{width}px;z-index:5">{rows}</div>'

def tip(text, dark=False, emoji='💡'):
    bg = 'rgba(255,255,255,.08);border:1.5px solid rgba(255,255,255,.15);color:#fff' if dark else f'#fff7ed;border:1.5px solid #fed7aa;color:#7c2d12'
    return f'<div class="tip" style="background:{bg}"><span style="font-size:28px">{emoji}</span><div>{text}</div></div>'

def pin(n, x, y):
    return (f'<div style="position:absolute;left:{x - 23}px;top:{y - 23}px;z-index:6;border:4px solid #fff;border-radius:50%;box-shadow:0 6px 18px rgba(0,0,0,.25)">'
            f'<div class="num">{n}</div></div>')

def at(px, py, sx, sy, s):
    """Punto (sx,sy) de la pantalla de un móvil colocado en (px,py) con escala s -> coordenadas de la página"""
    return int(px + (14 + sx) * s), int(py + (14 + sy) * s)

def tool_icon(path, s=36):
    return f'<div class="ico">{ic(path, s, "#fff", 2)}</div>'

IC = {
    'bell': '<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
    'star': '<path d="M12 3l2.7 5.6 6.1.8-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1L3.2 9.4l6.1-.8z"/>',
    'chart': '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    'hourglass': '<path d="M6 3h12M6 21h12M7 3c0 5 10 5 10 9s-10 4-10 9M17 3c0 5-10 5-10 9"/>',
    'gift': '<rect x="3" y="8" width="18" height="13" rx="2"/><path d="M3 12h18M12 8v13M12 8S10 3 7.5 4.5 9 8 12 8zM12 8s2-5 4.5-3.5S15 8 12 8z"/>',
    'ticket': '<path d="M3 8a2 2 0 0 0 0 4 2 2 0 0 1 0 4v2h18v-2a2 2 0 0 1 0-4 2 2 0 0 0 0-4V6H3z"/>',
    'image': '<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/>',
    'receipt': '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
    'download': '<path d="M12 4v11M7 10l5 5 5-5M4 20h16"/>',
    'scissors': '<circle cx="6" cy="7" r="3"/><circle cx="6" cy="17" r="3"/><path d="M8.5 8.5L20 19M8.5 15.5L20 5"/>',
    'clock': '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    'palette': '<circle cx="12" cy="12" r="9"/><circle cx="8" cy="10" r="1.3"/><circle cx="12" cy="7.5" r="1.3"/><circle cx="16" cy="10" r="1.3"/><path d="M12 21a3 3 0 0 1 0-6h2.5"/>',
    'share': '<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.3 11l7.4-3.8M8.3 13l7.4 3.8"/>',
    'eye': '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    'rules': '<path d="M9 5h11M9 12h11M9 19h11"/><path d="M4 5l1 1 2-2M4 12l1 1 2-2M4 19l1 1 2-2"/>',
    'link': '<path d="M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1"/><path d="M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1"/>',
    'phone': '<rect x="7" y="2" width="10" height="20" rx="2.5"/><path d="M11 18h2"/>',
    'card': '<rect x="2" y="5" width="20" height="14" rx="2.5"/><path d="M2 10h20M6 15h4"/>',
    'whats': '<path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1.2-1.2 2 1-.5 1.7c-3.5.5-8-4-7.5-7.5l1.7-.5 1 2z"/>',
}

# ───────────── Pantallas extra ─────────────
def screen_ficha():
    tags = ''.join(f'<span style="display:inline-block;padding:6px 12px;border-radius:999px;border:1.5px solid {BR if t in ("Frecuente", "VIP") else LN};'
                   f'{f"background:{BR_SOFT};color:{BR}" if t in ("Frecuente", "VIP") else f"color:{TX}"};font-weight:700;font-size:13px;margin:0 6px 6px 0">{t}</span>'
                   for t in ['VIP', 'Frecuente', 'Nuevo', 'Puntual', 'Llega tarde', 'No viene'])
    stats = ''.join(f'<div style="flex:1;background:#f1f5f9;border-radius:14px;padding:10px 4px;text-align:center"><div style="font-weight:900;font-size:19px;color:{TX}">{v}</div>'
                    f'<div style="font-weight:600;font-size:11px;color:{MU}">{k}</div></div>'
                    for v, k in [('9', 'Visitas'), ('8.400 CUP', 'Gastado'), ('0', 'Sin venir')])
    hist = ''.join(f'<div style="display:flex;justify-content:space-between;padding:10px 12px;border:1px solid {LN};border-radius:12px;margin-bottom:7px;background:#fff">'
                   f'<div><div style="font-weight:800;font-size:13px;color:{TX}">{d}</div><div style="font-weight:600;font-size:12px;color:{MU}">{s}</div></div>'
                   f'<span style="align-self:center;font-weight:800;font-size:11px;color:#15803d;background:#dcfce7;padding:3px 9px;border-radius:999px">● Vino</span></div>'
                   for d, s in [('Jue 20 nov · 10:00 a.m.', 'Uñas acrílicas · 1.000 CUP'), ('Jue 6 nov · 2:00 p.m.', 'Uñas en gel · 800 CUP')])
    content = (f'<div style="position:absolute;inset:0;background:rgba(15,23,42,.35)"></div>'
               f'<div style="position:absolute;left:0;right:0;top:92px;bottom:0;background:#fff;border-radius:26px 26px 0 0;padding:16px 18px">'
               f'<div style="width:40px;height:5px;border-radius:3px;background:#e2e8f0;margin:0 auto 12px"></div>'
               f'<div style="font-weight:900;font-size:22px;color:{TX}">Yaima</div>'
               f'<div style="display:flex;gap:8px;align-items:center;margin-top:12px"><span style="font-weight:700;font-size:15px;color:{TX}">+53 5•••••••</span>'
               f'<span style="background:#22c55e;color:#fff;font-weight:800;font-size:13px;padding:7px 12px;border-radius:10px">WhatsApp</span>'
               f'<span style="border:1.5px solid {LN};font-weight:700;font-size:13px;padding:6px 10px;border-radius:10px;color:{TX}">Invitar a volver</span></div>'
               f'<div style="display:flex;gap:8px;margin-top:14px">{stats}</div>'
               f'<div style="font-weight:800;font-size:15px;color:{TX};margin:16px 0 8px">Etiquetas</div><div>{tags}</div>'
               f'<div style="font-weight:800;font-size:15px;color:{TX};margin:10px 0 8px">Notas privadas</div>'
               f'<div style="border:1.5px solid {LN};border-radius:12px;padding:10px;font-weight:500;font-size:13px;color:{TX}">Le gusta el rosado nude. Alérgica al monómero fuerte.</div>'
               f'<div style="font-weight:800;font-size:15px;color:{TX};margin:14px 0 8px">Historial</div>{hist}</div>')
    return f'<div style="position:absolute;inset:0;background:{BG}"></div>{status()}{content}'

def screen_cita_cliente():
    rows = ''.join(f'<div style="display:flex;justify-content:space-between;padding:9px 0;border-top:1px solid {LN};font-size:14px">'
                   f'<span style="color:{MU};font-weight:600">{k}</span><b style="color:{TX}">{v}</b></div>'
                   for k, v in [('Servicio', 'Uñas acrílicas'), ('Día y hora', 'Vie 28 · 2:00 p.m.'), ('Total', '1.000 CUP')])
    btn = lambda t, st: f'<div style="height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:15px;margin-top:10px;{st}">{t}</div>'
    content = (step_title('Tu cita')
               + f'<div style="margin:0 16px;border-radius:18px;background:#fff;border:1px solid {LN};padding:14px 16px 6px">'
               f'<div style="display:flex;align-items:center;gap:8px;font-weight:800;font-size:14px;color:#15803d;padding-bottom:10px"><span style="width:10px;height:10px;border-radius:5px;background:#22c55e;display:inline-block"></span>Confirmada</div>{rows}</div>'
               f'<div style="padding:4px 16px">'
               + btn('Avisar por WhatsApp', 'background:#25d366;color:#fff')
               + btn('Editar cita', f'background:#fff;border:1.5px solid {LN};color:{TX}')
               + btn('Cancelar cita', f'background:#fff;border:1.5px solid #fecaca;color:#dc2626')
               + btn('Mis citas', f'background:{BR_SOFT};color:{BR}') + '</div>')
    return public_shell(content)

def card_list(title, color, rows, left, top, width, icon):
    items = ''.join(
        f'<div style="display:flex;align-items:center;gap:14px;padding:14px 16px;border-radius:16px;border:1px solid {LN};margin-top:10px">'
        f'<div style="flex:1"><div style="font-weight:800;font-size:22px;color:{TX}">{a}</div><div style="font-weight:600;font-size:17px;color:{MU}">{b}</div></div>'
        f'<div style="background:{c};color:#fff;font-weight:800;font-size:16px;padding:9px 14px;border-radius:12px">{btn}</div></div>'
        for a, b, btn, c in rows)
    return (f'<div class="tile" style="left:{left}px;top:{top}px;width:{width}px">'
            f'<div style="display:flex;align-items:center;gap:14px">{tool_icon(icon, 32)}<div style="font-weight:900;font-size:30px;color:{TX}">{title}</div></div>{items}</div>')

# ───────────── Páginas ─────────────
def p1():
    body = (f'<div class="glow" style="left:-200px;top:520px;width:800px;height:800px;background:#f43f5e;opacity:.38"></div>'
            f'<div class="glow" style="left:520px;top:700px;width:700px;height:700px;background:#fb923c;opacity:.34"></div>'
            '<div style="position:absolute;left:64px;top:380px;display:flex;flex-wrap:wrap;gap:10px;width:520px;z-index:5">'
            + ''.join(f'<span class="pill" style="background:rgba(255,255,255,.1);border:1.5px solid rgba(255,255,255,.18);font-size:22px;padding:10px 18px">{t}</span>'
                      for t in ['💅 Uñas', '💇‍♀️ Peluquerías', '💈 Barberías', '👁️ Pestañas', '🧖‍♀️ Spa'])
            + '</div>'
            + pts([('Qué es Citora', ''), ('Cómo la crea el salón', ''), ('Cómo reservan las clientas', ''), ('Todo lo que trae el panel', ''), ('Precios y preguntas', '')], 64, 620, 470, '#fff', '#fff')
            + phone(screen_hoy(), 560, 520, 0.86, 5))
    return guide_page(1, 'Cómo funciona<br><span class="g">Citora</span>', body, True, 'Guía fácil para explicarla a los salones.', 300)

def p2():
    s = 0.56
    body = ('<div style="position:absolute;left:64px;right:64px;top:300px;font-weight:800;font-size:38px;line-height:1.25;letter-spacing:-0.02em;z-index:5">'
            '«Una app de reservas para tu salón: <span class="g">tus clientas reservan solas</span> desde un enlace y <span class="g">tú lo ves todo en el móvil</span>.»</div>'
            + phone(screen_services(), 100, 560, s) + phone(screen_hoy(), 740, 560, s)
            + '<div style="position:absolute;left:400px;top:700px;width:310px;text-align:center;z-index:5">'
            '<svg width="250" height="70" viewBox="0 0 250 70"><defs><linearGradient id="ar" x1="0" x2="1"><stop offset="0" stop-color="#f43f5e"/><stop offset="1" stop-color="#fb923c"/></linearGradient></defs>'
            '<path d="M10 35h215M200 12l25 23-25 23" fill="none" stroke="url(#ar)" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/></svg>'
            '<div style="font-weight:800;font-size:26px;margin-top:10px">Reserva → aviso</div>'
            f'<div style="font-weight:500;font-size:20px;color:{MU};margin-top:6px">La cita entra sola en la agenda del salón y le llega un aviso.</div></div>'
            + f'<div style="position:absolute;left:40px;width:350px;top:1080px;text-align:center"><div style="font-weight:900;font-size:30px">La clienta</div><div style="font-weight:500;font-size:21px;color:{MU}">Ve la página del salón y reserva</div></div>'
            + f'<div style="position:absolute;left:690px;width:350px;top:1080px;text-align:center"><div style="font-weight:900;font-size:30px">El salón</div><div style="font-weight:500;font-size:21px;color:{MU}">Lo gestiona todo en su panel</div></div>')
    return guide_page(2, 'Citora tiene <span class="g">dos partes</span>', body)

def p3():
    body = (pts([('Entra en citora-app.com', 'Toca «Crear mi app».'),
                 ('Elige su tipo de negocio', 'Uñas, peluquería, barbería, pestañas, spa…'),
                 ('Pone nombre, enlace y color', 'Así queda su app con su marca.'),
                 ('Revisa servicios y precios', 'Ya vienen puestos según el negocio: solo ajusta lo suyo.'),
                 ('Pone su horario', 'Los días y horas que trabaja.'),
                 ('Crea su cuenta… ¡y lista!', 'Empieza la prueba de 5 días con todo incluido.')], 64, 300, 952)
            + tip('Servicios y horario se pueden <b>saltar</b> y ponerlos después. Al terminar, la app le ofrece un <b>tutorial paso a paso</b> con citas de ejemplo.'))
    return guide_page(3, 'El salón crea su app<br><span class="g">en 5 minutos</span>', body)

def p4():
    link = (f'<div class="tile" style="left:64px;right:64px;top:310px;display:flex;align-items:center;gap:20px;padding:30px">{tool_icon(IC["link"], 34)}'
            f'<div><div style="font-weight:600;font-size:22px;color:{MU}">Su enlace propio</div><div style="font-weight:900;font-size:44px;letter-spacing:-0.02em">citora-app.com/<span class="g">daniela-nails</span></div></div></div>')
    places = [('whats', 'Estado de WhatsApp', 'Con «Publicar huecos» la app escribe el mensaje con las horas libres del día.'),
              ('share', 'Bio de Instagram y Facebook', 'Las clientas tocan el enlace y reservan desde ahí.'),
              ('phone', 'Se instala como app', 'Con su nombre y su logo en el móvil, sin tiendas de apps.')]
    tiles = ''.join(
        f'<div class="tile" style="left:64px;right:64px;top:{520 + i * 200}px;display:flex;gap:22px;align-items:center;padding:26px 30px">{tool_icon(IC[k])}'
        f'<div><div style="font-weight:800;font-size:30px">{t}</div><div style="font-weight:500;font-size:22px;color:{MU};margin-top:4px">{d}</div></div></div>'
        for i, (k, t, d) in enumerate(places))
    return guide_page(4, 'Comparte su enlace<br><span class="g">y a reservar</span>', link + tiles)

def p5():
    s = 0.44
    xs = [50, 300, 550, 800]
    scr = [screen_services(), screen_who(), screen_calendar(), screen_confirm()]
    caps = ['Elige el servicio', 'Con quién*', 'Día y hora', '¡Reserva hecha!']
    phones = ''.join(phone(sc, x, 420, s) for sc, x in zip(scr, xs))
    nums = ''.join(f'<div style="position:absolute;left:{x + 92 - 23}px;top:392px;z-index:6;border:4px solid var(--off);border-radius:50%"><div class="num">{i + 1}</div></div>' for i, x in enumerate(xs))
    cp = ''.join(f'<div style="position:absolute;left:{x - 10}px;width:{int(420 * s) + 20}px;top:{420 + int(860 * s) + 18}px;text-align:center;font-weight:800;font-size:23px">{c}</div>' for x, c in zip(xs, caps))
    body = (phones + nums + cp
            + pts([('No instala nada ni crea cuenta', 'Solo pone su nombre y su teléfono.'),
                   ('Solo ve las horas libres', 'Imposible que dos clientas cojan la misma hora.')], 64, 880, 952, numbered=False)
            + f'<div style="position:absolute;left:64px;top:1180px;font-weight:500;font-size:20px;color:{MU}">* «¿Con quién?» solo sale si el salón tiene equipo y ese servicio lo hacen dos o más personas.</div>')
    return guide_page(5, 'Así reserva<br><span class="g">la clienta</span>', body, sub='Desde el enlace del salón, en un minuto:', sub_top=316)

def p6():
    body = (phone(screen_cita_cliente(), 600, 300, 0.92)
            + pts([('Ve su cita en una página privada', 'Con el día, la hora y el total.'),
                   ('Avisa al salón por WhatsApp', 'Con un toque, el mensaje ya va escrito.'),
                   ('Cambia la fecha o cancela', 'Así el hueco se libera solo.'),
                   ('Deja su opinión después', 'Con estrellas, que salen en la página.'),
                   ('«Mis citas»', 'Su historial y cuántas veces ha venido.')], 64, 320, 510)
            + tip('Si el día está lleno, la clienta se apunta a la <b>lista de espera</b>. Y si el salón tiene un <b>cupón</b>, lo pone al reservar.'))
    return guide_page(6, 'Después<br><span class="g">de reservar</span>', body)

def p7():
    px, py, s = 470, 290, 0.92
    body = (phone(screen_hoy(), px, py, s)
            + pin(1, *at(px, py, -22, 168, s)) + pin(2, *at(px, py, 414, 178, s)) + pin(3, *at(px, py, -22, 232, s))
            + pin(4, *at(px, py, 414, 700, s)) + pin(5, *at(px, py, 196, 858, s))
            + pts([('Hoy y Mañana', 'Las citas del día, por horas.'),
                   ('Publicar huecos', 'Arma un mensaje con las horas libres para el estado.'),
                   ('Citas y huecos libres', 'Cuántas citas hay y cuántos huecos quedan.'),
                   ('Botón +', 'Apuntar una cita a mano (si la clienta llama).'),
                   ('Menú de abajo', 'Hoy · Agenda · Clientes · Mi negocio · Más.')], 64, 320, 380))
    return guide_page(7, 'El panel:<br><span class="g">«Hoy»</span>', body)

def p8():
    items = [('9:00', 'Daniela', 'Uñas acrílicas'), ('10:30', 'Yaima', 'Pedicure spa'), ('12:00', 'Lisandra', 'Manicure + diseño'), ('2:00', 'Yanelis', 'Uñas en gel'), ('4:00', 'Arianna', 'Uñas acrílicas')]
    body = (phone(screen_agenda_dia('Daniela Nails', 'Código DNL-2847', items, '4.400'), 560, 300, 0.92)
            + pts([('Día, semana y mes', 'Para ver toda la agenda de un vistazo.'),
                   ('Cada cita, con un toque', 'Confirmar, marcar si vino o no vino, cancelar o escribirle por WhatsApp.'),
                   ('+ Cita', 'Para apuntar citas de quien llama o escribe.'),
                   ('Aviso en el móvil', 'Cada reserva nueva le llega al momento.')], 64, 320, 470)
            + f'<div style="position:absolute;left:64px;top:900px;width:470px;z-index:5">{notif()}</div>')
    return guide_page(8, 'La <span class="g">agenda</span>', body)

def p9():
    body = (phone(screen_ficha(), 580, 290, 0.92)
            + pts([('Ficha de cada clienta', 'Visitas, lo que ha gastado y las veces que no vino.'),
                   ('Etiquetas', 'VIP, Frecuente, Puntual, Llega tarde…'),
                   ('Notas privadas', 'Gustos, alergias… solo las ve el salón.'),
                   ('Historial', 'Todas sus citas anteriores.'),
                   ('Invitar a volver', 'Un WhatsApp listo para las que hace tiempo no vienen.')], 64, 300, 490))
    return guide_page(9, 'Sus <span class="g">clientas</span>', body)

def p10():
    body = (card_list('Recordatorios', '', [('Yanelis · 2:00 p.m.', 'Uñas en gel', 'WhatsApp', '#25d366'),
                                            ('Yaima · 10:30 a.m.', 'Pedicure spa', 'WhatsApp', '#25d366')], 64, 300, 952, IC['bell'])
            + f'<div style="position:absolute;left:64px;right:64px;top:600px;font-weight:500;font-size:23px;color:{MU}">La víspera, la app enseña las citas de mañana con el mensaje de WhatsApp <b style="color:{TX}">ya escrito</b>. Un toque y enviado: menos clientas que no vienen.</div>'
            + card_list('Lista de espera', '', [('Lisandra · sábado', 'Quiere un hueco si se libera', 'Avisar', BR)], 64, 720, 952, IC['hourglass'])
            + f'<div style="position:absolute;left:64px;right:64px;top:940px;font-weight:500;font-size:23px;color:{MU}">Cuando el día está lleno, las clientas se apuntan. Si alguien cancela, el salón ve a quién avisar y le escribe con un toque.</div>'
            + tip('Las dos herramientas vienen <b>incluidas</b> en la prueba gratis y en los dos planes.'))
    return guide_page(10, 'Que <span class="g">no falten</span><br>a sus citas', body)

def p11():
    items = [('scissors', 'Servicios y precios', 'Nombre, duración y precio en CUP.'),
             ('clock', 'Horario', 'Turnos por día y días cerrados.'),
             ('palette', 'Apariencia', 'Color, logo, foto de portada, letra y botones.'),
             ('share', 'Redes', 'Instagram, Facebook, TikTok y Google Maps.'),
             ('eye', 'Qué se muestra', 'Precios, duraciones, horario, galería, opiniones.'),
             ('rules', 'Reglas', 'Políticas y normas de su salón.')]
    tiles = ''.join(
        f'<div class="tile" style="left:{64 + (i % 2) * 486}px;top:{320 + (i // 2) * 250}px;width:466px;height:228px">'
        f'{tool_icon(IC[k])}<div style="font-weight:800;font-size:28px;margin-top:16px">{t}</div><div style="font-weight:500;font-size:21px;color:{MU};margin-top:4px">{d}</div></div>'
        for i, (k, t, d) in enumerate(items))
    return guide_page(11, '«Mi negocio»:<br><span class="g">la hace suya</span>', tiles + tip('Todo con <b>vista previa en vivo</b>: ve cómo queda su página antes de guardar.'))

def p12():
    tools = [('bell', 'Recordatorios', 'WhatsApp a las clientas de mañana'), ('star', 'Opiniones', 'Lo que dicen (ocultar o responder)'),
             ('chart', 'Estadísticas', 'Ingresos, asistencia, lo más pedido'), ('hourglass', 'Lista de espera', 'Quién quiere un hueco'),
             ('gift', 'Cupones', 'Códigos de descuento'), ('ticket', 'Bonos', 'Paquetes de sesiones pagados por adelantado'),
             ('image', 'Galería', 'Fotos de sus trabajos'), ('receipt', 'Gastos', 'Lo que gana de verdad'),
             ('download', 'Respaldo', 'Citas y clientas en Excel')]
    tiles = ''.join(
        f'<div class="tile" style="left:{64 + (i % 3) * 322}px;top:{300 + (i // 3) * 262}px;width:306px;height:244px;padding:22px">'
        f'{tool_icon(IC[k], 32)}<div style="font-weight:800;font-size:25px;margin-top:14px">{t}</div><div style="font-weight:500;font-size:18px;color:{MU};margin-top:4px;line-height:1.3">{d}</div></div>'
        for i, (k, t, d) in enumerate(tools))
    return guide_page(12, 'Herramientas<br><span class="g">en «Más»</span>', tiles + tip('Al empezar salen 3 activas. Las demás se activan con un toque. <b>Todas van incluidas</b>, sin pagar extra.'))

def p13():
    body = (phone(screen_who(), 600, 290, 0.92)
            + pts([('Cada profesional, su agenda', 'Y sus propios servicios y especialidad.'),
                   ('La clienta elige con quién', 'O «Cualquiera», y la atiende quien esté libre.'),
                   ('Enlace privado para cada una', 'Pone sus servicios, precios y horario sin crear cuenta.'),
                   ('El dueño lo controla', 'Le avisa si alguien cambia un precio y puede anular el enlace.')], 64, 320, 500))
    return guide_page(13, 'Plan <span class="g">Equipo</span>', body, sub='Para salones con varias profesionales.', sub_top=230)

def p14():
    def plan(x, y, w, h, name, price, lines, hi=False):
        inner = (f'<div class="lbl" style="font-size:18px;{"color:#f43f5e" if hi else ""}">{name}</div>'
                 f'<div style="font-weight:900;font-size:68px;letter-spacing:-0.045em;margin-top:10px;line-height:1">{price}</div>'
                 f'<div style="font-weight:700;font-size:22px;color:{MU};margin-top:4px">CUP / mes</div>'
                 + ''.join(f'<div style="display:flex;gap:10px;align-items:center;margin-top:14px;font-weight:600;font-size:21px;color:#3b3946">'
                           f'<div class="check" style="width:28px;height:28px;flex:none">{CHECK.format(s=16)}</div>{t}</div>' for t in lines))
        if hi:
            return (f'<div style="position:absolute;left:{x}px;top:{y}px;width:{w}px;height:{h}px;padding:4px;border-radius:34px;background:var(--grad)">'
                    f'<div style="width:100%;height:100%;border-radius:30px;background:#fff;padding:30px">{inner}</div></div>')
        return f'<div class="tile" style="left:{x}px;top:{y}px;width:{w}px;height:{h}px;padding:34px">{inner}</div>'
    steps = pts([('Más → Mensualidad', 'Elige plan y meses; ve la tarjeta y el importe.'),
                 ('Paga por Transfermóvil', 'Y envía el comprobante por WhatsApp con un toque.'),
                 ('Se activa al confirmarse', 'Si le quedaban meses, se suman al final.')], 64, 820, 952)
    body = (f'<div class="tile" style="left:64px;right:64px;top:290px;display:flex;align-items:center;gap:20px;padding:22px 28px">'
            f'<div style="font-weight:900;font-size:46px" class="g">5 días gratis</div><div style="font-weight:600;font-size:22px;color:{MU}">con todas las funciones, sin pagar nada</div></div>'
            + plan(64, 440, 466, 340, 'Solo', '1.500', ['Para quien trabaja sola', 'Todo menos el equipo'])
            + plan(550, 440, 466, 340, 'Equipo', '3.000', ['Varias profesionales', 'Todo incluido'], True)
            + steps
            + tip('Si no paga, su página se pausa (las clientas ven que no recibe reservas). <b>No se borra nada</b>: al pagar sigue igual.'))
    return guide_page(14, 'Precios <span class="g">y pago</span>', body)

def p15():
    faq = [('¿Las clientas tienen que instalar algo?', 'No. Entran al enlace y reservan. Ni cuenta ni contraseña.'),
           ('¿Puedo probarla sin pagar?', 'Sí: 5 días gratis con todo incluido.'),
           ('¿Y si no me convence?', 'No pagas y ya. No hay permanencia.'),
           ('¿Puedo seguir apuntando citas a mano?', 'Sí, con el botón «+» o «+ Cita».'),
           ('¿Mis precios y servicios los pongo yo?', 'Sí. Vienen ejemplos puestos y los cambias cuando quieras.'),
           ('¿Cómo empiezo?', 'En citora-app.com, botón «Crear mi app».')]
    rows = ''.join(f'<div class="tile" style="left:64px;right:64px;top:{290 + i * 158}px;padding:20px 28px">'
                   f'<div style="font-weight:800;font-size:27px">{q}</div><div style="font-weight:500;font-size:22px;color:{MU};margin-top:6px">{a}</div></div>'
                   for i, (q, a) in enumerate(faq))
    return guide_page(15, 'Preguntas <span class="g">que te harán</span>', rows)

if __name__ == '__main__':
    for i, fn in enumerate([p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15], 1):
        with open(os.path.join(OUT, f'guia-{i:02d}.html'), 'w') as f:
            f.write(fn().replace('url(fonts/', 'url(../fonts/').replace("url('fotos/", "url('../fotos/").replace('url(fotos/', 'url(../fotos/'))
    print('ok')
