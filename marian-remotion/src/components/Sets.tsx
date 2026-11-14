import React from "react";
import { useCurrentFrame } from "remotion";
import { C, FONT, GROUND } from "../theme";

// Escenarios a pantalla completa (1080×1920). Van detrás de todo y dejan libre el centro,
// donde están los personajes, y la franja de arriba, donde van los subtítulos.
// Mismo trazo que Marian: líneas negras gruesas y colores planos, pero apagados para que
// los personajes destaquen.

export type SetName = "plain" | "salon" | "street" | "beach" | "sunset" | "night" | "home";

const INK = C.ink;
const W = 1080;
const H = 1920;

/** Sombra bajo un personaje, en el suelo. */
export const Shadow: React.FC<{ x: number; w?: number }> = ({ x, w = 220 }) => (
  <div style={{ position: "absolute", left: x, top: GROUND - 14, width: w, height: 34, translate: "-50% 0", borderRadius: "50%", background: "rgba(40,30,20,0.13)" }} />
);

const Floor: React.FC<{ a: string; b: string }> = ({ a, b }) => (
  <g>
    <rect x={0} y={GROUND} width={W} height={H - GROUND} fill={a} />
    {Array.from({ length: 5 }).map((_, r) =>
      Array.from({ length: 9 }).map((__, c) => ((r + c) % 2 === 0 ? <rect key={`${r}-${c}`} x={c * 120} y={GROUND + r * 90} width={120} height={90} fill={b} /> : null)),
    )}
    {Array.from({ length: 10 }).map((_, c) => (
      <path key={`v${c}`} d={`M${c * 120} ${GROUND} L${c * 120} ${H}`} stroke="rgba(0,0,0,0.07)" strokeWidth={3} />
    ))}
    {Array.from({ length: 5 }).map((_, r) => (
      <path key={`h${r}`} d={`M0 ${GROUND + r * 90} L${W} ${GROUND + r * 90}`} stroke="rgba(0,0,0,0.07)" strokeWidth={3} />
    ))}
    <path d={`M0 ${GROUND} L${W} ${GROUND}`} stroke={INK} strokeWidth={5} />
  </g>
);

/** El salón de Marian: pared con papel de rayas, ventana, estante de esmaltes, cuadro, reloj y planta. */
const Salon: React.FC = () => (
  <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ position: "absolute", inset: 0 }}>
    <rect width={W} height={GROUND} fill="#F6EEE6" />
    {Array.from({ length: 28 }).map((_, i) => (
      <rect key={i} x={i * 40} y={0} width={14} height={GROUND} fill="#F1E4DA" />
    ))}
    <rect x={0} y={GROUND - 70} width={W} height={70} fill="#EBD3C8" />
    <path d={`M0 ${GROUND - 70} L${W} ${GROUND - 70}`} stroke={INK} strokeWidth={4} opacity={0.5} />
    {/* ventana con persianas, a la izquierda */}
    <g transform="translate(36 610)">
      <rect width={190} height={330} rx={8} fill="#DDF0F7" stroke={INK} strokeWidth={6} />
      {Array.from({ length: 9 }).map((_, i) => (
        <path key={i} d={`M6 ${24 + i * 34} L184 ${24 + i * 34}`} stroke="#B9D7E3" strokeWidth={8} />
      ))}
      <path d="M95 0 L95 330" stroke={INK} strokeWidth={4} />
      <rect x={-12} y={326} width={214} height={18} rx={4} fill="#fff" stroke={INK} strokeWidth={5} />
      <circle cx={30} cy={300} r={14} fill="#E58AA6" stroke={INK} strokeWidth={3} />
    </g>
    {/* estante con esmaltes, a la derecha */}
    <g transform="translate(850 700)">
      <rect x={0} y={90} width={210} height={16} fill="#C79A6B" stroke={INK} strokeWidth={5} />
      <rect x={0} y={230} width={210} height={16} fill="#C79A6B" stroke={INK} strokeWidth={5} />
      {["#E97A9B", "#F2A7BE", "#C0392B", "#F5C26B", "#9B7FD4", "#1F9E7A"].map((c, i) => (
        <g key={i} transform={`translate(${14 + (i % 3) * 66} ${i < 3 ? 34 : 174})`}>
          <rect x={12} y={0} width={16} height={18} fill={INK} />
          <rect x={0} y={16} width={40} height={42} rx={9} fill={c} stroke={INK} strokeWidth={4} />
        </g>
      ))}
    </g>
    {/* cuadro «Marian Nails» */}
    <g transform="translate(330 560) rotate(-2)">
      <rect width={190} height={120} rx={6} fill="#fff" stroke={INK} strokeWidth={6} />
      <text x={95} y={58} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={28} fill={C.pinkDark}>Marian</text>
      <text x={95} y={92} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={22} fill={INK}>NAILS 💅</text>
    </g>
    {/* reloj */}
    <g transform="translate(700 610)">
      <circle r={46} fill="#fff" stroke={INK} strokeWidth={6} />
      <path d="M0 0 L0 -28 M0 0 L20 10" stroke={INK} strokeWidth={6} strokeLinecap="round" />
    </g>
    {/* planta en maceta */}
    <g transform={`translate(970 ${GROUND - 10})`}>
      <path d="M-46 -110 L46 -110 L36 0 L-36 0 Z" fill="#D9774F" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      {[-50, -20, 10, 40].map((a, i) => (
        <ellipse key={i} cx={Math.sin((a * Math.PI) / 180) * 70} cy={-170 - Math.cos((a * Math.PI) / 180) * 30} rx={22} ry={60} fill="#5BAA6A" stroke={INK} strokeWidth={5} transform={`rotate(${a} ${Math.sin((a * Math.PI) / 180) * 70} ${-170 - Math.cos((a * Math.PI) / 180) * 30})`} />
      ))}
    </g>
    <Floor a="#F3E2DA" b="#EAD3C9" />
  </svg>
);

