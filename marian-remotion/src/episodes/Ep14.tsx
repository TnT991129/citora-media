import React from "react";
import data from "../data/ep14.json";
import { Abs, BigStamp, Bubble, Btn, Chat, Clock, Nail, Notif, Phone, Pill, Pop, Row } from "../components/Bits";
import { Marian } from "../components/Characters";
import { Episode, Scene } from "../components/Episode";
import { Almendron, Bottle, Driving, Faucet, Hen, KitBag, Lying, Parada, Sun, WaStatus, Week } from "../components/Places";
import { EpData } from "../lib/words";
import { C, FONT } from "../theme";
import { CLOSE, HEAD, M, P, XHEAD } from "./common";

// Ep. 14 «El domingo libre». Estilo @triple.estresso: un chiste por frase, Marian acaba peor.
// La app: solo el domingo cerrado en el horario (función real) y las reservas del lunes.

type PP = { x?: number; eyes?: "happy" | "flat" | "closed" | "wide" | "side"; arms?: "down" | "wave" | "phone" | "shrug"; size?: number; speaking?: boolean };
const Senora: React.FC<PP> = (p) => <P hair="#2E2E2E" dress="#F28C8C" style="curly" pattern="dots" earrings wide size={520} {...p} />;
const Mileidys: React.FC<PP> = (p) => <P hair="#E7B04A" dress="#7EC8E3" style="ponytail" pattern="flowers" prop="beer" size={520} {...p} />;
const Salvavidas: React.FC<PP> = (p) => <P hair="#2E2E2E" dress={C.red} outfit="shirt" pants="#F2C14E" style="short" prop="whistle" size={520} {...p} />;
const Manisero: React.FC<PP> = (p) => <P hair="#E86A5C" dress="#E9D27A" outfit="shirt" pants="#3E4A61" style="cap" mustache prop="cone" size={520} {...p} />;

const Horario: React.FC<{ sleep?: boolean }> = ({ sleep }) => (
  <Phone title="Mi horario" color={C.pinkDark} h={1060}>
    {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"].map((d) => (
      <Row key={d} left={d} right="9:00 – 6:00" rightColor={C.ink} size={28} />
    ))}
    <Row left="Domingo" right={sleep ? "Cerrado 😴" : "Cerrado"} rightColor={C.red} highlight size={34} />
  </Phone>
);

const Agenda: React.FC<{ hl?: boolean }> = ({ hl }) => (
  <Phone title="Lunes · 9 citas" color={C.orange}>
    {["8:00 · Mileidys", "9:00 · Señora del sombrero", "10:00 · Señora de la sombrilla", "11:00 · Señora del termo", "12:00 · …"].map((r) => (
      <Row key={r} left={r} right="✓" size={30} />
    ))}
    <Row left="4:00 · Salvavidas 🛟" right="✓" size={30} highlight={hl} />
  </Phone>
);

const BrokenNail: React.FC = () => (
  <div style={{ position: "relative" }}>
    <Nail color="#EE8BA8" w={280} />
    <svg viewBox="0 0 200 400" width={280} height={560} style={{ position: "absolute", inset: 0 }}>
      <path d="M40 70 L80 90 L70 110 L120 120 L110 140 L165 150" stroke={C.ink} strokeWidth={7} fill="none" strokeLinejoin="round" />
    </svg>
  </div>
);

const beach = (el: React.ReactNode, _sunset = false): React.ReactNode => el;

