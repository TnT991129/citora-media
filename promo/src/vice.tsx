// Versión "tráiler tropical": atardecer, neón y palmeras.
// Inspirada en la estética de los tráilers de juegos de mundo abierto, sin usar logos, letras ni personajes de nadie.
import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, interpolate, Easing } from 'remotion';
import '@fontsource/barlow-condensed/800-italic.css';
import '@fontsource/barlow-condensed/800.css';
import '@fontsource/pacifico/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import '@fontsource/jetbrains-mono/700.css';
import { AUDIO_FILE, BEATS as B, CAPTIONS, FPS, SCENES, SFX } from './timing';
import { Logo, ramp, s2f, useSpringAt, useT } from './ui';

const V = {
  pink: '#ff2d95',
  cyan: '#2de2ff',
  yellow: '#ffd23f',
  orange: '#ff7a3d',
  purple: '#3a1460',
  deep: '#12052a',
  white: '#fff8f0',
  green: '#39ff9c',
  red: '#ff2b4a',
};
const HEAD = '"Barlow Condensed", sans-serif';
const NEON = '"Pacifico", cursive';
const BODY = '"Inter", sans-serif';
const MONO = '"JetBrains Mono", monospace';

type Mood = 'sunset' | 'night' | 'dawn';

/* ───────────── Escenario ───────────── */
const SKY: Record<Mood, string> = {
  sunset: 'linear-gradient(180deg, #1b0b3d 0%, #5b1f7a 28%, #c2337a 50%, #ff6a3d 66%, #ffb347 74%)',
  night: 'linear-gradient(180deg, #05020f 0%, #12052a 35%, #3a0d55 58%, #a3236f 72%, #ff4d6d 76%)',
  dawn: 'linear-gradient(180deg, #2a1660 0%, #7b3fa0 30%, #ff6fa8 52%, #ffa36b 66%, #ffd27a 74%)',
};

const HORIZON = 1420;

const Palm: React.FC<{ x: number; flip?: boolean; scale?: number; sway: number }> = ({ x, flip, scale = 1, sway }) => (
  <svg width={520 * scale} height={1100 * scale} viewBox="0 0 520 1100" style={{ position: 'absolute', left: x, top: HORIZON - 1080 * scale + 40, transform: `scaleX(${flip ? -1 : 1})`, transformOrigin: 'center bottom' }}>
    <g transform={`rotate(${sway} 260 1100)`} fill="#0a0216">
      <path d="M250 1100 C 240 900, 230 700, 262 420 L 282 420 C 262 700, 274 900, 282 1100 Z" />
      {[[-150, -40], [-120, 20], [-60, 70], [30, 80], [110, 40], [160, -20], [140, -90], [-100, -100]].map(([dx, dy], i) => (
        <path key={i} d={`M272 420 Q ${272 + dx * 0.6} ${420 + dy - 120} ${272 + dx * 1.6} ${420 + dy + 60} Q ${272 + dx * 0.7} ${420 + dy - 60} 272 430 Z`} />
      ))}
    </g>
  </svg>
);

const Skyline: React.FC = () => {
  const b = [60, 120, 90, 160, 110, 200, 140, 80, 180, 130, 95, 150, 70, 120, 170, 100];
  let x = 0;
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, top: HORIZON - 220, height: 220 }}>
      {b.map((h, i) => {
        const w = 50 + ((i * 37) % 40);
        const el = <div key={i} style={{ position: 'absolute', left: x, bottom: 0, width: w, height: h, background: '#1a0630', opacity: 0.85 }}>
          {Array.from({ length: Math.floor(h / 30) }).map((_, j) => (
            <div key={j} style={{ position: 'absolute', left: 10 + (j % 2) * 18, top: 12 + j * 26, width: 8, height: 10, background: (i + j) % 3 ? V.yellow : V.pink, opacity: 0.35 }} />
          ))}
        </div>;
        x += w + 6;
        return el;
      })}
    </div>
  );
};