/** Casa de Marian: cocina con nevera (con papeles pegados) y fogón. */
const Home: React.FC = () => (
  <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ position: "absolute", inset: 0 }}>
    <rect width={W} height={GROUND} fill="#F3EFE2" />
    {Array.from({ length: 6 }).map((_, r) =>
      Array.from({ length: 10 }).map((__, c) => <rect key={`${r}${c}`} x={c * 110} y={1000 + r * 70} width={106} height={66} fill="#E5EFE8" />),
    )}
    {/* nevera */}
    <g transform={`translate(40 ${GROUND - 620})`}>
      <rect width={210} height={620} rx={22} fill="#fff" stroke={INK} strokeWidth={7} />
      <path d="M0 230 L210 230" stroke={INK} strokeWidth={6} />
      <rect x={170} y={80} width={14} height={90} rx={6} fill={INK} />
      <rect x={170} y={290} width={14} height={120} rx={6} fill={INK} />
      <rect x={30} y={270} width={120} height={150} fill="#FFF7C2" stroke={INK} strokeWidth={4} transform="rotate(-4 90 345)" />
      <text x={88} y={318} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={20} fill={INK} transform="rotate(-4 90 345)">APAGONES</text>
      {[340, 365, 390].map((y) => (
        <path key={y} d={`M45 ${y} L135 ${y - 6}`} stroke={INK} strokeWidth={3} opacity={0.6} />
      ))}
      <circle cx={90} cy={262} r={9} fill={C.red} />
    </g>
    {/* fogón con cafetera */}
    <g transform={`translate(830 ${GROUND - 330})`}>
      <rect width={230} height={330} fill="#E0E0E0" stroke={INK} strokeWidth={7} />
      <rect x={-10} y={-20} width={250} height={26} fill="#BDBDBD" stroke={INK} strokeWidth={6} />
      <path d="M70 -20 L60 -110 L130 -110 L120 -20 Z" fill="#C9C9C9" stroke={INK} strokeWidth={6} />
      <path d="M95 -110 L95 -140" stroke={INK} strokeWidth={8} />
    </g>
    <Floor a="#E9E1CF" b="#DED3BC" />
  </svg>
);

