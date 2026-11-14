import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { C, FONT, GROUND } from "../theme";

/** Playa: cielo, mar y arena, detrás de todo. `sunset` la vuelve naranja. */
export const Beach: React.FC<{ sunset?: boolean }> = ({ sunset }) => (
  <div style={{ position: "absolute", inset: 0 }}>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 1250, background: sunset ? "linear-gradient(#F7A35C, #F7D08A)" : "linear-gradient(#BDE5F5, #E6F6FB)" }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 1150, height: 260, background: sunset ? "#5B8DB0" : "#4FB3D9", borderTop: `6px solid ${C.ink}` }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 1400, bottom: 0, background: "#F2DDA8", borderTop: `6px solid ${C.ink}` }} />
  </div>
);

export const Sun: React.FC<{ size?: number; face?: boolean }> = ({ size = 260, face }) => {
  const f = useCurrentFrame();
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} style={{ rotate: `${f * 0.6}deg` }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <path key={i} d="M100 6 L100 30" stroke="#F5A623" strokeWidth={8} strokeLinecap="round" transform={`rotate(${i * 30} 100 100)`} />
      ))}
      <circle cx={100} cy={100} r={56} fill="#FFD43B" stroke={C.ink} strokeWidth={6} />
      {face && (
        <g>
          <path d="M78 96 L92 96 M108 96 L122 96" stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
          <path d="M84 118 Q100 128 116 118" stroke={C.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
};

/** Almendrón: carro americano viejo. `heads` cabezas en las ventanas, `hen` la gallina. */
export const Almendron: React.FC<{ heads?: number; hen?: boolean; w?: number }> = ({ heads = 0, hen, w = 760 }) => (
  <svg viewBox="0 0 600 300" width={w} height={w / 2}>
    <path d="M30 200 L40 150 Q60 120 120 115 L190 70 Q210 58 260 58 L380 58 Q420 58 440 80 L480 118 Q560 122 575 160 L580 200 Z" fill="#E86A5C" stroke={C.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M205 80 L250 72 L250 118 L180 118 Z M265 72 L370 72 Q395 74 410 92 L432 118 L265 118 Z" fill="#D8EEFF" stroke={C.ink} strokeWidth={5} />
    {Array.from({ length: Math.min(heads, 6) }).map((_, i) => (
      <circle key={i} cx={215 + i * 36} cy={104} r={15} fill="#fff" stroke={C.ink} strokeWidth={4} />
    ))}
    {hen && (
      <g transform="translate(385 78)">
        <ellipse cx={14} cy={30} rx={20} ry={16} fill="#fff" stroke={C.ink} strokeWidth={4} />
        <circle cx={26} cy={14} r={9} fill="#fff" stroke={C.ink} strokeWidth={4} />
        <path d="M24 4 l4 -8 l4 8" fill={C.red} stroke={C.ink} strokeWidth={2} />
        <path d="M34 15 l9 3 l-9 3 Z" fill={C.orange} />
      </g>
    )}
    <path d="M30 200 L580 200" stroke={C.ink} strokeWidth={7} />
    <circle cx={140} cy={210} r={38} fill={C.ink} />
    <circle cx={140} cy={210} r={14} fill="#bbb" />
    <circle cx={470} cy={210} r={38} fill={C.ink} />
    <circle cx={470} cy={210} r={14} fill="#bbb" />
    <rect x={560} y={168} width={22} height={14} fill="#FFE066" stroke={C.ink} strokeWidth={3} />
  </svg>
);

export const Driving: React.FC<{ children: React.ReactNode; from?: number; to?: number; y?: number; dur?: number }> = ({ children, from = -200, to = 1280, y = 1380, dur = 90 }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: "absolute", top: y, left: interpolate(f, [0, dur], [from, to]), translate: "-50% -50%", rotate: `${Math.sin(f * 0.8) * 1.2}deg` }}>
      {children}
    </div>
  );
};

/** Gallina sola (con gafas de sol si `shades`). */
export const Hen: React.FC<{ size?: number; shades?: boolean }> = ({ size = 280, shades }) => (
  <svg viewBox="0 0 120 120" width={size} height={size}>
    <ellipse cx={55} cy={74} rx={40} ry={30} fill="#fff" stroke={C.ink} strokeWidth={5} />
    <path d="M20 66 Q6 52 18 40" fill="#fff" stroke={C.ink} strokeWidth={5} />
    <circle cx={82} cy={40} r={18} fill="#fff" stroke={C.ink} strokeWidth={5} />
    <path d="M76 22 l5 -12 l6 12 l5 -10 l4 12" fill={C.red} stroke={C.ink} strokeWidth={3} />
    <path d="M99 40 l14 5 l-14 5 Z" fill={C.orange} stroke={C.ink} strokeWidth={2} />
    {shades ? <rect x={74} y={32} width={26} height={11} rx={4} fill={C.ink} /> : <circle cx={88} cy={37} r={3.5} fill={C.ink} />}
    <path d="M45 104 L45 116 M65 104 L65 116" stroke={C.orange} strokeWidth={5} strokeLinecap="round" />
  </svg>
);