const Scenery: React.FC<{ mood: Mood }> = ({ mood }) => {
  const frame = useCurrentFrame();
  const sway = Math.sin(frame / 28) * 2.2;
  const sunY = HORIZON - 330 + Math.sin(frame / 90) * 6;
  return (
    <AbsoluteFill style={{ background: SKY[mood], overflow: 'hidden' }}>
      {/* Sol con franjas */}
      <div style={{
        position: 'absolute', left: 540 - 300, top: sunY, width: 600, height: 600, borderRadius: '50%',
        background: mood === 'night' ? 'linear-gradient(180deg,#ff8fb8,#ff2d95 60%)' : 'linear-gradient(180deg,#fff2a8,#ffb347 45%,#ff2d95 90%)',
        boxShadow: `0 0 160px ${mood === 'night' ? 'rgba(255,45,149,0.6)' : 'rgba(255,170,80,0.7)'}`,
        WebkitMaskImage: 'linear-gradient(180deg, #000 0 52%, transparent 52% 56%, #000 56% 63%, transparent 63% 68%, #000 68% 74%, transparent 74% 81%, #000 81% 86%, transparent 86% 94%, #000 94%)',
        maskImage: 'linear-gradient(180deg, #000 0 52%, transparent 52% 56%, #000 56% 63%, transparent 63% 68%, #000 68% 74%, transparent 74% 81%, #000 81% 86%, transparent 86% 94%, #000 94%)',
      }} />
      {mood === 'night' && Array.from({ length: 40 }).map((_, i) => (
        <div key={i} style={{ position: 'absolute', left: (i * 263) % 1080, top: (i * 131) % 700, width: 3, height: 3, borderRadius: 2, background: '#fff', opacity: 0.3 + 0.5 * Math.abs(Math.sin(frame / 20 + i)) }} />
      ))}
      <Skyline />
      {/* Mar */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: HORIZON, bottom: 0, background: 'linear-gradient(180deg, #2a0b4a 0%, #12052a 60%, #07020f 100%)' }}>
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute', left: 540 - (80 + i * 22) + Math.sin(frame / 12 + i) * 14, top: 10 + i * 30 + i * i * 1.2,
            width: (80 + i * 22) * 2, height: 4 + i * 0.4, borderRadius: 4,
            background: mood === 'night' ? V.pink : '#ffb347', opacity: 0.5 - i * 0.03,
          }} />
        ))}
      </div>
      <Palm x={-170} sway={sway} />
      <Palm x={760} flip scale={0.82} sway={-sway} />
      {/* Viñeta */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(90% 70% at 50% 45%, transparent 55%, rgba(8,2,20,0.65) 100%)' }} />
    </AbsoluteFill>
  );
};

/* ───────────── Piezas ───────────── */
const shadowHead = `5px 5px 0 ${V.pink}, 10px 10px 0 rgba(45,226,255,0.85), 0 0 40px rgba(0,0,0,0.5)`;

