import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import data from "../data/grupos1.json";
import { Abs, BigStamp, Btn, Cash, Chat, Clock, Notif, Phone, Pill, Pop, Row } from "../components/Bits";
import { Marian } from "../components/Characters";
import { Episode, Scene } from "../components/Episode";
import { Lying } from "../components/Places";
import { EpData } from "../lib/words";
import { C, FONT } from "../theme";
import { CLOSE, HEAD, M, P, Tardona, XHEAD } from "./common";

// Video para grupos de Facebook «Mientras dormía». Funciones reales de Citora; la app no cobra:
// Marian cobra en efectivo cuando vienen. Precio oficial: Solo 1.500 CUP/mes, 5 días gratis sin tarjeta.

/** Móvil que vibra. */
const Buzz: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const f = useCurrentFrame();
  return <div style={{ translate: `${Math.sin(f * 2.2) * (f % 30 < 12 ? 8 : 0)}px 0` }}>{children}</div>;
};

/** Efecto de rebobinado (VHS). */
const Rewind: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.07) 0 6px, transparent 6px 14px)", pointerEvents: "none" }}>
      <div style={{ position: "absolute", top: 520, left: 70, fontFamily: FONT, fontWeight: 900, fontSize: 64, color: "#fff", textShadow: "0 0 6px #000, 0 0 2px #000", opacity: f % 20 < 14 ? 1 : 0.3 }}>◀◀ ANTES</div>
    </div>
  );
};

const Counter: React.FC<{ to: number }> = ({ to }) => {
  const f = useCurrentFrame();
  return <span>{Math.min(to, Math.floor(f * 1.2) + 1)}</span>;
};

const Timer: React.FC = () => {
  const f = useCurrentFrame();
  const s = Math.max(0, 300 - Math.floor(f * 3));
  return (
    <span>
      {Math.floor(s / 60)}:{String(s % 60).padStart(2, "0")}
    </span>
  );
};

const Swatch: React.FC = () => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12, marginTop: 10 }}>
    {["#F2A7BE", "#E97A9B", "#F7C1D0", "#C0392B", "#9B7FD4", "#1F9E7A"].map((c, i) => (
      <div key={c} style={{ height: 64, borderRadius: 16, background: c, border: `4px solid ${C.ink}`, outline: i === 1 ? `6px solid ${C.orange}` : undefined }} />
    ))}
  </div>
);

const Reserva: React.FC<{ step: 1 | 2 | 3 | 4 }> = ({ step }) => (
  <Phone title="Salón Marian 💅" color={C.pinkDark}>
    {step === 1 && (
      <>
        <div style={{ fontWeight: 800, fontSize: 34, marginBottom: 16 }}>Elige el servicio</div>
        <Row left="Manicura" right="$ 1.500" />
        <Row left="Acrílico" right="$ 4.000" highlight />
        <Row left="Pedicura" right="$ 1.800" />
      </>
    )}
    {step >= 2 && (
      <>
        <div style={{ fontWeight: 800, fontSize: 34, marginBottom: 12 }}>Acrílico · elige el día</div>
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          {["L", "M", "X", "J", "V", "S"].map((d) => (
            <div key={d} style={{ flex: 1, border: `4px solid ${C.ink}`, borderRadius: 14, textAlign: "center", padding: "10px 0", fontWeight: 900, fontSize: 32, background: d === "J" ? C.orange : "#fff", color: d === "J" ? "#fff" : C.ink }}>
              {d}
            </div>
          ))}
        </div>
      </>
    )}
    {step >= 3 && (
      <>
        <div style={{ fontWeight: 800, fontSize: 30, marginBottom: 12 }}>Horas libres</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {["10:00", "11:30", "2:00", "4:30"].map((h) => (
            <div key={h} style={{ border: `4px solid ${C.ink}`, borderRadius: 999, textAlign: "center", padding: "14px 0", fontWeight: 900, fontSize: 34, background: h === "2:00" ? C.orange : "#fff", color: h === "2:00" ? "#fff" : C.ink }}>
              {h}
            </div>
          ))}
        </div>
      </>
    )}
    {step === 4 && <Btn text="✓ Reservado" done />}
  </Phone>
);