/** Calle de La Habana: fachadas coloniales con balcones, cables, acera y calle. */
const Street: React.FC<{ night?: boolean }> = ({ night }) => {
  const f = useCurrentFrame();
  const fac = night ? ["#2A2A3A", "#30304A", "#28283A", "#2F2F44"] : ["#7FC8C0", "#F2CF6B", "#F2A7BE", "#9CC0E8"];
  const xs = [0, 290, 560, 820];
  const ws = [290, 270, 260, 260];
  const hs = [880, 760, 920, 800];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ position: "absolute", inset: 0 }}>
      <rect width={W} height={GROUND} fill={night ? "#121220" : "#DDF1F8"} />
      {night && (
        <>
          <circle cx={860} cy={420} r={60} fill="#F5F0D0" />
          <circle cx={885} cy={405} r={56} fill="#121220" />
          {Array.from({ length: 26 }).map((_, i) => (
            <circle key={i} cx={(i * 397) % W} cy={160 + ((i * 131) % 420)} r={(i % 3) + 1.5} fill="#fff" opacity={0.4 + ((f + i * 7) % 40) / 80} />
          ))}
        </>
      )}
      {!night &&
        [0, 1].map((i) => (
          <g key={i} transform={`translate(${((f * 0.4 + i * 520) % 1300) - 200} ${430 + i * 90})`} opacity={0.9}>
            <ellipse cx={0} cy={0} rx={90} ry={34} fill="#fff" />
            <ellipse cx={60} cy={-18} rx={60} ry={34} fill="#fff" />
            <ellipse cx={-60} cy={-8} rx={50} ry={26} fill="#fff" />
          </g>
        ))}
      {xs.map((x, i) => {
        const top = GROUND - hs[i];
        return (
          <g key={i}>
            <rect x={x} y={top} width={ws[i]} height={hs[i]} fill={fac[i]} stroke={INK} strokeWidth={6} />
            <rect x={x - 6} y={top - 26} width={ws[i] + 12} height={30} fill={night ? "#1E1E2E" : "#fff"} stroke={INK} strokeWidth={6} />
            {[0, 1].map((r) => (
              <g key={r}>
                {[0, 1].map((c) => {
                  const wx = x + 40 + c * (ws[i] - 130);
                  const wy = top + 80 + r * 220;
                  return (
                    <g key={c}>
                      <path d={`M${wx} ${wy + 150} L${wx} ${wy + 40} Q${wx + 45} ${wy - 10} ${wx + 90} ${wy + 40} L${wx + 90} ${wy + 150} Z`} fill={night ? (i === 2 && r === 0 && c === 1 ? "#F7C873" : "#15151F") : "#5E8C9E"} stroke={INK} strokeWidth={5} />
                      <path d={`M${wx - 10} ${wy + 150} L${wx + 100} ${wy + 150}`} stroke={INK} strokeWidth={6} />
                      {Array.from({ length: 5 }).map((_, k) => (
                        <path key={k} d={`M${wx - 6 + k * 25} ${wy + 150} L${wx - 6 + k * 25} ${wy + 185}`} stroke={INK} strokeWidth={4} />
                      ))}
                      <path d={`M${wx - 10} ${wy + 185} L${wx + 100} ${wy + 185}`} stroke={INK} strokeWidth={5} />
                    </g>
                  );
                })}
              </g>
            ))}
            <path d={`M${x + ws[i] / 2 - 55} ${GROUND} L${x + ws[i] / 2 - 55} ${GROUND - 170} Q${x + ws[i] / 2} ${GROUND - 240} ${x + ws[i] / 2 + 55} ${GROUND - 170} L${x + ws[i] / 2 + 55} ${GROUND}`} fill={night ? "#101018" : "#8B5E3C"} stroke={INK} strokeWidth={6} />
          </g>
        );
      })}
      {/* cables de la corriente */}
      <path d={`M0 ${GROUND - 960} Q540 ${GROUND - 880} ${W} ${GROUND - 980}`} stroke={INK} strokeWidth={4} fill="none" />
      <path d={`M0 ${GROUND - 930} Q540 ${GROUND - 840} ${W} ${GROUND - 950}`} stroke={INK} strokeWidth={3} fill="none" />
      {!night && (
        <g>
          <path d={`M300 ${GROUND - 520} Q420 ${GROUND - 480} 540 ${GROUND - 520}`} stroke={INK} strokeWidth={3} fill="none" />
          {["#E86A5C", "#fff", "#3E7CC9"].map((c, i) => (
            <rect key={i} x={340 + i * 60} y={GROUND - 510 + Math.abs(i - 1) * -10} width={40} height={52} fill={c} stroke={INK} strokeWidth={3} />
          ))}
        </g>
      )}
      {!night && <rect width={W} height={GROUND} fill="#F6F1E8" opacity={0.28} />}
      <rect x={0} y={GROUND} width={W} height={60} fill={night ? "#26262F" : "#D6D0C4"} />
      <path d={`M0 ${GROUND} L${W} ${GROUND} M0 ${GROUND + 60} L${W} ${GROUND + 60}`} stroke={INK} strokeWidth={5} />
      <rect x={0} y={GROUND + 60} width={W} height={H - GROUND - 60} fill={night ? "#1A1A22" : "#9A9A9A"} />
      {Array.from({ length: 6 }).map((_, i) => (
        <rect key={i} x={i * 200 + 20} y={GROUND + 200} width={110} height={14} fill={night ? "#3A3A44" : "#F2F2F2"} />
      ))}
    </svg>
  );
};