const Title: React.FC<{ top: string; bottom: string; at: number; size?: number; y?: number }> = ({ top, bottom, at, size = 165, y = 220 }) => {
  const t = useT();
  const a = ramp(t, at, at + 0.3);
  const b = useSpringAt(at + 0.12, { damping: 11, stiffness: 200 });
  return (
    <div style={{ position: 'absolute', left: 80, right: 60, top: y, fontFamily: HEAD, fontStyle: 'italic', fontWeight: 800, fontSize: size, lineHeight: 0.92, textTransform: 'uppercase', transform: 'skewY(-4deg)' }}>
      <div style={{ color: V.white, textShadow: shadowHead, opacity: a, transform: `translateX(${(1 - a) * -120}px)` }}>{top}</div>
      <div style={{ transform: `scale(${b})`, transformOrigin: 'left center' }}>
        <span style={{ background: `linear-gradient(180deg, ${V.yellow} 10%, ${V.orange} 55%, ${V.pink} 95%)`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', filter: `drop-shadow(5px 5px 0 #2a0b4a) drop-shadow(0 0 30px rgba(255,45,149,0.6))` }}>{bottom}</span>
      </div>
    </div>
  );
};

/** Letrero de neón que se enciende con parpadeo */
const NeonSign: React.FC<{ text: string; at: number; color: string; size?: number; style?: React.CSSProperties; font?: string }> = ({ text, at, color, size = 120, style, font = NEON }) => {
  const t = useT();
  const frame = useCurrentFrame();
  const d = t - at;
  if (d < 0) return null;
  const flick = d < 0.35 ? ([1, 0.2, 1, 0.1, 0.9, 1, 0.3, 1][Math.floor(d * 24) % 8]) : 0.92 + 0.08 * Math.sin(frame / 3);
  return (
    <div style={{
      position: 'absolute', fontFamily: font, fontSize: size, color: '#fff', whiteSpace: 'nowrap', opacity: flick,
      textShadow: `0 0 6px #fff, 0 0 16px ${color}, 0 0 34px ${color}, 0 0 70px ${color}, 0 0 120px ${color}`,
      ...style,
    }}>{text}</div>
  );
};

const NeonBox: React.FC<{ color?: string; style?: React.CSSProperties; children: React.ReactNode }> = ({ color = V.cyan, style, children }) => (
  <div style={{
    position: 'absolute', borderRadius: 30, background: 'rgba(18,5,42,0.82)', border: `3px solid ${color}`,
    boxShadow: `0 0 18px ${color}, inset 0 0 22px ${color}55, 0 30px 80px rgba(0,0,0,0.5)`, overflow: 'hidden', ...style,
  }}>{children}</div>
);

const Sticker: React.FC<{ at: number; bg: string; color?: string; rot?: number; style?: React.CSSProperties; children: React.ReactNode }> = ({ at, bg, color = '#12052a', rot = -6, style, children }) => {
  const p = useSpringAt(at, { damping: 8, stiffness: 240 });
  return (
    <div style={{ position: 'absolute', transform: `rotate(${rot * p}deg) scale(${p})`, opacity: Math.min(1, p * 2), ...style }}>
      <div style={{ background: bg, color, padding: '14px 28px', borderRadius: 12, fontFamily: HEAD, fontStyle: 'italic', fontWeight: 800, fontSize: 58, textTransform: 'uppercase', whiteSpace: 'nowrap', border: '4px solid #12052a', boxShadow: `6px 6px 0 #12052a, 0 0 40px ${bg}` }}>{children}</div>
    </div>
  );
};

/* ───────────── Escenas ───────────── */
const ROLES = [
  { at: B.manicurista, w: 'Manicurista', c: V.pink, y: 640, r: -6 },
  { at: B.peluquera, w: 'Peluquera', c: V.cyan, y: 820, r: 3 },
  { at: B.lashista, w: 'Lashista', c: V.yellow, y: 1000, r: -4 },
];

const Hook: React.FC = () => {
  const t = useT();
  const cuba = useSpringAt(B.cuba, { damping: 10 });
  const gather = ramp(t, 3.58, 4.1, 0, 1, Easing.inOut(Easing.cubic));
  return (
    <>
      <div style={{ position: 'absolute', left: 80, top: 220, fontFamily: HEAD, fontStyle: 'italic', fontWeight: 800, fontSize: 165, lineHeight: 0.92, textTransform: 'uppercase', transform: 'skewY(-4deg)' }}>
        <div style={{ color: V.white, textShadow: shadowHead, opacity: ramp(t, 0, 0.25) }}>Si eres…</div>
        <div style={{ transform: `scale(${cuba})`, transformOrigin: 'left center', marginTop: 10 }}>
          <span style={{ background: `linear-gradient(180deg, ${V.yellow} 10%, ${V.orange} 55%, ${V.pink} 95%)`, WebkitBackgroundClip: 'text', color: 'transparent', filter: 'drop-shadow(5px 5px 0 #2a0b4a) drop-shadow(0 0 30px rgba(255,45,149,0.6))' }}>…en Cuba</span>
        </div>
      </div>
      {ROLES.map((r, i) => (
        <NeonSign key={r.w} text={r.w} at={r.at} color={r.c} size={128}
          style={{ left: 110 + i * 40 + gather * (i - 1) * -30, top: r.y - gather * 20, transform: `rotate(${r.r}deg) scale(${1 + gather * 0.05})` }} />
      ))}
      <Sticker at={B.cuba + 0.15} bg={V.green} rot={-5} style={{ left: 90, top: 1215 }}>🇨🇺 Hecha para Cuba</Sticker>
      <Sticker at={4.7} bg={V.yellow} rot={6} style={{ left: 620, top: 1225 }}>👀 Ojo aquí</Sticker>
    </>
  );
};

const BUBBLES = ['¿Tienes turno?', '¿Y mañana?', '¿A qué hora?', '¿Tienes turno el sábado?', '¿Cuánto es?', 'Holaaa 👋', '¿Estás?', '¿Turno hoy?'];

const Bubble: React.FC<{ m: string; i: number }> = ({ m, i }) => {
  const t = useT();
  const at = 6.5 + i * 0.2;
  const p = useSpringAt(at, { damping: 9, stiffness: 220 });
  if (t < at) return null;
  const left = i % 2 ? 560 + (i % 3) * 40 : 60 + (i % 3) * 30;
  const top = 620 + ((i * 97) % 560) - (t - at) * 30;
  return (
    <div style={{
      position: 'absolute', left, top, transform: `scale(${p}) rotate(${i % 2 ? 6 : -6}deg)`,
      background: i % 3 === 0 ? V.cyan : i % 3 === 1 ? V.white : V.yellow, color: '#12052a', borderRadius: 26, padding: '14px 24px',
      fontFamily: BODY, fontWeight: 800, fontSize: 36, boxShadow: '5px 5px 0 #12052a', whiteSpace: 'nowrap',
    }}>{m}</div>
  );
};

const Pain: React.FC = () => {
  const t = useT();
  const frame = useCurrentFrame();
  const swap = t >= B.plantada - 0.45;
  const count = Math.round(interpolate(t, [6.5, 8.1], [3, 99], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.quad) }));
  const phoneOut = ramp(t, B.libreta - 0.4, B.libreta - 0.05, 0, 1, Easing.in(Easing.cubic));
  const lib = useSpringAt(B.libreta - 0.3, { damping: 13 });
  const libOut = ramp(t, B.plantada - 0.5, B.plantada - 0.1, 0, 1, Easing.in(Easing.cubic));
  const shake = t > 6.6 && t < 8.1 ? Math.sin(frame * 2.3) * 4 : 0;
  const phoneIn = useSpringAt(5.55, { damping: 13 });
  return (
    <>
      {!swap ? <Title at={5.75} top="Todo el día" bottom="contestando" /> : <Title at={B.plantada - 0.45} top="Y aun así" bottom="te plantan" />}

      {/* Teléfono con burbujas */}
      {phoneOut < 1 && (
        <div style={{ position: 'absolute', inset: 0, transform: `translateX(${-phoneOut * 1100}px) rotate(${-phoneOut * 20}deg)`, filter: phoneOut > 0 ? `blur(${phoneOut * 20}px)` : undefined }}>
          <NeonBox color={V.pink} style={{ left: 330, top: 640, width: 420, height: 620, borderRadius: 56, transform: `translateX(${shake}px) translateY(${(1 - phoneIn) * 900}px) rotate(${(1 - phoneIn) * -12}deg)` }}>
            <div style={{ textAlign: 'center', marginTop: 70 }}>
              <div style={{ fontFamily: MONO, fontSize: 26, color: V.cyan, letterSpacing: '0.15em' }}>WHATSAPP</div>
              <div style={{ fontFamily: HEAD, fontStyle: 'italic', fontWeight: 800, fontSize: 250, color: V.white, lineHeight: 1, textShadow: `0 0 30px ${V.pink}` }}>{count}</div>
              <div style={{ fontFamily: MONO, fontSize: 26, color: V.pink, letterSpacing: '0.12em' }}>SIN LEER</div>
            </div>
          </NeonBox>
          {BUBBLES.map((m, i) => <Bubble key={m} m={m} i={i} />)}
        </div>
      )}

      {/* Libreta */}
      {t > B.libreta - 0.35 && libOut < 1 && (
        <div style={{
          position: 'absolute', left: 150, top: 650, width: 780, height: 600, borderRadius: 18, padding: '40px 50px',
          background: '#fff6e0', backgroundImage: 'repeating-linear-gradient(#fff6e0 0 78px, #9fb8e8 78px 81px)', backgroundPositionY: 40,
          boxShadow: `10px 10px 0 #12052a, 0 0 60px ${V.cyan}`,
          transform: `translateY(${(1 - lib) * 900 + libOut * 900}px) rotate(${-5 + lib * 3 + libOut * 25}deg)`,
        }}>
          {['9:00 Daniela', '10:30 Yaima ¿o 11?', '12:00 la prima', '14:00 Yanelis', '16:00 ¿¿Mileidys??'].map((n, i) => {
            const w = ramp(t, B.libreta + i * 0.18, B.libreta + i * 0.18 + 0.3, 0, 100);
            return (
              <div key={n} style={{ position: 'relative', height: 81, display: 'flex', alignItems: 'flex-end', paddingBottom: 8 }}>
                <span style={{ clipPath: `inset(0 ${100 - w}% 0 0)`, fontFamily: NEON, fontSize: 44, color: '#2a2a6a' }}>{n}</span>
                {(i === 1 || i === 4) && <div style={{ position: 'absolute', left: 0, top: 44, height: 6, width: `${ramp(t, B.libreta + i * 0.18 + 0.4, B.libreta + i * 0.18 + 0.6, 0, 80)}%`, background: V.red, transform: 'rotate(-2deg)' }} />}
              </div>
            );
          })}
        </div>
      )}

      {/* Plantada */}
      {t > B.plantada - 0.3 && (
        <>
          <NeonBox color={V.red} style={{ left: 120, top: 700, width: 840, height: 400, padding: 44, transform: `translateY(${(1 - ramp(t, B.plantada - 0.3, B.plantada + 0.1)) * 700}px)` }}>
            <div style={{ fontFamily: MONO, fontSize: 30, color: V.cyan, letterSpacing: '0.12em' }}>SÁBADO · 14:00</div>
            <div style={{ fontFamily: HEAD, fontStyle: 'italic', fontWeight: 800, fontSize: 130, color: V.white, lineHeight: 1.05, marginTop: 10 }}>YANELIS</div>
            <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 36, color: '#c8b8e8' }}>Uñas acrílicas · 1.000 CUP</div>
          </NeonBox>
          <NeonSign text="NO VINO" at={B.noVino} color={V.red} size={150} font={HEAD}
            style={{ left: 380, top: 1000, fontStyle: 'italic', fontWeight: 800, transform: 'rotate(-8deg)' }} />
        </>
      )}
    </>
  );
};

