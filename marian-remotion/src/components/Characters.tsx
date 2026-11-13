import React from "react";
import { useCurrentFrame } from "remotion";
import { C } from "../theme";

/** Contexto que da el tiempo global y si la narradora está hablando. */
export const EpCtx = React.createContext({ t: 0, talking: false, frame: 0 });

export type Eyes = "flat" | "wide" | "closed" | "side" | "happy";
export type Arms = "phone" | "down" | "shrug" | "wave" | "cloth";

const STROKE = C.ink;

const EyesSvg: React.FC<{ eyes: Eyes; blink: boolean; cx: number; cy: number }> = ({ eyes, blink, cx, cy }) => {
  const e = blink && eyes !== "closed" ? "closed" : eyes;
  const one = (x: number, flip: number) => {
    if (e === "wide")
      return (
        <g key={x}>
          <circle cx={x} cy={cy} r={15} fill="#fff" stroke={STROKE} strokeWidth={5} />
          <circle cx={x} cy={cy + 1} r={6} fill={STROKE} />
        </g>
      );
    if (e === "closed")
      return <path key={x} d={`M${x - 18} ${cy} Q${x} ${cy + 12} ${x + 18} ${cy}`} stroke={STROKE} strokeWidth={6} fill="none" strokeLinecap="round" />;
    if (e === "happy")
      return <path key={x} d={`M${x - 16} ${cy + 4} Q${x} ${cy - 12} ${x + 16} ${cy + 4}`} stroke={STROKE} strokeWidth={6} fill="none" strokeLinecap="round" />;
    // flat / side: párpado caído + ojera
    const px = e === "side" ? x + 9 : x;
    return (
      <g key={x}>
        <path d={`M${x - 20} ${cy - 3} L${x + 20} ${cy - 3}`} stroke={STROKE} strokeWidth={7} strokeLinecap="round" />
        <path d={`M${x + 18 * flip} ${cy - 4} l${6 * flip} -5`} stroke={STROKE} strokeWidth={4} strokeLinecap="round" />
        <path d={`M${px - 9} ${cy} Q${px} ${cy + 9} ${px + 9} ${cy}`} fill={STROKE} />
        <path d={`M${x - 17} ${cy + 12} Q${x} ${cy + 22} ${x + 17} ${cy + 12}`} stroke="#A79DCB" strokeWidth={3.5} fill="none" strokeLinecap="round" />
      </g>
    );
  };
  return (
    <>
      {one(cx - 38, -1)}
      {one(cx + 38, 1)}
    </>
  );
};

const useBlink = (seed: number) => {
  const f = useCurrentFrame();
  const p = (f + seed * 37) % 110;
  return p < 4;
};

const Mouth: React.FC<{ open: boolean; cx: number; cy: number; smile?: boolean }> = ({ open, cx, cy, smile }) => {
  const f = useCurrentFrame();
  if (open && f % 8 < 5) return <ellipse cx={cx} cy={cy} rx={9} ry={11} fill={STROKE} />;
  if (smile) return <path d={`M${cx - 14} ${cy - 3} Q${cx} ${cy + 10} ${cx + 14} ${cy - 3}`} stroke={STROKE} strokeWidth={5} fill="none" strokeLinecap="round" />;
  return <ellipse cx={cx} cy={cy} rx={6} ry={4.5} fill={STROKE} />;
};

const ArmsSvg: React.FC<{ arms: Arms; skin?: string }> = ({ arms }) => {
  const s = { stroke: STROKE, strokeWidth: 9, strokeLinecap: "round" as const, fill: "none" };
  if (arms === "phone")
    return (
      <>
        <path d="M104 318 L108 388 L130 392" {...s} />
        <path d="M196 318 L192 388 L170 392" {...s} />
        <rect x={121} y={312} width={58} height={86} rx={11} fill={C.pinkLight} stroke={STROKE} strokeWidth={5} />
      </>
    );
  if (arms === "shrug")
    return (
      <>
        <path d="M104 320 L70 380 L40 330" {...s} />
        <path d="M196 320 L230 380 L260 330" {...s} />
      </>
    );
  if (arms === "wave")
    return (
      <>
        <path d="M104 320 L96 440" {...s} />
        <path d="M196 320 L250 270 L262 200" {...s} />
      </>
    );
  if (arms === "cloth")
    return (
      <>
        <path d="M104 320 L96 440" {...s} />
        <path d="M196 320 L240 400 L280 420" {...s} />
        <rect x={262} y={402} width={44} height={30} rx={6} fill="#8FC7E8" stroke={STROKE} strokeWidth={4} />
      </>
    );
  return (
    <>
      <path d="M104 320 L96 440" {...s} />
      <path d="M196 320 L204 440" {...s} />
    </>
  );
};

