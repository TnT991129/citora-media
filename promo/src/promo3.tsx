import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, interpolate, Easing } from 'remotion';
import { B3 as B, SCENES3, CAPTIONS3, AUDIO3, SFX3 } from './timing3';
import { SceneWrap, CaptionsFor } from './Promo';
import { C, Card, Chip, FONT_BODY, FONT_HEAD, FONT_MONO, Grain, Headline, Label, Logo, Buddy, ramp, s2f, useSpringAt, useT } from './ui';

/* ───────────── 0 · GANCHO: 3 señales ───────────── */
const Hook: React.FC = () => {
  const t = useT();
  const frame = useCurrentFrame();
  const big = useSpringAt(0, { damping: 9, stiffness: 240 });
  const warn = useSpringAt(B.perdiendo, { damping: 9, stiffness: 230 });
  return (
    <>
      <div style={{ position: 'absolute', left: 96, top: 230, fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 150, lineHeight: 0.92, textTransform: 'uppercase' }}>
        <span style={{ display: 'block', color: C.cream, opacity: ramp(t, 0.1, 0.4) }}>3 señales</span>
        <span style={{ display: 'block', color: C.coral, opacity: ramp(t, B.perdiendo - 0.2, B.perdiendo + 0.1), transform: `translateY(${(1 - ramp(t, B.perdiendo - 0.2, B.perdiendo + 0.1)) * 40}px)` }}>de que pierdes</span>
        <span style={{ display: 'block', color: C.coral, opacity: ramp(t, B.perdiendo, B.perdiendo + 0.3) }}>clientas</span>
      </div>
      {[1, 2, 3].map((n, i) => {
        const p = ramp(t, B.tres + i * 0.18, B.tres + 0.35 + i * 0.18);
        return (
          <Card key={n} glow={i === 0 && t > B.perdiendo} style={{
            left: 96 + i * 300, top: 820, width: 280, height: 380, display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: `translateY(${(1 - p) * 300 + Math.sin(frame / 9 + i) * 6}px) rotate(${(i - 1) * 5}deg) scale(${0.85 + 0.15 * p})`, opacity: p,
          }}>
            <div style={{ fontFamily: FONT_BODY, fontWeight: 800, fontSize: 220, color: i === 0 ? C.coral : 'rgba(255,255,255,0.14)', transform: `scale(${i === 0 ? big : 1})` }}>{n}</div>
          </Card>
        );
      })}
      <div style={{ position: 'absolute', left: 560, top: 1235, transform: `rotate(${-5 * warn}deg) scale(${warn})`, opacity: Math.min(1, warn * 2) }}>
        <Chip bg={C.red} color="#fff" style={{ fontSize: 32, padding: '16px 26px' }}>⚠ ¿Te pasa?</Chip>
      </div>
    </>
  );
};