const SLOTS = [
  { h: '9:00', busy: true }, { h: '10:30', busy: false }, { h: '12:00', busy: true },
  { h: '14:00', busy: false }, { h: '15:30', busy: false }, { h: '17:00', busy: true },
];

const Solution: React.FC = () => {
  const t = useT();
  const phone = useSpringAt(12.5, { damping: 14 });
  const tap = ramp(t, B.reservan, B.reservan + 0.35);
  const booked = useSpringAt(B.reservan + 0.6, { damping: 12 });
  const logoP = useSpringAt(B.citora + 0.15, { damping: 8 });
  return (
    <>
      <div style={{ position: 'absolute', left: 80, top: 210, fontFamily: HEAD, fontStyle: 'italic', fontWeight: 800, fontSize: 140, textTransform: 'uppercase', color: V.white, textShadow: shadowHead, transform: 'skewY(-4deg)', opacity: ramp(t, 12.12, 12.4) }}>Por eso creé</div>
      <NeonSign text="Citora" at={B.citora - 0.05} color={V.pink} size={190} style={{ left: 90, top: 330, transform: 'rotate(-6deg)' }} />
      {t > B.citora && <div style={{ position: 'absolute', left: 700, top: 360, transform: `scale(${logoP}) rotate(8deg)`, filter: `drop-shadow(0 0 30px ${V.pink})` }}><Logo size={170} /></div>}

      <NeonBox color={V.cyan} style={{ left: 250, top: 640, width: 580, height: 660, borderRadius: 60, padding: 36, transform: `translateY(${(1 - phone) * 800}px) rotate(${(1 - phone) * 15}deg)` }}>
        <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 36, color: V.white }}>Daniela Nails 💅</div>
        <div style={{ fontFamily: MONO, fontSize: 24, color: V.pink, letterSpacing: '0.12em', marginTop: 10 }}>ELIGE TU HORA · JUEVES</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 26 }}>
          {SLOTS.map((s, i) => {
            const lit = !s.busy ? ramp(t, B.horarios + i * 0.12, B.horarios + i * 0.12 + 0.25) : 0;
            const chosen = s.h === '14:00' && tap > 0;
            return (
              <div key={s.h} style={{
                height: 92, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
                fontFamily: MONO, fontWeight: 700, fontSize: 38,
                background: chosen ? V.pink : 'rgba(255,255,255,0.04)',
                border: `3px solid ${chosen ? V.pink : s.busy ? 'rgba(255,255,255,0.08)' : V.green}`,
                boxShadow: !s.busy && lit > 0 ? `0 0 ${lit * 24}px ${chosen ? V.pink : V.green}` : 'none',
                color: s.busy ? 'rgba(255,255,255,0.2)' : V.white, textDecoration: s.busy ? 'line-through' : 'none',
                opacity: s.busy ? 1 : 0.4 + 0.6 * lit,
              }}>
                {s.h}
                {chosen && tap < 1 && <div style={{ position: 'absolute', width: 60 + tap * 180, height: 60 + tap * 180, borderRadius: '50%', border: '5px solid #fff', opacity: 1 - tap }} />}
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 28, height: 96, borderRadius: 22, background: `linear-gradient(90deg, ${V.pink}, ${V.orange})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: HEAD, fontStyle: 'italic', fontWeight: 800, fontSize: 52, color: '#fff', textTransform: 'uppercase' }}>Reservar 14:00</div>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(18,5,42,0.96)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: Math.min(1, booked * 1.5) }}>
          <div style={{ fontSize: 150, transform: `scale(${booked}) rotate(${(1 - booked) * -30}deg)`, filter: `drop-shadow(0 0 30px ${V.green})` }}>✅</div>
          <div style={{ fontFamily: HEAD, fontStyle: 'italic', fontWeight: 800, fontSize: 96, color: V.green, textShadow: `0 0 30px ${V.green}`, textTransform: 'uppercase' }}>¡Reservado!</div>
        </div>
      </NeonBox>
      <Sticker at={B.sinEscribirte} bg={V.green} rot={7} style={{ left: 470, top: 1225 }}>✕ Sin escribirte</Sticker>
    </>
  );
};

const AGENDA = [
  { h: '9:00', n: 'Daniela', c: V.pink }, { h: '10:30', n: 'Yaima', c: V.cyan }, { h: '12:00', n: 'Lisandra', c: V.yellow },
  { h: '14:00', n: 'Yanelis', c: V.pink }, { h: '16:00', n: 'Mileidys', c: V.cyan },
];

const Agenda: React.FC = () => {
  const t = useT();
  const toast = useSpringAt(B.telefono, { damping: 13 });
  const toastOut = ramp(t, B.telefono + 1.0, B.telefono + 1.3);
  return (
    <>
      <Title at={19.0} top="Tu día" bottom="organizado" />
      {AGENDA.map((a, i) => {
        const p = useSpringAt(19.5 + i * 0.26, { damping: 13 });
        return (
          <NeonBox key={a.h} color={a.c} style={{ left: 110 + (i % 2) * 30, top: 640 + i * 118, width: 820, height: 100, borderRadius: 22, display: 'flex', alignItems: 'center', gap: 30, padding: '0 34px', transform: `translateX(${(1 - p) * (i % 2 ? 1100 : -1100)}px) rotate(${i % 2 ? 1 : -1}deg)` }}>
            <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 38, color: a.c, width: 130 }}>{a.h}</div>
            <div style={{ fontFamily: HEAD, fontStyle: 'italic', fontWeight: 800, fontSize: 60, color: V.white, flex: 1, textTransform: 'uppercase' }}>{a.n}</div>
            <div style={{ fontSize: 46 }}>✅</div>
          </NeonBox>
        );
      })}
      <div style={{
        position: 'absolute', left: 80, right: 80, top: 70, borderRadius: 30, padding: '24px 30px', background: 'rgba(18,5,42,0.92)', border: `3px solid ${V.pink}`,
        boxShadow: `0 0 30px ${V.pink}`, display: 'flex', gap: 22, alignItems: 'center', transform: `translateY(${(1 - toast) * -260 - toastOut * 260}px)`,
      }}>
        <Logo size={72} />
        <div>
          <div style={{ fontFamily: MONO, fontSize: 22, color: V.cyan, letterSpacing: '0.12em' }}>CITORA · AHORA</div>
          <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 34, color: V.white, marginTop: 4 }}>Nueva reserva: Mileidys · 16:00</div>
        </div>
      </div>
      <Sticker at={B.organizado + 0.1} bg={V.yellow} rot={-7} style={{ left: 560, top: 1240 }}>✓ Día lleno</Sticker>
    </>
  );
};

const Cta: React.FC = () => {
  const t = useT();
  const frame = useCurrentFrame();
  const word = 'SALÓN';
  const typed = Math.floor(ramp(t, B.salon, B.salon + 0.6, 0, word.length, Easing.linear));
  const sent = t >= B.salon + 1.0;
  const send = useSpringAt(B.salon + 1.0, { damping: 12 });
  const dm = useSpringAt(B.info, { damping: 13 });
  const bar = useSpringAt(22.15, { damping: 15 });
  const caret = Math.floor(frame / 8) % 2 === 0;
  return (
    <>
      <Title at={22.1} top="Comenta" bottom="salón" size={210} />
      <div style={{ position: 'absolute', left: 860, top: 560 + Math.abs(Math.sin(frame / 6)) * 40, fontSize: 120, opacity: ramp(t, B.salon + 0.3, B.salon + 0.6) }}>👇</div>
      <NeonBox color={V.cyan} style={{ left: 80, top: 720, width: 920, height: 130, borderRadius: 65, padding: '0 30px', display: 'flex', alignItems: 'center', gap: 22, transform: `translateY(${(1 - bar) * 400}px)` }}>
        <div style={{ width: 76, height: 76, borderRadius: 38, background: `linear-gradient(135deg, ${V.cyan}, ${V.pink})` }} />
        <div style={{ flex: 1, fontFamily: BODY, fontWeight: 800, fontSize: 50, color: V.white }}>
          {sent ? <span style={{ color: '#9a8ab8', fontWeight: 600, fontSize: 38 }}>Añade un comentario…</span> : <>{word.slice(0, typed)}{caret && <span style={{ color: V.pink }}>|</span>}</>}
        </div>
        <div style={{ width: 84, height: 84, borderRadius: 42, background: typed === word.length ? V.pink : 'rgba(255,255,255,0.1)', boxShadow: typed === word.length ? `0 0 24px ${V.pink}` : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${1 + 0.25 * Math.sin(send * Math.PI)})` }}>
          <svg width="40" height="40" viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      </NeonBox>
      {sent && (
        <NeonBox color={V.yellow} style={{ left: 80, top: 890, width: 920, height: 140, padding: '26px 34px', transform: `translateY(${(1 - send) * -100}px)`, opacity: send }}>
          <div style={{ fontFamily: MONO, fontSize: 22, color: V.yellow, letterSpacing: '0.12em' }}>TÚ · AHORA</div>
          <div style={{ fontFamily: HEAD, fontStyle: 'italic', fontWeight: 800, fontSize: 60, color: V.white }}>SALÓN 🙋‍♀️</div>
        </NeonBox>
      )}
      <NeonBox color={V.pink} style={{ left: 80, top: 1065, width: 920, height: 200, padding: '26px 34px', transform: `translateY(${(1 - dm) * 600}px)`, opacity: Math.min(1, dm * 2) }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Logo size={48} />
          <div style={{ fontFamily: MONO, fontSize: 22, color: V.pink, letterSpacing: '0.12em' }}>MENSAJE PRIVADO · CITORA_RESERVAS</div>
        </div>
        <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 42, color: V.white, marginTop: 18 }}>¡Hola! Te paso toda la info 📩</div>
      </NeonBox>
    </>
  );
};

