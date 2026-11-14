import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import data from "../data/ep13.json";
import { Abs, BigStamp, Bubble, Bus, Cash, Clock, Nail, Notif, Phone, Pill, Pop } from "../components/Bits";
import { Episode, Scene } from "../components/Episode";
import { EpData } from "../lib/words";
import { C, FONT } from "../theme";
import { CLOSE, HEAD, M, P, XHEAD } from "./common";

// Ep. 13 «Ya te la mandé». Sin la app: las transferencias fallan, el efectivo llega.
// Regla: Citora no cobra; aquí no aparece la app en ningún momento.

const Yuli: React.FC<{ x?: number; eyes?: "happy" | "flat" | "closed" | "wide" | "side"; arms?: "down" | "wave" | "phone" }> = (p) => <P hair="#3B2A20" dress={C.lilac} style="bun" {...p} />;
const Katy: React.FC<{ x?: number; eyes?: "happy" | "flat" | "closed" | "wide" | "side"; arms?: "down" | "wave" | "phone" }> = (p) => <P hair="#C0392B" dress="#F5C26B" style="long" {...p} />;
const Vecina: React.FC<{ x?: number; eyes?: "happy" | "flat" | "closed" | "wide" | "side"; arms?: "down" | "wave" | "phone"; size?: number }> = (p) => <P hair="#B8B8B8" dress="#7FB8A4" style="bun" smile={false} {...p} />;

/** Captura de pantalla de una transferencia (lo que enseñan las clientas). */
const Captura: React.FC<{ amount: string; date: string; mark?: boolean }> = ({ amount, date, mark }) => (
  <Phone w={600} h={860} title="Transferencia exitosa ✓" color={C.green}>
    <div style={{ fontWeight: 900, fontSize: 80, textAlign: "center", margin: "30px 0" }}>{amount}</div>
    <div style={{ fontWeight: 700, fontSize: 34, color: "#666", textAlign: "center" }}>Para: Marian 💅</div>
    <div style={{ position: "relative", fontWeight: 800, fontSize: 40, textAlign: "center", marginTop: 30 }}>
      {date}
      {mark && <div style={{ position: "absolute", inset: "-14px 70px", border: `7px solid ${C.red}`, borderRadius: 999, rotate: "-4deg" }} />}
    </div>
  </Phone>
);

const Saldo: React.FC<{ amount: string; moves?: string[] }> = ({ amount, moves = [] }) => (
  <Phone w={600} h={860} title="Mi cuenta" color="#2B2B2B">
    <div style={{ fontWeight: 700, fontSize: 32, color: "#666" }}>Saldo disponible</div>
    <div style={{ fontWeight: 900, fontSize: 84, margin: "10px 0 30px" }}>{amount}</div>
    {moves.length === 0 ? (
      <div style={{ fontWeight: 700, fontSize: 34, color: "#999" }}>Sin movimientos</div>
    ) : (
      moves.map((m, i) => (
        <Pop key={i} delay={4 + i * 8} style={{ position: "relative" }}>
          <div style={{ border: `5px solid ${C.ink}`, borderRadius: 22, padding: "18px 22px", marginBottom: 16, fontWeight: 800, fontSize: 34, color: C.green }}>+ {m}</div>
        </Pop>
      ))
    )}
  </Phone>
);

/** El billete de veinte que ya no tenía cara. */
const Billete: React.FC<{ scars?: boolean; frame?: boolean; w?: number }> = ({ scars, frame, w = 640 }) => (
  <div style={{ position: "relative", padding: frame ? 36 : 0, background: frame ? "#C79A5B" : undefined, border: frame ? `10px solid ${C.ink}` : undefined, borderRadius: 12 }}>
    <svg viewBox="0 0 400 200" width={w} height={w / 2}>
      <path d="M8 14 L392 6 L388 190 L12 194 Z" fill="#B9DDB0" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
      <path d="M60 30 L80 170 M150 20 L140 180 M260 16 L275 186 M330 40 L320 160" stroke="#8FB386" strokeWidth={3} />
      <ellipse cx={200} cy={100} rx={56} ry={66} fill="#D7EDD1" stroke={C.ink} strokeWidth={5} strokeDasharray="10 8" />
      <text x={40} y={60} fontFamily={FONT} fontWeight={900} fontSize={44} fill={C.ink}>20</text>
      <text x={330} y={180} fontFamily={FONT} fontWeight={900} fontSize={44} fill={C.ink}>20</text>
      {scars && (
        <g>
          <rect x={250} y={110} width={90} height={28} rx={8} fill="#F3D9A4" stroke={C.ink} strokeWidth={4} transform="rotate(-20 295 124)" />
          <path d="M90 120 l40 20 M100 110 l10 40" stroke={C.ink} strokeWidth={4} />
          <path d="M300 40 Q320 70 300 95" stroke={C.ink} strokeWidth={4} fill="none" />
        </g>
      )}
    </svg>
  </div>
);