const scenes: Scene[] = [
  { at: "Me tomé un día", set: "salon", el: (<><M /><Pop delay={6} style={{ left: 540, top: 700 }}><Pill icon="🌴" text="día libre" /></Pop></>) },
  { at: "El primero en tres", set: "salon", cam: HEAD, el: (<><M /><Pop delay={4} style={{ left: 540, top: 780 }}><Pill text="1 en 3 años" color={C.orange} /></Pop></>) },
  { at: "Fue el día que", set: "salon", cam: CLOSE, el: (<><M eyes="flat" /><Pop delay={14} style={{ left: 540, top: 1380 }}><BigStamp text="el que más trabajé" size={56} /></Pop></>) },
  { at: "Lo decidí el viernes", ground: false, el: <Abs x={540} y={1100}><Week mark={6} label="LIBRE" /></Abs> },
  { at: "Lo puse en el estado", el: <Abs x={540} y={1110}><WaStatus text="Domingo cerrado. Marian descansa" /></Abs> },
  { at: "Con un emoji de", el: (<><Abs x={540} y={1110}><WaStatus text="Domingo cerrado. Marian descansa 🌴" /></Abs><Pop delay={4} style={{ left: 540, top: 1350 }}><div style={{ fontSize: 260 }}>🌴</div></Pop></>) },
  { at: "A la hora tenía", set: "salon", el: (<><M size={560} eyes="wide" /><Pop delay={4} style={{ left: 540, top: 700 }}><Notif app="WhatsApp" title="23 mensajes nuevos" text="Clientas Marian 💅" /></Pop></>) },
  { at: "Cerrado cerrado", el: <Abs x={540} y={1110}><Chat title="Clientas Marian 💅" sub="23 mensajes" msgs={[{ who: "Yuli", text: "¿Cerrado cerrado?" }, { who: "Katy", text: "¿Y si paso un ratico? 🙏", at: 30 }, { who: "Mileidys", text: "Mi amor, es que el lunes tengo un cumpleaños 🎂", at: 62 }]} /></Abs> },
  { at: "Todo el mundo tiene", set: "salon", cam: CLOSE, el: (<><M eyes="side" /><Pop delay={30} style={{ left: 540, top: 700 }}><Pill icon="🎂" text="cumpleaños permanente" size={36} /></Pop></>) },
  { at: "En la app puse", el: <Abs x={540} y={1110}><Horario /></Abs> },
  { at: "La app lo respetó", el: (<><Abs x={540} y={1110}><Horario /></Abs><Pop delay={6} style={{ left: 540, top: 1500 }}><BigStamp text="respetado ✓" color={C.green} size={80} /></Pop></>) },
  { at: "Fue la única", set: "salon", cam: XHEAD, el: <M eyes="flat" /> },
  { at: "El domingo a las seis", set: "street", el: (<><M x={420} arms="down" /><Abs x={800} y={1260}><Parada /></Abs><Pop delay={4} style={{ left: 420, top: 700 }}><Clock time="6:00 a. m." /></Pop></>) },
  { at: "La guagua no vino", set: "street", el: (<><M x={420} arms="down" eyes="side" /><Abs x={800} y={1260}><Parada /></Abs><Pop delay={6} style={{ left: 540, top: 1420 }}><BigStamp text="no vino" /></Pop></>) },
  { at: "La guagua tampoco", set: "street", cam: CLOSE, el: (<><M eyes="flat" /><Pop delay={20} style={{ left: 540, top: 700 }}><Pill icon="🚌" text="libre los domingos" size={36} /></Pop></>) },
  { at: "Cogí un almendrón", set: "street", ground: false, el: <Driving y={1400}><Almendron heads={2} /></Driving> },
  { at: "Íbamos siete", set: "street", ground: false, el: (<><Abs x={540} y={1400}><Almendron heads={6} hen /></Abs><Pop delay={8} style={{ left: 540, top: 720 }}><Pill text="7 + 🐔" /></Pop></>) },
  { at: "La gallina iba mejor", cam: { z: 1.2, x: 540, y: 1100 }, ground: false, el: (<><Abs x={540} y={1150}><Hen size={420} /></Abs><Pop delay={10} style={{ left: 540, top: 800 }}><Pill icon="🪟" text="asiento de ventana" size={36} /></Pop></>) },
  { at: "Y no pagó", ground: false, el: (<><Abs x={540} y={1150}><Hen size={420} /></Abs><Pop delay={2} style={{ left: 540, top: 1500 }}><BigStamp text="no pagó" /></Pop></>) },
  { at: "Llegué a la playa", set: "beach", ground: false, el: beach(<><M /><Abs x={850} y={520}><Sun /></Abs><Pop delay={4} style={{ left: 300, top: 600 }}><Clock time="9:00" /></Pop></>) },
  { at: "Me acosté en la", set: "beach", ground: false, el: beach(<><Lying><Marian size={600} eyes="closed" speaking={false} arms="down" /></Lying><Abs x={850} y={520}><Sun /></Abs></>) },
  { at: "Tres minutos", set: "beach", ground: false, el: beach(<><Lying><Marian size={600} eyes="closed" speaking={false} arms="down" /></Lying><Pop delay={2} style={{ left: 540, top: 700 }}><Pill icon="⏱️" text="3 minutos" /></Pop></>) },
  { at: "Me los abrió", set: "beach", ground: false, el: beach(<><Lying><Marian size={600} eyes="wide" speaking={false} arms="down" /></Lying><Senora x={800} /><Pop delay={20} style={{ left: 540, top: 720 }}><Bubble text="¿Tú no eres la de las uñas?" size={38} /></Pop></>) },
  { at: "Mira Mileidys", set: "beach", ground: false, el: beach(<><Senora x={300} arms="wave" /><Mileidys x={780} /><Pop delay={6} style={{ left: 780, top: 920 }}><Pill text="Mileidys" size={34} /></Pop></>) },
  { at: "Mileidys tenía una", ground: false, el: <Abs x={540} y={1120}><BrokenNail /></Abs> },
  { at: "La del pulgar", ground: false, el: (<><Abs x={540} y={1120}><BrokenNail /></Abs><Pop delay={14} style={{ left: 540, top: 1500 }}><Pill icon="🍺" text="abriendo una cerveza" /></Pop></>) },
  { at: "Y yo que soy decente", set: "beach", ground: false, el: beach(<><M x={360} /><Abs x={780} y={1300}><KitBag /></Abs></>) },
  { at: "El por si acaso", set: "beach", cam: HEAD, ground: false, el: beach(<M eyes="flat" />) },
  { at: "Le arreglé la uña", set: "beach", ground: false, el: beach(<><M x={330} arms="cloth" /><Mileidys x={790} /><Abs x={820} y={420}><Sun /></Abs></>) },
  { at: "El gel secó solo", ground: false, el: (<><Abs x={540} y={800}><Sun size={420} face /></Abs><Abs x={540} y={1380}><Nail color="#EE8BA8" w={170} /></Abs></>) },
  { at: "Por primera vez en", ground: false, el: (<><Abs x={540} y={950}><Sun size={460} face /></Abs><Pop delay={20} style={{ left: 540, top: 1450 }}><Pill icon="🏅" text="empleado del mes" color={C.orange} /></Pop></>) },
  { at: "Cuando levanté la", set: "beach", ground: false, el: beach(<><M x={160} size={600} /><Senora x={390} size={460} /><Mileidys x={590} size={460} /><Senora x={790} size={460} /><Salvavidas x={980} size={460} /></>) },
  { at: "Ocho señoras", set: "beach", ground: false, el: beach(<><Senora x={250} size={460} /><Mileidys x={500} size={460} /><Salvavidas x={800} size={460} /><Pop delay={2} style={{ left: 540, top: 700 }}><Pill text="8 señoras + 🛟" /></Pop></>) },
  { at: "Y un muchacho vendiendo", set: "beach", ground: false, el: beach(<><Manisero x={720} arms="wave" /><Pop delay={6} style={{ left: 720, top: 860 }}><Pill text="🥜 maní" size={34} /></Pop><Pop delay={40} style={{ left: 420, top: 720 }}><Bubble text="¿Y tú haces pies?" size={40} tail="right" /></Pop></>) },
  { at: "Le dije que con arena", set: "beach", cam: CLOSE, ground: false, el: beach(<M eyes="flat" />) },
  { at: "Con arena es exfoliación", set: "beach", ground: false, el: beach(<><M x={330} /><Manisero x={790} /><Pop delay={6} style={{ left: 540, top: 720 }}><Pill text="exfoliación: aparte" color={C.green} /></Pop></>) },
  { at: "A las cuatro me", ground: false, el: (<><Abs x={540} y={1150}><Bottle label="ROSADO" empty /></Abs><Pop delay={2} style={{ left: 540, top: 720 }}><Clock time="4:00 p. m." /></Pop></>) },
  { at: "A las cinco", ground: false, el: (<><Abs x={540} y={1150}><Bottle label="ACETONA" color="#CFE8FF" empty /></Abs><Pop delay={2} style={{ left: 540, top: 720 }}><Clock time="5:00 p. m." /></Pop></>) },
  { at: "A las seis", set: "sunset", ground: false, el: beach(<><M eyes="flat" /><Pop delay={2} style={{ left: 540, top: 600 }}><Clock time="6:00 p. m." /></Pop></>, true) },
  { at: "Y sin bañarme", set: "sunset", ground: false, el: beach(<><M eyes="flat" /><Pop delay={20} style={{ left: 540, top: 1500 }}><BigStamp text="ni toqué el agua" size={78} /></Pop></>, true) },
  { at: "Volví en el mismo", set: "street", ground: false, el: <Driving y={1400} from={1300} to={-200}><Almendron heads={6} /></Driving> },
  { at: "La gallina ya no", set: "street", ground: false, el: (<><Abs x={540} y={1400}><Almendron heads={6} /></Abs><Pop delay={10} style={{ left: 540, top: 720 }}><Pill icon="🐔" text="se bajó" /></Pop></>) },
  { at: "Ella sí tuvo", set: "sunset", ground: false, el: beach(<><Abs x={540} y={1450}><Hen size={360} shades /></Abs><Abs x={850} y={520}><Sun /></Abs></>, true) },
  { at: "Llegué a la casa", set: "night", dark: true, el: (<><M eyes="wide" speaking={false} /><Pop delay={10} style={{ left: 760, top: 720 }}><BigStamp text="¡apagón!" color={C.orange} size={90} /></Pop></>) },
  { at: "Sin agua", dark: true, ground: false, el: <Abs x={540} y={1100}><Faucet /></Abs> },
  { at: "Con arena hasta en", ground: false, el: <Abs x={540} y={1150}><Bottle label="MONÓMERO" color="#EAF4FF" sand /></Abs> },
  { at: "Y el lunes por la", el: <Abs x={540} y={1110}><Agenda /></Abs> },
  { at: "Todas las señoras", el: <Abs x={540} y={1110}><Agenda hl /></Abs> },
  { at: "Reservaron solas", set: "night", dark: true, ground: false, el: (<><Lying><Marian size={600} eyes="closed" speaking={false} arms="down" /></Lying><Pop delay={10} style={{ left: 540, top: 720 }}><Notif title="Nueva cita 💅" text="Lunes · 4:00 · Salvavidas" /></Pop></>) },
  { at: "Así que el domingo", el: <Abs x={540} y={1110}><Horario /></Abs> },
  { at: "La app descansa", el: <Abs x={540} y={1110}><Horario sleep /></Abs> },
  { at: "Yo no", set: "salon", cam: XHEAD, el: <M eyes="flat" /> },
  { at: "En fin", set: "salon", el: <M /> },
];

export const Ep14: React.FC = () => <Episode data={data as EpData} audio="audio/ep14a.mp3" scenes={scenes} outro="walk" outroSet="salon" />;

// Sin uso directo (reservado para variantes): evita que el linter quite imports compartidos.
export const _unused = { Btn, FONT };