/* ───────────── Montaje ───────────── */
const FLASH = 0.16;

const ViceScene: React.FC<{ from: number; to: number; mood: Mood; first?: boolean; last?: boolean; children: React.ReactNode }> = ({ from, to, mood, first, last, children }) => {
  const frame = useCurrentFrame();
  const t = frame / FPS + from;
  const zoom = 1.04 + ramp(t, from, to, 0, 0.06, Easing.linear);
  const punchIn = first ? 1 : ramp(t, from, from + 0.25, 1.12, 1, Easing.out(Easing.cubic));
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ transform: `scale(${zoom * 0.98})` }}><Scenery mood={mood} /></AbsoluteFill>
      <AbsoluteFill style={{ transform: `scale(${punchIn})` }}>
        <Sequence from={-s2f(from)} layout="none">{children}</Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Flashes: React.FC = () => {
  const t = useT();
  const cuts = [SCENES.pain[0], SCENES.solution[0], SCENES.agenda[0], SCENES.cta[0]];
  let a = 0;
  cuts.forEach((c) => { const d = t - c; if (d >= -0.04 && d < FLASH) a = Math.max(a, 1 - Math.max(0, d) / FLASH); });
  return <AbsoluteFill style={{ background: `linear-gradient(180deg, ${V.pink}, ${V.yellow})`, opacity: a * 0.85, mixBlendMode: 'screen' }} />;
};