const Battery: React.FC = () => (
  <svg viewBox="0 0 300 140" width={420} height={196}>
    <rect x={10} y={10} width={250} height={120} rx={22} fill="none" stroke="#fff" strokeWidth={10} />
    <rect x={262} y={45} width={24} height={50} rx={6} fill="#fff" />
    <rect x={26} y={26} width={18} height={88} rx={6} fill={C.red} />
    <text x={150} y={92} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={60} fill="#fff">4%</text>
  </svg>
);

/** El móvil guardado en la bolsa del pan. */
const BolsaPan: React.FC = () => (
  <svg viewBox="0 0 300 380" width={360} height={456}>
    <path d="M40 60 L260 60 L280 360 L20 360 Z" fill="#D9B98A" stroke={C.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M40 60 L70 20 L230 20 L260 60" fill="#C9A672" stroke={C.ink} strokeWidth={7} strokeLinejoin="round" />
    <rect x={105} y={40} width={90} height={150} rx={14} fill={C.ink} />
    <text x={150} y={290} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={64} fill={C.ink}>PAN</text>
  </svg>
);

const Enchufe: React.FC = () => (
  <svg viewBox="0 0 200 260" width={200} height={260} style={{ overflow: "visible" }}>
    <rect x={20} y={20} width={160} height={160} rx={24} fill="#fff" stroke={C.ink} strokeWidth={7} />
    <rect x={64} y={70} width={14} height={60} rx={4} fill={C.ink} />
    <rect x={122} y={70} width={14} height={60} rx={4} fill={C.ink} />
    <path d="M100 180 Q100 230 160 250" stroke={C.ink} strokeWidth={8} fill="none" />
  </svg>
);

const Puerta: React.FC<{ sign?: boolean }> = ({ sign }) => (
  <div style={{ position: "relative", width: 420, height: 760 }}>
    <div style={{ position: "absolute", inset: 0, background: C.pinkLight, border: `8px solid ${C.ink}`, borderRadius: 10 }} />
    <div style={{ position: "absolute", right: 50, top: 400, width: 30, height: 30, borderRadius: 15, background: C.ink }} />
    {sign && (
      <div style={{ position: "absolute", top: 150, left: -30, right: -30, rotate: "-4deg", background: "#fff", border: `7px solid ${C.ink}`, borderRadius: 18, padding: "26px 20px", textAlign: "center", fontFamily: FONT, fontWeight: 900, fontSize: 50, color: C.green, lineHeight: 1.1 }}>
        AQUÍ SE PAGA
        <br />
        EN EFECTIVO 💵
      </div>
    )}
  </div>
);

const Tin: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <div style={{ display: "flex", gap: 60 }}>
      {[0, 12].map((d, i) => (
        <div key={i} style={{ opacity: f >= d ? 1 : 0, scale: interpolate(f, [d, d + 4, d + 8], [2, 0.9, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), fontFamily: FONT, fontWeight: 900, fontSize: 170, color: C.orange, rotate: i ? "6deg" : "-6deg" }}>
          ¡TIN!
        </div>
      ))}
    </div>
  );
};

const SlowBus: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: "absolute", top: 1180, left: interpolate(f, [0, 120], [300, 460]), translate: "-50% -50%" }}>
      <Bus />
    </div>
  );
};

