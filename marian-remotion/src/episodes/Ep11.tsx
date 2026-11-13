import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import data from "../data/ep11.json";
import { Abs, BigStamp, Btn, Bus, Chair, Chat, Clock, Notif, Phone, Pill, Pop, Row, Table } from "../components/Bits";
import { Cat } from "../components/Characters";
import { Episode, Scene } from "../components/Episode";
import { EpData } from "../lib/words";
import { C, FONT } from "../theme";
import { CLOSE, Daylin, HEAD, M } from "./common";

const Driving: React.FC<{ face?: boolean; dir?: 1 | -1 }> = ({ face, dir = 1 }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: "absolute", top: 1180, left: interpolate(f, [0, 70], dir === 1 ? [220, 900] : [900, 220]), translate: "-50% -50%" }}>
      <Bus face={face} />
    </div>
  );
};

const Bolitas: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <div style={{ display: "flex", gap: 30 }}>
      {[17, 4, 31].map((n, i) => (
        <div key={i} style={{ width: 180, height: 180, borderRadius: 90, background: "#fff", border: `7px solid ${C.ink}`, display: "grid", placeItems: "center", fontFamily: FONT, fontWeight: 900, fontSize: 80, rotate: f > 20 + i * 6 ? "0deg" : `${f * (14 + i * 4)}deg` }}>
          {f > 20 + i * 6 ? n : "?"}
        </div>
      ))}
    </div>
  );
};

const Espera: React.FC<{ pressed?: boolean }> = ({ pressed }) => (
  <Phone title="Lista de espera · sábado" color={C.orange}>
    <Row left="1. Yuli" right={pressed ? "" : "Avisar"} rightColor={C.orange} highlight={pressed} />
    <Row left="2. Katy" right="Avisar" rightColor={C.orange} />
    <Row left="3. Rosi" right="Avisar" rightColor={C.orange} />
    {pressed && <Btn text="Abriendo WhatsApp…" color={C.green} />}
  </Phone>
);