const Captions: React.FC = () => {
  const t = useT();
  let idx = -1;
  CAPTIONS.forEach((c, i) => { if (t >= c[0].t - 0.05) idx = i; });
  if (idx < 0) return null;
  return (
    <div style={{ position: 'absolute', left: 80, right: 130, top: 1330, fontFamily: HEAD, fontStyle: 'italic', fontWeight: 800, fontSize: 72, lineHeight: 1.05, textTransform: 'uppercase' }}>
      {CAPTIONS[idx].map((w, i) => {
        const p = ramp(t, w.t - 0.04, w.t + 0.1);
        return (
          <span key={i} style={{
            display: 'inline-block', marginRight: 18, opacity: p, transform: `translateY(${(1 - p) * 18}px) scale(${0.9 + 0.1 * p})`,
            color: w.hl ? V.yellow : V.white, textShadow: `4px 4px 0 #12052a, 0 0 20px ${w.hl ? V.pink : 'rgba(0,0,0,0.6)'}`,
          }}>{w.w}</span>
        );
      })}
    </div>
  );
};

/** Grano + líneas de vídeo + bandas de cine */
const Finish: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <>
      <AbsoluteFill style={{ background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.12) 0 2px, transparent 2px 5px)', opacity: 0.35, pointerEvents: 'none' }} />
      <svg style={{ position: 'absolute', inset: 0, opacity: 0.09, mixBlendMode: 'overlay' }} width="1080" height="1920">
        <filter id="vn"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={frame % 9} /></filter>
        <rect width="100%" height="100%" filter="url(#vn)" />
      </svg>
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(255,45,149,0.10), transparent 30%, transparent 70%, rgba(45,226,255,0.10))', mixBlendMode: 'screen' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 48, background: '#000' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 48, background: '#000' }} />
    </>
  );
};

