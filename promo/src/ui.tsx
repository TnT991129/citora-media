import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from 'remotion';
import { FPS } from './timing';

export const C = {
  coral: '#f0532e',
  coralSoft: '#ff8360',
  ink: '#0d0a09',
  card: 'rgba(34,27,25,0.92)',
  cardLine: 'rgba(255,255,255,0.09)',
  cream: '#f1ede6',
  textDark: '#191311',
  muted: '#9b918a',
  green: '#3ddc84',
  red: '#ff3b30',
};

export const FONT_HEAD = '"Barlow Condensed", sans-serif';
export const FONT_MONO = '"JetBrains Mono", monospace';
export const FONT_BODY = '"Inter", sans-serif';

export const s2f = (s: number) => Math.round(s * FPS);

/** Spring que empieza en el segundo absoluto `at` */
export const useSpringAt = (at: number, cfg: { damping?: number; mass?: number; stiffness?: number } = {}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - s2f(at), fps, config: { damping: 14, mass: 0.7, stiffness: 170, ...cfg } });
};

export const useT = () => useCurrentFrame() / FPS;

export const ramp = (t: number, a: number, b: number, from = 0, to = 1, ease = Easing.out(Easing.cubic)) =>
  interpolate(t, [a, b], [from, to], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease });

/** Titular grande de dos líneas: blanca/oscura + coral */
export const Headline: React.FC<{
  top: React.ReactNode; bottom: React.ReactNode; light?: boolean; at: number; size?: number; y?: number;
}> = ({ top, bottom, light, at, size = 150, y = 250 }) => {
  const t = useT();
  const a = ramp(t, at, at + 0.35);
  const b = ramp(t, at + 0.12, at + 0.5);
  const line = (p: number): React.CSSProperties => ({
    display: 'block',
    transform: `translateY(${(1 - p) * 60}px)`,
    opacity: p,
    filter: `blur(${(1 - p) * 14}px)`,
  });
  return (
    <div style={{
      position: 'absolute', left: 96, right: 80, top: y, fontFamily: FONT_HEAD, fontWeight: 800,
      fontSize: size, lineHeight: 0.9, textTransform: 'uppercase', letterSpacing: '-0.01em',
    }}>
      <span style={{ ...line(a), color: light ? C.textDark : C.cream }}>{top}</span>
      <span style={{ ...line(b), color: C.coral }}>{bottom}</span>
    </div>
  );
};

/** Tarjeta oscura tipo interfaz */
export const Card: React.FC<{ style?: React.CSSProperties; glow?: boolean; children: React.ReactNode }> = ({ style, glow, children }) => (
  <div style={{
    position: 'absolute', background: C.card, borderRadius: 36,
    border: `2px solid ${glow ? 'rgba(240,83,46,0.75)' : C.cardLine}`,
    boxShadow: glow
      ? '0 0 0 1px rgba(240,83,46,0.25), 0 30px 80px rgba(0,0,0,0.55), 0 0 90px rgba(240,83,46,0.28)'
      : '0 30px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
    overflow: 'hidden', ...style,
  }}>{children}</div>
);

export const Label: React.FC<{ children: React.ReactNode; color?: string; size?: number; style?: React.CSSProperties }> = ({ children, color = C.muted, size = 30, style }) => (
  <div style={{ fontFamily: FONT_MONO, fontSize: size, letterSpacing: '0.12em', textTransform: 'uppercase', color, ...style }}>{children}</div>
);

export const Chip: React.FC<{ children: React.ReactNode; bg: string; color?: string; style?: React.CSSProperties }> = ({ children, bg, color = '#08130c', style }) => (
  <div style={{
    display: 'inline-flex', alignItems: 'center', gap: 12, padding: '12px 24px', borderRadius: 14,
    background: bg, color, fontFamily: FONT_MONO, fontWeight: 700, fontSize: 30, letterSpacing: '0.1em', textTransform: 'uppercase',
    ...style,
  }}>{children}</div>
);

/** Logo de Citora (calendario con check) */
export const Logo: React.FC<{ size?: number; style?: React.CSSProperties }> = ({ size = 90, style }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" style={style}>
    <defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fb7185" /><stop offset="1" stopColor="#fb923c" /></linearGradient></defs>
    <rect width="64" height="64" rx="16" fill="url(#lg)" />
    <rect x="15" y="16" width="34" height="34" rx="7" fill="#fff" />
    <path d="M15 23a7 7 0 0 1 7-7h20a7 7 0 0 1 7 7v3H15z" fill="#e8491f" />
    <rect x="22" y="11" width="4" height="10" rx="2" fill="#fff" />
    <rect x="38" y="11" width="4" height="10" rx="2" fill="#fff" />
    <path d="M23 39l7 7 13-15" fill="none" stroke="#f0532e" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** El logo como "compañero": asoma en la esquina de una tarjeta y rebota */
export const Buddy: React.FC<{ at: number; x: number; y: number; size?: number }> = ({ at, x, y, size = 96 }) => {
  const frame = useCurrentFrame();
  const p = useSpringAt(at, { damping: 9, stiffness: 200 });
  const bob = Math.sin(frame / 7) * 5;
  return (
    <div style={{ position: 'absolute', left: x, top: y + bob, transform: `scale(${p}) rotate(${(1 - p) * -40 + Math.sin(frame / 11) * 4}deg)`, filter: 'drop-shadow(0 10px 24px rgba(240,83,46,0.5))' }}>
      <Logo size={size} />
    </div>
  );
};

/** Fondo: oscuro con brillo cálido o crema con viñeta */
export const Bg: React.FC<{ light?: boolean }> = ({ light }) => {
  const frame = useCurrentFrame();
  const gx = 60 + Math.sin(frame / 50) * 12;
  const gy = 45 + Math.cos(frame / 60) * 8;
  return light ? (
    <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(120% 80% at 50% 40%, #f7f4ef 0%, #ebe6de 55%, #cfc8bf 100%)` }} />
  ) : (
    <div style={{ position: 'absolute', inset: 0, background: C.ink }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(60% 40% at ${gx}% ${gy}%, rgba(240,83,46,0.20) 0%, rgba(240,83,46,0.06) 40%, transparent 70%)` }} />
      <div style={{ position: 'absolute', left: 820, top: 640 + Math.sin(frame / 30) * 10, width: 26, height: 26, borderRadius: 13, background: C.coral, opacity: 0.35, filter: 'blur(6px)' }} />
      <div style={{ position: 'absolute', left: 120, top: 1500, width: 18, height: 18, borderRadius: 9, background: C.coral, opacity: 0.2, filter: 'blur(5px)' }} />
    </div>
  );
};

/** Grano fino encima de todo para que no se vea "plano" */
export const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <svg style={{ position: 'absolute', inset: 0, opacity: 0.07, mixBlendMode: 'overlay', pointerEvents: 'none' }} width="1080" height="1920">
      <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={frame % 8} /></filter>
      <rect width="100%" height="100%" filter="url(#n)" />
    </svg>
  );
};