/* ───────────── 1 · «¿tienes turno?» vs uñas ───────────── */
const S1: React.FC = () => {
  const t = useT();
  const msgs = Math.round(interpolate(t, [B.turno - 0.3, B.unas], [0, 38], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }));
  const nails = Math.round(interpolate(t, [B.unas - 0.2, B.unas + 0.6], [0, 6], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const right = useSpringAt(B.unas - 0.3, { damping: 14 });
  const left = useSpringAt(4.5, { damping: 14 });
  return (
    <>
      <Headline light at={4.3} top="Señal 1" bottom="«¿Tienes turno?»" size={140} />
      <Card glow style={{ left: 96, top: 640, width: 430, height: 560, padding: 36, transform: `translateY(${(1 - left) * 400}px)`, opacity: Math.min(1, left * 1.5) }}>
        <Label color={C.coral}>WhatsApp · hoy</Label>
        <div style={{ fontFamily: FONT_BODY, fontWeight: 800, fontSize: 200, color: C.coral, letterSpacing: '-0.05em', lineHeight: 1, marginTop: 40 }}>{msgs}</div>
        <Label size={24} style={{ marginTop: 14 }}>«¿tienes turno?»</Label>
        <div style={{ marginTop: 40 }}><Chip bg={C.red} color="#fff" style={{ fontSize: 24 }}>Sin parar</Chip></div>
      </Card>
      <Card style={{ left: 554, top: 640, width: 430, height: 560, padding: 36, transform: `translateY(${(1 - right) * 400}px)`, opacity: Math.min(1, right * 1.5) }}>
        <Label>Uñas hechas · hoy</Label>
        <div style={{ fontFamily: FONT_BODY, fontWeight: 800, fontSize: 200, color: C.cream, letterSpacing: '-0.05em', lineHeight: 1, marginTop: 40 }}>{nails}</div>
        <Label size={24} style={{ marginTop: 14 }}>clientas atendidas</Label>
        <div style={{ marginTop: 40, fontSize: 60 }}>💅</div>
      </Card>
    </>
  );
};

/* ───────────── 2 · La libreta ───────────── */
const NOTES = [
  { h: '9:00', n: 'Daniela — uñas', s: false },
  { h: '10:30', n: '¿Yaima? ¿o 11?', s: true },
  { h: '12:00', n: 'la prima de…', s: false },
  { h: '2:00', n: '???', s: true },
  { h: '4:00', n: 'M. (llamar)', s: false },
];

const S2: React.FC = () => {
  const t = useT();
  const frame = useCurrentFrame();
  const book = useSpringAt(9.0, { damping: 13 });
  const confused = useSpringAt(B.letra, { damping: 8, stiffness: 230 });
  const wob = t > B.letra ? Math.sin(frame / 3) * 2 : 0;
  return (
    <>
      <Headline at={8.9} top="Señal 2" bottom="La libreta" />
      <div style={{
        position: 'absolute', left: 120, top: 640, width: 840, height: 580, borderRadius: 26, padding: '40px 54px',
        background: '#fffdf6', backgroundImage: 'repeating-linear-gradient(#fffdf6 0 84px, #c9d8ee 84px 87px)', backgroundPositionY: 50,
        boxShadow: '0 30px 80px rgba(0,0,0,0.5)', transform: `translateY(${(1 - book) * 700}px) rotate(${-3 + book * 1 + wob * 0.3}deg)`,
      }}>
        <div style={{ position: 'absolute', left: 112, top: 0, bottom: 0, width: 3, background: '#f2a3a3' }} />
        {NOTES.map((n, i) => {
          const w = ramp(t, B.libreta + i * 0.2, B.libreta + 0.3 + i * 0.2, 0, 100);
          return (
            <div key={n.h} style={{ position: 'relative', marginLeft: 80, height: 87, display: 'flex', alignItems: 'flex-end', paddingBottom: 8 }}>
              <div style={{ clipPath: `inset(0 ${100 - w}% 0 0)`, fontFamily: '"Comic Neue", cursive', fontStyle: 'italic', fontWeight: 600, fontSize: 48, color: '#24324f', whiteSpace: 'nowrap', transform: `rotate(${(i % 2 ? 1 : -1) * 1.5}deg)` }}>
                <b style={{ fontStyle: 'normal', fontFamily: FONT_MONO, fontSize: 32, color: '#7a6a5a', marginRight: 20 }}>{n.h}</b>{n.n}
              </div>
              {n.s && <div style={{ position: 'absolute', left: 0, top: 44, height: 6, width: `${ramp(t, B.libreta + 0.5 + i * 0.2, B.libreta + 0.7 + i * 0.2, 0, 70)}%`, background: C.red, transform: 'rotate(-2deg)' }} />}
            </div>
          );
        })}
      </div>
      <div style={{ position: 'absolute', left: 700, top: 560, fontSize: 140, transform: `scale(${confused}) rotate(${12 + wob * 2}deg)`, opacity: Math.min(1, confused * 2) }}>😵‍💫</div>
    </>
  );
};

/* ───────────── 3 · Huecos que nadie ve ───────────── */
const DAY = [
  { h: '9:00', n: 'Daniela', free: false },
  { h: '10:30', n: 'Yaima', free: false },
  { h: '11:30', n: '', free: true },
  { h: '1:00', n: 'Lisandra', free: false },
  { h: '3:30', n: '', free: true },
];

const S3: React.FC = () => {
  const t = useT();
  const frame = useCurrentFrame();
  const card = useSpringAt(13.3, { damping: 15 });
  const nadie = useSpringAt(B.nadie, { damping: 8, stiffness: 230 });
  const blink = 0.55 + 0.45 * Math.abs(Math.sin(frame / 7));
  return (
    <>
      <Headline light at={13.3} top="Señal 3" bottom="Huecos vacíos" />
      <Card style={{ left: 96, top: 640, width: 888, height: 600, padding: 36, transform: `translateY(${(1 - card) * 400}px)`, opacity: Math.min(1, card * 1.5) }}>
        <Label>Hoy · tu agenda</Label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 22 }}>
          {DAY.map((d, i) => {
            const lit = d.free ? ramp(t, B.huecos + (i === 4 ? 0.3 : 0), B.huecos + 0.3 + (i === 4 ? 0.3 : 0)) : 1;
            return (
              <div key={d.h} style={{
                display: 'flex', alignItems: 'center', gap: 24, padding: '16px 22px', borderRadius: 18, height: 82,
                background: d.free ? `rgba(61,220,132,${0.06 * lit})` : 'rgba(255,255,255,0.05)',
                border: d.free ? `2.5px dashed rgba(61,220,132,${0.3 + 0.6 * lit * blink})` : `1.5px solid ${C.cardLine}`,
              }}>
                <span style={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: 30, color: d.free ? C.green : C.coral, width: 110 }}>{d.h}</span>
                <span style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: 34, color: d.free ? C.green : C.cream, opacity: d.free ? lit : 1 }}>{d.free ? 'Libre' : d.n}</span>
              </div>
            );
          })}
        </div>
      </Card>
      <div style={{ position: 'absolute', left: 520, top: 1225, transform: `rotate(${-5 * nadie}deg) scale(${nadie})`, opacity: Math.min(1, nadie * 2) }}>
        <Chip bg={C.red} color="#fff" style={{ fontSize: 32, padding: '16px 26px' }}>🤷‍♀️ Nadie se entera</Chip>
      </div>
    </>
  );
};

