import React from "react";
import { useCurrentFrame } from "remotion";
import data from "../data/fotos.json";
import { Abs, BigStamp, Bulb, Nail, Notif, Phone, Pill, Pop } from "../components/Bits";
import { Episode, Scene } from "../components/Episode";
import { Sun } from "../components/Places";
import { EpData } from "../lib/words";
import { C, FONT } from "../theme";
import { CLOSE, M, P } from "./common";

// Video de valor C «Fotos que venden». La app: «tu perfil y tu galería» (galería de trabajos real).

type Foto = { bg?: "plain" | "floral"; light?: "soft" | "flash" | "yellow"; pose?: "relaxed" | "fist"; dust?: boolean; pixel?: boolean; chancla?: boolean; mark?: "good" | "bad"; w?: number };

/** Foto de una mano con uñas, con sus defectos o bien hecha. */
const HandPhoto: React.FC<Foto> = ({ bg = "plain", light = "soft", pose = "relaxed", dust, pixel, chancla, mark, w = 560 }) => {
  const h = w * 1.25;
  const bgFill = bg === "floral" ? "url(#flores)" : "#F4EFE8";
  const tint = light === "yellow" ? "rgba(255,190,60,0.35)" : "transparent";
  return (
    <div style={{ position: "relative", width: w, height: h }}>
      <svg viewBox="0 0 400 500" width={w} height={h} style={{ borderRadius: 26, border: `8px solid ${C.ink}`, background: "#fff", filter: pixel ? "blur(2.5px)" : undefined }}>
        <defs>
          <pattern id="flores" width={60} height={60} patternUnits="userSpaceOnUse">
            <rect width={60} height={60} fill="#F2C14E" />
            {[0, 72, 144, 216, 288].map((a) => (
              <circle key={a} cx={30 + Math.cos((a * Math.PI) / 180) * 10} cy={30 + Math.sin((a * Math.PI) / 180) * 10} r={8} fill="#E86A5C" />
            ))}
            <circle cx={30} cy={30} r={6} fill="#1F9E7A" />
          </pattern>
        </defs>
        <rect width={400} height={500} fill={bgFill} />
        {chancla && (
          <g transform="translate(250 330) rotate(-20)">
            <ellipse cx={0} cy={0} rx={60} ry={130} fill="#3E7CC9" stroke={C.ink} strokeWidth={6} />
            <path d="M-30 -60 L0 -20 L30 -60" stroke="#fff" strokeWidth={10} fill="none" />
          </g>
        )}
        {pose === "relaxed" ? (
          <g transform="translate(40 120) rotate(-12)">
            <path d="M20 330 Q10 210 60 180 L230 170 Q290 170 300 230 L300 330 Z" fill="#F6D2BE" stroke={C.ink} strokeWidth={6} />
            {[0, 1, 2, 3].map((i) => (
              <g key={i} transform={`translate(${70 + i * 52} ${20 + Math.abs(i - 1.5) * 18})`}>
                <rect x={0} y={0} width={44} height={180} rx={22} fill="#F6D2BE" stroke={C.ink} strokeWidth={6} />
                <rect x={6} y={6} width={32} height={50} rx={16} fill="#E97A9B" stroke={C.ink} strokeWidth={4} />
                <rect x={12} y={12} width={8} height={20} rx={4} fill="#fff" opacity={0.7} />
              </g>
            ))}
          </g>
        ) : (
          <g transform="translate(80 150)">
            <path d="M0 120 Q0 20 120 20 Q250 20 250 140 L250 300 L10 300 Z" fill="#F6D2BE" stroke={C.ink} strokeWidth={6} />
            {[0, 1, 2, 3].map((i) => <rect key={i} x={20 + i * 55} y={60} width={40} height={30} rx={12} fill="#E97A9B" stroke={C.ink} strokeWidth={4} />)}
            <path d="M20 120 L230 120 M20 180 L230 180" stroke={C.ink} strokeWidth={4} opacity={0.5} />
          </g>
        )}
        {dust && [[120, 150], [210, 120], [260, 200], [160, 260], [300, 140]].map(([x, y], i) => <path key={i} d={`M${x} ${y} q8 -10 16 0 q-8 10 -16 0`} stroke="#888" strokeWidth={3} fill="none" />)}
        {light === "flash" && <ellipse cx={230} cy={150} rx={80} ry={50} fill="#fff" opacity={0.9} />}
        <rect width={400} height={500} fill={tint} />
        {light === "soft" && <rect width={400} height={500} fill="url(#lg)" opacity={0} />}
      </svg>
      {mark && (
        <div style={{ position: "absolute", top: -34, right: -34, width: 110, height: 110, borderRadius: 55, background: mark === "good" ? C.green : C.red, border: `7px solid ${C.ink}`, display: "grid", placeItems: "center", fontFamily: FONT, fontWeight: 900, fontSize: 64, color: "#fff" }}>
          {mark === "good" ? "✓" : "✕"}
        </div>
      )}
    </div>
  );
};

