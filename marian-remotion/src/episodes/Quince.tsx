import React from "react";
import data from "../data/quince.json";
import { Abs, BigStamp, Bubble, Cash, Chat, Clock, Fan, Nail, Phone, Pill, Pop, Row, Table } from "../components/Bits";
import { Episode, Scene } from "../components/Episode";
import { Cake, CartonFan, Crown, Dance, Flashlight, March, Speaker, Swatch, UvLamp } from "../components/Party";
import { EpData } from "../lib/words";
import { C, FONT, GROUND } from "../theme";
import { CLOSE, HEAD, M, P, XHEAD } from "./common";

// «Los quince». Para ganar seguidores: la app solo en «mandé el enlace al grupo y cada una cogió su hora».
// El papá paga en efectivo (la app no cobra).

type PP = { x?: number; size?: number; eyes?: "happy" | "flat" | "closed" | "wide" | "side"; arms?: "down" | "wave" | "shrug" | "phone"; smile?: boolean; speaking?: boolean };

const Quince: React.FC<PP> = ({ x = 760, size = 560, ...p }) => (
  <>
    <P x={x} size={size} hair="#3B2A20" dress="#F7C1D0" style="long" pattern="dots" earrings {...p} />
    <Abs x={x} y={GROUND - size * 0.86}>
      <Crown w={size * 0.22} />
    </Abs>
  </>
);
const Mama: React.FC<PP> = (p) => <P hair="#6B4330" dress="#F5C26B" style="long" pattern="dots" earrings {...p} />;
const Madrina: React.FC<PP> = (p) => <P hair="#2E2E2E" dress="#9B7FD4" style="curly" pattern="flowers" earrings wide {...p} />;
const Abuela: React.FC<PP> = (p) => <P hair="#C8C8C8" dress="#7FB8A4" style="bun" old glasses pattern="flowers" {...p} />;
const Papa: React.FC<PP> = (p) => <P hair="#2E2E2E" dress="#9CC0E8" outfit="shirt" pants="#3E4A61" style="short" mustache {...p} />;
const DAMAS = [
  { hair: "#E7B04A", style: "ponytail" as const },
  { hair: "#2E2E2E", style: "braids" as const },
  { hair: "#8A5A3B", style: "bob" as const },
  { hair: "#C0392B", style: "long" as const },
  { hair: "#3B2A20", style: "bun" as const },
];
const Dama: React.FC<PP & { i?: number }> = ({ i = 0, ...p }) => <P hair={DAMAS[i % 5].hair} style={DAMAS[i % 5].style} dress="#C9B6F2" {...p} />;

const Damas: React.FC<{ n?: number; size?: number; y?: number }> = ({ n = 10, size = 380 }) => (
  <>
    {Array.from({ length: n }).map((_, i) => (
      <Dama key={i} i={i} size={size} x={70 + i * (940 / Math.max(n - 1, 1))} />
    ))}
  </>
);

const Agenda: React.FC = () => (
  <Phone title="Sábado · los 15 👑" color={C.pinkDark} h={1000}>
    {["7:00 · Abuela", "7:45 · Madrina", "8:30 · Mamá", "9:15 · Dama 1", "10:00 · Dama 2", "…", "4:30 · Dama 10", "5:15 · Quinceañera 👑"].map((r) => (
      <Row key={r} left={r} right="✓" size={28} highlight={r.includes("👑")} />
    ))}
  </Phone>
);

const Glitter: React.FC = () => (
  <Phone w={600} h={900}>
    <div style={{ fontWeight: 800, fontSize: 34, color: "#E60023", marginBottom: 20 }}>● «algo discreto»</div>
    <div style={{ background: "#F9DCE5", borderRadius: 30, display: "grid", placeItems: "center", padding: 20, position: "relative" }}>
      <Nail stones encap color="#C9A227" w={230} />
      <div style={{ position: "absolute", top: 30, right: 40, fontSize: 70 }}>✨</div>
      <div style={{ position: "absolute", bottom: 80, left: 40, fontSize: 60 }}>💎</div>
    </div>
  </Phone>
);