/** Playa: nubes, mar con olas, el Malecón a lo lejos, palmera y sombrilla. */
const Beach: React.FC<{ sunset?: boolean }> = ({ sunset }) => {
  const f = useCurrentFrame();
  const horizon = 1150;
  const sand = 1400;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ position: "absolute", inset: 0 }}>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={sunset ? "#FBE3C4" : "#A9DCF2"} />
          <stop offset="1" stopColor={sunset ? "#F49A5E" : "#E8F7FC"} />
        </linearGradient>
      </defs>
      <rect width={W} height={horizon} fill="url(#sky)" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${((f * (0.3 + i * 0.1) + i * 420) % 1400) - 200} ${420 + i * 110})`} opacity={sunset ? 0.6 : 0.95}>
          <ellipse cx={0} cy={0} rx={90} ry={32} fill="#fff" />
          <ellipse cx={55} cy={-18} rx={55} ry={30} fill="#fff" />
          <ellipse cx={-55} cy={-6} rx={48} ry={24} fill="#fff" />
        </g>
      ))}
      {/* el Malecón a lo lejos */}
      {[[60, 70], [150, 110], [240, 60], [320, 140], [420, 90], [520, 70], [600, 120], [700, 80], [780, 100]].map(([x, h], i) => (
        <rect key={i} x={x} y={horizon - h} width={80} height={h} fill={sunset ? "#B87A6A" : "#A9BBC9"} opacity={0.75} />
      ))}
      <rect x={0} y={horizon} width={W} height={sand - horizon} fill={sunset ? "#4F86AD" : "#3FA9D6"} />
      {Array.from({ length: 4 }).map((_, r) => (
        <path key={r} d={Array.from({ length: 12 }).map((__, k) => `${k === 0 ? "M" : "L"}${k * 100 - ((f * 1.5 + r * 40) % 100)} ${horizon + 50 + r * 55 + (k % 2) * 12}`).join(" ")} stroke="#fff" strokeWidth={4} fill="none" opacity={0.6} />
      ))}
      <path d={`M0 ${horizon} L${W} ${horizon}`} stroke={INK} strokeWidth={5} />
      <path d={`M0 ${sand} Q270 ${sand - 24 + Math.sin(f / 12) * 8} 540 ${sand} T${W} ${sand} L${W} ${H} L0 ${H} Z`} fill="#F2DDA8" stroke={INK} strokeWidth={5} />
      {Array.from({ length: 40 }).map((_, i) => (
        <circle key={i} cx={(i * 263) % W} cy={sand + 60 + ((i * 97) % (H - sand - 80))} r={3} fill="#D9BE7C" />
      ))}
      {/* palmera */}
      <g transform={`translate(110 ${GROUND + 40})`}>
        <path d="M0 0 Q30 -260 -10 -520" stroke="#8B5E3C" strokeWidth={34} fill="none" strokeLinecap="round" />
        <path d="M0 0 Q30 -260 -10 -520" stroke={INK} strokeWidth={5} fill="none" strokeDasharray="6 40" />
        {[-150, -110, -60, -20, 30].map((a, i) => (
          <path key={i} d="M-10 -520 q90 -40 170 30" stroke="#3E9A5A" strokeWidth={26} fill="none" strokeLinecap="round" transform={`rotate(${a + Math.sin(f / 15 + i) * 3} -10 -520)`} />
        ))}
      </g>
      {/* sombrilla */}
      <g transform={`translate(960 ${GROUND + 60})`}>
        <path d="M0 0 L-30 -330" stroke={INK} strokeWidth={8} />
        <path d="M-200 -300 Q-30 -440 140 -330 Z" fill="#E86A5C" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <path d="M-110 -340 Q-30 -440 50 -340" fill="#fff" opacity={0.7} />
      </g>
    </svg>
  );
};

/** Apagón en casa: casi negro, con la luna por la ventana. */
const NightHome: React.FC = () => (
  <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ position: "absolute", inset: 0 }}>
    <rect width={W} height={H} fill="#22222E" />
    <g transform="translate(60 620)">
      <rect width={200} height={300} rx={8} fill="#1C2236" stroke="#3A3A4A" strokeWidth={6} />
      <circle cx={130} cy={90} r={40} fill="#E9E4C8" />
      <circle cx={150} cy={78} r={36} fill="#1C2236" />
      <path d="M100 0 L100 300 M0 150 L200 150" stroke="#3A3A4A" strokeWidth={5} />
    </g>
    <rect x={0} y={GROUND} width={W} height={H - GROUND} fill="#34344A" />
    <path d={`M0 ${GROUND} L${W} ${GROUND}`} stroke="#4A4A60" strokeWidth={5} />
  </svg>
);

export const SetBg: React.FC<{ set: SetName }> = ({ set }) => {
  if (set === "salon") return <Salon />;
  if (set === "home") return <Home />;
  if (set === "street") return <Street />;
  if (set === "night") return <NightHome />;
  if (set === "beach") return <Beach />;
  if (set === "sunset") return <Beach sunset />;
  return null;
};

/** ¿El escenario es oscuro? (para los subtítulos con fondo). */
export const darkSet = (s?: SetName) => s === "night";

export const _consts = { W, H, INK };
export const StreetNight: React.FC = () => <Street night />;