const Truco: React.FC<{ n: number; t: string }> = ({ n, t }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 30, fontFamily: FONT }}>
    <div style={{ width: 200, height: 200, borderRadius: 100, background: C.pinkDark, border: `9px solid ${C.ink}`, display: "grid", placeItems: "center", fontWeight: 900, fontSize: 130, color: "#fff" }}>{n}</div>
    <div style={{ fontWeight: 900, fontSize: 110, color: C.ink }}>{t}</div>
  </div>
);

const Giro: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: "relative" }}>
      <div style={{ rotate: `${Math.sin(f / 10) * 14}deg` }}>
        <HandPhoto w={480} />
      </div>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ position: "absolute", left: 100 + i * 140, top: 120 + ((i * 70 + f * 2) % 200), fontSize: 60, opacity: (f + i * 10) % 20 < 12 ? 1 : 0.2 }}>✨</div>
      ))}
      <div style={{ position: "absolute", top: 14, left: 14, background: C.red, color: "#fff", borderRadius: 10, padding: "4px 14px", fontFamily: FONT, fontWeight: 900, fontSize: 30 }}>● 0:03</div>
    </div>
  );
};

const Galeria: React.FC = () => (
  <Phone title="Salón Marian 💅 · galería" color={C.pinkDark} h={1000}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{ height: 300, borderRadius: 20, overflow: "hidden", border: `4px solid ${C.ink}` }}>
          <div style={{ scale: 0.48, transformOrigin: "0 0" }}>
            <HandPhoto w={520} />
          </div>
        </div>
      ))}
    </div>
    <div style={{ marginTop: 20, background: C.orange, color: "#fff", borderRadius: 999, textAlign: "center", padding: "18px 0", fontWeight: 900, fontSize: 38, border: `5px solid ${C.ink}` }}>Reservar</div>
  </Phone>
);

const Clienta: React.FC<{ x?: number; eyes?: "happy" | "flat" | "side"; arms?: "down" | "wave" }> = (p) => <P hair="#E7B04A" dress="#7EC8E3" style="ponytail" prop="phone" {...p} />;

