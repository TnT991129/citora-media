import React from "react";
import { useCurrentFrame } from "remotion";
import data from "../data/ep12.json";
import { Abs, BigStamp, Bubble, Cash, Chair, Clock, Nail, Notif, Phone, Pill, Pop, Table } from "../components/Bits";
import { Episode, Scene } from "../components/Episode";
import { EpData } from "../lib/words";
import { C, FONT } from "../theme";
import { CLOSE, HEAD, M, XHEAD, Yamila } from "./common";
import { Person } from "../components/Characters";

const Pinterest: React.FC<{ stones?: boolean; encap?: boolean; cat?: boolean; label?: string }> = ({ stones, encap, cat, label }) => (
  <Phone w={600} h={1000}>
    <div style={{ fontWeight: 800, fontSize: 34, color: "#E60023", marginBottom: 20 }}>● Pinterest</div>
    <div style={{ background: "#F9DCE5", borderRadius: 30, display: "grid", placeItems: "center", padding: 20, position: "relative" }}>
      <Nail stones={stones} encap={encap} cat={cat} w={250} />
      {label && <div style={{ position: "absolute", bottom: 30, rotate: "-6deg" }}><BigStamp text={label} size={64} /></div>}
    </div>
  </Phone>
);

const Stars: React.FC = () => {
  const f = useCurrentFrame();
  return <div style={{ fontSize: 86, letterSpacing: 6, color: C.orange }}>{"★★★★★".slice(0, Math.min(5, Math.floor(f / 5) + 1))}</div>;
};

const Counter: React.FC<{ to: number }> = ({ to }) => {
  const f = useCurrentFrame();
  return <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 280, color: C.ink }}>{Math.min(to, 1 + Math.floor(f / 3))}</div>;
};

const Review: React.FC<{ text?: boolean }> = ({ text }) => (
  <Phone title="Opiniones" color={C.pinkDark}>
    <div style={{ fontWeight: 800, fontSize: 38, marginBottom: 10 }}>Yamila</div>
    <Stars />
    {text && <div style={{ fontWeight: 600, fontSize: 40, marginTop: 20, lineHeight: 1.3 }}>«Marian es la mejor. Y no hay que escribirle» 💅</div>}
  </Phone>
);