const scenes: Scene[] = [
  {
    at: "Ayer me pagaron",
    el: (
      <>
        <M />
        <Pop delay={4} style={{ left: 540, top: 560 }}><Pill icon="✅" text="Transferencia enviada" size={34} /></Pop>
        <Pop delay={14} style={{ left: 540, top: 660 }}><Pill icon="✅" text="Transferencia enviada" size={34} /></Pop>
        <Pop delay={24} style={{ left: 540, top: 760 }}><Pill icon="💵" text="Efectivo" size={34} /></Pop>
      </>
    ),
  },
  { at: "Y no me ha", cam: HEAD, el: (<><M /><Pop delay={6} style={{ left: 540, top: 780 }}><Pill text="Saldo: 0 CUP" color={C.red} /></Pop></>) },
  { at: "La primera Yuli", el: (<><M x={330} /><Yuli x={790} /><Pop delay={4} style={{ left: 790, top: 900 }}><Pill text="Yuli · acrílico" size={32} /></Pop></>) },
  { at: "Se mira las manos", cam: { z: 1.05 }, el: (<><Abs x={540} y={1100}><Nail stones encap w={300} /></Abs><Pop delay={6} style={{ left: 760, top: 760 }}><div style={{ fontSize: 110 }}>✨</div></Pop></>), ground: false },
  { at: "Ya te hice la", el: (<><Yuli x={760} arms="wave" /><Pop delay={2} style={{ left: 470, top: 780 }}><Bubble text="Ya te hice la transferencia, mi vida 😘" size={36} width={620} tail="right" /></Pop></>) },
  { at: "Y me enseña la", el: <Abs x={540} y={1100}><Captura amount="3.500 CUP" date="13/11/2026 · 10:42" /></Abs> },
  { at: "Yo abro el teléfono", el: <Abs x={540} y={1100}><Saldo amount="0,00 CUP" /></Abs> },
  { at: "Nada", cam: XHEAD, el: <M eyes="flat" /> },
  { at: "Es que Transfermóvil", el: (<><Yuli x={760} /><Pop delay={2} style={{ left: 470, top: 780 }}><Bubble text="Es que Transfermóvil está lento 🙏" size={36} width={600} tail="right" /></Pop></>) },
  { at: "Lento Como la", el: (<><SlowBus /><Pop delay={8} style={{ left: 540, top: 820 }}><Pill icon="🐌" text="lento" /></Pop></>) },
  { at: "La segunda Katy", el: (<><M x={330} /><Katy x={790} /><Pop delay={4} style={{ left: 790, top: 900 }}><Pill text="Katy · pedicura" size={32} /></Pop></>) },
  { at: "Lo mismo", el: (<><Katy x={760} arms="wave" /><Pop delay={6} style={{ left: 470, top: 780 }}><Bubble text="Ya te la mandé 😘" size={40} tail="right" /></Pop></>) },
  { at: "Captura", el: <Abs x={540} y={1100}><Captura amount="2.000 CUP" date="15/11/2026 · 09:10" /></Abs> },
  { at: "Con la fecha de", el: (<><Abs x={540} y={1100}><Captura amount="2.000 CUP" date="15/11/2026 · 09:10" mark /></Abs><Pop delay={10} style={{ left: 540, top: 1500 }}><BigStamp text="¿¡mañana!?" /></Pop></>) },
  { at: "No sé cómo", cam: CLOSE, el: <M eyes="side" /> },
  { at: "La tercera me", el: (<><M x={330} eyes="wide" /><P x={790} hair="#E7B04A" dress="#9FD39A" style="long" arms="wave" /><Pop delay={8} style={{ left: 560, top: 640 }}><Cash amount="en efectivo" w={300} /></Pop></>) },
  { at: "Con un billete", cam: { z: 1.05 }, el: <Abs x={540} y={1100}><Billete /></Abs>, ground: false },
  { at: "Ese billete había", el: (<><Abs x={540} y={1100}><Billete scars /></Abs><Pop delay={12} style={{ left: 540, top: 1460 }}><Pill icon="🩹" text="ha visto cosas" /></Pop></>), ground: false },
  { at: "A las siete se", dark: true, el: (<><M eyes="wide" speaking={false} /><Pop delay={10} style={{ left: 780, top: 760 }}><BigStamp text="¡PUM!" color={C.orange} size={120} /></Pop><Pop delay={2} style={{ left: 300, top: 700 }}><Clock time="7:00 p. m." size={36} /></Pop></>) },
  { at: "El teléfono en", dark: true, ground: false, el: <Abs x={540} y={1100}><Battery /></Abs> },
  { at: "Lo apagué para", dark: true, el: <M eyes="closed" speaking={false} arms="phone" /> },
  { at: "Como quien guarda", el: <Abs x={540} y={1150}><BolsaPan /></Abs> },
  { at: "Al otro día lo", el: (<><M x={330} /><Vecina x={790} /><Abs x={560} y={1300}><Enchufe /></Abs><Pop delay={6} style={{ left: 790, top: 900 }}><Pill text="la vecina" size={32} /></Pop></>) },
  { at: "Y entraron los", el: <Abs x={540} y={1100}><Saldo amount="5.500 CUP" moves={["3.500 CUP · Yuli", "2.000 CUP · Katy"]} /></Abs> },
  { at: "Tin Tin", el: <Abs x={540} y={1100}><Tin /></Abs>, ground: false },
  { at: "Por fin tengo", cam: CLOSE, el: (<><M eyes="wide" glow /><Pop delay={6} style={{ left: 540, top: 700 }}><Pill text="5.500 CUP" color={C.green} /></Pop></>) },
  { at: "Lo que no tengo", dark: true, el: (<><M eyes="flat" speaking /><Pop delay={8} style={{ left: 780, top: 720 }}><Pill icon="🔌" text="sin corriente" size={34} /></Pop></>) },
  { at: "Y la vecina me", el: (<><M x={330} eyes="side" /><Vecina x={790} arms="wave" /><Pop delay={10} style={{ left: 790, top: 880 }}><Pill text="la carga: 100 CUP" size={30} /></Pop></>) },
  { at: "Por transferencia", el: (<><Abs x={540} y={720}><Notif app="Banco" title="Transferencia enviada" text="100 CUP → la vecina · pendiente ⏳" /></Abs><Vecina x={540} size={500} eyes="flat" /></>) },
  { at: "Todavía no le", cam: { z: 1.9, x: 540, y: 1230 }, el: <Vecina x={540} eyes="flat" /> },
  { at: "Así que desde", el: <Abs x={540} y={1180}><Puerta sign /></Abs> },
  { at: "Aunque el billete", el: (<><Abs x={540} y={1050}><Billete frame w={520} /></Abs><Pop delay={10} style={{ left: 540, top: 1420 }}><Pill text="el primero" size={36} /></Pop></>), ground: false },
  // Desde «En fin» manda el final nuevo: Marian dice la frase, se va caminando y sale el sello.
  { at: "En fin", el: <M /> },
];

export const Ep13: React.FC = () => <Episode data={data as EpData} audio="audio/ep13b.mp3" scenes={scenes} outro="walk" />;
