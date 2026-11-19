import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { BEATS as B } from './timing';
import { C, Card, Chip, FONT_BODY, FONT_HEAD, FONT_MONO, Headline, Label, Buddy, Logo, ramp, useSpringAt, useT } from './ui';

/* ───────────── 1 · GANCHO ───────────── */
const ROLES = [
  { at: B.manicurista, word: 'MANICURISTA', label: 'Manicurista', service: 'Uñas acrílicas', price: '1.000 CUP', icon: '💅' },
  { at: B.peluquera, word: 'PELUQUERA', label: 'Peluquera', service: 'Corte y peinado', price: '800 CUP', icon: '💇‍♀️' },
  { at: B.lashista, word: 'LASHISTA', label: 'Lashista', service: 'Pestañas pelo a pelo', price: '1.500 CUP', icon: '✨' },
];

const RollingWord: React.FC = () => {
  const t = useT();
  // índice actual + progreso de transición
  let idx = 0;
  ROLES.forEach((r, i) => { if (t >= r.at) idx = i; });
  const r = ROLES[idx];
  const p = ramp(t, r.at, r.at + 0.18);
  const visible = t >= ROLES[0].at - 0.05;
  return (
    <span style={{ display: 'block', height: 140, overflow: 'hidden', color: C.coral }}>
      {visible && (
        <span style={{ display: 'block', transform: `translateY(${(1 - p) * 120}px)`, filter: `blur(${(1 - p) * 18}px)`, opacity: Math.min(1, p * 1.5) }}>
          {r.word}
        </span>
      )}
    </span>
  );
};

export const Hook: React.FC = () => {
  const t = useT();
  const top = ramp(t, 0.05, 0.35);
  const cuba = ramp(t, B.cuba, B.cuba + 0.3);
  const punch = 1 + 0.04 * Math.sin(Math.min(1, Math.max(0, (t - 3.85) / 0.3)) * Math.PI);
  return (
    <div style={{ position: 'absolute', inset: 0, transform: `scale(${punch})` }}>
      <div style={{ position: 'absolute', left: 96, top: 230, fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 150, lineHeight: 0.92, textTransform: 'uppercase' }}>
        <span style={{ display: 'block', color: C.cream, opacity: top, transform: `translateY(${(1 - top) * 50}px)`, filter: `blur(${(1 - top) * 12}px)` }}>Si eres</span>
        <RollingWord />
        <span style={{ display: 'block', color: C.cream, opacity: cuba, transform: `translateY(${(1 - cuba) * 50}px)`, filter: `blur(${(1 - cuba) * 12}px)` }}>en Cuba</span>
      </div>

      {ROLES.map((r, i) => <RoleCard key={r.word} i={i} {...r} />)}

      <div style={{ position: 'absolute', left: 96, top: 1250, opacity: cuba, transform: `translateY(${(1 - cuba) * 30}px)` }}>
        <Chip bg={C.green}>🇨🇺 Hecha para Cuba</Chip>
      </div>
    </div>
  );
};

const RoleCard: React.FC<{ i: number; at: number; label: string; service: string; price: string; icon: string }> = ({ i, at, label, service, price, icon }) => {
  const t = useT();
  const p = useSpringAt(at - 0.05);
  const next = ROLES[i + 1]?.at ?? 99;
  const active = t >= at && t < next;
  const x = 96 + i * 290;
  const rot = [-7, 0, 7][i];
  return (
    <Card glow={active} style={{
      left: x, top: 720 + (i === 1 ? -20 : 10), width: 300, height: 420,
      transform: `translateY(${(1 - p) * 260}px) rotate(${rot * p}deg) scale(${0.85 + 0.15 * p + (active ? 0.04 : 0)})`,
      opacity: Math.min(1, p * 1.4), padding: 30,
    }}>
      <Label color={active ? C.coral : C.muted} size={24}>{label}</Label>
      <div style={{ fontSize: 110, marginTop: 30 }}>{icon}</div>
      <div style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: 32, color: C.cream, marginTop: 26, lineHeight: 1.15 }}>{service}</div>
      <div style={{ fontFamily: FONT_MONO, fontSize: 28, color: active ? C.coralSoft : C.muted, marginTop: 14 }}>{price}</div>
    </Card>
  );
};

