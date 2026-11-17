import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import data from "../data/datos.json";
import { Abs, BigStamp, Bubble, Chat, Notif, Phone, Pill, Pop, Row } from "../components/Bits";
import { Marian, Person } from "../components/Characters";
import { Episode, Scene } from "../components/Episode";
import { Sun, Week } from "../components/Places";
import { EpData } from "../lib/words";
import { C, FONT, GROUND } from "../theme";
import { CLOSE, HEAD, M, P, Tardona, XHEAD } from "./common";

// «Los datos». La app: «abrí la agenda… ellas reservaban con sus datos» y la agenda como uso de los datos.

type PP = { x?: number; size?: number; eyes?: "happy" | "flat" | "closed" | "wide" | "side"; arms?: "down" | "wave" | "shrug" | "up"; smile?: boolean };
const Muchacho: React.FC<PP & { i?: number }> = ({ i = 0, ...p }) => (
  <P hair={["#2E2E2E", "#8A5A3B", "#E7B04A"][i % 3]} dress={["#E86A5C", "#7FC8C0", "#F2C14E"][i % 3]} outfit="shirt" pants="#3E4A61" style={(["short", "cap", "curly"] as const)[i % 3]} prop="phone" {...p} />
);
const Abuela: React.FC<PP> = (p) => <P hair="#C8C8C8" dress="#7FB8A4" style="bun" old glasses pattern="flowers" {...p} />;

/** Medidor de megas (barra). */
const Megas: React.FC<{ mb: number }> = ({ mb }) => {
  const f = useCurrentFrame();
  const shown = Math.round(interpolate(f, [0, 20], [mb === 0 ? 40 : mb, mb], { extrapolateRight: "clamp" }));
  return (
    <div style={{ width: 760, background: "#fff", border: `8px solid ${C.ink}`, borderRadius: 30, padding: 30, fontFamily: FONT }}>
      <div style={{ fontWeight: 800, fontSize: 36, color: "#777" }}>📶 Datos móviles</div>
      <div style={{ fontWeight: 900, fontSize: 110, color: shown === 0 ? C.red : C.ink }}>{shown} MB</div>
      <div style={{ height: 40, background: "#eee", borderRadius: 20, border: `5px solid ${C.ink}`, overflow: "hidden" }}>
        <div style={{ width: `${(shown / 1000) * 100 + (shown ? 3 : 0)}%`, height: "100%", background: shown ? C.orange : C.red }} />
      </div>
    </div>
  );
};

const Helado: React.FC = () => {
  const f = useCurrentFrame();
  const melt = interpolate(f, [0, 70], [1, 0.35], { extrapolateRight: "clamp" });
  return (
    <div style={{ position: "relative", width: 300, height: 520 }}>
      <svg viewBox="0 0 200 340" width={300} height={510}>
        <path d="M60 170 L140 170 L100 330 Z" fill="#E9B872" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
        <ellipse cx={100} cy={170 - 60 * melt} rx={64} ry={70 * melt + 10} fill="#F7C1D0" stroke={C.ink} strokeWidth={6} />
        <path d={`M50 ${172} Q60 ${210 + (1 - melt) * 80} 70 ${172} M120 172 Q132 ${220 + (1 - melt) * 100} 142 172`} fill="#F7C1D0" stroke={C.ink} strokeWidth={4} />
      </svg>
    </div>
  );
};

const Bars: React.FC<{ n: number }> = ({ n }) => (
  <div style={{ display: "flex", alignItems: "flex-end", gap: 14, background: "#fff", border: `6px solid ${C.ink}`, borderRadius: 24, padding: "20px 30px" }}>
    {[1, 2, 3, 4].map((i) => (
      <div key={i} style={{ width: 40, height: 30 + i * 30, borderRadius: 8, background: i <= n ? C.green : "#ddd", border: `4px solid ${C.ink}` }} />
    ))}
  </div>
);

const Espejo: React.FC = () => (
  <div style={{ position: "relative", width: 520, height: 900, background: "#2B2B33", border: `12px solid ${C.ink}`, borderRadius: 60, overflow: "hidden" }}>
    <div style={{ position: "absolute", left: 50, top: 120, opacity: 0.45 }}>
      <Marian size={760} eyes="flat" speaking={false} />
    </div>
    <svg viewBox="0 0 520 900" width={520} height={900} style={{ position: "absolute", inset: 0 }}>
      <path d="M380 0 L330 220 L410 300 L300 520 L360 640 L280 900 M330 220 L220 260 M300 520 L160 560" stroke="#fff" strokeWidth={5} fill="none" opacity={0.8} />
    </svg>
    <div style={{ position: "absolute", top: 40, width: "100%", textAlign: "center", fontFamily: FONT, fontWeight: 900, fontSize: 40, color: C.red }}>0 MB</div>
  </div>
);