export const Parada: React.FC = () => (
  <svg viewBox="0 0 200 600" width={200} height={600}>
    <path d="M100 120 L100 600" stroke={C.ink} strokeWidth={12} />
    <rect x={20} y={20} width={160} height={110} rx={14} fill="#3E7CC9" stroke={C.ink} strokeWidth={7} />
    <text x={100} y={92} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={40} fill="#fff">PARADA</text>
  </svg>
);

export const KitBag: React.FC = () => (
  <svg viewBox="0 0 260 220" width={300} height={254}>
    <path d="M90 50 Q90 14 130 14 Q170 14 170 50" fill="none" stroke={C.ink} strokeWidth={9} />
    <rect x={20} y={50} width={220} height={150} rx={24} fill={C.pink} stroke={C.ink} strokeWidth={7} />
    <path d="M130 90 L130 160 M95 125 L165 125" stroke="#fff" strokeWidth={18} strokeLinecap="round" />
    <text x={130} y={190} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={26} fill={C.ink}>POR SI ACASO</text>
  </svg>
);

/** Frasco (esmalte o acetona). `empty` lo deja vacío. */
export const Bottle: React.FC<{ label: string; color?: string; empty?: boolean; sand?: boolean }> = ({ label, color = C.pink, empty, sand }) => (
  <svg viewBox="0 0 200 320" width={240} height={384}>
    <rect x={70} y={10} width={60} height={70} rx={8} fill={C.ink} />
    <rect x={30} y={80} width={140} height={220} rx={26} fill="#fff" stroke={C.ink} strokeWidth={7} />
    {!empty && <rect x={37} y={sand ? 220 : 140} width={126} height={sand ? 73 : 153} rx={20} fill={sand ? "#E9C77F" : color} />}
    {sand && [60, 90, 120, 150, 75, 135].map((x, i) => <circle key={i} cx={x} cy={200 + (i % 3) * 8} r={4} fill="#C9A35A" />)}
    <text x={100} y={130} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={28} fill={C.ink}>{label}</text>
  </svg>
);

export const Faucet: React.FC = () => (
  <svg viewBox="0 0 240 240" width={300} height={300}>
    <rect x={10} y={40} width={150} height={50} rx={14} fill="#bbb" stroke="#fff" strokeWidth={6} />
    <path d="M160 65 L200 65 Q220 65 220 90 L220 130" fill="none" stroke="#bbb" strokeWidth={34} />
    <rect x={60} y={10} width={40} height={36} rx={8} fill="#bbb" stroke="#fff" strokeWidth={5} />
    <text x={220} y={200} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={50} fill="#fff">…</text>
  </svg>
);

/** Fila de la semana con un día marcado. */
export const Week: React.FC<{ mark?: number; label?: string }> = ({ mark = 6, label = "LIBRE" }) => (
  <div style={{ display: "flex", gap: 14, fontFamily: FONT }}>
    {["L", "M", "X", "J", "V", "S", "D"].map((d, i) => (
      <div key={d} style={{ width: 120, height: 160, border: `6px solid ${C.ink}`, borderRadius: 22, background: i === mark ? "#9BE3C9" : "#fff", display: "grid", placeItems: "center", fontWeight: 900, fontSize: 52 }}>
        <div>{d}</div>
        {i === mark && <div style={{ fontSize: 22, marginTop: -30 }}>{label}</div>}
      </div>
    ))}
  </div>
);

/** Estado de WhatsApp a pantalla completa. */
export const WaStatus: React.FC<{ text: string }> = ({ text }) => (
  <div style={{ width: 640, height: 1060, borderRadius: 50, border: `10px solid ${C.ink}`, background: "#1FA67A", display: "grid", placeItems: "center", padding: 50, textAlign: "center", fontFamily: FONT, fontWeight: 900, fontSize: 64, color: "#fff", lineHeight: 1.2 }}>
    {text}
  </div>
);

/** Marian (u otro personaje) acostada en el suelo. */
export const Lying: React.FC<{ children: React.ReactNode; y?: number }> = ({ children, y = GROUND - 150 }) => (
  <div style={{ position: "absolute", left: 540, top: y, translate: "-50% -50%", rotate: "-90deg" }}>{children}</div>
);