const scenes: Scene[] = [
  { at: "Ayer me reservó", el: (<><M eyes="wide" /><Pop delay={10} style={{ left: 540, top: 640 }}><Notif title="Nueva cita 💅" text="Yamila · Acrílico" /></Pop></>) },
  { at: "La de la app", el: (<><Yamila x={540} /><Pop delay={4} style={{ left: 540, top: 900 }}><Pill text="Yamila ✂️" /></Pop></>) },
  { at: "Por mi app", cam: XHEAD, el: <M /> },
  { at: "Me llegó el aviso", el: (<><Abs x={540} y={720}><Notif title="Yamila · Acrílico" text="Jueves · 2:00 p. m." /></Abs><M size={560} /></>) },
  { at: "La competencia", el: (<><M x={300} eyes="side" /><Yamila x={790} /><Pop delay={4} style={{ left: 545, top: 1100 }}><BigStamp text="vs" size={140} rotate={0} /></Pop></>) },
  { at: "En mi silla", cam: { z: 1.3, y: 1250 }, el: <Abs x={540} y={1300}><Chair label="Yamila" /></Abs> },
  { at: "Me pasé la noche", dark: true, el: (<><M arms="cloth" eyes="wide" speaking={false} /><Pop delay={6} style={{ left: 780, top: 700 }}><Clock time="2:00 a. m." /></Pop></>) },
  { at: "Hasta le pasé", el: <Abs x={540} y={1400}><Table price="15.000 CUP" marble shine w={640} /></Abs> },
  { at: "Llegó a las dos", el: (<><Yamila x={540} /><Pop delay={4} style={{ left: 540, top: 880 }}><Clock time="1:50 p. m." /></Pop></>) },
  { at: "Puntual", cam: { z: 1.2 }, el: (<><Yamila x={540} /><Abs x={540} y={1300}><BigStamp text="puntual" size={150} /></Abs></>) },
  { at: "Yo no sabía", cam: XHEAD, el: <M eyes="wide" /> },
  { at: "Se sentó sacó", el: (<><Yamila x={300} arms="wave" /><M x={790} eyes="side" /></>) },
  { at: "Pinterest", el: <Abs x={540} y={1110}><Pinterest /></Abs> },
  { at: "Piedras", el: <Abs x={540} y={1110}><Pinterest stones /></Abs> },
  { at: "Encapsulado", el: <Abs x={540} y={1110}><Pinterest stones encap /></Abs> },
  { at: "Y un gato con gafas", el: <Abs x={540} y={1110}><Pinterest stones encap cat label="¿¡con gafas!?" /></Abs> },
  { at: "Yo ya me estaba", cam: CLOSE, el: (<><M eyes="flat" /><Pop delay={10} style={{ left: 540, top: 640, opacity: 0.6 }}><Bubble text="¿tan caro? 😒" /></Pop></>) },
  { at: "Para la mano", el: (<><M x={330} /><Abs x={790} y={1520}><div style={{ rotate: "-80deg", opacity: 0.45 }}><Person hair="#E7B04A" dress={C.lilac} style="long" eyes="closed" smile={false} size={420} /></div></Abs><Pop delay={20} style={{ left: 640, top: 760, opacity: 0.6 }}><Bubble text="más baratico 🙏" size={34} /></Pop></>) },
  { at: "Y me dice", cam: { z: 1.5, y: 1200 }, el: <Yamila x={540} eyes="flat" smile={false} speaking={false} /> },
  { at: "Cinco mil no", el: (<><Yamila x={600} smile /><Pop delay={2} style={{ left: 480, top: 760 }}><Bubble text="Cinco mil, ¿no? Lo vi en tu app 📲" size={36} width={620} tail="right" /></Pop></>) },
  { at: "Y me pagó", el: (<><Yamila x={760} arms="wave" /><Pop delay={4} style={{ left: 360, top: 980 }}><Cash amount="5.000 CUP · en efectivo" w={380} /></Pop></>) },
  { at: "Sin regatear", cam: CLOSE, el: (<><M eyes="wide" /><Pop delay={4} style={{ left: 540, top: 1380 }}><BigStamp text="sin regatear" /></Pop></>) },
  { at: "Con el gato", el: (<><Abs x={330} y={1100}><Nail stones encap cat w={250} /></Abs><Yamila x={800} /></>) },
  { at: "Y antes de irse", el: <Abs x={540} y={1130}><Review /></Abs> },
  { at: "Marian es la mejor", el: <Abs x={540} y={1130}><Review text /></Abs> },
  { at: "La leí catorce", el: (<><Abs x={540} y={1050}><Counter to={14} /></Abs><Pop delay={30} style={{ left: 540, top: 1350 }}><Pill text="veces" /></Pop></>), ground: false },
  { at: "La quince fue", cam: CLOSE, el: (<><M eyes="flat" /><Pop delay={4} style={{ left: 540, top: 640 }}><Bubble text="«Marian es la mejor…» 📢" /></Pop></>) },
  { at: "En fin", cam: CLOSE, el: <M eyes="closed" /> },
  { at: "menos mensajes", cam: HEAD, el: <M eyes="flat" /> },
];

export const Ep12: React.FC = () => <Episode data={data as EpData} audio="audio/ep12a.mp3" scenes={scenes} />;

/** Solo para enseñar el final nuevo (Marian se va caminando). No es el episodio publicado. */
export const Ep12PruebaFinal: React.FC = () => <Episode data={data as EpData} audio="audio/ep12a.mp3" scenes={scenes} outro="walk" />;
