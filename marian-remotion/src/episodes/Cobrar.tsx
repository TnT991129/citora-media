import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import data from "../data/cobrar.json";
import { Abs, BigStamp, Bubble, Chat, Clock, Nail, Phone, Pill, Pop, Row } from "../components/Bits";
import { Episode, Scene } from "../components/Episode";
import { Bottle } from "../components/Places";
import { EpData } from "../lib/words";
import { C, FONT } from "../theme";
import { CLOSE, M, P, XHEAD, Yamila } from "./common";

// Video de valor B «Cuánto cobrar por tus uñas». Las cifras son de EJEMPLO y se dice en pantalla.

const CHALK = "#F7F3E8";

/** Pizarra con la fórmula. `n` filas visibles; `nums` muestra los números de ejemplo; `total` la suma. */
const Pizarra: React.FC<{ n: number; nums?: boolean; total?: boolean; hl?: number }> = ({ n, nums, total, hl }) => {
  const f = useCurrentFrame();
  const rows = [
    ["1", "Material del servicio", "900"],
    ["2", "Gastos fijos por hora × horas", "100 × 2,5 = 250"],
    ["3", "Tu hora × horas", "500 × 2,5 = 1.250"],
  ];
  const sum = Math.round(interpolate(f, [2, 14], [0, 2400], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  return (
    <div style={{ width: 920, background: "#2F4F3E", border: `16px solid #8B5E3C`, borderRadius: 24, padding: "40px 44px", fontFamily: FONT, color: CHALK, boxShadow: "0 18px 0 rgba(0,0,0,0.12)" }}>
      <div style={{ fontWeight: 900, fontSize: 54, marginBottom: 26, letterSpacing: 2 }}>TU PRECIO =</div>
      {rows.slice(0, n).map(([k, t, v], i) => (
        <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 40, fontWeight: 800, padding: "14px 0", borderBottom: "3px dashed rgba(247,243,232,0.35)", color: hl === i + 1 ? "#FFE066" : CHALK }}>
          <span>
            {k}. {t}
          </span>
          {nums && <span style={{ fontWeight: 900 }}>{v}</span>}
        </div>
      ))}
      {total && (
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 64, fontWeight: 900, marginTop: 24, color: "#9BE3C9" }}>
          <span>Total</span>
          <span>{sum >= 1000 ? `${Math.floor(sum / 1000)}.${String(sum % 1000).padStart(3, "0")}` : sum} CUP</span>
        </div>
      )}
      {nums && <div style={{ fontSize: 28, fontWeight: 700, opacity: 0.75, marginTop: 18 }}>Ejemplo: acrílico de 2 h 30 min. Pon tus números.</div>}
    </div>
  );
};

const Calc: React.FC<{ value: string }> = ({ value }) => (
  <div style={{ width: 460, background: "#3A3A44", border: `8px solid ${C.ink}`, borderRadius: 40, padding: 30, fontFamily: FONT }}>
    <div style={{ background: "#CFE3C0", borderRadius: 16, padding: "20px 24px", textAlign: "right", fontFamily: "monospace", fontWeight: 900, fontSize: 72, color: C.ink }}>{value}</div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginTop: 24 }}>
      {["7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "−", "0", ",", "=", "+"].map((k) => (
        <div key={k} style={{ height: 70, borderRadius: 16, background: "=+−×÷".includes(k) ? C.orange : "#5A5A66", color: "#fff", display: "grid", placeItems: "center", fontWeight: 900, fontSize: 36 }}>{k}</div>
      ))}
    </div>
  </div>
);

const Precios: React.FC = () => (
  <Phone title="Salón Marian 💅 · precios" color={C.pinkDark}>
    <Row left="Manicura" right="$ 1.500" />
    <Row left="Pedicura" right="$ 1.800" />
    <Row left="Acrílico" right="$ 2.400" highlight />
    <Row left="Acrílico con diseño" right="$ 3.200" />
    <div style={{ fontWeight: 700, fontSize: 26, color: "#777", marginTop: 10 }}>Precios de ejemplo</div>
  </Phone>
);