const Body: React.FC<{ dress: string; arms: Arms; badge?: boolean }> = ({ dress, arms, badge = true }) => (
  <>
    <path d="M130 470 L128 612" stroke={STROKE} strokeWidth={9} strokeLinecap="round" />
    <path d="M170 470 L172 612" stroke={STROKE} strokeWidth={9} strokeLinecap="round" />
    <ellipse cx={122} cy={614} rx={15} ry={8} fill={STROKE} />
    <ellipse cx={178} cy={614} rx={15} ry={8} fill={STROKE} />
    <path d="M104 300 L196 300 L216 476 L84 476 Z" fill={dress} stroke={STROKE} strokeWidth={6} strokeLinejoin="round" />
    {badge && <rect x={135} y={408} width={32} height={27} rx={4} fill={C.pinkDark} stroke={STROKE} strokeWidth={4} />}
    <ArmsSvg arms={arms} />
  </>
);

/** Marian: manicurista, moño, bata rosada, cara de "ya nada me sorprende". */
export const Marian: React.FC<{
  eyes?: Eyes;
  arms?: Arms;
  speaking?: boolean;
  size?: number;
  glasses?: boolean;
  bangs?: boolean;
  glow?: boolean;
}> = ({ eyes = "flat", arms = "phone", speaking = true, size = 760, glasses, bangs, glow }) => {
  const ctx = React.useContext(EpCtx);
  const blink = useBlink(1);
  return (
    <svg viewBox="0 0 300 640" width={(size * 300) / 640} height={size} style={{ overflow: "visible" }}>
      {glow && <ellipse cx={150} cy={250} rx={170} ry={210} fill="#FFF3B0" opacity={0.55} />}
      <Body dress={C.pink} arms={arms} />
      {/* moño */}
      <circle cx={150} cy={92} r={36} fill={C.hair} stroke={STROKE} strokeWidth={5} />
      <path d="M158 58 q10 -14 2 -24" stroke={STROKE} strokeWidth={4} fill="none" strokeLinecap="round" />
      <ellipse cx={114} cy={86} rx={11} ry={7} fill={C.pinkDark} stroke={STROKE} strokeWidth={3} transform="rotate(-25 114 86)" />
      {/* cabeza */}
      <circle cx={150} cy={205} r={100} fill="#fff" stroke={STROKE} strokeWidth={7} />
      {/* pelo */}
      <path
        d={
          bangs
            ? "M52 200 Q56 108 150 104 Q244 108 248 200 L236 150 L60 150 Z"
            : "M52 205 Q54 108 150 104 Q246 108 248 205 L238 172 Q232 150 214 148 L194 166 L174 142 L150 168 L126 142 L106 166 L86 148 Q66 152 62 172 Z"
        }
        fill={C.hair}
        stroke={STROKE}
        strokeWidth={6}
        strokeLinejoin="round"
      />
      <path d="M58 180 Q56 230 66 262" stroke={C.hair} strokeWidth={9} fill="none" strokeLinecap="round" />
      <path d="M242 180 Q244 230 234 262" stroke={C.hair} strokeWidth={9} fill="none" strokeLinecap="round" />
      {/* aretes */}
      <circle cx={52} cy={222} r={9} fill="none" stroke={C.gold} strokeWidth={4} />
      <circle cx={248} cy={222} r={9} fill="none" stroke={C.gold} strokeWidth={4} />
      <ellipse cx={98} cy={238} rx={15} ry={8} fill="#F7B9C4" opacity={0.85} />
      <ellipse cx={202} cy={238} rx={15} ry={8} fill="#F7B9C4" opacity={0.85} />
      <EyesSvg eyes={eyes} blink={blink} cx={150} cy={206} />
      <Mouth open={speaking && ctx.talking} cx={150} cy={256} />
      {glasses && (
        <g>
          <rect x={92} y={186} width={50} height={32} rx={10} fill={STROKE} />
          <rect x={158} y={186} width={50} height={32} rx={10} fill={STROKE} />
          <path d="M142 198 L158 198" stroke={STROKE} strokeWidth={5} />
        </g>
      )}
    </svg>
  );
};

