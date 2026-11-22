import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, interpolate, Easing } from 'remotion';
import { B2 as B, SCENES2, CAPTIONS2, AUDIO2, SFX2 } from './timing2';
import { SceneWrap, CaptionsFor } from './Promo';
import { C, Card, Chip, FONT_BODY, FONT_HEAD, FONT_MONO, Grain, Headline, Label, Logo, Buddy, ramp, s2f, useSpringAt, useT } from './ui';

const money = (n: number) => { const s = String(Math.round(n)); return s.length > 3 ? s.slice(0, -3) + '.' + s.slice(-3) : s; };

/* ───────────── 1 · −12.000 ───────────── */
const Hook: React.FC = () => {
  const t = useT();
  const slam = useSpringAt(0, { damping: 10, stiffness: 260 });
  const n = interpolate(t, [0.05, 1.1], [0, 12000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const chip = useSpringAt(B.tresVeces, { damping: 9, stiffness: 230 });
  const plant = ramp(t, B.plantada, B.plantada + 0.3);
  const frame = useCurrentFrame();
  const pulse = t > 1.1 ? 1 + 0.015 * Math.sin(frame / 4) : 1;
  return (
    <>
      <Headline at={1.3} top="Lo que pierdes" bottom="cada mes" />
      <Card glow style={{ left: 96, top: 600, width: 888, height: 560, padding: 46, transform: `scale(${(0.7 + 0.3 * slam) * pulse})`, opacity: Math.min(1, slam * 2) }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Label>Tu salón · este mes</Label>
          <Label color={C.red}>● Pérdida</Label>
        </div>
        <div style={{ fontFamily: FONT_BODY, fontWeight: 800, fontSize: 205, color: C.coral, letterSpacing: '-0.05em', lineHeight: 1, marginTop: 40, whiteSpace: 'nowrap' }}>−{money(n)}</div>
        <Label size={34} style={{ marginTop: 14 }}>CUP al mes</Label>
        <div style={{ display: 'flex', gap: 16, marginTop: 40, opacity: plant, transform: `translateY(${(1 - plant) * 20}px)` }}>
          {[0, 1, 2].map((i) => {
            const p = ramp(t, B.plantada + 0.15 + i * 0.25, B.plantada + 0.4 + i * 0.25);
            return <div key={i} style={{ width: 70, height: 70, borderRadius: 18, background: `rgba(255,59,48,${0.15 + 0.7 * p})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 38, color: '#fff', fontWeight: 900, transform: `scale(${0.6 + 0.4 * p})` }}>✕</div>;
          })}
          <div style={{ alignSelf: 'center', fontFamily: FONT_MONO, fontSize: 28, color: C.muted, marginLeft: 10 }}>citas que no vinieron</div>
        </div>
      </Card>
      <div style={{ position: 'absolute', left: 560, top: 1205, transform: `rotate(${-6 * chip}deg) scale(${chip})`, opacity: Math.min(1, chip * 2) }}>
        <Chip bg={C.red} color="#fff" style={{ fontSize: 32, padding: '16px 26px' }}>3 plantones / semana</Chip>
      </div>
    </>
  );
};

/* ───────────── 2 · LA CUENTA ───────────── */
const ROWS = [
  { at: B.tres, k: 'Plantones por semana', v: '3' },
  { at: B.mil, k: 'Lo que cobras por cita', v: '× 1.000 CUP' },
  { at: B.cuatro, k: 'Semanas del mes', v: '× 4' },
];

const Math2: React.FC = () => {
  const t = useT();
  const total = useSpringAt(B.total, { damping: 9, stiffness: 220 });
  const line = ramp(t, B.total - 0.25, B.total);
  return (
    <>
      <Headline light at={5.35} top="Haz la" bottom="cuenta" />
      <Card style={{ left: 96, top: 600, width: 888, height: 640, padding: 46 }}>
        <Label>Calculadora · tu salón</Label>
        <div style={{ marginTop: 30, display: 'flex', flexDirection: 'column', gap: 22 }}>
          {ROWS.map((r) => {
            const p = ramp(t, r.at - 0.1, r.at + 0.2);
            return (
              <div key={r.k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', opacity: p, transform: `translateX(${(1 - p) * 80}px)`, filter: `blur(${(1 - p) * 8}px)` }}>
                <span style={{ fontFamily: FONT_BODY, fontWeight: 500, fontSize: 36, color: C.muted }}>{r.k}</span>
                <span style={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: 52, color: C.cream }}>{r.v}</span>
              </div>
            );
          })}
        </div>
        <div style={{ height: 4, background: C.coral, marginTop: 36, width: `${line * 100}%`, borderRadius: 2 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 26, opacity: Math.min(1, total * 2) }}>
          <span style={{ fontFamily: FONT_MONO, fontSize: 30, color: C.muted, letterSpacing: '0.1em' }}>PERDIDO</span>
          <span style={{ fontFamily: FONT_BODY, fontWeight: 800, fontSize: 120, color: C.coral, letterSpacing: '-0.04em', transform: `scale(${total})`, transformOrigin: 'right center' }}>12.000</span>
        </div>
      </Card>
    </>
  );
};

/* ───────────── 3 · PASO 1: CONFIRMA ───────────── */
const Tip1: React.FC = () => {
  const t = useT();
  const step = useSpringAt(B.primero - 0.1, { damping: 10, stiffness: 220 });
  const msg = useSpringAt(B.nocheAntes - 0.3, { damping: 13 });
  const reply = useSpringAt(B.nocheAntes + 0.6, { damping: 12 });
  const swap = t >= B.primero - 0.15;
  return (
    <>
      {!swap ? <Headline at={10.3} top="¿Cómo se" bottom="arregla?" /> : <Headline at={B.primero - 0.15} top="Paso 1" bottom="Confirma" />}
      <Card style={{ left: 96, top: 600, width: 888, height: 640, padding: 40, opacity: Math.min(1, step * 1.5), transform: `translateY(${(1 - step) * 300}px)` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Label>WhatsApp · la noche antes</Label>
          <Label color={C.coral}>🌙 21:00</Label>
        </div>
        <div style={{ marginTop: 50, display: 'flex', flexDirection: 'column', gap: 26 }}>
          <div style={{ alignSelf: 'flex-end', maxWidth: 640, background: C.coral, color: '#fff', borderRadius: '30px 30px 8px 30px', padding: '24px 30px', fontFamily: FONT_BODY, fontWeight: 600, fontSize: 38, lineHeight: 1.25, transform: `scale(${msg})`, transformOrigin: 'right bottom', opacity: Math.min(1, msg * 2) }}>
            Hola Yanelis 💅 te espero mañana a las 2:00. ¿Me confirmas?
          </div>
          <div style={{ alignSelf: 'flex-start', maxWidth: 560, background: 'rgba(255,255,255,0.08)', color: C.cream, borderRadius: '30px 30px 30px 8px', padding: '24px 30px', fontFamily: FONT_BODY, fontWeight: 600, fontSize: 38, transform: `scale(${reply})`, transformOrigin: 'left bottom', opacity: Math.min(1, reply * 2) }}>
            ¡Allí estaré! 🙌 <span style={{ color: '#53bdeb', fontSize: 30 }}>✓✓</span>
          </div>
        </div>
      </Card>
      <div style={{ position: 'absolute', left: 600, top: 1205, transform: `rotate(${-5 * reply}deg) scale(${reply})`, opacity: Math.min(1, reply * 2) }}>
        <Chip bg={C.green} style={{ fontSize: 32, padding: '16px 26px' }}>✓ Cita confirmada</Chip>
      </div>
    </>
  );
};

/* ───────────── 4 · PASO 2: LISTA DE ESPERA ───────────── */
const WAIT = ['Daniela', 'Lisandra', 'Mileidys'];

const Tip2: React.FC = () => {
  const t = useT();
  const card = useSpringAt(14.5, { damping: 15 });
  const cancel = useSpringAt(B.cancela - 0.9, { damping: 10, stiffness: 240 });
  const fill = ramp(t, B.cancela - 0.1, B.cancela + 0.4);
  const fillPop = useSpringAt(B.cancela + 0.1, { damping: 9 });
  return (
    <>
      <Headline light at={14.5} top="Paso 2" bottom="Lista de espera" size={140} />
      <Card style={{ left: 96, top: 600, width: 888, height: 640, padding: 40, transform: `translateY(${(1 - card) * 400}px)`, opacity: Math.min(1, card * 1.5) }}>
        <Label>Sábado · 14:00</Label>
        <div style={{ position: 'relative', marginTop: 20, height: 120, borderRadius: 24, border: `2.5px solid ${fill > 0.5 ? C.green : 'rgba(255,59,48,0.6)'}`, background: fill > 0.5 ? 'rgba(61,220,132,0.12)' : 'rgba(255,59,48,0.08)', display: 'flex', alignItems: 'center', padding: '0 30px', gap: 24 }}>
          {fill < 0.5 ? (
            <>
              <span style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: 44, color: C.muted, textDecoration: 'line-through' }}>Yanelis</span>
              <span style={{ marginLeft: 'auto', transform: `scale(${cancel}) rotate(-6deg)`, opacity: Math.min(1, cancel * 2) }}><Chip bg={C.red} color="#fff">Canceló</Chip></span>
            </>
          ) : (
            <>
              <span style={{ fontFamily: FONT_BODY, fontWeight: 800, fontSize: 48, color: C.cream, transform: `scale(${fillPop})`, display: 'inline-block' }}>Daniela</span>
              <span style={{ marginLeft: 'auto' }}><Chip bg={C.green}>✓ Hueco lleno</Chip></span>
            </>
          )}
        </div>
        <Label style={{ marginTop: 40 }} color={C.coral}>Esperando un hueco</Label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 18 }}>
          {WAIT.map((w, i) => {
            const p = ramp(t, B.lista + i * 0.2, B.lista + 0.3 + i * 0.2);
            const moved = i === 0 && fill > 0;
            return (
              <div key={w} style={{
                display: 'flex', alignItems: 'center', gap: 20, padding: '16px 24px', borderRadius: 18, background: 'rgba(255,255,255,0.05)', border: `1.5px solid ${C.cardLine}`,
                opacity: p * (moved ? 1 - fill : 1), transform: `translateX(${(1 - p) * 100}px) translateY(${moved ? -fill * 240 : 0}px)`,
              }}>
                <span style={{ fontFamily: FONT_MONO, fontSize: 30, color: C.coral }}>{i + 1}</span>
                <span style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: 36, color: C.cream }}>{w}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </>
  );
};

/* ───────────── 5 · CITORA LO HACE ───────────── */
const REM = [{ n: 'Yanelis', h: '14:00' }, { n: 'Yaima', h: '10:30' }, { n: 'Lisandra', h: '16:00' }];

const App: React.FC = () => {
  const t = useT();
  const logo = useSpringAt(B.citora - 0.1, { damping: 9, stiffness: 220 });
  const card = useSpringAt(19.3, { damping: 15 });
  const wait = ramp(t, B.esperando - 0.1, B.esperando + 0.3);
  const tap = ramp(t, B.whatsapp, B.whatsapp + 0.35);
  const msg = useSpringAt(B.whatsapp + 0.3, { damping: 12 });
  return (
    <>
      <div style={{ position: 'absolute', left: 96, top: 230, fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 150, lineHeight: 0.92, textTransform: 'uppercase' }}>
        <span style={{ display: 'block', color: C.cream, opacity: ramp(t, 19.1, 19.4), filter: `blur(${(1 - ramp(t, 19.1, 19.4)) * 12}px)` }}>Para eso hice</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 28, color: C.coral }}>
          <span style={{ display: 'inline-block', transform: `scale(${logo})`, opacity: Math.min(1, logo * 2) }}>Citora</span>
          <span style={{ display: 'inline-block', transform: `scale(${logo}) rotate(${(1 - logo) * -90}deg)` }}><Logo size={120} /></span>
        </span>
      </div>
      <Card style={{ left: 96, top: 600, width: 888, height: 660, padding: 36, transform: `translateY(${(1 - card) * 400}px)`, opacity: Math.min(1, card * 1.5) }}>
        <Label color={C.coral}>Recordatorios · mañana</Label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 18 }}>
          {REM.map((r, i) => {
            const p = ramp(t, B.recordar + i * 0.2, B.recordar + 0.3 + i * 0.2);
            const tapped = i === 0 && tap > 0;
            return (
              <div key={r.n} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '14px 22px', borderRadius: 18, background: 'rgba(255,255,255,0.05)', border: `1.5px solid ${C.cardLine}`, opacity: p, transform: `translateX(${(1 - p) * 100}px)` }}>
                <span style={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: 28, color: C.coral, width: 96 }}>{r.h}</span>
                <span style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: 34, color: C.cream, flex: 1 }}>{r.n}</span>
                <span style={{ position: 'relative', background: tapped ? '#1faa59' : '#25d366', color: '#05230f', fontFamily: FONT_BODY, fontWeight: 800, fontSize: 26, padding: '10px 20px', borderRadius: 14, transform: `scale(${tapped ? 1 - 0.1 * Math.sin(tap * Math.PI) : 1})` }}>
                  WhatsApp
                  {tapped && tap < 1 && <span style={{ position: 'absolute', left: '50%', top: '50%', width: 40 + tap * 140, height: 40 + tap * 140, marginLeft: -(20 + tap * 70), marginTop: -(20 + tap * 70), borderRadius: '50%', border: '4px solid #fff', opacity: 1 - tap }} />}
                </span>
              </div>
            );
          })}
        </div>
        <div style={{ opacity: wait, transform: `translateY(${(1 - wait) * 40}px)` }}>
          <Label color={C.coral} style={{ marginTop: 30 }}>Lista de espera · sábado 14:00</Label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '14px 22px', borderRadius: 18, background: 'rgba(240,83,46,0.1)', border: `1.5px solid rgba(240,83,46,0.5)`, marginTop: 14 }}>
            <span style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: 34, color: C.cream, flex: 1 }}>Daniela</span>
            <span style={{ background: C.coral, color: '#fff', fontFamily: FONT_BODY, fontWeight: 800, fontSize: 26, padding: '10px 20px', borderRadius: 14 }}>Avisar</span>
          </div>
        </div>
      </Card>
      {/* Mensaje ya escrito */}
      <div style={{ position: 'absolute', left: 130, right: 130, top: 1130, transform: `translateY(${(1 - msg) * 200}px) scale(${0.9 + 0.1 * msg})`, opacity: Math.min(1, msg * 2) }}>
        <div style={{ background: '#e7fbe9', borderRadius: 26, padding: '22px 28px', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', gap: 18 }}>
          <span style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: 30, color: '#0b2614', flex: 1 }}>Hola Yanelis 💅 te recuerdo tu cita mañana a las 14:00…</span>
          <span style={{ width: 64, height: 64, borderRadius: 32, background: '#25d366', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="30" height="30" viewBox="0 0 24 24"><path d="M4 12l16-8-6 16-2-6-8-2z" fill="#fff" /></svg>
          </span>
        </div>
      </div>
      <Buddy at={B.citora + 0.2} x={880} y={560} size={84} />
    </>
  );
};

/* ───────────── 6 · GUARDA + COMENTA ───────────── */
const Cta: React.FC = () => {
  const t = useT();
  const frame = useCurrentFrame();
  const swap = t >= B.app - 0.1;
  const save = useSpringAt(B.guarda, { damping: 8, stiffness: 230 });
  const saved = t >= B.guarda + 0.45;
  const word = 'SALÓN';
  const typed = Math.floor(ramp(t, B.salon, B.salon + 0.6, 0, word.length, Easing.linear));
  const bar = useSpringAt(B.app, { damping: 15 });
  const caret = Math.floor(frame / 8) % 2 === 0;
  return (
    <>
      {!swap ? <Headline light at={25.5} top="Guarda" bottom="este vídeo" size={170} /> : <Headline light at={B.app - 0.1} top="Comenta" bottom="Salón" size={190} />}
      {/* Botón de guardar */}
      <div style={{ position: 'absolute', left: 390, top: 680, width: 300, height: 300, borderRadius: 80, background: C.card, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 30px 80px rgba(0,0,0,0.3)', transform: `scale(${save * (swap ? 1 - ramp(t, B.app - 0.1, B.app + 0.2) : 1)})`, opacity: swap ? 1 - ramp(t, B.app - 0.1, B.app + 0.2) : 1 }}>
        <svg width="150" height="150" viewBox="0 0 24 24"><path d="M6 3h12v18l-6-4.5L6 21z" fill={saved ? C.coral : 'none'} stroke={saved ? C.coral : C.cream} strokeWidth="1.8" strokeLinejoin="round" /></svg>
      </div>
      {/* Caja de comentario */}
      <Card style={{ left: 96, top: 720, width: 888, height: 130, padding: '0 30px', display: 'flex', alignItems: 'center', gap: 22, transform: `translateY(${(1 - bar) * 500}px)`, opacity: Math.min(1, bar * 1.5), borderRadius: 65 }}>
        <div style={{ width: 76, height: 76, borderRadius: 38, background: 'linear-gradient(135deg,#a78bfa,#f472b6)' }} />
        <div style={{ flex: 1, fontFamily: FONT_BODY, fontWeight: 700, fontSize: 48, color: C.cream }}>{word.slice(0, typed)}{caret && <span style={{ color: C.coral }}>|</span>}</div>
        <div style={{ width: 84, height: 84, borderRadius: 42, background: typed === word.length ? C.coral : 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="40" height="40" viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      </Card>
      <div style={{ position: 'absolute', left: 820, top: 590 + Math.abs(Math.sin(frame / 6)) * 40, fontSize: 110, opacity: ramp(t, B.salon, B.salon + 0.3) }}>👇</div>
      <Card glow style={{ left: 96, top: 900, width: 888, height: 200, padding: '28px 34px', opacity: ramp(t, B.salon + 0.9, B.salon + 1.2), transform: `translateY(${(1 - ramp(t, B.salon + 0.9, B.salon + 1.2)) * 200}px)` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Logo size={48} /><Label size={22} color={C.coral}>Mensaje privado · citora_reservas</Label></div>
        <div style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: 40, color: C.cream, marginTop: 18 }}>¡Hola! Te paso toda la info 📩</div>
      </Card>
    </>
  );
};

/* ───────────── Montaje ───────────── */
const T = 0.22;
const ORDER = [
  { k: 'hook', C: Hook, light: false },
  { k: 'math', C: Math2, light: true },
  { k: 'tip1', C: Tip1, light: false },
  { k: 'tip2', C: Tip2, light: true },
  { k: 'app', C: App, light: false },
  { k: 'cta', C: Cta, light: true },
] as const;

const isLight = (t: number) => ORDER.some((s) => s.light && t >= SCENES2[s.k][0] && t < SCENES2[s.k][1]);

export const Promo2: React.FC = () => (
  <AbsoluteFill style={{ background: C.ink }}>
    {ORDER.map((s, i) => {
      const [from, to] = SCENES2[s.k];
      const first = i === 0, last = i === ORDER.length - 1;
      const start = first ? 0 : from - T;
      const end = last ? to : to + T;
      return (
        <Sequence key={s.k} from={s2f(start)} durationInFrames={s2f(end - start)}>
          <SceneWrap from={from} to={to} light={s.light} first={first} last={last}><s.C /></SceneWrap>
        </Sequence>
      );
    })}
    <CaptionsFor caps={CAPTIONS2} isLight={isLight} />
    <Grain />
    {AUDIO2 && <Audio src={staticFile(AUDIO2)} />}
    {SFX2.map((x, i) => (
      <Sequence key={i} from={s2f(x.t)} layout="none"><Audio src={staticFile(`sfx/${x.f}.wav`)} volume={x.v ?? 0.5} /></Sequence>
    ))}
  </AbsoluteFill>
);
