import React from "react";
import data from "../data/pipa.json";
import { Abs, BigStamp, Bubble, Bulb, Clock, Nail, Notif, Phone, Pill, Pop, Row } from "../components/Bits";
import { Episode, Scene } from "../components/Episode";
import { Faucet, Week } from "../components/Places";
import { March } from "../components/Party";
import { Bathtub, Bucket, Pomo, Puff, Tank, WaterTruck } from "../components/Water";
import { EpData } from "../lib/words";
import { C, GROUND } from "../theme";
import { CLOSE, HEAD, M, P, XHEAD } from "./common";

// «La pipa». Sin agua tres días; la app solo en «el agua no avisa, la app sí» y «reserva sola».

type PP = { x?: number; size?: number; eyes?: "happy" | "flat" | "closed" | "wide" | "side"; arms?: "down" | "wave" | "shrug" | "up"; smile?: boolean };
const Katy: React.FC<PP> = (p) => <P hair="#C0392B" dress="#F5C26B" style="long" pattern="dots" {...p} />;
const Chofer: React.FC<PP> = (p) => <P hair="#3E7CC9" dress="#7FB8A4" outfit="shirt" pants="#3E4A61" style="cap" mustache {...p} />;
const Mujer: React.FC<PP> = (p) => <P hair="#2E2E2E" dress="#F28C8C" style="curly" earrings pattern="flowers" {...p} />;
const Suegra: React.FC<PP> = (p) => <P hair="#C8C8C8" dress="#9B7FD4" style="bun" old glasses smile={false} eyes="flat" {...p} />;
const Senora: React.FC<PP> = (p) => <P hair="#B8B8B8" dress="#7FC8C0" style="bun" old {...p} />;
const Senor: React.FC<PP & { hair?: string }> = ({ hair = "#2E2E2E", ...p }) => <P hair={hair} dress="#E9D27A" outfit="shirt" pants="#3E4A61" style="short" {...p} />;
const Vecina: React.FC<PP & { i?: number }> = ({ i = 0, ...p }) => (
  <P hair={["#8A5A3B", "#E7B04A", "#2E2E2E", "#C0392B"][i % 4]} dress={["#9CC0E8", "#F2A7BE", "#C9B6F2", "#9FD39A"][i % 4]} style={(["bob", "ponytail", "curly", "long"] as const)[i % 4]} {...p} />
);

/** Fila de gente con cubos (la cola de la pipa). */
const Cola: React.FC<{ n?: number; size?: number }> = ({ n = 6, size = 400 }) => (
  <>
    {Array.from({ length: n }).map((_, i) => {
      const x = 80 + i * (920 / Math.max(n - 1, 1));
      return (
        <React.Fragment key={i}>
          <Vecina i={i} x={x} size={size} />
          <Abs x={x + size * 0.22} y={GROUND - 40}>
            <Bucket w={size * 0.2} color={["#3E7CC9", "#E86A5C", "#F2C14E", "#1F9E7A"][i % 4]} />
          </Abs>
        </React.Fragment>
      );
    })}
  </>
);

const AgendaMovida: React.FC = () => (
  <Phone title="Esta semana" color={C.orange}>
    <Row left="Martes · 9:00 Katy" right="→ viernes" rightColor={C.orange} />
    <Row left="Martes · 11:00 Yuli" right="→ viernes" rightColor={C.orange} />
    <Row left="Martes · 3:00 Rosi" right="→ viernes" rightColor={C.orange} />
    <Row left="Viernes" right="✓ con agua" highlight />
  </Phone>
);