/* ───────────── 4 · Con Citora ───────────── */
const SLOTS = [{ h: '9:00', b: true }, { h: '10:30', b: true }, { h: '11:30', b: false }, { h: '1:00', b: true }, { h: '3:30', b: false }, { h: '5:00', b: true }];

const Sol: React.FC = () => {
  const t = useT();
  const logo = useSpringAt(B.citora - 0.1, { damping: 9, stiffness: 220 });
  const card = useSpringAt(17.4, { damping: 15 });
  const tap = ramp(t, B.solas, B.solas + 0.35);
  const out = ramp(t, B.publicas - 0.3, B.publicas, 0, 1, Easing.in(Easing.cubic));
  const st = useSpringAt(B.publicas, { damping: 13 });
  const sent = useSpringAt(B.estado + 0.4, { damping: 9, stiffness: 230 });
  return (
    <>
      <div style={{ position: 'absolute', left: 96, top: 230, fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 150, lineHeight: 0.92, textTransform: 'uppercase' }}>
        <span style={{ display: 'block', color: C.cream, opacity: ramp(t, 16.9, 17.2) }}>Con</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 28, color: C.coral }}>
          <span style={{ display: 'inline-block', transform: `scale(${logo})` }}>Citora</span>
          <span style={{ display: 'inline-block', transform: `scale(${logo}) rotate(${(1 - logo) * -90}deg)` }}><Logo size={120} /></span>
        </span>
      </div>
      {/* Horas libres para la clienta */}
      <Card style={{ left: 96, top: 640, width: 888, height: 560, padding: 36, transform: `translateY(${(1 - card) * 400 - out * 120}px)`, opacity: Math.min(1, card * 1.5) * (1 - out), filter: out > 0 ? `blur(${out * 20}px)` : undefined }}>
        <Label color={C.coral}>Lo que ve tu clienta · elige tu hora</Label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 18, marginTop: 30 }}>
          {SLOTS.map((s, i) => {
            const lit = !s.b ? ramp(t, B.horas + i * 0.1, B.horas + 0.3 + i * 0.1) : 0;
            const chosen = s.h === '3:30' && tap > 0;
            return (
              <div key={s.h} style={{
                height: 110, borderRadius: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
                fontFamily: FONT_MONO, fontWeight: 700, fontSize: 40,
                background: chosen ? C.coral : s.b ? 'rgba(255,255,255,0.03)' : `rgba(61,220,132,${0.06 + lit * 0.1})`,
                border: `2.5px solid ${chosen ? C.coral : s.b ? 'rgba(255,255,255,0.05)' : `rgba(61,220,132,${0.15 + lit * 0.7})`}`,
                color: chosen ? '#fff' : s.b ? 'rgba(255,255,255,0.18)' : C.cream, textDecoration: s.b ? 'line-through' : 'none',
              }}>
                {s.h}
                {chosen && tap < 1 && <div style={{ position: 'absolute', width: 60 + tap * 180, height: 60 + tap * 180, borderRadius: '50%', border: '4px solid #fff', opacity: 1 - tap }} />}
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 34, display: 'flex', alignItems: 'center', gap: 16, opacity: ramp(t, B.solas + 0.4, B.solas + 0.7) }}>
          <div style={{ width: 54, height: 54, borderRadius: 27, background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, fontWeight: 900, color: '#08130c' }}>✓</div>
          <span style={{ fontFamily: FONT_BODY, fontWeight: 800, fontSize: 40, color: C.cream }}>Reservada sola, 3:30 p.m.</span>
        </div>
      </Card>
      {/* Publicar huecos → estado de WhatsApp */}
      <div style={{ position: 'absolute', left: 96, top: 640, width: 888, transform: `translateY(${(1 - st) * 500}px)`, opacity: Math.min(1, st * 1.5) }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: C.card, border: `2px solid ${C.cardLine}`, borderRadius: 20, padding: '16px 26px', fontFamily: FONT_BODY, fontWeight: 800, fontSize: 32, color: C.cream }}>✨ Publicar huecos</div>
        <div style={{ marginTop: 26, borderRadius: 34, padding: '40px 44px', background: 'linear-gradient(160deg,#128c7e,#075e54)', boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }}>
          <Label color="rgba(255,255,255,0.75)" size={24}>Tu estado de WhatsApp</Label>
          <div style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: 38, color: '#fff', lineHeight: 1.35, marginTop: 20 }}>
            ✨ ¡Hoy me quedan huecos libres en Daniela Nails!<br />🕒 11:30 · 3:30 p.m.<br /><br />Reserva el tuyo aquí 👉 citora-app.com/daniela-nails
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 640, top: 1240, transform: `rotate(${-6 * sent}deg) scale(${sent})`, opacity: Math.min(1, sent * 2) }}>
        <Chip bg={C.green} style={{ fontSize: 32, padding: '16px 26px' }}>✓ Con un toque</Chip>
      </div>
      <Buddy at={B.citora + 0.2} x={880} y={560} size={84} />
    </>
  );
};

