import React from "react";
import data from "../data/miami.json";
import { Abs, BigStamp, Bubble, Chat, Notif, Phone, Pill, Pop, Row } from "../components/Bits";
import { Episode, Scene } from "../components/Episode";
import { Bottle } from "../components/Places";
import { EpData } from "../lib/words";
import { C, FONT, GROUND } from "../theme";
import { CLOSE, HEAD, M, P, XHEAD, Yamila } from "./common";

// «El paquete de Miami». La app: el «Verde Miami» puesto como servicio. Nada se paga por la app.

const VERDE = "#7BC043";
type PP = { x?: number; size?: number; eyes?: "happy" | "flat" | "closed" | "wide" | "side"; arms?: "down" | "wave" | "shrug" | "up"; smile?: boolean };
const Viajera: React.FC<PP> = (p) => <P hair="#E7B04A" dress="#3E7CC9" style="long" glasses earrings prop="bag" {...p} />;
const Senora: React.FC<PP> = (p) => <P hair="#C8C8C8" dress="#F28C8C" style="bun" old glasses smile={false} {...p} />;

const Maleta: React.FC<{ w?: number }> = ({ w = 260 }) => (
  <svg viewBox="0 0 200 260" width={w} height={w * 1.3}>
    <path d="M70 40 L70 10 L130 10 L130 40" stroke={C.ink} strokeWidth={8} fill="none" />
    <rect x={20} y={40} width={160} height={200} rx={20} fill="#E86A5C" stroke={C.ink} strokeWidth={8} />
    {[70, 100, 130].map((x) => <path key={x} d={`M${x} 50 L${x} 230`} stroke={C.ink} strokeWidth={4} opacity={0.5} />)}
    <rect x={40} y={110} width={120} height={40} rx={6} fill="#fff" stroke={C.ink} strokeWidth={4} />
    <text x={100} y={138} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={22} fill={C.ink}>MIAMI ✈</text>
    <circle cx={50} cy={248} r={10} fill={C.ink} />
    <circle cx={150} cy={248} r={10} fill={C.ink} />
  </svg>
);

const Caja: React.FC<{ n: number; half?: boolean }> = ({ n, half }) => (
  <div style={{ position: "relative", width: 640, height: 520 }}>
    <svg viewBox="0 0 400 320" width={640} height={512} style={{ position: "absolute", inset: 0 }}>
      <path d="M20 110 L380 110 L360 310 L40 310 Z" fill="#D9B98A" stroke={C.ink} strokeWidth={8} strokeLinejoin="round" />
      <path d="M20 110 L-10 60 L170 60 L200 110 M380 110 L410 60 L230 60 L200 110" fill="#C9A672" stroke={C.ink} strokeWidth={7} strokeLinejoin="round" />
      <text x={200} y={250} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={40} fill={C.ink}>{half ? "½" : "MIAMI"}</text>
    </svg>
    <div style={{ position: "absolute", left: 90, right: 90, top: 30, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6 }}>
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} style={{ width: 54, height: 90, borderRadius: 12, border: `4px solid ${C.ink}`, background: i === n - 1 && n === 6 ? VERDE : ["#F2A7BE", "#E97A9B", "#F7C1D0", "#EE8BA8", "#F5A3BA"][i % 5] }} />
      ))}
    </div>
  </div>
);

const Bascula: React.FC = () => (
  <svg viewBox="0 0 300 260" width={420} height={364}>
    <rect x={40} y={170} width={220} height={70} rx={16} fill="#ddd" stroke={C.ink} strokeWidth={7} />
    <rect x={95} y={185} width={110} height={40} rx={6} fill="#1E2A1E" />
    <text x={150} y={214} textAnchor="middle" fontFamily="monospace" fontWeight={900} fontSize={28} fill="#7CFF6B">23.5 kg</text>
    <rect x={20} y={150} width={260} height={22} rx={8} fill="#bbb" stroke={C.ink} strokeWidth={6} />
    <rect x={90} y={40} width={120} height={110} rx={14} fill="#EAF4FF" stroke={C.ink} strokeWidth={6} />
    <text x={150} y={102} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={20} fill={C.ink}>MONÓMERO</text>
  </svg>
);