const scenes: Scene[] = [
  { at: "Hace tres días que", set: "home", el: (<><M /><Pop delay={10} style={{ left: 540, top: 700 }}><Pill text="3 días sin agua 💧" size={44} /></Pop></>) },
  { at: "Y hoy tengo cinco", set: "salon", el: (<><M x={330} /><Katy x={600} size={420} /><Vecina i={1} x={760} size={420} /><Vecina i={2} x={920} size={420} /><Pop delay={6} style={{ left: 540, top: 760 }}><Pill text="5 clientas" color={C.red} size={46} /></Pop></>) },
  { at: "El agua y las", set: "home", el: (<><Abs x={300} y={1100}><Faucet /></Abs><Katy x={790} size={480} /><Pop delay={20} style={{ left: 540, top: 760 }}><Pill text="nunca coinciden" size={40} /></Pop></>) },
  { at: "Son como mi suegra", set: "home", el: (<><M x={330} eyes="side" /><Suegra x={790} /><Pop delay={20} style={{ left: 560, top: 780 }}><div style={{ fontSize: 120 }}>⚡</div></Pop></>) },
  { at: "Aquí el agua llega", ground: false, el: (<><Abs x={540} y={1050}><Week mark={2} label="💧" /></Abs><Pop delay={20} style={{ left: 540, top: 1300 }}><Pill text="cada 3 días… dicen" /></Pop></>) },
  { at: "Eso dice el papel", set: "home", cam: { z: 1.9, x: 150, y: 1240 }, el: <></> },
  { at: "El agua no sabe", set: "home", el: (<><Abs x={540} y={1100}><Faucet /></Abs><Pop delay={10} style={{ left: 540, top: 760 }}><Pill text="no sabe leer" size={44} /></Pop></>) },
  { at: "Igual que la corriente", set: "home", el: (<><Abs x={360} y={1100}><Faucet /></Abs><Abs x={760} y={1000}><Bulb on={false} /></Abs><Pop delay={30} style={{ left: 540, top: 760 }}><Pill text="son primas 👯" size={44} /></Pop></>) },
  { at: "El martes abrí la", set: "home", el: (<><M x={300} eyes="wide" /><Abs x={760} y={1100}><Faucet /></Abs><Pop delay={30} style={{ left: 900, top: 1240 }}><Puff /></Pop></>) },
  { at: "Aire con olor a", set: "home", cam: CLOSE, el: (<><M eyes="flat" /><Pop delay={10} style={{ left: 540, top: 700 }}><Pill text="💨 tubería + esperanza" size={40} /></Pop></>) },
  { at: "A las nueve llegaba", set: "salon", el: (<><M x={330} /><Katy x={790} arms="wave" /><Pop delay={4} style={{ left: 790, top: 900 }}><Clock time="9:00 · Katy" size={36} /></Pop></>) },
  { at: "Y yo con un", set: "salon", el: (<><M x={420} arms="down" eyes="flat" /><Abs x={700} y={GROUND - 70}><Bucket w={170} /></Abs><Pop delay={20} style={{ left: 700, top: 1250 }}><Pill text="1 cubo" size={40} /></Pop></>) },
  { at: "Para lavar las manos", ground: false, el: (<><Abs x={540} y={1150}><Bucket w={300} full /></Abs><Pop delay={4} style={{ left: 300, top: 780 }}><Pill text="1. manos" size={38} /></Pop><Pop delay={22} style={{ left: 540, top: 700 }}><Pill text="2. pinceles" size={38} /></Pop><Pop delay={40} style={{ left: 790, top: 780 }}><Pill text="3. yo" size={38} /></Pop></>) },
  { at: "Yo de última", set: "salon", cam: XHEAD, el: <M eyes="flat" /> },
  { at: "A las diez y", set: "street", el: (<><Vecina i={2} x={760} arms="up" /><Pop delay={4} style={{ left: 300, top: 740 }}><Clock time="10:15" /></Pop><Pop delay={30} style={{ left: 430, top: 900 }}><Bubble text="¡Llegó la pipaaa!" size={44} tail="right" /></Pop></>) },
  { at: "Y el barrio entero", set: "street", el: <March dur={100}><Cola n={5} size={420} /></March> },
  { at: "Porque regalaban algo", set: "street", cam: CLOSE, el: (<><M eyes="flat" arms="down" /><Pop delay={10} style={{ left: 540, top: 700 }}><Pill text="💧 agua" color="#3E7CC9" size={48} /></Pop></>) },
  { at: "Katy tenía cinco uñas", ground: false, el: (<><Abs x={330} y={1100}><Nail color="#EE8BA8" w={200} /></Abs><Abs x={750} y={1100}><Nail color="#F6D2BE" w={200} /></Abs><Pop delay={10} style={{ left: 540, top: 1500 }}><Pill text="5 puestas · 5 por poner" size={38} /></Pop></>) },
  { at: "Le dije Vamos", set: "salon", el: (<><M x={330} /><Katy x={790} /><Pop delay={10} style={{ left: 330, top: 900 }}><Bubble text="Vamos." size={44} /></Pop></>) },
  { at: "Y nos fuimos las", set: "street", el: <March dur={80}><M x={300} size={600} arms="down" /><Katy x={520} size={520} arms="up" /></March> },
  { at: "Yo con dos cubos", set: "street", el: (<><M x={330} arms="down" /><Abs x={170} y={GROUND - 80}><Bucket w={140} /></Abs><Abs x={490} y={GROUND - 80}><Bucket w={140} color="#E86A5C" /></Abs><Katy x={790} arms="up" /></>) },
  { at: "Parecía que la estaban", set: "street", cam: { z: 1.5, x: 540, y: 1250 }, el: (<><Katy x={540} arms="up" eyes="wide" smile={false} /><Pop delay={14} style={{ left: 540, top: 1460 }}><BigStamp text="¡manos arriba!" size={64} /></Pop></>) },
  { at: "Delante teníamos cuarenta", set: "street", el: (<><Cola n={8} size={330} /><Pop delay={6} style={{ left: 540, top: 760 }}><Pill text="40 personas delante" color={C.red} size={44} /></Pop></>) },
  { at: "Una señora con seis", set: "street", el: (<><Senora x={420} />{[0, 1, 2, 3, 4, 5].map((i) => (<Abs key={i} x={640 + (i % 3) * 80} y={GROUND - 70 - Math.floor(i / 3) * 150}><Pomo w={60} /></Abs>))}<Pop delay={20} style={{ left: 720, top: 1000 }}><Pill text="6 pomos" size={38} /></Pop></>) },
  { at: "Un señor con una", set: "street", el: (<><Senor x={250} arms="up" /><Senor x={830} arms="up" hair="#8A5A3B" /><Abs x={540} y={1140}><Bathtub w={560} /></Abs></>) },
  { at: "Una bañadera Cargada entre", set: "street", el: (<><Senor x={250} arms="up" /><Senor x={830} arms="up" hair="#8A5A3B" /><Abs x={540} y={1140}><Bathtub w={560} /></Abs><Pop delay={40} style={{ left: 540, top: 760 }}><Pill text="🕯️ procesión 🕯️" size={44} /></Pop></>) },
  { at: "Cuando faltaban diez", set: "street", el: (<><Abs x={600} y={1420}><WaterTruck w={860} /></Abs><Chofer x={170} size={500} /></>) },
  { at: "Mami quién te hizo", set: "street", el: (<><Chofer x={300} /><Katy x={790} arms="up" /><Pop delay={4} style={{ left: 420, top: 860 }}><Bubble text="Mami, ¿quién te hizo eso?" size={36} /></Pop></>) },
  { at: "Katy me señaló", set: "street", el: (<><M x={300} eyes="wide" /><Katy x={790} arms="up" /><Pop delay={10} style={{ left: 540, top: 900 }}><div style={{ fontSize: 120 }}>👈</div></Pop></>) },
  { at: "Mi mujer quiere unas", set: "street", el: (<><Chofer x={760} /><Pop delay={4} style={{ left: 430, top: 820 }}><Bubble text="Mi mujer quiere unas así. Y yo te lleno el tanque 💧" size={32} width={520} tail="right" /></Pop></>) },
  { at: "En ese momento entendí", set: "street", cam: CLOSE, el: (<><M eyes="flat" /><Pop delay={20} style={{ left: 540, top: 1400 }}><BigStamp text="la economía 📈" size={60} /></Pop></>) },
  { at: "El miércoles le hice", set: "salon", el: (<><M x={330} /><Mujer x={790} /><Pop delay={8} style={{ left: 790, top: 920 }}><Pill text="la mujer del chofer" size={30} /></Pop></>) },
  { at: "Encapsulado Con piedras", ground: false, el: <Abs x={540} y={1100}><Nail stones encap w={280} /></Abs> },
  { at: "Con el agua que", set: "home", el: (<><Abs x={540} y={1180}><Tank level={1} /></Abs><Pop delay={10} style={{ left: 540, top: 760 }}><Pill text="tanque lleno 💧" color="#3E7CC9" size={44} /></Pop></>) },
  { at: "Ella pagó con agua", ground: false, el: (<><Abs x={540} y={1150}><Bucket w={300} full label="PAGO" /></Abs><Pop delay={30} style={{ left: 540, top: 1460 }}><Pill text="🖌️ pinceles lavados con su pago" size={34} /></Pop></>) },
  { at: "Lo único que funcionó", el: <Abs x={540} y={1110}><AgendaMovida /></Abs> },
  { at: "El agua no avisa", el: (<><Abs x={540} y={720}><Notif title="Cita movida 💅" text="Katy · del martes al viernes 9:00" /></Abs><Abs x={540} y={1250}><Faucet /></Abs></>) },
  { at: "Ahora la mujer del", set: "salon", el: (<><M x={330} /><Mujer x={790} /><Pop delay={10} style={{ left: 790, top: 920 }}><Pill text="cada 15 días" size={34} /></Pop></>) },
  { at: "Reserva sola", set: "salon", el: (<><M size={560} eyes="flat" /><Pop delay={4} style={{ left: 540, top: 720 }}><Notif title="Nueva cita 💅" text="Mujer del chofer · encapsulado" /></Pop></>) },
  { at: "Y ese día casualmente", set: "street", el: (<><Abs x={600} y={1420}><WaterTruck w={860} /></Abs><Pop delay={30} style={{ left: 540, top: 760 }}><Pill text="casualmente 👀" size={46} /></Pop></>) },
  { at: "Los vecinos ya se", set: "street", el: (<><Vecina i={0} x={200} size={440} eyes="side" /><Vecina i={3} x={420} size={440} eyes="side" /><Senor x={640} size={440} eyes="side" /><Senora x={860} size={440} eyes="side" /></>) },
  { at: "Tres me pidieron turno", set: "salon", el: (<><M size={520} eyes="wide" />{[0, 1, 2].map((i) => (<Pop key={i} delay={4 + i * 8} style={{ left: 540, top: 520 + i * 200 }}><Notif title="Nueva cita 💅" text={["Vecina del 2º", "Vecina de enfrente", "El del bajo"][i]} /></Pop>))}</>) },
  { at: "No quieren uñas", set: "salon", cam: HEAD, el: <M eyes="side" /> },
  { at: "Quieren estar en la", set: "street", el: (<><Abs x={760} y={1300}><WaterTruck w={560} /></Abs>{[0, 1, 2].map((i) => (<React.Fragment key={i}><Vecina i={i} x={110 + i * 150} size={380} /><Abs x={170 + i * 150} y={GROUND - 40}><Bucket w={70} /></Abs></React.Fragment>))}</>) },
  { at: "En fin", set: "salon", el: <M /> },
];

export const Pipa: React.FC = () => <Episode data={data as EpData} audio="audio/pipa.mp3" scenes={scenes} outro="walk" outroSet="salon" />;