/** Clientas y Yamila: mismo trazo, más sencillas. */
export const Person: React.FC<{
  hair?: string;
  dress?: string;
  style?: "bob" | "long" | "short" | "bun";
  eyes?: Eyes;
  smile?: boolean;
  arms?: Arms;
  size?: number;
  scissors?: boolean;
  speaking?: boolean;
  seed?: number;
}> = ({ hair = "#8A5A3B", dress = C.lilac, style = "bob", eyes = "happy", smile = true, arms = "down", size = 560, scissors, speaking = false, seed = 2 }) => {
  const ctx = React.useContext(EpCtx);
  const blink = useBlink(seed);
  return (
    <svg viewBox="0 0 300 640" width={(size * 300) / 640} height={size} style={{ overflow: "visible" }}>
      <Body dress={dress} arms={arms} badge={false} />
      {style === "long" && <path d="M58 200 Q40 330 70 360 L230 360 Q260 330 242 200 Z" fill={hair} stroke={STROKE} strokeWidth={5} />}
      {style === "bun" && <circle cx={150} cy={96} r={32} fill={hair} stroke={STROKE} strokeWidth={5} />}
      <circle cx={150} cy={205} r={100} fill="#fff" stroke={STROKE} strokeWidth={7} />
      {style === "short" ? (
        <path d="M54 190 Q60 100 150 102 Q240 100 246 190 Q200 140 150 150 Q100 140 54 190 Z" fill={hair} stroke={STROKE} strokeWidth={6} />
      ) : (
        <path d="M50 230 Q48 104 150 102 Q252 104 250 230 L236 236 L232 160 L68 160 L64 236 Z" fill={hair} stroke={STROKE} strokeWidth={6} strokeLinejoin="round" />
      )}
      <ellipse cx={98} cy={240} rx={14} ry={7} fill="#F7B9C4" opacity={0.8} />
      <ellipse cx={202} cy={240} rx={14} ry={7} fill="#F7B9C4" opacity={0.8} />
      <EyesSvg eyes={eyes} blink={blink} cx={150} cy={208} />
      <Mouth open={speaking && ctx.talking} cx={150} cy={256} smile={smile} />
      {scissors && (
        <g transform="translate(250 120) rotate(20)">
          <circle cx={0} cy={0} r={13} fill="none" stroke={STROKE} strokeWidth={5} />
          <circle cx={0} cy={34} r={13} fill="none" stroke={STROKE} strokeWidth={5} />
          <path d="M10 8 L60 30 M10 26 L60 4" stroke={STROKE} strokeWidth={5} strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
};

/** Gatito-clienta (los del grupo de WhatsApp). */
export const Cat: React.FC<{ color?: string; glasses?: boolean; size?: number; shades?: boolean }> = ({ color = "#fff", glasses, size = 140, shades }) => (
  <svg viewBox="0 0 120 110" width={size} height={(size * 110) / 120}>
    <path d="M14 40 L22 6 L46 26 L74 26 L98 6 L106 40 Q114 96 60 100 Q6 96 14 40 Z" fill={color} stroke={STROKE} strokeWidth={4} strokeLinejoin="round" />
    {glasses || shades ? (
      <g>
        <circle cx={42} cy={56} r={13} fill={shades ? STROKE : "none"} stroke={STROKE} strokeWidth={4} />
        <circle cx={78} cy={56} r={13} fill={shades ? STROKE : "none"} stroke={STROKE} strokeWidth={4} />
        <path d="M55 56 L65 56" stroke={STROKE} strokeWidth={4} />
        {!shades && <circle cx={42} cy={57} r={3.5} fill={STROKE} />}
        {!shades && <circle cx={78} cy={57} r={3.5} fill={STROKE} />}
      </g>
    ) : (
      <>
        <circle cx={44} cy={56} r={4} fill={STROKE} />
        <circle cx={76} cy={56} r={4} fill={STROKE} />
      </>
    )}
    <path d="M54 74 Q60 80 66 74" stroke={STROKE} strokeWidth={3.5} fill="none" strokeLinecap="round" />
    <path d="M8 66 L30 70 M8 78 L30 76 M112 66 L90 70 M112 78 L90 76" stroke={STROKE} strokeWidth={2.5} />
  </svg>
);