const Clienta: React.FC<{ x?: number; eyes?: "happy" | "flat" | "side" | "wide"; arms?: "down" | "wave" }> = (p) => <P hair="#E7B04A" dress="#7EC8E3" style="ponytail" {...p} />;

const scenes: Scene[] = [
  { at: "Cuánto cobras por unas", set: "salon", el: (<><M /><Pop delay={8} style={{ left: 540, top: 700 }}><Pill text="¿cuánto cobras? 💅" size={48} /></Pop></>) },
  { at: "Si contestaste lo que", set: "street", el: (<><M x={330} eyes="side" /><Yamila x={790} /><Pop delay={20} style={{ left: 790, top: 920 }}><Pill text="la de al lado" size={34} /></Pop></>) },
  { at: "estás trabajando para la", set: "salon", cam: CLOSE, el: (<><M eyes="flat" /><Pop delay={10} style={{ left: 540, top: 1400 }}><BigStamp text="trabajas para ella" size={52} /></Pop></>) },
  { at: "Te enseño la cuenta", ground: false, el: <Abs x={540} y={1050}><Pizarra n={0} /></Abs> },
  { at: "Tres números", ground: false, el: (<><Abs x={540} y={1050}><Pizarra n={0} /></Abs><Pop delay={4} style={{ left: 540, top: 1400 }}><Pill text="1 · 2 · 3" size={64} /></Pop></>) },
  { at: "Uno Lo que te", ground: false, el: <Abs x={540} y={1050}><Pizarra n={1} hl={1} /></Abs> },
  { at: "Monómero polvo lima esmalte", ground: false, el: (<><Pop delay={0} style={{ left: 250, top: 1000 }}><Bottle label="MONÓMERO" color="#EAF4FF" w={180} /></Pop><Pop delay={10} style={{ left: 450, top: 1000 }}><Bottle label="POLVO" color="#F7C1D0" w={180} /></Pop><Pop delay={20} style={{ left: 650, top: 1000 }}><div style={{ width: 60, height: 260, background: "#D9D4C9", border: `6px solid ${C.ink}`, borderRadius: 20 }} /></Pop><Pop delay={30} style={{ left: 850, top: 1000 }}><Bottle label="ESMALTE" color="#E97A9B" w={180} /></Pop></>) },
  { at: "Súmalo Aunque duela", ground: false, el: (<><Abs x={540} y={1050}><Calc value="900" /></Abs><Pop delay={20} style={{ left: 540, top: 1480 }}><Pill text="ejemplo" size={36} /></Pop></>) },
  { at: "Dos Tus gastos fijos", ground: false, el: <Abs x={540} y={1050}><Pizarra n={2} hl={2} /></Abs> },
  { at: "Corriente agua el alquiler", ground: false, el: (<>{["💡 corriente", "💧 agua", "🏠 alquiler", "☕ café"].map((t, i) => (<Pop key={t} delay={i * 8} style={{ left: 540, top: 760 + i * 150 }}><Pill text={t} size={48} /></Pop>))}</>) },
  { at: "Divídelo entre las horas", ground: false, el: (<><Pop delay={2} style={{ left: 540, top: 900 }}><Pill text="gastos del mes ÷ horas del mes" size={44} /></Pop><Pop delay={30} style={{ left: 540, top: 1080 }}><Pill text="= 100 CUP la hora (ejemplo)" color={C.green} size={44} /></Pop></>) },
  { at: "Sí el café también", set: "salon", cam: CLOSE, el: (<><M eyes="flat" /><Pop delay={10} style={{ left: 760, top: 900 }}><div style={{ fontSize: 120 }}>☕</div></Pop></>) },
  { at: "Tres Lo que vale", ground: false, el: <Abs x={540} y={1050}><Pizarra n={3} hl={3} /></Abs> },
  { at: "Lo que quieres ganar", set: "salon", el: (<><M x={330} /><Pop delay={4} style={{ left: 780, top: 760 }}><Clock time="1 hora" /></Pop><Pop delay={24} style={{ left: 780, top: 900 }}><Pill text="500 CUP (ejemplo)" color={C.green} size={36} /></Pop></>) },
  { at: "Ahora suma", ground: false, el: <Abs x={540} y={1050}><Pizarra n={3} nums /></Abs> },
  { at: "Ese es tu precio", ground: false, el: <Abs x={540} y={1050}><Pizarra n={3} nums total /></Abs> },
  { at: "No el de la", ground: false, el: (<><Abs x={540} y={1050}><Pizarra n={3} nums total /></Abs><Pop delay={4} style={{ left: 540, top: 1460 }}><BigStamp text="no el de al lado" size={64} /></Pop></>) },
  { at: "Y cuando te digan", set: "salon", el: (<><Clienta x={760} /><Pop delay={10} style={{ left: 420, top: 820 }}><Bubble text="Hazme lo mismo, pero más baratico 🙏" size={36} width={500} tail="right" /></Pop></>) },
  { at: "no bajes el precio", set: "salon", cam: CLOSE, el: (<><M eyes="flat" /><Pop delay={6} style={{ left: 540, top: 1400 }}><BigStamp text="no bajes el precio" size={62} /></Pop></>) },
  { at: "Quita trabajo", ground: false, el: (<><Abs x={330} y={1100}><Nail stones encap cat w={220} /></Abs><Abs x={540} y={1100}><div style={{ fontSize: 120 }}>➜</div></Abs><Abs x={760} y={1100}><Nail w={220} /></Abs></>) },
  { at: "Sin piedras Sin dibujo", ground: false, el: (<><Abs x={540} y={1100}><Nail w={260} /></Abs><Pop delay={4} style={{ left: 300, top: 760 }}><Pill text="✕ piedras" color={C.red} size={40} /></Pop><Pop delay={20} style={{ left: 780, top: 760 }}><Pill text="✕ dibujo" color={C.red} size={40} /></Pop></>) },
  { at: "Más barato sí Pero", set: "salon", el: (<><M /><Pop delay={30} style={{ left: 540, top: 1400 }}><BigStamp text="es otra uña" size={90} /></Pop></>) },
  { at: "Si sube el dólar", ground: false, el: (<><Pop delay={2} style={{ left: 380, top: 1000 }}><div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 200, color: C.green }}>$↑</div></Pop><Pop delay={30} style={{ left: 760, top: 1000 }}><Bottle label="MATERIAL ↑" color="#EAF4FF" w={200} /></Pop></>) },
  { at: "Avisa con una semana", el: <Abs x={540} y={1110}><Chat title="Clientas Marian 💅" sub="34 participantes" msgs={[{ me: true, text: "Mis amores 💅 Desde el lunes 25 tengo precios nuevos. Esta semana, todavía a precio viejo. ¡Gracias por entender!", at: 6 }]} /></Abs> },
  { at: "Sin pedir perdón", set: "salon", cam: XHEAD, el: <M eyes="flat" /> },
  { at: "Y pon tus precios", el: <Abs x={540} y={1110}><Precios /></Abs> },
  { at: "La que ve el", set: "salon", el: (<><Clienta x={760} eyes="happy" arms="wave" /><Pop delay={10} style={{ left: 360, top: 860 }}><Pill text="vio el precio ✓" color={C.green} size={36} /></Pop><Pop delay={34} style={{ left: 360, top: 1000 }}><Pill text="no regatea ✓" color={C.green} size={36} /></Pop></>) },
  { at: "Guarda este video para", ground: false, el: (<><Pop delay={2} style={{ left: 540, top: 1000 }}><div style={{ fontSize: 300 }}>🔖</div></Pop><Pop delay={16} style={{ left: 540, top: 1320 }}><Pill text="GUÁRDALO" color={C.pinkDark} size={64} /></Pop></>) },
  { at: "Porque vas a tener", set: "salon", cam: CLOSE, el: <M eyes="flat" /> },
  { at: "En fin", set: "salon", el: <M /> },
];

export const Cobrar: React.FC = () => <Episode data={data as EpData} audio="audio/cobrar.mp3" scenes={scenes} outro="walk" outroSet="salon" />;