const scenes: Scene[] = [
  { at: "El sábado una", el: (<><M /><Pop delay={10} style={{ left: 540, top: 640 }}><Notif title="Cita cancelada ❌" text="Sábado · 11:00 · Manicura" /></Pop></>) },
  { at: "Y fue lo mejor", cam: HEAD, el: (<><M /><Pop delay={8} style={{ left: 800, top: 830 }}><div style={{ fontSize: 110 }}>✨</div></Pop></>) },
  { at: "Antes cuando una", el: (<><Abs x={540} y={1300}><Chair spot /></Abs><Pop delay={2} style={{ left: 540, top: 560 }}><Pill text="ANTES" color={C.red} /></Pop></>) },
  { at: "Mirándome", cam: { z: 1.5, y: 1150 }, el: <Abs x={540} y={1300}><Chair eyes spot /></Abs> },
  { at: "Como la mesa", el: <Abs x={540} y={1400}><Table price="15.000 CUP" w={640} /></Abs> },
  { at: "Y yo escribiéndole", el: (<><M x={420} eyes="wide" /><Pop delay={6} style={{ left: 640, top: 640 }}><div style={{ width: 600 }}><Pill text="Mi amor, ¿tú no querías el sábado?" size={30} /></div></Pop></>) },
  { at: "Siete mensajes", el: (<><M x={330} /><Pop delay={0} style={{ left: 790, top: 820 }}><Pill icon="💬" text="7" /></Pop><Pop delay={14} style={{ left: 790, top: 960 }}><Pill icon="🎤" text="2 audios" /></Pop></>) },
  { at: "Y una que me contestaba", el: (<><Abs x={540} y={1150}><Cat color="#BDBDBD" size={320} /></Abs><Pop delay={10} style={{ left: 540, top: 820 }}><Pill icon="📅" text="lunes: «¿qué sábado?»" /></Pop></>) },
  { at: "Pero ahora tengo", cam: CLOSE, el: (<><M glow /><Pop delay={8} style={{ left: 540, top: 700 }}><Pill icon="📲" text="Citora" color={C.red} /></Pop></>) },
  { at: "Y la app tiene", el: <Abs x={540} y={1130}><Espera /></Abs> },
  { at: "Cuando el sábado se", el: (<Abs x={540} y={1130}><Phone title="Salón Marian 💅" color={C.pinkDark}><div style={{ fontWeight: 800, fontSize: 38, textAlign: "center", marginBottom: 20 }}>Sábado</div><Row left="9:00" right="Lleno" rightColor={C.red} /><Row left="11:00" right="Lleno" rightColor={C.red} /><Row left="3:00" right="Lleno" rightColor={C.red} /><Pop delay={20} style={{ position: "relative" }}><Btn text="Apuntarme en la lista" /></Pop></Phone></Abs>) },
  { at: "Había tres", el: <Abs x={540} y={1130}><Espera /></Abs> },
  { at: "Así que el sábado a las diez", el: (<><M x={330} /><Daylin x={800} /><Pop delay={6} style={{ left: 800, top: 860 }}><Clock time="10:00 a. m." /></Pop></>) },
  { at: "Marian no puedo ir", el: (<Abs x={540} y={1110}><Chat title="Daylin 🌻" sub="en línea" msgs={[{ text: "Marian, no puedo ir 😩", at: 2 }, { text: "Se me fue la guagua", at: 26 }]} /></Abs>) },
  { at: "A las diez de la mañana", el: (<><Driving /><Pop delay={20} style={{ left: 540, top: 780 }}><Pill icon="🚌" text="1 vez al día" /></Pop></>) },
  { at: "Yo no me puse brava", cam: CLOSE, el: (<><M eyes="closed" arms="down" /><Pop delay={8} style={{ left: 780, top: 820 }}><div style={{ fontSize: 110 }}>🧘‍♀️</div></Pop></>) },
  { at: "Toqué Avisar", el: <Abs x={540} y={1130}><Espera pressed /></Abs> },
  { at: "Y se me abrió", el: <Abs x={540} y={1110}><Chat title="Yuli 💅" sub="en línea" msgs={[]} draft="Se liberó un hueco a las 11:00. ¿Lo quieres? 💅" /></Abs> },
  { at: "A los dos minutos", el: (<><Abs x={540} y={1110}><Chat title="Yuli 💅" sub="en línea" msgs={[{ me: true, text: "Se liberó un hueco a las 11:00. ¿Lo quieres? 💅" }, { text: "¡Sí! ¡Voy! 🏃‍♀️", at: 22 }]} /></Abs><Pop delay={4} style={{ left: 760, top: 540 }}><Clock time="2 minutos" /></Pop></>) },
  { at: "Ahora estoy enganchada", cam: HEAD, el: <M eyes="wide" glow /> },
  { at: "Miro la lista de", el: (<><Abs x={540} y={1080}><Bolitas /></Abs><Pop delay={30} style={{ left: 540, top: 1380 }}><Pill text="la bolita" color={C.green} /></Pop></>), ground: false },
  { at: "Casi quiero que", cam: CLOSE, el: (<><M eyes="side" /><Pop delay={14} style={{ left: 540, top: 1380 }}><BigStamp text="¡cancélenme!" /></Pop></>) },
  { at: "Y sabes quién", el: (<Abs x={540} y={1130}><Phone title="Sábado · 11:00" color={C.orange}><Row left="Reservado ✓" right="" /><div style={{ fontSize: 120, textAlign: "center", marginTop: 40 }}>❓</div></Phone></Abs>) },
  { at: "Daylin", cam: { z: 1.6, x: 540, y: 1250 }, el: (<><Daylin x={540} /><Pop delay={4} style={{ left: 540, top: 920 }}><Pill text="Daylin" color={C.orange} /></Pop></>) },
  { at: "Que cogió otra", el: (<><Driving face dir={-1} /><Pop delay={10} style={{ left: 540, top: 820 }}><Pill icon="🚌" text="la otra guagua" /></Pop></>) },
  { at: "En fin", cam: CLOSE, el: <M eyes="closed" /> },
  { at: "menos mensajes", cam: HEAD, el: <M eyes="flat" /> },
];

export const Ep11: React.FC = () => <Episode data={data as EpData} audio="audio/ep11a.mp3" scenes={scenes} />;
