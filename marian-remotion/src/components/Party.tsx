import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";

const INK = C.ink;

export const Cake: React.FC<{ w?: number }> = ({ w = 420 }) => (
  <svg viewBox="0 0 300 330" width={w} height={(w * 330) / 300}>
    <rect x={30} y={210} width={240} height={100} rx={16} fill="#F7C1D0" stroke={INK} strokeWidth={6} />
    <rect x={60} y={120} width={180} height={95} rx={14} fill="#fff" stroke={INK} strokeWidth={6} />
    <rect x={95} y={50} width={110} height={75} rx={12} fill="#F2A7BE" stroke={INK} strokeWidth={6} />
    {[30, 60, 90, 120, 150, 180, 210, 240].map((x) => <circle key={x} cx={x + 15} cy={212} r={9} fill="#fff" stroke={INK} strokeWidth={3} />)}
    <text x={150} y={182} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={44} fill={C.pinkDark}>15</text>
    <path d="M150 50 L150 20" stroke={INK} strokeWidth={6} />
    <path d="M150 20 Q140 6 150 -6 Q160 6 150 20" fill="#FFD43B" stroke={INK} strokeWidth={3} />
    <rect x={10} y={306} width={280} height={18} rx={9} fill="#ddd" stroke={INK} strokeWidth={5} />
  </svg>
);

export const Speaker: React.FC = () => {
  const f = useCurrentFrame();
  const k = 1 + Math.abs(Math.sin(f * 0.9)) * 0.06;
  return (
    <div style={{ position: "relative" }}>
      <svg viewBox="0 0 200 320" width={220} height={352} style={{ scale: k }}>
        <rect x={10} y={10} width={180} height={300} rx={20} fill="#2E2E2E" stroke={INK} strokeWidth={6} />
        <circle cx={100} cy={200} r={66} fill="#555" stroke="#888" strokeWidth={6} />
        <circle cx={100} cy={200} r={22} fill="#888" />
        <circle cx={100} cy={80} r={34} fill="#555" stroke="#888" strokeWidth={5} />
      </svg>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ position: "absolute", left: 160 + i * 40, top: 40 - ((f * 3 + i * 30) % 90), fontSize: 64, opacity: 1 - ((f * 3 + i * 30) % 90) / 90 }}>🎵</div>
      ))}
    </div>
  );
};

/** Corona para la quinceañera (va encima de la cabeza). */
export const Crown: React.FC<{ w?: number }> = ({ w = 140 }) => (
  <svg viewBox="0 0 120 70" width={w} height={(w * 70) / 120}>
    <path d="M8 62 L8 20 L34 40 L60 6 L86 40 L112 20 L112 62 Z" fill="#FFD43B" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    <circle cx={60} cy={40} r={7} fill={C.pinkDark} />
  </svg>
);

/** Cono de luz de la linterna del móvil, desde (x, y) hacia abajo. */
export const Flashlight: React.FC<{ x: number; y: number; angle?: number }> = ({ x, y, angle = 0 }) => {
  const f = useCurrentFrame();
  const wob = Math.sin(f / 9) * 2;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 0, height: 0, rotate: `${angle + wob}deg` }}>
      <div style={{ position: "absolute", left: -260, top: 0, width: 520, height: 900, background: "linear-gradient(rgba(255,248,200,0.75), rgba(255,248,200,0.08))", clipPath: "polygon(46% 0, 54% 0, 100% 100%, 0 100%)" }} />
      <div style={{ position: "absolute", left: -18, top: -30, width: 36, height: 60, background: "#333", border: "4px solid #fff", borderRadius: 8 }} />
    </div>
  );
};

/** Abanico de cartón que se mueve. */
export const CartonFan: React.FC = () => {
  const f = useCurrentFrame();
  return <div style={{ width: 150, height: 110, background: "#C9A672", border: `6px solid ${INK}`, borderRadius: 10, rotate: `${Math.sin(f * 0.8) * 25}deg`, transformOrigin: "50% 100%" }} />;
};

/** Muestra de color de esmalte. */
export const Swatch: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 18, background: "#fff", border: `6px solid ${INK}`, borderRadius: 999, padding: "14px 30px 14px 14px", fontFamily: FONT, fontWeight: 900, fontSize: 44 }}>
    <div style={{ width: 70, height: 70, borderRadius: 35, background: color, border: `5px solid ${INK}` }} />
    {label}
  </div>
);

/** Bailar: balanceo alrededor de los pies del personaje (x = su posición). */
export const Dance: React.FC<{ children: React.ReactNode; x: number; ground: number }> = ({ children, x, ground }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: "absolute", inset: 0, rotate: `${Math.sin(f * 0.5) * 8}deg`, translate: `0 ${Math.abs(Math.sin(f * 0.5)) * -18}px`, transformOrigin: `${x}px ${ground}px` }}>
      {children}
    </div>
  );
};

/** Desfile: los hijos cruzan la pantalla. */
export const March: React.FC<{ children: React.ReactNode; dur?: number }> = ({ children, dur = 110 }) => {
  const f = useCurrentFrame();
  return <div style={{ position: "absolute", inset: 0, translate: `${interpolate(f, [0, dur], [-500, 500])}px 0` }}>{children}</div>;
};

export const UvLamp: React.FC<{ on?: boolean }> = ({ on = true }) => (
  <svg viewBox="0 0 300 200" width={360} height={240}>
    {on && <ellipse cx={150} cy={170} rx={120} ry={22} fill="#B39DFF" opacity={0.6} />}
    <path d="M30 170 Q30 40 150 40 Q270 40 270 170 Z" fill="#fff" stroke={INK} strokeWidth={7} />
    <rect x={70} y={120} width={160} height={22} rx={8} fill={on ? "#9B7FD4" : "#ccc"} />
    <rect x={20} y={166} width={260} height={16} rx={8} fill="#ddd" stroke={INK} strokeWidth={5} />
  </svg>
);