export const PromoVice: React.FC = () => {
  const order = [
    { k: 'hook', C: Hook, mood: 'sunset' as Mood },
    { k: 'pain', C: Pain, mood: 'night' as Mood },
    { k: 'solution', C: Solution, mood: 'dawn' as Mood },
    { k: 'agenda', C: Agenda, mood: 'sunset' as Mood },
    { k: 'cta', C: Cta, mood: 'night' as Mood },
  ] as const;
  return (
    <AbsoluteFill style={{ background: V.deep }}>
      {order.map((s, i) => {
        const [from, to] = SCENES[s.k];
        return (
          <Sequence key={s.k} from={s2f(from)} durationInFrames={s2f(to - from)}>
            <ViceScene from={from} to={to} mood={s.mood} first={i === 0} last={i === order.length - 1}><s.C /></ViceScene>
          </Sequence>
        );
      })}
      <Flashes />
      <Captions />
      <Finish />
      {AUDIO_FILE && <Audio src={staticFile(AUDIO_FILE)} />}
      {SFX.map((x, i) => (
        <Sequence key={i} from={s2f(x.t)} layout="none"><Audio src={staticFile(`sfx/${x.f}.wav`)} volume={x.v ?? 0.5} /></Sequence>
      ))}
    </AbsoluteFill>
  );
};
