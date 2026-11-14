import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import data from "../data/ep10.json";
import { Abs, BigStamp, Bulb, Cash, Chat, Clock, Fan, Nail, Notif, Phone, Pill, Pop, Row } from "../components/Bits";
import { Cat } from "../components/Characters";
import { Episode, Scene } from "../components/Episode";
import { EpData } from "../lib/words";
import { C, FONT } from "../theme";
import { CLOSE, HEAD, M, P, Tardona, XHEAD, Yamila } from "./common";

const Swatches: React.FC<{ n?: number }> = ({ n = 40 }) => {
  const f = useCurrentFrame();
  const pinks = ["#F2A7BE", "#F7C1D0", "#EE8BA8", "#F4B6C8", "#E97A9B", "#FAD3DF", "#F09AB3", "#F5A3BA"];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} style={{ height: 92, borderRadius: 20, background: pinks[(i * 3) % pinks.length], border: `4px solid ${C.ink}`, opacity: interpolate(f, [i * 0.6, i * 0.6 + 2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), outline: i === Math.floor(f / 4) % n ? `6px solid ${C.orange}` : undefined }} />
      ))}
    </div>
  );
};

const Timer: React.FC = () => {
  const f = useCurrentFrame();
  const s = Math.max(0, 300 - Math.floor(f * 2));
  return (
    <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 260, color: C.ink }}>
      {Math.floor(s / 60)}:{String(s % 60).padStart(2, "0")}
    </div>
  );
};

const Bed: React.FC = () => (
  <svg viewBox="0 0 900 400" width={900} height={400}>
    <rect x={40} y={180} width={820} height={120} rx={20} fill="#3A3A55" stroke="#000" strokeWidth={6} />
    <rect x={60} y={140} width={200} height={60} rx={28} fill="#E4E4F0" />
    <rect x={240} y={160} width={600} height={70} rx={20} fill={C.pink} />
    <path d="M60 300 L60 360 M840 300 L840 360" stroke="#000" strokeWidth={14} />
  </svg>
);

