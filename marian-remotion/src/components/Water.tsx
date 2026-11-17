import React from "react";
import { useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";

const INK = C.ink;

export const Bucket: React.FC<{ w?: number; color?: string; label?: string; full?: boolean }> = ({ w = 150, color = "#3E7CC9", label, full }) => (
  <svg viewBox="0 0 120 130" width={w} height={(w * 130) / 120} style={{ overflow: "visible" }}>
    <path d="M20 30 Q60 -10 100 30" stroke={INK} strokeWidth={5} fill="none" />
    <path d="M14 34 L106 34 L94 124 L26 124 Z" fill={color} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    {full && <ellipse cx={60} cy={36} rx={44} ry={8} fill="#BDE5F5" stroke={INK} strokeWidth={3} />}
    {label && (
      <text x={60} y={92} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={26} fill="#fff">
        {label}
      </text>
    )}
  </svg>
);

/** Pomo plástico (botella de agua). */
export const Pomo: React.FC<{ w?: number }> = ({ w = 60 }) => (
  <svg viewBox="0 0 40 100" width={w} height={w * 2.5}>
    <rect x={14} y={2} width={12} height={12} fill="#3E7CC9" stroke={INK} strokeWidth={3} />
    <path d="M10 14 L30 14 L36 30 L36 96 L4 96 L4 30 Z" fill="#DDF1F8" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
  </svg>
);

/** La pipa: camión cisterna de agua. */
export const WaterTruck: React.FC<{ w?: number }> = ({ w = 900 }) => (
  <svg viewBox="0 0 700 330" width={w} height={(w * 330) / 700}>
    <rect x={20} y={70} width={440} height={170} rx={80} fill="#DDE6EE" stroke={INK} strokeWidth={8} />
    <text x={240} y={175} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={64} fill="#3E7CC9">AGUA</text>
    <path d="M470 110 L590 110 L660 180 L660 250 L470 250 Z" fill="#E9C46A" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
    <path d="M500 125 L580 125 L630 175 L500 175 Z" fill="#D8EEFF" stroke={INK} strokeWidth={5} />
    <rect x={10} y={240} width={660} height={26} fill="#555" stroke={INK} strokeWidth={6} />
    {[110, 330, 560].map((x) => (
      <g key={x}>
        <circle cx={x} cy={278} r={42} fill={INK} />
        <circle cx={x} cy={278} r={15} fill="#bbb" />
      </g>
    ))}
    <path d="M30 200 L-10 230 L-10 260" stroke={INK} strokeWidth={10} fill="none" />
  </svg>
);

/** Bañadera cargada entre dos (va entre dos personajes). */
export const Bathtub: React.FC<{ w?: number }> = ({ w = 520 }) => {
  const f = useCurrentFrame();
  return (
    <svg viewBox="0 0 400 160" width={w} height={(w * 160) / 400} style={{ rotate: `${Math.sin(f / 6) * 2}deg` }}>
      <path d="M10 30 L390 30 Q380 140 300 140 L100 140 Q20 140 10 30 Z" fill="#fff" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <path d="M10 30 L390 30" stroke={INK} strokeWidth={12} />
      <path d="M90 140 L80 158 M310 140 L320 158" stroke={INK} strokeWidth={8} strokeLinecap="round" />
    </svg>
  );
};

/** Tanque de agua (de azotea), lleno o vacío. */
export const Tank: React.FC<{ level?: number }> = ({ level = 0.2 }) => (
  <svg viewBox="0 0 260 300" width={300} height={346}>
    <rect x={30} y={30} width={200} height={240} rx={20} fill="#fff" stroke={INK} strokeWidth={8} />
    <rect x={38} y={38 + 224 * (1 - level)} width={184} height={224 * level} rx={12} fill="#7FC8E8" />
    <rect x={20} y={14} width={220} height={30} rx={10} fill="#ddd" stroke={INK} strokeWidth={6} />
    <text x={130} y={170} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={44} fill={INK}>{Math.round(level * 100)}%</text>
  </svg>
);

/** Soplo de aire que sale de la llave. */
export const Puff: React.FC = () => {
  const f = useCurrentFrame();
  return <div style={{ fontSize: 120, translate: `${(f * 3) % 60}px 0`, opacity: 1 - ((f * 3) % 60) / 80 }}>💨</div>;
};