const Hormigas: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <>
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} style={{ position: "absolute", left: 120 + Math.sin(i) * 30, top: 1500 - ((f * 4 + i * 70) % 520), fontSize: 48 }}>🐜</div>
      ))}
    </>
  );
};

const Banco: React.FC = () => (
  <svg viewBox="0 0 400 200" width={560} height={280}>
    <rect x={20} y={40} width={360} height={30} rx={8} fill="#8B5E3C" stroke={C.ink} strokeWidth={6} />
    <rect x={20} y={100} width={360} height={30} rx={8} fill="#8B5E3C" stroke={C.ink} strokeWidth={6} />
    <path d="M60 130 L60 200 M340 130 L340 200" stroke={C.ink} strokeWidth={12} />
  </svg>
);

const Viernes: React.FC = () => (
  <Phone title="Viernes · 4 citas nuevas" color={C.orange}>
    {["9:00 · Yuli · acrílico", "11:00 · Katy · pedicura", "2:00 · Rosi · manicura", "4:30 · la tardona 😐"].map((r, i) => (
      <Pop key={r} delay={4 + i * 8} style={{ position: "relative" }}>
        <Row left={r} right="✓" size={30} />
      </Pop>
    ))}
  </Phone>
);

const Videollamada: React.FC<{ text?: string }> = ({ text }) => (
  <div style={{ position: "relative" }}>
    <Phone w={620} h={1000} title="Abuela ❤️ · videollamada" color={C.green}>
      <div style={{ height: 760, background: "#F3EFE2", borderRadius: 30, border: `4px solid ${C.ink}`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 130, top: 60 }}>
          <Person hair="#C8C8C8" dress="#7FB8A4" style="bun" old glasses pattern="flowers" size={640} />
        </div>
      </div>
    </Phone>
    {text && (
      <div style={{ position: "absolute", left: 40, right: 40, bottom: 140 }}>
        <Bubble text={text} size={36} />
      </div>
    )}
  </div>
);