const Numeros: React.FC = () => (
  <Phone title="Mi mes" color={C.orange}>
    <Row left="Ingresos" right="38.500 CUP" />
    <Row left="Gastos" right="9.200 CUP" rightColor={C.red} />
    <Row left="Clientas" right="41" rightColor={C.ink} />
    <Row left="⭐ Servicio estrella" right="Acrílico" rightColor={C.pinkDark} highlight />
  </Phone>
);

const Libreta: React.FC<{ crossed?: boolean }> = ({ crossed }) => (
  <div style={{ position: "relative", width: 520, height: 640, background: "#FFF7D6", border: `8px solid ${C.ink}`, borderRadius: 18, rotate: "-4deg", padding: 40, fontFamily: "'DejaVu Serif', serif", fontSize: 40, color: "#2B4B9B", lineHeight: 1.6 }}>
    <div>Yuli · jueves</div>
    <div style={{ textDecoration: "line-through" }}>Katy 10:00</div>
    <div>¿Daylin? sábado</div>
    <div style={{ color: C.red }}>1.500 + 4.000 + …</div>
    {crossed && <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", fontSize: 420, color: C.red, fontFamily: FONT, fontWeight: 900 }}>✕</div>}
  </div>
);

const Precio: React.FC<{ team?: boolean }> = ({ team }) => (
  <div style={{ width: 860, background: "#fff", border: `8px solid ${C.ink}`, borderRadius: 40, padding: "46px 40px", textAlign: "center", fontFamily: FONT }}>
    <div style={{ fontWeight: 900, fontSize: 110, color: C.pinkDark }}>1.500 CUP</div>
    <div style={{ fontWeight: 800, fontSize: 46, color: C.ink }}>al mes · unos 50 al día ☕</div>
    {team && <div style={{ fontWeight: 700, fontSize: 34, color: "#777", marginTop: 18 }}>Con equipo: 3.000 CUP/mes</div>}
  </div>
);

const Gratis: React.FC = () => (
  <div style={{ width: 860, background: C.green, border: `8px solid ${C.ink}`, borderRadius: 40, padding: "50px 40px", textAlign: "center", fontFamily: FONT, color: "#fff" }}>
    <div style={{ fontWeight: 900, fontSize: 120 }}>5 días</div>
    <div style={{ fontWeight: 900, fontSize: 70 }}>GRATIS</div>
    <div style={{ fontWeight: 800, fontSize: 40, marginTop: 10 }}>sin tarjeta · sin permanencia</div>
  </div>
);

const Sleeping: React.FC<{ notifs?: number }> = ({ notifs = 0 }) => (
  <>
    <Lying y={1420}>
      <Marian size={620} eyes="closed" speaking={false} arms="down" />
    </Lying>
    <Abs x={540} y={1240}>
      <div style={{ fontSize: 90, opacity: 0.8 }}>💤</div>
    </Abs>
    {Array.from({ length: notifs }).map((_, i) => (
      <Pop key={i} delay={4 + i * 9} style={{ left: 540, top: 520 + i * 170 }}>
        <Notif title="Nueva cita 💅" text={["Acrílico · jueves 2:00", "Manicura · viernes 10:00", "Pedicura · viernes 11:30", "Acrílico · sábado 9:00"][i]} time={["1:12", "2:40", "3:05", "4:58"][i] + " a. m."} />
      </Pop>
    ))}
  </>
);

const scenes: Scene[] = [
  { at: "Anoche gané tres", set: "night", dark: true, el: (<><Sleeping /><Abs x={300} y={1300}><Buzz><div style={{ width: 70, height: 120, background: "#333", border: "5px solid #fff", borderRadius: 14 }} /></Buzz></Abs><Pop delay={8} style={{ left: 540, top: 700 }}><Pill text="+3.000 CUP" color={C.green} size={60} /></Pop></>) },
  { at: "Y no No es", set: "salon", cam: HEAD, el: (<><M eyes="flat" /><Pop delay={14} style={{ left: 540, top: 1400 }}><BigStamp text="no es eso" /></Pop></>) },
  { at: "Te lo cuento", set: "salon", cam: CLOSE, el: (<><M eyes="side" /><Pop delay={6} style={{ left: 540, top: 700 }}><Pill icon="👀" text="mira hasta el final" size={38} /></Pop></>) },
  { at: "mira cómo era mi", set: "salon", el: (<><M eyes="flat" /><Rewind /></>) },
  { at: "Cuarenta mensajes al", set: "salon", el: (<><M eyes="wide" size={600} /><Pop delay={2} style={{ left: 540, top: 640 }}><div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 160, color: C.red }}>💬 <Counter to={40} /></div></Pop><Rewind /></>) },
  { at: "Tienes hueco mañana", el: (<><Abs x={540} y={1110}><Chat title="Clientas Marian 💅" sub="40 mensajes sin leer" msgs={[{ who: "Yuli", text: "¿Tienes hueco mañana?" }, { who: "Katy", text: "¿Y a las 3?", at: 24 }, { who: "Rosi", text: "¿Cuánto cuesta?", at: 42 }, { who: "Daylin", audio: "4:00", text: "", at: 62 }]} /></Abs><Rewind /></>) },
  { at: "Y si contestaba tarde", set: "street", el: (<><P x={300} hair="#E7B04A" dress="#7EC8E3" style="ponytail" arms="wave" /><Abs x={800} y={760}><div style={{ background: "#fff", border: `6px solid ${C.ink}`, borderRadius: 16, padding: "14px 22px", fontFamily: FONT, fontWeight: 900, fontSize: 38, rotate: "3deg" }}>SALÓN DE ENFRENTE ➜</div></Abs><Rewind /></>) },
  { at: "Cada mensaje que no", set: "salon", cam: CLOSE, el: (<><M eyes="flat" /><Pop delay={20} style={{ left: 540, top: 1400 }}><BigStamp text="clienta perdida" size={78} /></Pop></>) },
  { at: "Hasta que me hice", set: "salon", el: (<><M glow eyes="wide" /><Pop delay={8} style={{ left: 540, top: 700 }}><Pill icon="📲" text="mi app" color={C.pinkDark} /></Pop></>) },
  { at: "Cinco minutos", el: (<><Abs x={540} y={1000}><div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 260, color: C.ink }}><Timer /></div></Abs></>), ground: false },
  { at: "Mi nombre mi color", el: <Abs x={540} y={1110}><Phone title="Crea tu app" color={C.orange}><div style={{ fontWeight: 800, fontSize: 30 }}>Nombre</div><Row left="Salón Marian 💅" /><div style={{ fontWeight: 800, fontSize: 30 }}>Color</div><Swatch /><div style={{ fontWeight: 800, fontSize: 30, marginTop: 20 }}>Precios</div><Row left="Acrílico" right="$ 4.000" /></Phone></Abs> },
  { at: "Ahora mando un enlace", el: <Abs x={540} y={1110}><Chat title="Clientas Marian 💅" sub="34 participantes" msgs={[{ me: true, text: "citora.app/marian 💅", link: true, at: 6 }, { me: true, text: "Reserven aquí, mis amores", at: 16 }]} /></Abs> },
  { at: "Y la clienta escoge", el: <Abs x={540} y={1110}><Reserva step={1} /></Abs> },
  { at: "el día y la", el: <Abs x={540} y={1110}><Reserva step={2} /></Abs> },
  { at: "Solo ve las horas", el: (<><Abs x={540} y={1110}><Reserva step={3} /></Abs><Pop delay={10} style={{ left: 540, top: 1520 }}><Pill text="solo horas libres" color={C.green} /></Pop></>) },
  { at: "No instala nada", el: (<><Abs x={540} y={1110}><Reserva step={4} /></Abs><Pop delay={2} style={{ left: 330, top: 560 }}><Pill text="sin instalar" size={34} /></Pop><Pop delay={30} style={{ left: 760, top: 640 }}><Pill text="sin cuenta" size={34} /></Pop></>) },
  { at: "Y a mí me llega", set: "salon", el: (<><M eyes="wide" size={560} /><Pop delay={6} style={{ left: 540, top: 700 }}><Notif title="Nueva cita 💅" text="Yuli · Acrílico · jueves 2:00" /></Pop></>) },
  { at: "El día antes el", el: <Abs x={540} y={1110}><Chat title="Yuli 💅" sub="en línea" msgs={[{ me: true, text: "Hola Yuli 💅 Te recuerdo tu cita mañana jueves a las 2:00. ¡Te espero!", at: 6 }, { text: "¡Gracias! Allí estaré 🙌", at: 40 }]} /></Abs> },
  { at: "Ya casi nadie", set: "salon", cam: CLOSE, el: (<><M eyes="flat" /><Pop delay={10} style={{ left: 540, top: 700 }}><Pill icon="✅" text="menos olvidos" color={C.green} /></Pop></>) },
  { at: "Bueno La tardona", set: "street", el: (<><Tardona x={540} arms="wave" /><Pop delay={20} style={{ left: 540, top: 820 }}><Pill icon="📍" text="ya estoy cerca" /></Pop></>) },
  { at: "Y sé cuánto gano", el: <Abs x={540} y={1110}><Numeros /></Abs> },
  { at: "Sin sumar en la", ground: false, el: <Abs x={540} y={1050}><Libreta crossed /></Abs> },
  { at: "Así que anoche mientras", set: "night", dark: true, el: <Sleeping notifs={4} /> },
  { at: "Tres mil pesos", set: "night", dark: true, el: (<><Sleeping /><Pop delay={2} style={{ left: 540, top: 760 }}><Pill text="3.000 CUP" color={C.green} size={70} /></Pop></>) },
  { at: "Bueno ganados no", set: "salon", el: (<><M x={330} /><P x={790} hair="#3B2A20" dress={C.lilac} style="bun" arms="wave" /><Pop delay={30} style={{ left: 560, top: 640 }}><Cash amount="en efectivo, al venir" w={300} /></Pop></>) },
  { at: "Pero yo dormí", set: "night", dark: true, el: (<><Sleeping /><Pop delay={20} style={{ left: 540, top: 700 }}><BigStamp text="no tiene precio" color="#fff" size={80} /></Pop></>) },
  { at: "Bueno sí tiene", set: "salon", cam: XHEAD, el: <M eyes="side" /> },
  { at: "Mil quinientos pesos", ground: false, el: <Abs x={540} y={1050}><Precio /></Abs> },
  { at: "Lo que cuesta un", ground: false, el: (<><Abs x={540} y={1000}><Precio team /></Abs><Pop delay={6} style={{ left: 540, top: 1380 }}><div style={{ fontSize: 200 }}>☕</div></Pop></>) },
  { at: "Y los primeros cinco", ground: false, el: <Abs x={540} y={1050}><Gratis /></Abs> },
  { at: "Si tienes un salón", set: "salon", el: (<><M arms="wave" /><Pop delay={10} style={{ left: 540, top: 690 }}><div style={{ background: C.pinkDark, color: "#fff", border: `8px solid ${C.ink}`, borderRadius: 30, padding: "26px 40px", fontFamily: FONT, fontWeight: 900, fontSize: 64, rotate: "-3deg" }}>Escríbeme MARIAN 💅</div></Pop></>) },
  { at: "Te la dejo lista", set: "salon", el: (<><M /><Pop delay={4} style={{ left: 540, top: 700 }}><Pill icon="✅" text="lista hoy" color={C.green} /></Pop><Pop delay={20} style={{ left: 540, top: 820 }}><Clock time="5 min" /></Pop></>) },
  { at: "En fin", set: "salon", el: <M /> },
];

// Sin uso directo en todas las escenas; se mantiene la importación para variantes.
export const _keep = { interpolate };

export const Grupos1: React.FC = () => <Episode data={data as EpData} audio="audio/grupos1.mp3" scenes={scenes} outro="walk" outroSet="salon" />;