/* ───────────── 5 · ¿Cuántas te pasan? + enlace ───────────── */
const Cta: React.FC = () => {
  const t = useT();
  const frame = useCurrentFrame();
  const word = 'Las 3 😅';
  const typed = Math.floor(ramp(t, B.comentarios, B.comentarios + 0.7, 0, [...word].length, Easing.linear));
  const bar = useSpringAt(24.3, { damping: 15 });
  const swap = t >= B.gratis - 0.1;
  const prof = useSpringAt(B.gratis, { damping: 15 });
  const out = swap ? ramp(t, B.gratis - 0.1, B.gratis + 0.2) : 0;
  const linkHi = ramp(t, B.perfil - 0.1, B.perfil + 0.25);
  const free = useSpringAt(B.perfil + 0.5, { damping: 9, stiffness: 230 });
  const caret = Math.floor(frame / 8) % 2 === 0;
  return (
    <>
      {!swap ? <Headline light at={24.1} top="¿Cuántas" bottom="te pasan?" size={170} /> : <Headline light at={B.gratis - 0.1} top="Pruébala" bottom="gratis" size={170} />}
      {/* Comentario */}
      <Card style={{ left: 96, top: 700, width: 888, height: 130, padding: '0 30px', display: 'flex', alignItems: 'center', gap: 22, borderRadius: 65, transform: `translateY(${(1 - bar) * 500 - out * 200}px)`, opacity: Math.min(1, bar * 1.5) * (1 - out) }}>
        <div style={{ width: 76, height: 76, borderRadius: 38, background: 'linear-gradient(135deg,#a78bfa,#f472b6)' }} />
        <div style={{ flex: 1, fontFamily: FONT_BODY, fontWeight: 700, fontSize: 48, color: C.cream }}>{[...word].slice(0, typed).join('')}{caret && <span style={{ color: C.coral }}>|</span>}</div>
        <div style={{ width: 84, height: 84, borderRadius: 42, background: typed >= [...word].length ? C.coral : 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="40" height="40" viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      </Card>
      {['1', '2', '3'].map((n, i) => (
        <div key={n} style={{ position: 'absolute', left: 300 + i * 170, top: 900, width: 130, height: 130, borderRadius: 30, background: C.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_BODY, fontWeight: 800, fontSize: 70, color: C.coral, opacity: ramp(t, B.cuantas + i * 0.15, B.cuantas + 0.3 + i * 0.15) * (1 - out), transform: `translateY(${(1 - ramp(t, B.cuantas + i * 0.15, B.cuantas + 0.3 + i * 0.15)) * 60}px)` }}>{n}</div>
      ))}
      {/* Perfil */}
      <Card style={{ left: 96, top: 640, width: 888, height: 560, padding: 40, transform: `translateY(${(1 - prof) * 600}px)`, opacity: Math.min(1, prof * 1.5) }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
          <div style={{ padding: 6, borderRadius: '50%', background: 'linear-gradient(135deg,#fb7185,#fb923c)' }}>
            <div style={{ width: 150, height: 150, borderRadius: '50%', background: '#1b1513', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Logo size={100} /></div>
          </div>
          <div>
            <div style={{ fontFamily: FONT_BODY, fontWeight: 800, fontSize: 44, color: C.cream }}>citora_reservas</div>
            <Label size={24} style={{ marginTop: 8 }}>App de reservas · Cuba 🇨🇺</Label>
          </div>
        </div>
        <div style={{ fontFamily: FONT_BODY, fontWeight: 500, fontSize: 34, color: C.muted, marginTop: 34, lineHeight: 1.35 }}>Tus clientas reservan solas 💅<br />5 días gratis con todo incluido</div>
        <div style={{ marginTop: 30, display: 'inline-flex', alignItems: 'center', gap: 16, padding: '18px 28px', borderRadius: 20, background: `rgba(240,83,46,${0.08 + linkHi * 0.22})`, border: `2.5px solid rgba(240,83,46,${0.2 + linkHi * 0.8})`, boxShadow: `0 0 ${linkHi * 50}px rgba(240,83,46,0.5)` }}>
          <span style={{ fontSize: 40 }}>🔗</span>
          <span style={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: 44, color: C.coral }}>citora-app.com</span>
        </div>
      </Card>
      <div style={{ position: 'absolute', left: 700, top: 1010 + Math.abs(Math.sin(frame / 6)) * 30, fontSize: 110, opacity: ramp(t, B.perfil + 0.1, B.perfil + 0.4), transform: 'rotate(-20deg)' }}>👆</div>
      <div style={{ position: 'absolute', left: 560, top: 1210, transform: `rotate(${-6 * free}deg) scale(${free})`, opacity: Math.min(1, free * 2) }}>
        <Chip bg={C.green} style={{ fontSize: 34, padding: '16px 28px' }}>✓ Enlace en mi perfil</Chip>
      </div>
    </>
  );
};

/* ───────────── Montaje ───────────── */
const T = 0.22;
const ORDER = [
  { k: 'hook', C: Hook, light: false },
  { k: 's1', C: S1, light: true },
  { k: 's2', C: S2, light: false },
  { k: 's3', C: S3, light: true },
  { k: 'sol', C: Sol, light: false },
  { k: 'cta', C: Cta, light: true },
] as const;

const isLight = (t: number) => ORDER.some((s) => s.light && t >= SCENES3[s.k][0] && t < SCENES3[s.k][1]);

export const Promo3: React.FC = () => (
  <AbsoluteFill style={{ background: C.ink }}>
    {ORDER.map((s, i) => {
      const [from, to] = SCENES3[s.k];
      const first = i === 0, last = i === ORDER.length - 1;
      const start = first ? 0 : from - T;
      const end = last ? to : to + T;
      return (
        <Sequence key={s.k} from={s2f(start)} durationInFrames={s2f(end - start)}>
          <SceneWrap from={from} to={to} light={s.light} first={first} last={last}><s.C /></SceneWrap>
        </Sequence>
      );
    })}
    <CaptionsFor caps={CAPTIONS3} isLight={isLight} />
    <Grain />
    {AUDIO3 && <Audio src={staticFile(AUDIO3)} />}
    {SFX3.map((x, i) => (
      <Sequence key={i} from={s2f(x.t)} layout="none"><Audio src={staticFile(`sfx/${x.f}.wav`)} volume={x.v ?? 0.5} /></Sequence>
    ))}
  </AbsoluteFill>
);