const scenes: Scene[] = [
  { at: "Me quedan cuarenta megas", set: "salon", el: (<><M size={560} eyes="flat" /><Pop delay={4} style={{ left: 540, top: 760 }}><Megas mb={40} /></Pop></>) },
  { at: "Y es martes", ground: false, el: <Abs x={540} y={1100}><Week mark={1} label="HOY" /></Abs> },
  { at: "El mes tiene treinta", ground: false, el: (<><Pop delay={2} style={{ left: 540, top: 900 }}><Pill text="📅 el mes: 30 días" size={56} /></Pop><Pop delay={40} style={{ left: 540, top: 1120 }}><Pill text="📶 mis megas: 4" color={C.red} size={56} /></Pop></>) },
  { at: "La recarga me la", set: "salon", el: (<><M size={560} eyes="wide" /><Pop delay={4} style={{ left: 540, top: 720 }}><Notif title="Recarga recibida 📶" text="Tu hermano te ha enviado una recarga 🙏" /></Pop></>) },
  { at: "Duró lo que dura", ground: false, el: (<><Abs x={820} y={560}><Sun size={300} face /></Abs><Abs x={460} y={1150}><Helado /></Abs></>) },
  { at: "En agosto", ground: false, el: (<><Abs x={540} y={900}><Sun size={460} face /></Abs><Pop delay={4} style={{ left: 540, top: 1400 }}><Pill text="🔥 agosto 🔥" color={C.red} size={56} /></Pop></>) },
  { at: "Así que empecé a", set: "salon", el: (<><M /><Pop delay={20} style={{ left: 540, top: 700 }}><Pill text="📶 racionando" color={C.orange} size={44} /></Pop></>) },
  { at: "Como el café", set: "home", el: (<><M x={330} /><Pop delay={4} style={{ left: 790, top: 1250 }}><div style={{ fontSize: 160 }}>☕</div></Pop></>) },
  { at: "Una conexión por la", ground: false, el: (<><Pop delay={2} style={{ left: 540, top: 820 }}><Pill text="☀️ 1 por la mañana" size={50} /></Pop><Pop delay={30} style={{ left: 540, top: 1000 }}><Pill text="🌙 1 por la noche" size={50} /></Pop></>) },
  { at: "Y una de emergencia", ground: false, el: (<><Pop delay={2} style={{ left: 540, top: 900 }}><Pill text="🆘 1 de emergencia" color={C.red} size={50} /></Pop><Pop delay={40} style={{ left: 540, top: 1080 }}><Pill text="¿dónde la guardé? 🤷‍♀️" size={44} /></Pop></>) },
  { at: "El problema son los", el: <Abs x={540} y={1110}><Chat title="Clientas Marian 💅" sub="34 participantes" msgs={[{ who: "Yuli", audio: "1:20", text: "" }, { who: "Katy", audio: "2:05", text: "", at: 8 }, { who: "Rosi", audio: "0:58", text: "", at: 16 }]} /></Abs> },
  { at: "La tardona me manda", set: "street", el: (<><Tardona x={760} /><Pop delay={10} style={{ left: 380, top: 860 }}><div style={{ background: "#fff", border: `5px solid ${C.ink}`, borderRadius: 24, padding: "16px 24px", fontFamily: FONT, fontWeight: 800, fontSize: 40 }}>▶ ılıılııılı 3:00</div></Pop></>) },
  { at: "Tres minutos son cuatro", ground: false, el: <Pop delay={2} style={{ left: 540, top: 1000 }}><Pill text="🎤 3 min = 4 MB" color={C.red} size={64} /></Pop> },
  { at: "Me cuesta más el", set: "salon", cam: CLOSE, el: (<><M eyes="flat" /><Pop delay={10} style={{ left: 540, top: 1400 }}><BigStamp text="más caro el aviso" size={62} /></Pop></>) },
  { at: "Así que escribí en", el: <Abs x={540} y={1110}><Chat title="Clientas Marian 💅" sub="34 participantes" msgs={[{ me: true, text: "Mis amores, por favor, no me manden audios 🙏", at: 6 }]} /></Abs> },
  { at: "A los cinco minutos", el: <Abs x={540} y={1110}><Chat title="Clientas Marian 💅" sub="8 mensajes nuevos" msgs={[{ me: true, text: "Mis amores, por favor, no me manden audios 🙏" }, ...["0:45", "1:10", "0:38", "2:02", "0:51", "1:30"].map((a, i) => ({ who: ["Yuli", "Katy", "Rosi", "Daylin", "Mileidys", "Yamila"][i], audio: a, text: "", at: 4 + i * 6 }))]} /></Abs> },
  { at: "Preguntando por qué no", ground: false, el: <Pop delay={4} style={{ left: 540, top: 1000 }}><Pill text="🎤 «¿por qué no audios?»" size={50} /></Pop> },
  { at: "Y uno de la", set: "street", el: (<><Tardona x={760} /><Pop delay={20} style={{ left: 400, top: 840 }}><Bubble text="Llego tarde a leer el mensaje 😅" size={34} width={460} tail="right" /></Pop></>) },
  { at: "El miércoles me quedé", set: "salon", el: (<><M size={560} eyes="wide" /><Pop delay={2} style={{ left: 540, top: 760 }}><Megas mb={0} /></Pop></>) },
  { at: "Cero", set: "salon", cam: XHEAD, el: <M eyes="flat" /> },
  { at: "El teléfono era un", ground: false, el: <Abs x={540} y={1100}><Espejo /></Abs> },
  { at: "Por la noche me", set: "parque", dark: true, el: <M x={700} arms="down" /> },
  { at: "A la zona wifi", set: "parque", dark: true, cam: { z: 1.6, x: 360, y: 900 }, el: <></> },
  { at: "Con todos los muchachos", set: "parque", dark: true, el: (<><Muchacho i={0} x={480} size={460} /><Muchacho i={1} x={700} size={460} /><Muchacho i={2} x={900} size={460} /></>) },
  { at: "Ellos hablando con la", set: "parque", dark: true, el: (<><Muchacho i={0} x={480} size={460} /><Muchacho i={1} x={700} size={460} /><Muchacho i={2} x={900} size={460} />{[0, 1, 2].map((i) => (<Pop key={i} delay={4 + i * 6} style={{ left: 480 + i * 210, top: 980 }}><div style={{ fontSize: 70 }}>💕</div></Pop>))}</>) },
  { at: "Yo buscando dónde se", set: "parque", dark: true, el: (<><M x={540} arms="up" eyes="side" /><Pop delay={10} style={{ left: 540, top: 700 }}><Bars n={1} /></Pop></>) },
  { at: "La señal se sentaba", set: "parque", dark: true, el: (<><M x={420} arms="up" /><Pop delay={10} style={{ left: 200, top: 1250 }}><div style={{ fontSize: 110 }}>📶</div></Pop></>) },
  { at: "Y el árbol tenía", set: "parque", dark: true, el: (<><M x={420} arms="up" eyes="wide" /><Hormigas /></>) },
  { at: "Y las hormigas tenían", set: "parque", dark: true, el: (<><Hormigas /><Pop delay={6} style={{ left: 560, top: 900 }}><Pill text="🐜 📶📶📶📶" size={56} /></Pop></>) },
  { at: "Un muchacho me dijo", set: "parque", dark: true, el: (<><M x={330} /><Muchacho i={1} x={790} arms="wave" /><Pop delay={10} style={{ left: 540, top: 820 }}><Bubble text="En el banco de la esquina coge mejor 👉" size={34} width={540} /></Pop></>) },
  { at: "En el banco había", set: "parque", dark: true, el: (<><Abs x={720} y={GROUND - 120}><Banco /></Abs><P x={640} size={420} hair="#2E2E2E" dress="#E86A5C" outfit="shirt" style="short" /><P x={800} size={420} hair="#E7B04A" dress="#F2A7BE" style="long" /><Pop delay={10} style={{ left: 720, top: 1020 }}><div style={{ fontSize: 80 }}>💕</div></Pop></>) },
  { at: "Me senté al lado", set: "parque", dark: true, el: (<><Abs x={720} y={GROUND - 120}><Banco /></Abs><P x={640} size={420} hair="#2E2E2E" dress="#E86A5C" outfit="shirt" style="short" eyes="side" /><P x={800} size={420} hair="#E7B04A" dress="#F2A7BE" style="long" eyes="side" /><M x={300} arms="up" /></>) },
  { at: "La pareja se fue", set: "parque", dark: true, el: (<><Abs x={720} y={GROUND - 120}><Banco /></Abs><M x={300} arms="up" eyes="flat" /><Pop delay={30} style={{ left: 720, top: 900 }}><Bars n={0} /></Pop></>) },
  { at: "Cuando por fin conectó", set: "parque", dark: true, el: (<><M x={540} arms="up" eyes="wide" /><Pop delay={4} style={{ left: 540, top: 700 }}><Bars n={4} /></Pop></>) },
  { at: "Y tenía cuatro citas", el: <Abs x={540} y={1110}><Viernes /></Abs> },
  { at: "Mientras yo no tenía", ground: false, el: <Pop delay={20} style={{ left: 540, top: 1000 }}><Pill text="reservaron con SUS datos 📶" color={C.green} size={48} /></Pop> },
  { at: "Ahí entendí la cosa", set: "salon", cam: CLOSE, el: <M eyes="flat" /> },
  { at: "Mis clientas tienen más", ground: false, el: (<><Pop delay={2} style={{ left: 540, top: 800 }}><Pill text="📶 más datos que yo" size={46} /></Pop><Pop delay={40} style={{ left: 540, top: 980 }}><Pill text="📡 mejor señal que yo" size={46} /></Pop></>) },
  { at: "Y más vida social", set: "salon", cam: CLOSE, el: (<><M eyes="side" /><Pop delay={10} style={{ left: 540, top: 1400 }}><BigStamp text="y más vida social" size={62} /></Pop></>) },
  { at: "Ahora uso los datos", set: "salon", el: (<><M /><Pop delay={20} style={{ left: 540, top: 700 }}><Pill text="2 usos" size={50} /></Pop></>) },
  { at: "Para ver la agenda", el: <Abs x={540} y={1110}><Viernes /></Abs> },
  { at: "Y para las videollamadas", ground: false, el: <Abs x={540} y={1100}><Videollamada /></Abs> },
  { at: "Que me llama para", ground: false, el: <Abs x={540} y={1100}><Videollamada text="Te quiero, mija ❤️" /></Abs> },
  { at: "Y que le haga", ground: false, el: <Abs x={540} y={1100}><Videollamada text="…y me haces las uñas el sábado 💅" /></Abs> },
  { at: "Que ella no sabe", set: "home", el: (<><Abuela x={540} eyes="happy" /><Pop delay={10} style={{ left: 540, top: 900 }}><Pill text="«no sé reservar» 🤷‍♀️" size={40} /></Pop></>) },
  { at: "Por eso me llama", set: "salon", cam: XHEAD, el: (<><M eyes="flat" /><Pop delay={20} style={{ left: 540, top: 1170 }}><Pill text="con MIS megas 📶" color={C.red} size={30} /></Pop></>) },
  { at: "En fin", set: "salon", el: <M /> },
];

export const Datos: React.FC = () => <Episode data={data as EpData} audio="audio/datos.mp3" scenes={scenes} outro="walk" outroSet="salon" />;

export const _keep = { GROUND, HEAD };