const scenes: Scene[] = [
  { at: "Hice una app", cam: HEAD, el: (<><M glow /><Pop delay={6} style={{ left: 540, top: 780 }}><Pill icon="📲" text="mi app" color={C.orange} /></Pop></>) },
  { at: "Yo", cam: XHEAD, el: <M eyes="flat" /> },
  { at: "Que no sé ni", cam: CLOSE, el: (<><M glow eyes="wide" /><Pop delay={4} style={{ left: 540, top: 700 }}><Pill icon="☀️" text="brillo 100%" /></Pop></>) },
  { at: "Desde lo de Yamila", el: (<><M x={340} eyes="side" /><Yamila x={790} /><Pop delay={6} style={{ left: 790, top: 900 }}><Pill text="Yamila" size={34} /></Pop></>) },
  { at: "Bueno nunca duermo", dark: true, el: (<><M eyes="wide" speaking={false} /><Pop delay={3} style={{ left: 760, top: 680 }}><Clock time="3:00 a. m." /></Pop></>) },
  { at: "Así que me puse", el: (<><M x={420} /><Abs x={830} y={1420}><Fan /></Abs><Pop delay={3} style={{ left: 420, top: 680 }}><Pill icon="📅" text="domingo" /></Pop></>) },
  { at: "y la corriente", cam: { z: 1.1 }, el: (<><Abs x={540} y={720}><Bulb /></Abs><M eyes="wide" /><Pop delay={8} style={{ left: 540, top: 1440 }}><BigStamp text="¡milagro!" /></Pop></>) },
  { at: "Me dijeron cinco minutos", el: (<><Abs x={540} y={900}><Timer /></Abs></>), ground: false },
  { at: "Lo único que tardé", el: (<Abs x={540} y={1130}><Phone title="Elige tu color"><Swatches n={20} /></Phone></Abs>) },
  { at: "Había cuarenta", cam: { z: 1.15, y: 1000 }, el: (<><Abs x={540} y={1050}><div style={{ width: 900 }}><Swatches n={40} /></div></Abs><Pop delay={10} style={{ left: 540, top: 1600 }}><Pill text="40 rosados" color={C.pinkDark} /></Pop></>), ground: false },
  { at: "Los servicios ya venían", el: (<Abs x={540} y={1130}><Phone title="Salón Marian 💅" color={C.pinkDark}><Row left="Manicura" right="$ 1500" /><Row left="Pedicura" right="$ 1800" /><Row left="Acrílico" right="$ 3500" /></Phone></Abs>) },
  { at: "Solo cambié los precios", el: (<Abs x={540} y={1130}><Phone title="Salón Marian 💅" color={C.pinkDark}><Row left="Manicura" strike="1500" right="$ 1800" /><Row left="Pedicura" strike="1800" right="$ 2000" /><Row left="Acrílico" strike="3500" right="$ 4000" /></Phone></Abs>) },
  { at: "Para arriba", cam: HEAD, el: (<><M /><Pop delay={2} style={{ left: 760, top: 900 }}><div style={{ fontSize: 200, fontWeight: 900, color: C.green, fontFamily: FONT }}>↑</div></Pop></>) },
  { at: "Y puse uno nuevo", el: (<Abs x={540} y={1130}><Phone title="Salón Marian 💅" color={C.pinkDark}><Row left="Manicura" right="$ 1800" /><Row left="Acrílico" right="$ 4000" /><Pop delay={8} style={{ position: "relative" }}><Row left="Sencillito con gato 😼" right="$ 5000" highlight size={34} /></Pop></Phone></Abs>) },
  { at: "Mandé el enlace", el: (<Abs x={540} y={1110}><Chat title="Clientas Marian 💅" sub="34 participantes" msgs={[{ me: true, text: "citora.app/marian 💅", link: true, at: 6 }, { me: true, text: "Reserven por aquí, mis amores", at: 14 }]} /></Abs>) },
  { at: "A las once de", el: (<><Abs x={540} y={1110}><Chat title="Clientas Marian 💅" sub="34 participantes" msgs={[{ me: true, text: "citora.app/marian 💅", link: true }, { me: true, text: "Reserven por aquí, mis amores" }]} /></Abs><Pop delay={2} style={{ left: 760, top: 560 }}><Clock time="11:00 p. m." /></Pop></>) },
  { at: "Y me fui a dormir", dark: true, el: (<><Abs x={540} y={1300}><Bed /></Abs><Abs x={220} y={1150}><div style={{ fontSize: 90 }}>💤</div></Abs><Pop delay={12} style={{ left: 760, top: 1000 }}><Pill icon="📱" text="boca abajo" /></Pop></>), ground: false },
  { at: "Primera vez en", dark: true, el: (<><Abs x={540} y={1300}><Bed /></Abs><Abs x={540} y={950}><BigStamp text="primera vez en 3 años" size={74} /></Abs></>), ground: false },
  { at: "Por la mañana", el: (<Abs x={540} y={1130}><Phone title="Hoy · lunes" color={C.orange}><Pop delay={8} style={{ position: "relative" }}><Row left="9:00 · Manicura" right="✓" /></Pop><Pop delay={14} style={{ position: "relative" }}><Row left="11:30 · Acrílico" right="✓" /></Pop><Pop delay={20} style={{ position: "relative" }}><Row left="3:00 · Pedicura" right="✓" /></Pop></Phone></Abs>) },
  { at: "Nadie me escribió", el: (<><M eyes="side" /><Abs x={180} y={900}><Cat /></Abs><Abs x={900} y={900}><Cat color="#F5A742" /></Abs><Abs x={180} y={1300}><Cat color="#BDBDBD" /></Abs><Abs x={900} y={1300}><Cat color="#333" /></Abs><Pop delay={10} style={{ left: 540, top: 680 }}><Pill icon="💬" text="0 mensajes" /></Pop></>) },
  { at: "Una hasta pagó", el: (<><M x={330} eyes="wide" /><P x={790} hair="#C0392B" dress="#F5C26B" style="long" arms="wave" /><Pop delay={6} style={{ left: 560, top: 620 }}><Cash amount="500 CUP · en efectivo" w={300} /></Pop></>) },
  { at: "Antes", cam: XHEAD, el: <M eyes="wide" /> },
  { at: "Y la tardona", el: (<><M x={330} /><Tardona x={800} /><Pop delay={6} style={{ left: 800, top: 900 }}><Clock time="9:00" /></Pop></>) },
  { at: "A las nueve menos", el: (<><Abs x={540} y={720}><Notif app="WhatsApp" title="La tardona" text="ya estoy cerca 📍" time="8:55" /></Abs><M size={560} eyes="flat" /></>) },
  { at: "Hay cosas que", cam: CLOSE, el: (<><M /><Pop delay={10} style={{ left: 540, top: 1380 }}><BigStamp text="ni la app" /></Pop></>) },
  { at: "Ahora tengo tiempo", el: (<><M x={540} arms="down" /><Pop delay={6} style={{ left: 760, top: 720 }}><Pill icon="⏳" text="tiempo libre" /></Pop></>) },
  { at: "Me pinté las uñas", cam: { z: 1.05 }, el: <Abs x={540} y={1100}><Nail color="#EE8BA8" w={300} /></Abs>, ground: false },
  { at: "Dos veces", el: (<><Abs x={360} y={1100}><Nail color="#EE8BA8" w={260} /></Abs><Abs x={720} y={1100}><Nail color={C.orange} w={260} /></Abs></>), ground: false },
  { at: "En fin", cam: CLOSE, el: <M eyes="closed" /> },
  { at: "menos mensajes", cam: HEAD, el: <M eyes="flat" /> },
];

export const Ep10: React.FC = () => <Episode data={data as EpData} audio="audio/ep10a.mp3" scenes={scenes} />;