const scenes: Scene[] = [
  { at: "Este sábado hay", set: "fiesta", dark: true, el: (<><M /><Pop delay={10} style={{ left: 540, top: 1000 }}><Pill text="unos quince 👑" size={44} /></Pop></>) },
  { at: "Yo tengo una mesa", set: "salon", el: (<><M x={330} /><Abs x={780} y={1440}><Table w={420} /></Abs><Pop delay={4} style={{ left: 780, top: 1180 }}><Pill text="1 mesa" /></Pop></>) },
  { at: "Y catorce clientas", set: "salon", el: (<><M x={140} size={600} /><Abuela x={330} size={430} /><Madrina x={520} size={430} /><Mama x={700} size={430} /><Quince x={890} size={430} /><Pop delay={4} style={{ left: 540, top: 760 }}><Pill text="14 clientas" color={C.red} size={50} /></Pop></>) },
  { at: "Y una lámpara que", set: "salon", el: (<><M x={330} eyes="side" /><Abs x={790} y={1330}><UvLamp /></Abs><Pop delay={10} style={{ left: 790, top: 1110 }}><Pill icon="🔌" text="depende de la corriente" size={30} /></Pop></>) },
  { at: "Ya saben cómo termina", set: "salon", cam: XHEAD, el: <M eyes="flat" /> },
  { at: "La quinceañera", set: "fiesta", dark: true, el: (<><Quince x={540} /><Pop delay={6} style={{ left: 540, top: 900 }}><Pill text="la quinceañera" /></Pop></>) },
  { at: "La mamá", set: "fiesta", dark: true, el: (<><Quince x={540} size={480} /><Mama x={220} size={480} /><Madrina x={860} size={480} /></>) },
  { at: "La abuela", set: "fiesta", dark: true, el: (<><Mama x={180} size={460} /><Quince x={420} size={460} /><Madrina x={660} size={460} /><Abuela x={900} size={460} /></>) },
  { at: "Y diez damas", set: "fiesta", dark: true, el: <Damas /> },
  { at: "Diez", set: "salon", cam: HEAD, el: (<><M eyes="flat" /><Pop delay={2} style={{ left: 378, top: 976 }}><div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 130, color: C.red }}>10</div></Pop></>) },
  { at: "Aquí unos quince es", set: "fiesta", dark: true, el: (<><M x={330} /><Quince x={780} /><Pop delay={20} style={{ left: 540, top: 900 }}><Pill icon="🎉" text="evento nacional" size={44} /></Pop></>) },
  { at: "Solo falta el desfile", set: "street", el: (<March><Quince x={380} size={460} /><Damas n={4} size={400} /></March>) },
  { at: "Antes eso era la", set: "salon", el: (<><M eyes="wide" /><Pop delay={2} style={{ left: 300, top: 700 }}><Pill text="◀◀ ANTES" color={C.red} /></Pop><Pop delay={14} style={{ left: 540, top: 1500 }}><BigStamp text="la guerra" /></Pop></>) },
  { at: "Todas querían las nueve", el: <Abs x={540} y={1110}><Chat title="Los 15 de Daniela 👑" sub="16 participantes" msgs={[{ who: "Madrina", text: "Yo a las 9" }, { who: "Abuela", text: "A las 9, mija", at: 10 }, { who: "Dama 3", text: "¡A las 9!", at: 18 }, { who: "Dama 7", text: "Yo a las 9 también 🙏", at: 26 }, { who: "Mamá", text: "¿Y yo qué? A LAS 9", at: 34 }]} /></Abs> },
  { at: "La madrina porque es", set: "salon", el: (<><Madrina x={760} /><Pop delay={6} style={{ left: 430, top: 820 }}><Bubble text="A las 9. Soy la madrina." size={38} tail="right" /></Pop></>) },
  { at: "La abuela porque se", set: "salon", el: (<><Abuela x={760} /><Pop delay={6} style={{ left: 420, top: 820 }}><Bubble text="Temprano, que me acuesto a las 8" size={34} width={480} tail="right" /></Pop></>) },
  { at: "Y las damas porque", set: "salon", el: (<><Damas n={5} size={440} /><Pop delay={12} style={{ left: 540, top: 820 }}><BigStamp text="porque sí" size={90} /></Pop></>) },
  { at: "Esta vez mandé el", el: <Abs x={540} y={1110}><Chat title="Los 15 de Daniela 👑" sub="16 participantes" msgs={[{ me: true, text: "citora.app/marian 💅", link: true, at: 4 }, { me: true, text: "Cada una coge su hora aquí 👆", at: 16 }]} /></Abs> },
  { at: "Que cada una cogiera", el: <Abs x={540} y={1110}><Agenda /></Abs> },
  { at: "Por primera vez nadie", set: "salon", cam: CLOSE, el: (<><M eyes="flat" /><Pop delay={14} style={{ left: 540, top: 700 }}><Pill icon="✅" text="cero peleas por la hora" color={C.green} size={36} /></Pop></>) },
  { at: "Se pelearon por el", set: "salon", el: (<><Mama x={200} size={480} arms="shrug" /><Quince x={540} size={480} /><Madrina x={880} size={480} arms="shrug" /><Pop delay={6} style={{ left: 540, top: 820 }}><BigStamp text="por el color" /></Pop></>) },
  { at: "La mamá quería dorado", set: "salon", el: (<><Mama x={780} /><Pop delay={8} style={{ left: 380, top: 900 }}><Swatch color="#D4A017" label="dorado" /></Pop></>) },
  { at: "La quinceañera negro", set: "salon", el: (<><Quince x={780} /><Pop delay={8} style={{ left: 380, top: 900 }}><Swatch color="#1C1C1C" label="negro" /></Pop></>) },
  { at: "La madrina lo mismo", set: "salon", el: (<><Madrina x={780} /><Pop delay={6} style={{ left: 400, top: 800 }}><Bubble text="Lo mismo que la niña… pero que no se note que es lo mismo" size={32} width={560} tail="right" /></Pop></>) },
  { at: "Y la abuela quería", set: "salon", el: (<><Abuela x={780} /><Pop delay={10} style={{ left: 420, top: 860 }}><Bubble text="Algo discreto 🙂" size={40} tail="right" /></Pop></>) },
  { at: "Y me enseñó una", el: (<><Abs x={540} y={1100}><Glitter /></Abs><Pop delay={16} style={{ left: 540, top: 1520 }}><BigStamp text="¿¡discreto!?" /></Pop></>) },
  { at: "El sábado empecé a", set: "salon", el: (<><M x={420} /><Pop delay={4} style={{ left: 760, top: 720 }}><Clock time="7:00 a. m." /></Pop></>) },
  { at: "Con café Con fe", set: "salon", el: (<><M x={330} /><Abs x={830} y={1350}><Fan /></Abs><Pop delay={2} style={{ left: 300, top: 700 }}><Pill text="☕ café" size={40} /></Pop><Pop delay={16} style={{ left: 640, top: 760 }}><Pill text="🙏 fe" size={40} /></Pop></>) },
  { at: "A las once iba por", set: "salon", el: (<><M x={330} /><Dama i={2} x={790} /><Pop delay={4} style={{ left: 760, top: 720 }}><Clock time="11:00 a. m." /></Pop><Pop delay={20} style={{ left: 790, top: 950 }}><Pill text="dama 6/10" size={34} /></Pop></>) },
  { at: "Y a las once y", set: "night", dark: true, el: (<><M eyes="wide" speaking={false} /><Pop delay={16} style={{ left: 780, top: 760 }}><BigStamp text="¡PUM!" color={C.orange} size={130} /></Pop></>) },
  { at: "Se fue la corriente", set: "night", dark: true, el: (<><M eyes="flat" /><Pop delay={30} style={{ left: 540, top: 720 }}><Pill text="lo único puntual" size={40} /></Pop></>) },
  { at: "Terminé las damas con", set: "night", dark: true, el: (<><M x={330} /><Dama i={3} x={790} /><Flashlight x={560} y={780} /></>) },
  { at: "La abuela sostenía el", set: "night", dark: true, el: (<><M x={540} /><Abuela x={880} size={500} /><Flashlight x={760} y={980} angle={30} /></>) },
  { at: "La madrina me echaba", set: "night", dark: true, el: (<><M x={420} /><Madrina x={850} size={500} /><Abs x={700} y={1180}><CartonFan /></Abs></>) },
  { at: "Parecía una operación", set: "night", dark: true, el: (<><M x={540} /><Flashlight x={540} y={700} /><Pop delay={18} style={{ left: 540, top: 1480 }}><BigStamp text="quirófano ✨" color="#fff" size={84} /></Pop></>) },
  { at: "A las seis de la", set: "salon", el: (<><M x={420} eyes="flat" /><Pop delay={4} style={{ left: 760, top: 720 }}><Clock time="6:00 p. m." /></Pop></>) },
  { at: "Le había hecho las", set: "salon", el: (<><Abuela x={180} size={420} /><Madrina x={400} size={420} /><Mama x={620} size={420} /><Dama i={0} x={840} size={420} /><Pop delay={20} style={{ left: 540, top: 800 }}><Pill text="13 de 14 ✓" color={C.green} size={44} /></Pop></>) },
  { at: "Menos a la quinceañera", set: "salon", cam: { z: 1.6, x: 540, y: 1250 }, el: (<><Quince x={540} eyes="flat" smile={false} /><Pop delay={10} style={{ left: 540, top: 1500 }}><BigStamp text="¡la quinceañera!" size={52} /></Pop></>) },
  { at: "Se las hice en", set: "fiesta", dark: true, el: (<><M x={330} /><Quince x={780} /></>) },
  { at: "En una mesa al", set: "fiesta", dark: true, el: (<><M x={250} size={600} /><Abs x={780} y={1360}><Cake w={380} /></Abs></>) },
  { at: "Con el reguetón en", set: "fiesta", dark: true, el: (<><Abs x={170} y={1380}><Speaker /></Abs><M x={540} eyes="flat" /><Dance x={850} ground={GROUND}><Abuela x={850} size={500} /></Dance></>) },
  { at: "Con sus uñas discretas", set: "fiesta", dark: true, el: (<><Abs x={330} y={1150}><Nail stones encap color="#C9A227" w={220} /></Abs><Abs x={780} y={1350}><Cake w={340} /></Abs><Pop delay={20} style={{ left: 540, top: 760 }}><Pill text="brillan más que el cake ✨" size={36} /></Pop></>) },
  { at: "Al final vino el", set: "fiesta", dark: true, el: (<><M x={330} /><Papa x={790} /><Pop delay={8} style={{ left: 790, top: 920 }}><Pill text="el papá" size={34} /></Pop></>) },
  { at: "Me pagó todo En", set: "fiesta", dark: true, el: (<><M x={330} eyes="wide" /><Papa x={790} arms="wave" /><Pop delay={20} style={{ left: 560, top: 680 }}><Cash amount="en efectivo" w={300} /></Pop></>) },
  { at: "Y bajito mirando a", set: "fiesta", dark: true, cam: { z: 1.3, x: 700, y: 1400 }, el: (<><Papa x={760} eyes="side" smile={false} /><Pop delay={40} style={{ left: 470, top: 960 }}><Bubble text="¿Y a los hombres tú les haces? 🤫" size={30} width={420} tail="right" /></Pop></>) },
  { at: "Ahora tengo un cliente", set: "salon", el: (<><M x={330} /><Papa x={790} /><Pop delay={10} style={{ left: 790, top: 920 }}><Pill text="los martes" size={34} /></Pop></>) },
  { at: "Manicura transparente", el: (<><Abs x={540} y={1100}><Nail color="#F4F1EC" w={260} /></Abs><Pop delay={6} style={{ left: 540, top: 1500 }}><Pill text="transparente" /></Pop></>), ground: false },
  { at: "Y no se lo", set: "salon", el: (<><Papa x={540} eyes="side" smile={false} /><Pop delay={6} style={{ left: 760, top: 900 }}><div style={{ fontSize: 140 }}>🤫</div></Pop></>) },
  { at: "Ni a ustedes", set: "salon", cam: XHEAD, el: <M eyes="flat" /> },
  { at: "Ya lo dije", set: "salon", cam: CLOSE, el: (<><M eyes="side" /><Pop delay={6} style={{ left: 760, top: 760 }}><Pill text="ups" size={44} /></Pop></>) },
  { at: "En fin", set: "salon", el: <M /> },
];

export const Quince15: React.FC = () => <Episode data={data as EpData} audio="audio/quince.mp3" scenes={scenes} outro="walk" outroSet="salon" />;