/* ───────────── 2 · EL DOLOR ───────────── */
const MSGS = ['¿Tienes turno hoy?', '¿Y mañana?', '¿A qué hora te queda?', '¿Tienes turno el sábado?', '¿Cuánto es?', 'Holaaa 👋'];

export const Pain: React.FC = () => {
  const t = useT();
  const frame = useCurrentFrame();
  const swap = t >= B.plantada - 0.45;
  // Chat → se va a la izquierda cuando entra la libreta
  const out = ramp(t, B.libreta - 0.4, B.libreta - 0.05, 0, 1, Easing.in(Easing.cubic));
  const count = Math.round(interpolate(t, [B.turno - 0.4, B.libreta - 0.4], [3, 47], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.quad) }));
  const shake = t > B.turno && t < B.libreta - 0.4 ? Math.sin(frame * 2.1) * 2.5 : 0;

  return (
    <>
      {!swap ? (
        <Headline light at={4.4} top="Todo el día" bottom="Contestando" />
      ) : (
        <Headline light at={B.plantada - 0.45} top="Y aun así" bottom="te plantan" />
      )}

      {/* Tarjeta del chat */}
      <Card style={{
        left: 96, top: 640, width: 888, height: 640, padding: 40,
        transform: `translateX(${-out * 1100}px) rotate(${shake * 0.2}deg)`, filter: `blur(${out * 30}px)`,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Label>WhatsApp · Hoy</Label>
          <Label color={C.green}>● En línea</Label>
        </div>
        <div style={{ display: 'flex', gap: 40, marginTop: 30 }}>
          <div style={{ width: 300 }}>
            <div style={{ fontFamily: FONT_BODY, fontWeight: 800, fontSize: 200, color: C.coral, lineHeight: 1, letterSpacing: '-0.04em', transform: `translateX(${shake}px)` }}>{count}</div>
            <Label size={26} style={{ marginTop: 8 }}>Mensajes sin leer</Label>
            <div style={{ marginTop: 40 }}><Chip bg={C.red} color="#fff">⏱ 3 h al día</Chip></div>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {MSGS.map((m, i) => {
              const at = B.turno - 0.2 + i * 0.28;
              const p = ramp(t, at, at + 0.22);
              return (
                <div key={m} style={{
                  background: 'rgba(255,255,255,0.06)', border: `1.5px solid ${C.cardLine}`, borderRadius: 18, padding: '16px 22px',
                  fontFamily: FONT_BODY, fontWeight: 600, fontSize: 30, color: C.cream, opacity: p, transform: `translateY(${(1 - p) * 30}px) scale(${0.9 + 0.1 * p})`,
                  display: 'flex', alignItems: 'center', gap: 12,
                }}>
                  <span style={{ width: 12, height: 12, borderRadius: 6, background: i < 2 ? C.coral : C.muted }} />{m}
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      <Libreta />
      <Plantada />
    </>
  );
};

const NOTES = [
  { h: '9:00', n: 'Daniela — uñas' },
  { h: '10:30', n: 'Yaima — ¿o era 11?' },
  { h: '12:00', n: 'la prima de Yaima' },
  { h: '14:00', n: 'Yanelis — acrílico' },
  { h: '16:00', n: '¿¿Mileidys??' },
];

const Libreta: React.FC = () => {
  const t = useT();
  const p = ramp(t, B.libreta - 0.3, B.libreta + 0.1);
  const out = ramp(t, B.plantada - 0.5, B.plantada - 0.1, 0, 1, Easing.in(Easing.cubic));
  if (p <= 0) return null;
  return (
    <div style={{
      position: 'absolute', left: 96, top: 640, width: 888, height: 640, borderRadius: 30,
      background: '#fffdf6', boxShadow: '0 30px 80px rgba(0,0,0,0.25)', padding: '44px 56px', overflow: 'hidden',
      backgroundImage: 'repeating-linear-gradient(#fffdf6 0 84px, #c9d8ee 84px 87px)', backgroundPositionY: 60,
      transform: `translateX(${(1 - p) * 1100 - out * 0}px) translateY(${out * 700}px) rotate(${-2 + out * 8}deg)`,
      filter: `blur(${(1 - p) * 30 + out * 20}px)`, opacity: 1 - out,
    }}>
      <div style={{ position: 'absolute', left: 120, top: 0, bottom: 0, width: 3, background: '#f2a3a3' }} />
      <Label color="#a2988a" style={{ marginLeft: 90 }}>Libreta · jueves</Label>
      {NOTES.map((n, i) => {
        const at = B.libreta + i * 0.18;
        const w = ramp(t, at, at + 0.3, 0, 100);
        const strike = i === 1 || i === 4 ? ramp(t, at + 0.4, at + 0.6, 0, 100) : 0;
        return (
          <div key={n.h} style={{ position: 'relative', marginLeft: 90, marginTop: i === 0 ? 30 : 6, height: 81, display: 'flex', alignItems: 'flex-end', paddingBottom: 6 }}>
            <div style={{ clipPath: `inset(0 ${100 - w}% 0 0)`, fontFamily: '"Comic Neue", "Segoe Print", cursive', fontStyle: 'italic', fontWeight: 600, fontSize: 46, color: '#24324f', whiteSpace: 'nowrap' }}>
              <b style={{ fontStyle: 'normal', fontFamily: FONT_MONO, fontSize: 34, color: '#7a6a5a', marginRight: 22 }}>{n.h}</b>{n.n}
            </div>
            {strike > 0 && <div style={{ position: 'absolute', left: 0, top: 46, height: 5, width: `${strike * 0.85}%`, background: C.red, borderRadius: 3, transform: 'rotate(-1.5deg)' }} />}
          </div>
        );
      })}
    </div>
  );
};

const Plantada: React.FC = () => {
  const t = useT();
  const p = useSpringAt(B.plantada - 0.25, { damping: 16 });
  const stamp = useSpringAt(B.plantada + 0.25, { damping: 10, stiffness: 260 });
  if (t < B.plantada - 0.3) return null;
  return (
    <Card style={{ left: 96, top: 700, width: 888, height: 520, padding: 44, transform: `translateY(${(1 - p) * 600}px)`, opacity: Math.min(1, p * 1.3) }}>
      <Label>Sábado · 14:00</Label>
      <div style={{ fontFamily: FONT_BODY, fontWeight: 800, fontSize: 92, color: C.cream, marginTop: 24, letterSpacing: '-0.02em' }}>Yanelis</div>
      <div style={{ fontFamily: FONT_BODY, fontWeight: 500, fontSize: 38, color: C.muted, marginTop: 6 }}>Uñas acrílicas · 1.000 CUP</div>
      <div style={{ display: 'flex', gap: 20, marginTop: 50 }}>
        <Chip bg="rgba(255,255,255,0.08)" color={C.muted}>⏳ Esperando…</Chip>
        <Chip bg="rgba(255,255,255,0.08)" color={C.muted}>2 h perdidas</Chip>
      </div>
      <div style={{
        position: 'absolute', right: 44, top: 48, border: `7px solid ${C.red}`, color: C.red, borderRadius: 18, padding: '6px 22px',
        fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 78, background: 'rgba(255,59,48,0.08)', transform: `rotate(-12deg) scale(${3 - 2 * stamp})`, opacity: Math.min(1, stamp * 2),
      }}>NO VINO</div>
    </Card>
  );
};

/* ───────────── 3 · LA SOLUCIÓN ───────────── */
const SLOTS = [
  { h: '9:00', busy: true }, { h: '10:30', busy: false }, { h: '12:00', busy: true },
  { h: '14:00', busy: false }, { h: '15:30', busy: false }, { h: '17:00', busy: true },
];

export const Solution: React.FC = () => {
  const t = useT();
  const phone = useSpringAt(11.2, { damping: 15 });
  const logo = useSpringAt(B.citora - 0.1, { damping: 9, stiffness: 220 });
  const tap = ramp(t, B.reservan, B.reservan + 0.35);
  const booked = useSpringAt(B.reservan + 0.6, { damping: 12 });
  const sin = useSpringAt(B.sinEscribirte, { damping: 9, stiffness: 220 });

  return (
    <>
      <div style={{ position: 'absolute', left: 96, top: 230, fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 150, lineHeight: 0.92, textTransform: 'uppercase' }}>
        <span style={{ display: 'block', color: C.cream, opacity: ramp(t, 10.8, 11.1), filter: `blur(${(1 - ramp(t, 10.8, 11.1)) * 12}px)` }}>Por eso creé</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 28, color: C.coral }}>
          <span style={{ display: 'inline-block', transform: `scale(${logo})`, opacity: Math.min(1, logo * 2) }}>Citora</span>
          <span style={{ display: 'inline-block', transform: `scale(${logo}) rotate(${(1 - logo) * -90}deg)` }}><Logo size={120} /></span>
        </span>
      </div>

      {/* Teléfono */}
      <div style={{
        position: 'absolute', left: 250, top: 600, width: 580, height: 700, borderRadius: 64, background: '#151110',
        border: '3px solid rgba(255,255,255,0.12)', boxShadow: '0 40px 120px rgba(0,0,0,0.6), 0 0 120px rgba(240,83,46,0.18)',
        transform: `translateY(${(1 - phone) * 500}px) rotate(${(1 - phone) * 8}deg)`, opacity: Math.min(1, phone * 1.4), padding: 36, overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ width: 70, height: 70, borderRadius: 35, background: 'linear-gradient(135deg,#fb7185,#fb923c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 38 }}>💅</div>
          <div>
            <div style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: 34, color: C.cream }}>Daniela Nails</div>
            <Label size={20}>citora · reservas</Label>
          </div>
        </div>
        <Label size={22} color={C.coral} style={{ marginTop: 34 }}>Elige tu hora · jueves</Label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 22 }}>
          {SLOTS.map((s, i) => {
            const lit = !s.busy ? ramp(t, B.horarios + i * 0.12, B.horarios + i * 0.12 + 0.25) : 0;
            const chosen = s.h === '14:00' && tap > 0;
            return (
              <div key={s.h} style={{
                height: 92, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
                fontFamily: FONT_MONO, fontWeight: 700, fontSize: 36,
                background: chosen ? C.coral : s.busy ? 'rgba(255,255,255,0.03)' : `rgba(61,220,132,${0.06 + lit * 0.1})`,
                border: `2.5px solid ${chosen ? C.coral : s.busy ? 'rgba(255,255,255,0.05)' : `rgba(61,220,132,${0.15 + lit * 0.7})`}`,
                color: chosen ? '#fff' : s.busy ? 'rgba(255,255,255,0.18)' : C.cream,
                textDecoration: s.busy ? 'line-through' : 'none',
                transform: `scale(${chosen ? 1 + 0.08 * Math.sin(tap * Math.PI) : 1 + lit * 0.03 * (1 - lit)})`,
              }}>
                {s.h}
                {s.h === '14:00' && tap > 0 && tap < 1 && (
                  <div style={{ position: 'absolute', width: 60 + tap * 160, height: 60 + tap * 160, borderRadius: '50%', border: '4px solid #fff', opacity: 1 - tap }} />
                )}
              </div>
            );
          })}
        </div>
        <div style={{
          marginTop: 30, height: 96, borderRadius: 24, background: tap > 0.5 ? C.coral : 'rgba(240,83,46,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: FONT_BODY, fontWeight: 800, fontSize: 36, color: '#fff',
        }}>Reservar a las 14:00</div>

        {/* Pantalla de reservado */}
        <div style={{
          position: 'absolute', inset: 0, background: '#151110', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          opacity: Math.min(1, booked * 1.5), transform: `scale(${0.9 + 0.1 * booked})`,
        }}>
          <div style={{ width: 200, height: 200, borderRadius: 100, background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${booked})` }}>
            <svg width="110" height="110" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#08130c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="30" strokeDashoffset={30 - 30 * booked} /></svg>
          </div>
          <div style={{ fontFamily: FONT_BODY, fontWeight: 800, fontSize: 58, color: C.cream, marginTop: 40 }}>¡Reservado!</div>
          <Label size={26} style={{ marginTop: 12 }}>Jueves · 14:00</Label>
        </div>
      </div>

      <Buddy at={B.citora + 0.2} x={760} y={1210} />

      <div style={{ position: 'absolute', left: 520, top: 555, transform: `rotate(${6 * sin}deg) scale(${sin})`, opacity: Math.min(1, sin * 2) }}>
        <Chip bg={C.green} style={{ fontSize: 34, padding: '16px 28px' }}>✕ Sin escribirte</Chip>
      </div>
    </>
  );
};

/* ───────────── 4 · LA AGENDA ───────────── */
const AGENDA = [
  { h: '9:00', n: 'Daniela', s: 'Uñas acrílicas' },
  { h: '10:30', n: 'Yaima', s: 'Pestañas' },
  { h: '12:00', n: 'Lisandra', s: 'Pedicure' },
  { h: '14:00', n: 'Yanelis', s: 'Uñas en gel' },
  { h: '16:00', n: 'Mileidys', s: 'Manicure' },
];

export const Agenda: React.FC = () => {
  const t = useT();
  const card = useSpringAt(16.75, { damping: 16 });
  const toast = useSpringAt(B.telefono, { damping: 13 });
  const toastOut = ramp(t, B.telefono + 1.0, B.telefono + 1.3);
  const n = Math.round(ramp(t, 17.3, 18.4, 0, AGENDA.length));
  const full = useSpringAt(B.organizado + 0.1, { damping: 9, stiffness: 220 });
  return (
    <>
      <Headline light at={16.8} top="Tu día" bottom="ya organizado" />
      <Card style={{ left: 96, top: 610, width: 888, height: 700, padding: 36, transform: `translateY(${(1 - card) * 500}px)`, opacity: Math.min(1, card * 1.4) }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Label>Hoy · jueves</Label>
          <div style={{ fontFamily: FONT_MONO, fontSize: 30, color: C.coral, fontWeight: 700 }}>{n} citas</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 22 }}>
          {AGENDA.map((a, i) => {
            const p = ramp(t, 17.2 + i * 0.22, 17.5 + i * 0.22);
            return (
              <div key={a.h} style={{
                display: 'flex', alignItems: 'center', gap: 26, padding: '14px 24px', borderRadius: 20,
                background: 'rgba(255,255,255,0.05)', border: `1.5px solid ${C.cardLine}`,
                opacity: p, transform: `translateX(${(1 - p) * 120}px)`, filter: `blur(${(1 - p) * 10}px)`,
              }}>
                <div style={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: 32, color: C.coral, width: 110 }}>{a.h}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: 34, color: C.cream }}>{a.n}</div>
                  <div style={{ fontFamily: FONT_BODY, fontWeight: 500, fontSize: 24, color: C.muted }}>{a.s}</div>
                </div>
                <div style={{ width: 44, height: 44, borderRadius: 22, background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, color: '#08130c', fontWeight: 900 }}>✓</div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Notificación */}
      <div style={{
        position: 'absolute', left: 96, right: 96, top: 80, borderRadius: 32, padding: '26px 30px', background: 'rgba(28,22,20,0.94)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.35)', display: 'flex', gap: 24, alignItems: 'center',
        transform: `translateY(${(1 - toast) * -260 - toastOut * 260}px)`,
      }}>
        <Logo size={76} />
        <div>
          <Label size={22}>Citora · ahora</Label>
          <div style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: 34, color: C.cream, marginTop: 4 }}>Nueva reserva: Mileidys · 16:00</div>
        </div>
      </div>

      <div style={{ position: 'absolute', left: 620, top: 1236, transform: `rotate(${-6 * full}deg) scale(${full})`, opacity: Math.min(1, full * 2) }}>
        <Chip bg={C.green} style={{ fontSize: 34, padding: '16px 28px' }}>✓ Día lleno</Chip>
      </div>
    </>
  );
};

/* ───────────── 5 · LLAMADA A LA ACCIÓN ───────────── */
export const Cta: React.FC = () => {
  const t = useT();
  const frame = useCurrentFrame();
  const word = 'SALÓN';
  const typed = Math.floor(ramp(t, B.salon, B.salon + 0.6, 0, word.length, Easing.linear));
  const sent = t >= B.salon + 1.0;
  const send = useSpringAt(B.salon + 1.0, { damping: 12 });
  const dm = useSpringAt(B.info, { damping: 14 });
  const bar = useSpringAt(20.25, { damping: 16 });
  const caret = Math.floor(frame / 8) % 2 === 0;
  const salonPop = useSpringAt(B.salon - 0.1, { damping: 8, stiffness: 240 });

  return (
    <>
      <div style={{ position: 'absolute', left: 96, top: 230, fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 190, lineHeight: 0.9, textTransform: 'uppercase' }}>
        <span style={{ display: 'block', color: C.cream, opacity: ramp(t, 20.2, 20.5), filter: `blur(${(1 - ramp(t, 20.2, 20.5)) * 14}px)` }}>Comenta</span>
        <span style={{ display: 'inline-block', color: C.coral, transform: `scale(${salonPop})`, transformOrigin: 'left center', textShadow: '0 0 60px rgba(240,83,46,0.45)' }}>Salón</span>
      </div>

      {/* Caja de comentario */}
      <Card style={{ left: 96, top: 690, width: 888, height: 130, padding: '0 30px', display: 'flex', alignItems: 'center', gap: 22, transform: `translateY(${(1 - bar) * 300}px)`, opacity: Math.min(1, bar * 1.5), borderRadius: 65 }}>
        <div style={{ width: 76, height: 76, borderRadius: 38, background: 'linear-gradient(135deg,#a78bfa,#f472b6)' }} />
        <div style={{ flex: 1, fontFamily: FONT_BODY, fontWeight: 700, fontSize: 48, color: C.cream }}>
          {sent ? <span style={{ color: C.muted, fontWeight: 500, fontSize: 38 }}>Añade un comentario…</span> : <>{word.slice(0, typed)}{caret && <span style={{ color: C.coral }}>|</span>}</>}
        </div>
        <div style={{ width: 84, height: 84, borderRadius: 42, background: typed === word.length ? C.coral : 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${1 + 0.2 * Math.sin(send * Math.PI)})` }}>
          <svg width="40" height="40" viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      </Card>

      {/* Comentario publicado */}
      {sent && (
        <Card style={{ left: 96, top: 860, width: 888, height: 150, padding: '28px 34px', transform: `translateY(${(1 - send) * -120}px)`, opacity: send }}>
          <Label size={22}>tú · ahora</Label>
          <div style={{ fontFamily: FONT_BODY, fontWeight: 800, fontSize: 46, color: C.cream, marginTop: 10 }}>SALÓN 🙋‍♀️</div>
        </Card>
      )}

      {/* Mensaje privado */}
      <Card glow style={{ left: 96, top: 1050, width: 888, height: 220, padding: '28px 34px', transform: `translateY(${(1 - dm) * 500}px)`, opacity: Math.min(1, dm * 1.5) }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Logo size={48} />
          <Label size={22} color={C.coral}>Mensaje privado · citora_reservas</Label>
        </div>
        <div style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: 40, color: C.cream, marginTop: 18 }}>¡Hola! Te paso toda la info 📩</div>
        <div style={{ position: 'absolute', right: 30, bottom: 26 }}><Chip bg={C.coral} color="#fff" style={{ fontSize: 26 }}>Ver info</Chip></div>
      </Card>
    </>
  );
};