const Novela: React.FC<{ title: string; sub: string }> = ({ title, sub }) => (
  <div style={{ width: 520, height: 700, background: "#7A2E3A", border: `10px solid ${C.ink}`, borderRadius: 18, rotate: "-4deg", display: "grid", placeItems: "center", textAlign: "center", fontFamily: "'DejaVu Serif', serif", color: "#F7E3B5", padding: 40, boxShadow: "16px 16px 0 rgba(0,0,0,0.12)" }}>
    <div>
      <div style={{ fontSize: 34, letterSpacing: 6 }}>NOVELA</div>
      <div style={{ fontSize: 90, fontWeight: 900, lineHeight: 1.05, margin: "30px 0" }}>{title}</div>
      <div style={{ fontSize: 34, fontStyle: "italic" }}>{sub}</div>
    </div>
  </div>
);

const Semaforo: React.FC = () => (
  <svg viewBox="0 0 200 440" width={240} height={528}>
    <rect x={30} y={10} width={140} height={360} rx={30} fill="#2E2E2E" stroke={C.ink} strokeWidth={8} />
    <circle cx={100} cy={80} r={42} fill="#5A2A2A" />
    <circle cx={100} cy={190} r={42} fill="#5A4A2A" />
    <circle cx={100} cy={300} r={46} fill={VERDE} stroke="#fff" strokeWidth={4} />
    <path d="M82 292 L92 292 M108 292 L118 292" stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
    <path d="M86 320 Q100 310 114 320" stroke={C.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
    <path d="M100 370 L100 440" stroke="#2E2E2E" strokeWidth={22} />
    <text x={160} y={260} fontSize={46}>🤒</text>
  </svg>
);

const Post: React.FC = () => (
  <Phone w={600} h={900}>
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
      <div style={{ width: 54, height: 54, borderRadius: 27, background: C.lilac, border: `4px solid ${C.ink}` }} />
      <div style={{ fontWeight: 900, fontSize: 32 }}>salon.yamila ✂️</div>
    </div>
    <div style={{ background: "#EAF7DF", borderRadius: 24, height: 440, display: "grid", placeItems: "center", border: `4px solid ${C.ink}` }}>
      <div style={{ display: "flex", gap: 14 }}>
        {[0, 1, 2, 3].map((i) => <div key={i} style={{ width: 70, height: 150, borderRadius: "40px 40px 16px 16px", background: VERDE, border: `5px solid ${C.ink}`, rotate: `${(i - 1.5) * 6}deg` }} />)}
      </div>
    </div>
    <div style={{ fontWeight: 800, fontSize: 34, marginTop: 18 }}>❤️ 214 · 💬 37</div>
    <div style={{ fontWeight: 600, fontSize: 28, marginTop: 6 }}>Mis uñas nuevas 💚 ¿les gustan?</div>
  </Phone>
);

const Servicios: React.FC = () => (
  <Phone title="Salón Marian 💅" color={C.pinkDark}>
    <Row left="Manicura" right="$ 1.500" />
    <Row left="Acrílico" right="$ 4.000" />
    <Pop delay={10} style={{ position: "relative" }}>
      <Row left="Verde Miami 💚" right="$ 5.000" rightColor={VERDE} highlight />
    </Pop>
    <Pop delay={30} style={{ position: "relative", marginTop: 10 }}>
      <Pill text="precio de importación ✈️" size={30} />
    </Pop>
  </Phone>
);

const Sabados: React.FC = () => (
  <Phone title="Sábados" color={VERDE}>
    {["9:00 · Verde Miami", "10:30 · Verde Miami", "12:00 · Verde Miami", "2:00 · Verde Miami", "3:30 · Verde Miami"].map((r) => (
      <Row key={r} left={r} right="✓" rightColor={VERDE} size={30} />
    ))}
    <Row left="Completo" right="💚" highlight size={30} />
  </Phone>
);

const Equipo: React.FC = () => (
  <>
    {[0, 1, 2, 3, 4].map((i) => (
      <P key={i} x={120 + i * 210} size={430} hair={VERDE} dress={VERDE} outfit="shirt" pants="#fff" style="cap" mustache={i % 2 === 0} />
    ))}
  </>
);

const scenes: Scene[] = [
  { at: "Mi prima me mandó", set: "salon", el: (<><M /><Pop delay={10} style={{ left: 540, top: 700 }}><Pill text="📦 desde Miami" size={44} /></Pop></>) },
  { at: "Llegó la mitad", ground: false, el: <Abs x={540} y={1100}><Caja n={6} half /></Abs> },
  { at: "Y la mitad que", set: "salon", cam: CLOSE, el: (<><M eyes="flat" /><Pop delay={20} style={{ left: 540, top: 1400 }}><BigStamp text="y no era la mía" size={70} /></Pop></>) },
  { at: "Doce esmaltes monómero polvo", ground: false, el: (<><Abs x={540} y={1050}><Caja n={12} /></Abs><Pop delay={30} style={{ left: 540, top: 1460 }}><Pill text="12 esmaltes + monómero + polvo + limas" size={30} /></Pop></>) },
  { at: "Lo mandó con una", set: "street", el: (<><Viajera x={460} /><Abs x={720} y={GROUND - 170}><Maleta w={240} /></Abs></>) },
  { at: "Una mula", set: "street", el: (<><Viajera x={460} /><Abs x={720} y={GROUND - 170}><Maleta w={240} /></Abs><Pop delay={4} style={{ left: 540, top: 820 }}><Pill text="«mula» 🫏" size={44} /></Pop><Pop delay={36} style={{ left: 540, top: 940 }}><Pill text="«viajera» ✈️" size={44} /></Pop></>) },
  { at: "Yo prefiero que llegue", set: "salon", cam: XHEAD, el: <M eyes="flat" /> },
  { at: "La primera semana me", el: <Abs x={540} y={1110}><Chat title="Viajera ✈️" sub="en línea" msgs={[{ audio: "0:42", text: "", at: 6 }]} /></Abs> },
  { at: "Mami todo bien", el: <Abs x={540} y={1110}><Chat title="Viajera ✈️" sub="en línea" msgs={[{ audio: "0:42", text: "" }, { text: "Mami, todo bien, el lunes te lo llevo 🙏", at: 4 }]} /></Abs> },
  { at: "El lunes otro audio", el: <Abs x={540} y={1110}><Chat title="Viajera ✈️" sub="en línea" msgs={[{ text: "Mami, todo bien, el lunes te lo llevo 🙏" }, { audio: "1:15", text: "", at: 6 }, { text: "Se me complicó, mami. El jueves 🙏", at: 26 }]} /></Abs> },
  { at: "El jueves un audio", el: (<><Abs x={540} y={1110}><Chat title="Viajera ✈️" sub="en línea" msgs={[{ text: "Se me complicó, mami. El jueves 🙏" }, { audio: "6:00", text: "", at: 6 }]} /></Abs><Pop delay={20} style={{ left: 540, top: 1500 }}><Pill text="⏱️ 6 minutos" color={C.red} size={44} /></Pop></>) },
  { at: "Cuatro minutos de su", ground: false, el: (<><Pop delay={2} style={{ left: 540, top: 820 }}><Pill text="🏥 4 min · la tía en el hospital" size={36} /></Pop><Pop delay={40} style={{ left: 540, top: 1000 }}><Pill text="🐶 1 min · un perro" size={36} /></Pop><Pop delay={70} style={{ left: 540, top: 1180 }}><Pill text="📦 «el sábado»" color={C.orange} size={44} /></Pop></>) },
  { at: "Seis audios en tres", el: <Abs x={540} y={1110}><Chat title="Viajera ✈️" sub="en línea" msgs={[{ audio: "0:42", text: "" }, { audio: "1:15", text: "", at: 4 }, { audio: "6:00", text: "", at: 8 }, { audio: "2:30", text: "", at: 12 }, { audio: "3:10", text: "", at: 16 }, { audio: "4:45", text: "", at: 20 }]} /></Abs> },
  { at: "Con esos audios se", ground: false, el: <Abs x={540} y={1100}><Novela title="El lunes" sub="(con el mismo final)" /></Abs> },
  { at: "El sábado por fin", set: "street", el: (<><M x={300} eyes="wide" /><Viajera x={640} arms="wave" /><Abs x={880} y={GROUND - 170}><Maleta w={220} /></Abs></>) },
  { at: "Con la maleta Y", set: "street", el: (<><Viajera x={460} /><Abs x={720} y={GROUND - 170}><Maleta w={240} /></Abs><Pop delay={30} style={{ left: 540, top: 820 }}><Pill text="🧾 y la cuenta" size={44} /></Pop></>) },
  { at: "Cobraba por kilo", ground: false, el: (<><Abs x={540} y={1150}><Bascula /></Abs><Pop delay={10} style={{ left: 540, top: 820 }}><Pill text="$ por kilo" color={C.red} size={44} /></Pop></>) },
  { at: "Y la cuenta pesaba", set: "salon", cam: CLOSE, el: (<><M eyes="flat" /><Pop delay={6} style={{ left: 540, top: 1400 }}><BigStamp text="la cuenta pesaba más" size={46} /></Pop></>) },
  { at: "Abrí el paquete", ground: false, el: <Abs x={540} y={1100}><Caja n={6} /></Abs> },
  { at: "Seis esmaltes", ground: false, el: (<><Abs x={540} y={1100}><Caja n={6} /></Abs><Pop delay={2} style={{ left: 540, top: 1460 }}><Pill text="6 de 12" color={C.red} size={48} /></Pop></>) },
  { at: "Ay mami mi mujer", set: "street", el: (<><Viajera x={760} /><Pop delay={4} style={{ left: 420, top: 820 }}><Bubble text="Ay, mami, mi mujer escogió unos. Como comisión 🙏" size={32} width={520} tail="right" /></Pop></>) },
  { at: "Escogió los bonitos", set: "salon", cam: HEAD, el: <M eyes="flat" /> },
  { at: "Su mujer tiene buen", set: "salon", el: (<><M eyes="side" /><Pop delay={6} style={{ left: 540, top: 700 }}><Pill text="buen gusto ✓ · mis esmaltes ✓" size={36} /></Pop></>) },
  { at: "Me quedaron cinco rosados", ground: false, el: <Abs x={540} y={1100}><div style={{ display: "flex", gap: 10 }}>{["#F2A7BE", "#E97A9B", "#F7C1D0", "#EE8BA8", "#F5A3BA"].map((c) => <Bottle key={c} label="" color={c} w={150} />)}</div></Abs> },
  { at: "Y uno verde", ground: false, el: (<><Abs x={540} y={1100}><div style={{ display: "flex", gap: 10 }}>{["#F2A7BE", "#E97A9B", "#F7C1D0", "#EE8BA8", "#F5A3BA"].map((c) => <Bottle key={c} label="" color={c} w={150} />)}</div></Abs><Pop delay={4} style={{ left: 540, top: 1450 }}><Bottle label="VERDE" color={VERDE} /></Pop></>) },
  { at: "Un verde que no", ground: false, el: (<><Abs x={540} y={1100}><Bottle label="VERDE" color={VERDE} /></Abs><Pop delay={20} style={{ left: 540, top: 1460 }}><Pill text="no existe en la naturaleza" size={38} /></Pop></>) },
  { at: "Como de semáforo enfermo", set: "street", el: <Abs x={540} y={1300}><Semaforo /></Abs> },
  { at: "De lagartija con fiebre", ground: false, el: <Abs x={540} y={1100}><div style={{ fontSize: 300 }}>🦎🤒</div></Abs> },
  { at: "Nadie lo quería", set: "salon", el: (<><M x={360} eyes="flat" /><Abs x={760} y={1350}><div style={{ scale: 0.7 }}><Bottle label="VERDE" color={VERDE} /></div></Abs><Pop delay={10} style={{ left: 760, top: 1060 }}><Pill text="0 pedidos" color={C.red} size={36} /></Pop></>) },
  { at: "Lo ofrecí con descuento", ground: false, el: (<><Pop delay={2} style={{ left: 540, top: 900 }}><Pill text="-50%" color={C.red} size={80} /></Pop><Pop delay={40} style={{ left: 540, top: 1150 }}><Pill text="GRATIS" color={C.green} size={80} /></Pop></>) },
  { at: "Una señora me dijo", set: "salon", el: (<><Senora x={780} /><Pop delay={10} style={{ left: 420, top: 820 }}><Bubble text="Gratis no, mija… que me da miedo" size={36} width={480} tail="right" /></Pop></>) },
  { at: "Hasta que Yamila se", set: "salon", el: (<><Yamila x={540} /><Pop delay={10} style={{ left: 540, top: 900 }}><Pill text="💚 se lo puso" size={40} /></Pop></>) },
  { at: "Yamila La de la", set: "street", el: (<><M x={300} eyes="side" /><Yamila x={790} /><Pop delay={10} style={{ left: 790, top: 920 }}><Pill text="la competencia" size={34} /></Pop></>) },
  { at: "Y subió la foto", el: <Abs x={540} y={1110}><Post /></Abs> },
  { at: "Al otro día tres", set: "salon", el: (<><M size={520} eyes="wide" />{[0, 1, 2].map((i) => (<Pop key={i} delay={4 + i * 8} style={{ left: 540, top: 520 + i * 200 }}><Notif app="WhatsApp" title={["Rosi", "Daylin", "Mileidys"][i]} text="¿Tú tienes el verde de Yamila? 💚" /></Pop>))}</>) },
  { at: "Tú tienes el verde", el: <Abs x={540} y={1110}><Chat title="Rosi" sub="en línea" msgs={[{ text: "¿Tú tienes el verde de Yamila? 💚", at: 2 }]} /></Abs> },
  { at: "El verde de Yamila", set: "salon", cam: CLOSE, el: (<><M eyes="side" /><Pop delay={40} style={{ left: 540, top: 1400 }}><BigStamp text="¡MI verde!" color={VERDE} size={90} /></Pop></>) },
  { at: "Así que lo puse", el: <Abs x={540} y={1110}><Servicios /></Abs> },
  { at: "Se me llenaron los", el: <Abs x={540} y={1110}><Sabados /></Abs> },
  { at: "Todo el barrio de", set: "street", el: (<>{[0, 1, 2, 3].map((i) => (<P key={i} x={150 + i * 260} size={460} hair={["#8A5A3B", "#E7B04A", "#2E2E2E", "#C0392B"][i]} dress={VERDE} style={(["bob", "ponytail", "curly", "long"] as const)[i]} />))}</>) },
  { at: "Parecíamos un equipo de", set: "street", el: (<><Equipo /><Pop delay={20} style={{ left: 540, top: 780 }}><div style={{ fontSize: 120 }}>⚾</div></Pop></>) },
  { at: "Uno que pierde", set: "street", el: (<><Equipo /><Pop delay={4} style={{ left: 540, top: 780 }}><div style={{ background: "#1E2A1E", border: `8px solid ${C.ink}`, borderRadius: 16, padding: "18px 40px", fontFamily: "monospace", fontWeight: 900, fontSize: 80, color: "#7CFF6B" }}>0 - 12</div></Pop></>) },
  { at: "Ayer se acabó el", ground: false, el: <Abs x={540} y={1100}><Bottle label="VERDE" color={VERDE} empty /></Abs> },
  { at: "Le escribí a mi", el: <Abs x={540} y={1110}><Chat title="Prima (Miami) 🌴" sub="en línea" msgs={[{ me: true, text: "Prima, ¿me mandas otro verde? 💚", at: 4 }]} /></Abs> },
  { at: "Me contestó con un", el: <Abs x={540} y={1110}><Chat title="Prima (Miami) 🌴" sub="en línea" msgs={[{ me: true, text: "Prima, ¿me mandas otro verde? 💚" }, { audio: "3:40", text: "", at: 6 }]} /></Abs> },
  { at: "Mami el lunes te", el: <Abs x={540} y={1110}><Chat title="Prima (Miami) 🌴" sub="en línea" msgs={[{ me: true, text: "Prima, ¿me mandas otro verde? 💚" }, { audio: "3:40", text: "" }, { text: "Mami, el lunes te lo mando 🙏", at: 4 }]} /></Abs> },
  { at: "Ya sé cómo termina", ground: false, el: <Abs x={540} y={1100}><Novela title="El lunes 2" sub="(la secuela)" /></Abs> },
  { at: "Lo que no sé", set: "salon", cam: CLOSE, el: (<><M eyes="side" /><Pop delay={20} style={{ left: 540, top: 700 }}><Pill text="¿de qué color? 🎨" size={44} /></Pop></>) },
  { at: "En fin", set: "salon", el: <M /> },
];

export const Miami: React.FC = () => <Episode data={data as EpData} audio="audio/miami.mp3" scenes={scenes} outro="walk" outroSet="salon" />;