const scenes: Scene[] = [
  { at: "Tu trabajo es precioso", ground: false, el: (<><Abs x={540} y={1100}><Nail stones encap w={280} /></Abs><Pop delay={10} style={{ left: 540, top: 1500 }}><Pill text="✨ precioso" size={48} /></Pop></>) },
  { at: "Tu foto no", ground: false, el: <Abs x={540} y={1100}><HandPhoto bg="floral" light="yellow" pose="fist" dust chancla mark="bad" /></Abs> },
  { at: "Y la clienta solo", set: "salon", el: (<><Clienta x={760} eyes="flat" /><Pop delay={10} style={{ left: 380, top: 900 }}><div style={{ scale: 0.5 }}><HandPhoto bg="floral" light="yellow" pose="fist" mark="bad" /></div></Pop></>) },
  { at: "Cinco trucos para que", set: "salon", el: (<><M /><Pop delay={8} style={{ left: 540, top: 700 }}><Pill text="📸 5 trucos" size={56} /></Pop></>) },
  { at: "Con el teléfono que", set: "salon", cam: CLOSE, el: (<><M eyes="flat" /><Pop delay={30} style={{ left: 540, top: 700 }}><Pill text="📱 pantalla rota: vale" size={40} /></Pop></>) },
  { at: "Uno La luz", ground: false, el: <Abs x={540} y={1050}><Truco n={1} t="LUZ" /></Abs> },
  { at: "Nada de flash", ground: false, el: (<><Abs x={330} y={1050}><div style={{ scale: 0.75 }}><HandPhoto light="flash" mark="bad" w={440} /></div></Abs><Abs x={780} y={1050}><Bulb on /></Abs><Pop delay={30} style={{ left: 780, top: 1250 }}><Pill text="✕ bombillo amarillo" color={C.red} size={30} /></Pop></>) },
  { at: "Ponte al lado de", set: "salon", el: (<><div style={{ position: "absolute", left: 30, top: 560, width: 520, height: 1100, background: "linear-gradient(110deg, rgba(255,250,215,0.85), rgba(255,250,215,0))", clipPath: "polygon(0 0, 40% 0, 100% 100%, 0 100%)" }} /><M x={430} /><Pop delay={20} style={{ left: 800, top: 1000 }}><div style={{ scale: 0.55 }}><HandPhoto mark="good" /></div></Pop></>) },
  { at: "La única luz que", ground: false, el: (<><Abs x={540} y={950}><Sun size={440} face /></Abs><Pop delay={20} style={{ left: 540, top: 1400 }}><Pill text="no se va con el apagón ☀️" size={40} /></Pop></>) },
  { at: "Dos El fondo", ground: false, el: <Abs x={540} y={1050}><Truco n={2} t="FONDO" /></Abs> },
  { at: "Liso y claro", ground: false, el: (<><Abs x={540} y={1050}><div style={{ scale: 0.85 }}><HandPhoto mark="good" /></div></Abs><Pop delay={20} style={{ left: 540, top: 1520 }}><Pill text="📄 hoja · 🧺 tela · toalla" size={36} /></Pop></>) },
  { at: "No el mantel de", ground: false, el: <Abs x={540} y={1050}><div style={{ scale: 0.85 }}><HandPhoto bg="floral" mark="bad" /></div></Abs> },
  { at: "Tres La mano", ground: false, el: <Abs x={540} y={1050}><Truco n={3} t="MANO" /></Abs> },
  { at: "Relajada Dedos juntitos", ground: false, el: <Abs x={540} y={1050}><div style={{ scale: 0.85 }}><HandPhoto mark="good" /></div></Abs> },
  { at: "Ni puño ni garra", ground: false, el: (<><Abs x={540} y={1050}><div style={{ scale: 0.85 }}><HandPhoto pose="fist" mark="bad" /></div></Abs><Pop delay={40} style={{ left: 540, top: 1520 }}><Pill text="«¿tienes turno?» ✋" size={40} /></Pop></>) },
  { at: "Cuatro Limpia antes", ground: false, el: <Abs x={540} y={1050}><Truco n={4} t="LIMPIA" /></Abs> },
  { at: "Un poquito de aceite", ground: false, el: (<><Abs x={540} y={1150}><Nail w={240} /></Abs><Pop delay={10} style={{ left: 640, top: 760 }}><div style={{ fontSize: 120 }}>💧</div></Pop><Pop delay={26} style={{ left: 540, top: 1500 }}><Pill text="aceite en la cutícula" size={40} /></Pop></>) },
  { at: "En la foto todo", ground: false, el: <Abs x={540} y={1050}><div style={{ scale: 0.85 }}><HandPhoto dust mark="bad" /></div></Abs> },
  { at: "Cinco Acércate No hagas", ground: false, el: <Abs x={540} y={1050}><Truco n={5} t="CERCA" /></Abs> },
  { at: "El zoom rompe la", ground: false, el: (<><Abs x={330} y={1050}><div style={{ scale: 0.7 }}><HandPhoto pixel mark="bad" w={420} /></div></Abs><Abs x={760} y={1050}><div style={{ scale: 0.7 }}><HandPhoto mark="good" w={420} /></div></Abs><Pop delay={10} style={{ left: 330, top: 1400 }}><Pill text="zoom" color={C.red} size={36} /></Pop><Pop delay={10} style={{ left: 760, top: 1400 }}><Pill text="acércate" color={C.green} size={36} /></Pop></>) },
  { at: "Tus pies no", set: "salon", cam: CLOSE, el: <M eyes="flat" /> },
  { at: "Y si puedes un", ground: false, el: <Abs x={540} y={1080}><Giro /></Abs> },
  { at: "Los brillitos se venden", ground: false, el: (<><Abs x={540} y={1080}><Giro /></Abs><Pop delay={10} style={{ left: 540, top: 1540 }}><Pill text="✨ se venden solos" size={44} /></Pop></>) },
  { at: "Pon la mejor foto", el: <Abs x={540} y={1110}><Galeria /></Abs> },
  { at: "Que la clienta la", set: "salon", el: (<><Clienta x={760} eyes="happy" /><Pop delay={20} style={{ left: 540, top: 720 }}><Notif title="Nueva cita 💅" text="Rosi · Acrílico · viernes 10:00" /></Pop></>) },
  { at: "Guarda este video", ground: false, el: (<><Pop delay={2} style={{ left: 540, top: 1000 }}><div style={{ fontSize: 300 }}>🔖</div></Pop><Pop delay={16} style={{ left: 540, top: 1320 }}><Pill text="GUÁRDALO" color={C.pinkDark} size={64} /></Pop></>) },
  { at: "Y mándaselo a la", ground: false, el: (<><Abs x={540} y={1050}><div style={{ scale: 0.85 }}><HandPhoto chancla mark="bad" /></div></Abs><Pop delay={30} style={{ left: 540, top: 1540 }}><Pill text="🩴 la chancleta detrás" size={40} /></Pop></>) },
  { at: "En fin", set: "salon", el: <M /> },
];

export const Fotos: React.FC = () => <Episode data={data as EpData} audio="audio/fotos.mp3" scenes={scenes} outro="walk" outroSet="salon" />;

export const _keep = { BigStamp };
